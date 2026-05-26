const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

// ── Supabase JWT secret (paste your JWT secret from Supabase Dashboard → Settings → API → JWT Secret) ──
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || 'qcgonGExJ66KrQH3CKPJIVG9W55/7hZDA5pYVoFVHTJe7LKZrX94MGAp6UjBW3G+MLLxO9ctpAuoeWkJXhW00A==';

// Middleware: verify Supabase access token and attach user info to req
function authenticateSupabase(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, Buffer.from(SUPABASE_JWT_SECRET, 'base64'), { algorithms: ['HS256'] });
    req.supabaseUser = {
      id: decoded.sub,                     // Supabase user UUID
      email: decoded.email,
      role: decoded.user_metadata?.role || 'customer',
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

app.use(cors());
app.use(express.json());
// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Database setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    seats INTEGER,
    perKm REAL,
    minimumCharge REAL,
    acType TEXT,
    features TEXT,
    image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId TEXT,
    customerEmail TEXT,
    details TEXT,
    price REAL,
    status TEXT DEFAULT 'pending',
    paymentStatus TEXT DEFAULT 'pending'
  )`);

  // Seed with NEW ₹17 pricing
  db.run(`INSERT OR IGNORE INTO vehicles (id, name, seats, perKm, minimumCharge, acType, features, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [1, "Maruti Suzuki Ertiga", 7, 17, 2000, "AC", JSON.stringify(["AC", "Music System", "USB Charging", "2-Way Only", "Toll/Permit Extra"]), "/images/car.jpeg"]
  );

  // Seed default owner
  const ownerEmail = 'owner@travels.com';
  db.get(`SELECT * FROM users WHERE email = ?`, [ownerEmail], (err, row) => {
    if (!row) {
      const hashedPassword = bcrypt.hashSync('owner123', 8);
      db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, [ownerEmail, hashedPassword, 'owner']);
    }
  });
});

// Auth Endpoints
app.post('/api/auth/register', (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  
  db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, [email, hashedPassword, role || 'customer'], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send({ auth: false, message: "Registration failed. Email might already exist." });
    }
    const token = jwt.sign({ id: this.lastID, role: role || 'customer' }, SECRET_KEY, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token, user: { id: this.lastID, email, role: role || 'customer' } });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).send({ auth: false, message: 'Error on the server.' });
    if (!user) return res.status(404).send({ auth: false, message: 'No user found with that email.' });
    
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Invalid password.' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token, user: { id: user.id, email: user.email, role: user.role } });
  });
});

// Vehicle Endpoints
app.get('/api/vehicles', (req, res) => {
  db.all(`SELECT * FROM vehicles`, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    const vehicles = rows.map(v => ({ 
        ...v, 
        features: JSON.parse(v.features),
        image: v.image.startsWith('http') || v.image.startsWith('/images') ? v.image : `/uploads/${v.image}`
    }));
    res.status(200).send(vehicles);
  });
});

app.post('/api/vehicles', upload.single('image'), (req, res) => {
  const { name, seats, perKm, minimumCharge, acType, features } = req.body;
  const image = req.file ? req.file.filename : "car.jpeg";
  
  db.run(`INSERT INTO vehicles (name, seats, perKm, minimumCharge, acType, features, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, seats, perKm, minimumCharge, acType, features, image],
    function(err) {
      if (err) {
          console.error(err);
          return res.status(500).send(err.message);
      }
      res.status(200).send({ id: this.lastID });
    }
  );
});

app.delete('/api/vehicles/:id', (req, res) => {
  db.run(`DELETE FROM vehicles WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(200).send({ message: 'Vehicle deleted' });
  });
});

// ── Booking Endpoints (all protected with Supabase auth) ──

// Create a booking — uses the authenticated user's ID, not a request param
app.post('/api/bookings', authenticateSupabase, (req, res) => {
  const { details, price } = req.body;
  const customerId = req.supabaseUser.id;
  const customerEmail = req.supabaseUser.email;

  db.run(
    `INSERT INTO bookings (customerId, customerEmail, details, price) VALUES (?, ?, ?, ?)`,
    [customerId, customerEmail, JSON.stringify(details), price],
    function(err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send({ id: this.lastID });
    }
  );
});

// Get ALL bookings — owner only
app.get('/api/bookings', authenticateSupabase, (req, res) => {
  if (req.supabaseUser.role !== 'owner') {
    return res.status(403).json({ message: 'Owners only.' });
  }
  db.all(`SELECT * FROM bookings`, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    const bookings = rows.map(r => ({ ...r, details: JSON.parse(r.details) }));
    res.status(200).send(bookings);
  });
});

// Get MY bookings — server enforces that you can only see your own
app.get('/api/bookings/mine', authenticateSupabase, (req, res) => {
  const customerId = req.supabaseUser.id;
  db.all(`SELECT * FROM bookings WHERE customerId = ?`, [customerId], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    const bookings = rows.map(r => ({ ...r, details: JSON.parse(r.details) }));
    res.status(200).send(bookings);
  });
});

// Update booking status — owner only
app.put('/api/bookings/:id/status', authenticateSupabase, (req, res) => {
  if (req.supabaseUser.role !== 'owner') {
    return res.status(403).json({ message: 'Owners only.' });
  }
  const { status } = req.body;
  db.run(`UPDATE bookings SET status = ? WHERE id = ?`, [status, req.params.id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(200).send({ message: 'Status updated' });
  });
});

// Pay for a booking — customer can only pay their own
app.put('/api/bookings/:id/pay', authenticateSupabase, (req, res) => {
  const customerId = req.supabaseUser.id;
  db.get(`SELECT * FROM bookings WHERE id = ? AND customerId = ?`, [req.params.id, customerId], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(403).json({ message: 'Not your booking.' });
    db.run(`UPDATE bookings SET paymentStatus = 'paid' WHERE id = ?`, [req.params.id], function(err2) {
      if (err2) return res.status(500).send(err2.message);
      res.status(200).send({ message: 'Payment successful' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
