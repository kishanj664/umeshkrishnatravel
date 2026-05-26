import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Snowflake, Briefcase, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { vehicles, vehicleTypes } from "../data/vehicles";

export default function FleetPage() {
  const [selectedType, setSelectedType] = useState("all");

  const filteredVehicles = selectedType === "all" 
    ? vehicles 
    : vehicles.filter(v => v.type === selectedType);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Fleet</h1>
          <p className="text-white/70 text-lg">Choose from our wide range of premium vehicles</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-navy" />
              <span className="font-semibold text-navy">Filter by:</span>
            </div>
            <button
              onClick={() => setSelectedType("all")}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedType === "all"
                  ? "bg-gold text-navy"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            {vehicleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedType === type.id
                    ? "bg-gold text-navy"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 vehicle-card border border-slate-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {vehicle.acType}
                  </div>
                  <div className="absolute top-4 left-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full uppercase">
                    {vehicle.type.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-navy">{vehicle.name}</h3>
                    <span className="text-sm text-slate-500">{vehicle.brand}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {vehicle.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Snowflake className="w-4 h-4" />
                      {vehicle.acType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {vehicle.luggage} Bags
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-xs text-slate-500">Per KM</p>
                        <p className="font-bold text-gold">₹{vehicle.perKm}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Per Day</p>
                        <p className="font-bold text-gold">₹{vehicle.perDay}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Min Charge</p>
                        <p className="font-bold text-gold">₹{vehicle.minimumCharge}</p>
                      </div>
                    </div>
                    <Link
                      to="/book"
                      className="block text-center w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-gold hover:text-navy transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Quote?</h2>
          <p className="text-white/70 mb-8">
            Contact us for special rates on long-term contracts and corporate bookings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9353075628"
              className="bg-gold text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold-light"
            >
              Call Now
            </a>
            <Link
              to="/contact"
              className="bg-white text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold hover:text-navy transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}