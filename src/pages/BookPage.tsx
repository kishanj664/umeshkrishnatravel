import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Calendar, Clock, Users, Car, ArrowRight, Check, Phone, Lock, ListChecks, PlusCircle } from "lucide-react";
import { locations } from "../data/routes";
import { useAuth } from "../context/AuthContext";
import OwnerDashboard from "../components/OwnerDashboard";
import LoginModal from "../components/LoginModal";
import CustomerBookings from "../components/CustomerBookings";

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Vehicle" },
  { id: 3, name: "Contact" },
  { id: 4, name: "Confirm" }
];

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

export default function BookPage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'new' | 'my'>('new');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'my' && user) {
      setActiveTab('my');
    } else if (tab === 'new') {
      setActiveTab('new');
    }
  }, [searchParams, user]);

  const [formData, setFormData] = useState({
    bookingType: "one_way",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    vehicle: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const calculatePrice = () => {
    if (!formData.pickup || !formData.drop || !formData.vehicle) return 0;
    const vehicleData = vehicles.find(v => v.id === parseInt(formData.vehicle));
    if (!vehicleData) return 0;
    const basePrice = vehicleData.minimumCharge;
    const distance = Math.floor(Math.random() * 300) + 50;
    return basePrice + (distance * vehicleData.perKm * 0.8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const price = Math.round(calculatePrice());
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: user.id,
          price: price,
          details: {
            ...formData,
            estimatedPrice: price,
            vehicleName: vehicles.find(v => v.id === parseInt(formData.vehicle))?.name || 'Standard'
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Booking Confirmed!\nBooking ID: UKT-2024-${data.id}\n\nWe will call you at ${formData.phone} to confirm the details.`);
        setActiveTab('my');
        setCurrentStep(1);
        setFormData({
          bookingType: "one_way",
          pickup: "",
          drop: "",
          date: "",
          time: "",
          vehicle: "",
          name: "",
          email: "",
          phone: "",
          notes: ""
        });
      }
    } catch (error) {
      alert('Failed to save booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <section className="pt-28 pb-12 bg-navy relative overflow-hidden text-navy">
        <div className="absolute inset-0 bg-gold/5 opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {user?.role === 'owner' ? 'Manage Bookings' : activeTab === 'new' ? 'Book Your Ride' : 'My Trips'}
          </h1>
          <p className="text-white/70">
            {user?.role === 'owner' 
              ? 'Review and accept customer tour requests' 
              : activeTab === 'new' 
                ? 'Simple steps to book your premium taxi service'
                : 'View your journey history and payment status'}
          </p>
        </div>
      </section>

      {user?.role === 'owner' ? (
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <OwnerDashboard />
          </div>
        </section>
      ) : (
        <>
          {user && (
            <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-20">
              <div className="bg-white rounded-2xl p-2 shadow-xl border border-slate-100 flex gap-2">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                    activeTab === 'new' ? "bg-navy text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <PlusCircle className="w-5 h-5" />
                  New Booking
                </button>
                <button
                  onClick={() => setActiveTab('my')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                    activeTab === 'my' ? "bg-navy text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <ListChecks className="w-5 h-5" />
                  My Bookings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'new' ? (
            <>
              <section className="py-8 bg-white border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-6">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                          currentStep >= step.id
                            ? "bg-gold text-navy shadow-lg shadow-gold/20"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                        </div>
                        <span className={`ml-2 text-sm font-bold hidden sm:block ${
                          currentStep >= step.id ? "text-navy" : "text-slate-400"
                        }`}>
                          {step.name}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`w-8 md:w-20 h-0.5 mx-2 rounded-full ${
                            currentStep > step.id ? "bg-gold" : "bg-slate-100"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="py-16">
                <div className="max-w-3xl mx-auto px-6">
                  <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10">
                    <form onSubmit={handleSubmit}>
                      {currentStep === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div>
                            <label className="block text-sm font-bold text-navy mb-4">Select Trip Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                              {["one_way", "round_trip", "local", "airport", "tour"].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, bookingType: type })}
                                  className={`px-4 py-3 rounded-xl font-bold text-xs transition-all border-2 ${
                                    formData.bookingType === type
                                      ? "bg-gold border-gold text-navy shadow-lg shadow-gold/20"
                                      : "bg-white border-slate-100 text-slate-500 hover:border-gold/30"
                                  }`}
                                >
                                  {type.replace('_', ' ').toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-navy ml-1">Pickup Location</label>
                              <div className="relative group text-navy">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold group-focus-within:scale-110 transition-transform" />
                                <select
                                  value={formData.pickup}
                                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all appearance-none bg-white font-medium text-navy"
                                  required
                                >
                                  <option value="">Select Pickup</option>
                                  {locations.map((loc) => (
                                    <option key={loc} value={loc}>{loc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-navy ml-1">Drop Location</label>
                              <div className="relative group text-navy">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 group-focus-within:scale-110 transition-transform" />
                                <select
                                  value={formData.drop}
                                  onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all appearance-none bg-white font-medium text-navy"
                                  required
                                >
                                  <option value="">Select Drop</option>
                                  {locations.map((loc) => (
                                    <option key={loc} value={loc}>{loc}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-navy ml-1">Journey Date</label>
                              <div className="relative group text-navy">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold group-focus-within:scale-110 transition-transform" />
                                <input
                                  type="date"
                                  value={formData.date}
                                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all bg-white font-medium text-navy"
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-navy ml-1">Preferred Time</label>
                              <div className="relative group text-navy">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold group-focus-within:scale-110 transition-transform" />
                                <input
                                  type="time"
                                  value={formData.time}
                                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all bg-white font-medium text-navy"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            disabled={!formData.pickup || !formData.drop || !formData.date || !formData.time}
                            className="w-full flex items-center justify-center gap-2 bg-navy text-white py-5 rounded-2xl font-bold hover:bg-navy-light transition-all shadow-xl shadow-navy/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4 group"
                          >
                            Find Best Vehicle
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                          <h2 className="text-3xl font-bold text-navy">Choose Your Ride</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {vehicles.map((vehicle) => (
                              <div
                                key={vehicle.id}
                                onClick={() => setFormData({ ...formData, vehicle: vehicle.id.toString() })}
                                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all group ${
                                  formData.vehicle === vehicle.id.toString()
                                    ? "border-gold bg-gold/5 shadow-lg shadow-gold/5"
                                    : "border-slate-100 hover:border-gold/30 hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex flex-col gap-4 text-navy">
                                  <div className="relative overflow-hidden rounded-xl">
                                    <img
                                      src={vehicle.image}
                                      alt={vehicle.name}
                                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-navy flex items-center gap-1 shadow-sm">
                                      <Users className="w-3 h-3 text-gold" />
                                      {vehicle.seats} SEATS
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-navy text-lg">{vehicle.name}</h3>
                                    <p className="text-sm text-slate-500 mb-2">{vehicle.acType} Comfort</p>
                                    <div className="flex items-center justify-between">
                                      <p className="text-gold font-black text-xl">₹{vehicle.perKm}<span className="text-xs font-bold text-slate-400">/KM</span></p>
                                      {formData.vehicle === vehicle.id.toString() && (
                                        <div className="bg-gold text-navy p-1 rounded-full">
                                          <Check className="w-4 h-4" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(3)}
                              disabled={!formData.vehicle}
                              className="flex-1 flex items-center justify-center gap-2 bg-navy text-white py-5 rounded-2xl font-bold hover:bg-navy-light transition-all shadow-xl shadow-navy/20 disabled:opacity-50"
                            >
                              Next Step
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                          <h2 className="text-3xl font-bold text-navy">Personal Details</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-navy ml-1">Full Name</label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-medium text-navy"
                                placeholder="Your name"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-navy ml-1">Mobile Number</label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-medium text-navy"
                                placeholder="+91 XXXXX XXXXX"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-navy ml-1">Email Address (Optional)</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-medium text-navy"
                              placeholder="email@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-navy ml-1">Special Notes</label>
                            <textarea
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              rows={4}
                              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-medium resize-none text-navy"
                              placeholder="e.g. Flight number, extra luggage, or child seat..."
                            ></textarea>
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                            >
                              Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(4)}
                              disabled={!formData.name || !formData.phone}
                              className="flex-1 flex items-center justify-center gap-2 bg-navy text-white py-5 rounded-2xl font-bold hover:bg-navy-light transition-all shadow-xl shadow-navy/20 disabled:opacity-50"
                            >
                              Final Confirmation
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {currentStep === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                          <h2 className="text-3xl font-bold text-navy">Review & Confirm</h2>
                          
                          <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-slate-100">
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Trip Type</p>
                                <p className="font-bold text-navy">{formData.bookingType.replace('_', ' ').toUpperCase()}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
                                <p className="font-bold text-navy">{formData.date} at {formData.time}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pickup Point</p>
                                <p className="font-bold text-navy">{formData.pickup}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Drop Point</p>
                                <p className="font-bold text-navy">{formData.drop}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Selected Vehicle</p>
                                <p className="font-bold text-navy">{vehicles.find(v => v.id === parseInt(formData.vehicle))?.name}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Base Fare</p>
                                <p className="font-black text-gold text-2xl">₹{Math.round(calculatePrice())}</p>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-slate-200">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Details</p>
                              <p className="font-bold text-navy">{formData.name} • {formData.phone}</p>
                            </div>
                          </div>

                          <div className="bg-navy rounded-3xl p-6 text-center shadow-lg shadow-navy/10">
                            <p className="text-white font-medium text-sm leading-relaxed">
                              By clicking confirm, you agree to our terms. Our representative will contact you within <span className="text-gold font-bold">15 minutes</span> for confirmation.
                            </p>
                          </div>

                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => setCurrentStep(3)}
                              className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex-[2] flex items-center justify-center gap-2 bg-gold text-navy py-5 rounded-2xl font-black hover:bg-gold-light transition-all shadow-xl shadow-gold/20 disabled:opacity-50"
                            >
                              <Check className="w-6 h-6" />
                              {loading ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
                            </button>
                          </div>
                        </div>
                      )}
                    </form>

                    <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                      <p className="text-slate-500 font-medium mb-4">Need help with your booking?</p>
                      <a
                        href="tel:9353075628"
                        className="inline-flex items-center gap-3 bg-white text-navy px-10 py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all border border-slate-200"
                      >
                        <Phone className="w-5 h-5 text-gold" />
                        Call Support: +91 9353075628
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section className="py-16">
              <div className="max-w-3xl mx-auto px-6">
                <CustomerBookings />
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}