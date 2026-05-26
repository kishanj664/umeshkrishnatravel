import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.jpeg" alt="UK Travels" className="h-12 w-auto object-contain" />
              <span className="text-xl font-bold">Umesh Krishna Travels</span>
            </div>
            <p className="text-white/60 mb-6">
              Your trusted travel partner in Udupi & Manipal. We provide premium cab services, tour packages, and airport transfers across Karnataka.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/919353075628" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <span className="text-sm font-bold">WA</span>
              </a>
              <a href="tel:9353075628" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <span className="text-sm font-bold">Call</span>
              </a>
              <a href="mailto:umeshkrishnatravels@gmail.com" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <span className="text-sm font-bold">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/60 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-gold transition-colors">Services</Link></li>
              <li><Link to="/fleet" className="text-white/60 hover:text-gold transition-colors">Our Fleet</Link></li>
              <li><Link to="/tours" className="text-white/60 hover:text-gold transition-colors">Tour Packages</Link></li>
              <li><Link to="/book?tab=my" className="text-white/60 hover:text-gold transition-colors font-medium">My Bookings</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gold">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-white/60 hover:text-gold transition-colors">Local Taxi</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-gold transition-colors">Outstation Cabs</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-gold transition-colors">Airport Transfer</Link></li>
              <li><Link to="/tours" className="text-white/60 hover:text-gold transition-colors">Tour Packages</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-gold transition-colors">Corporate Travel</Link></li>
              <li><Link to="/services" className="text-white/60 hover:text-gold transition-colors">Wedding Car Rental</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-gold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/60">+91 9353075628</p>
                  <p className="text-white/60">+91 9535171753</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-white/60">umeshkrishnatravels@gmail.com</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-white/60">Udupi & Manipal, Karnataka, India</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © 2024 Umesh Krishna Travels. All rights reserved. | Premium Cab Services in Udupi & Manipal
          </p>
        </div>
      </div>
    </footer>
  );
}