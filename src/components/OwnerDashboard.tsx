import { useState, useEffect } from 'react';
import { Check, X, Clock, MapPin, Calendar, User, Plus, Car, Trash2, ListChecks } from 'lucide-react';

interface Booking {
  id: number;
  customerEmail: string;
  status: 'pending' | 'accepted' | 'rejected';
  details: {
    pickup: string;
    drop: string;
    date: string;
    time: string;
    vehicleName: string;
    bookingType: string;
    name: string;
    phone: string;
  };
}

interface Vehicle {
  id: number;
  name: string;
  seats: number;
  perKm: number;
  minimumCharge: number;
  acType: string;
  features: string[];
  image: string;
}

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'fleet'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    seats: 4,
    perKm: 12,
    minimumCharge: 1500,
    acType: 'AC',
    features: 'AC, Music System, GPS'
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'bookings') {
        const response = await fetch('http://localhost:5000/api/bookings');
        const data = await response.json();
        setBookings(data.reverse());
      } else {
        const response = await fetch('http://localhost:5000/api/vehicles');
        const data = await response.json();
        setVehicles(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newVehicle,
          features: newVehicle.features.split(',').map(f => f.trim())
        }),
      });
      if (response.ok) {
        setShowAddForm(false);
        setNewVehicle({ name: '', seats: 4, perKm: 12, minimumCharge: 1500, acType: 'AC', features: 'AC, Music System, GPS' });
        fetchData();
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await fetch(`http://localhost:5000/api/vehicles/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-navy">
        <h2 className="text-3xl font-bold">Owner Panel</h2>
        
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex gap-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'bookings' ? 'bg-navy text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'fleet' ? 'bg-navy text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Car className="w-4 h-4" />
            Fleet
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-navy font-bold">Loading...</div>
      ) : activeTab === 'bookings' ? (
        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
              <p className="text-slate-500">No bookings found yet.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className={`bg-white rounded-2xl border-2 p-6 transition-all ${
                  booking.status === 'pending'
                    ? 'border-gold shadow-lg shadow-gold/5'
                    : 'border-slate-100 opacity-80'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      booking.status === 'pending' ? 'bg-gold/20 text-gold' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy">Booking #{booking.id}</h3>
                      <p className="text-sm text-slate-500">{booking.details.bookingType.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    booking.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="w-4 h-4 text-gold" />
                      <span className="text-sm font-medium">{booking.details.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span className="text-sm">From: {booking.details.pickup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-sm">To: {booking.details.drop}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="text-sm">{booking.details.date} at {booking.details.time}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-bold text-navy">Vehicle:</span> {booking.details.vehicleName}
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-bold text-navy">Contact:</span> {booking.details.phone}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 flex flex-col justify-center">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Customer Email</p>
                    <p className="text-sm text-navy font-medium truncate">{booking.customerEmail}</p>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'accepted')}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                    >
                      <Check className="w-5 h-5" />
                      Accept Booking
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'rejected')}
                      className="flex items-center justify-center gap-2 px-6 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-navy">Vehicle Fleet</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-xl font-bold hover:bg-gold-light transition-all shadow-lg shadow-gold/10"
            >
              <Plus className="w-4 h-4" />
              Add New Car
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-3xl p-8 border-2 border-gold/30 shadow-xl animate-in fade-in slide-in-from-top-4">
              <h4 className="text-lg font-bold text-navy mb-6">Car Details</h4>
              <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Vehicle Name</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.name}
                    onChange={e => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold outline-none text-navy"
                    placeholder="e.g. Toyota Innova Crysta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Seating Capacity</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.seats}
                    onChange={e => setNewVehicle({ ...newVehicle, seats: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold outline-none text-navy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Per KM Charge (₹)</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.perKm}
                    onChange={e => setNewVehicle({ ...newVehicle, perKm: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold outline-none text-navy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Minimum Charge (₹)</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.minimumCharge}
                    onChange={e => setNewVehicle({ ...newVehicle, minimumCharge: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold outline-none text-navy"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-navy mb-2">Features (Comma separated)</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.features}
                    onChange={e => setNewVehicle({ ...newVehicle, features: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold outline-none text-navy"
                    placeholder="AC, Music System, GPS, etc."
                  />
                </div>
                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-navy text-white py-4 rounded-xl font-bold hover:bg-navy-light transition-all shadow-lg"
                  >
                    Save Vehicle
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-8 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group text-navy">
                <div className="relative h-48">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-navy text-white px-3 py-1 rounded-full text-xs font-bold">
                    {vehicle.seats} SEATER
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-navy text-lg">{vehicle.name}</h4>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Min Charge</p>
                      <p className="font-bold text-navy">₹{vehicle.minimumCharge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Per KM</p>
                      <p className="font-bold text-gold">₹{vehicle.perKm}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((f, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-500 rounded-md">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}