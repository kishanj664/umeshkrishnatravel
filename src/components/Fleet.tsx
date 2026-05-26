import { useState, useEffect } from "react";
import { Users, Snowflake, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

interface Vehicle {
  id: number;
  name: string;
  seats: number;
  perKm: number;
  acType: string;
  image: string;
  features: string[];
}

export default function Fleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then(data => {
        setVehicles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching vehicles:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-20 text-center text-navy font-bold">Loading Premium Fleet...</div>;

  return (
    <section id="fleet" className="py-20 bg-white text-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">Our Fleet</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Premium Vehicles</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto font-medium">
            Well-maintained and clean vehicles for a comfortable journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.length === 0 ? (
            <div className="col-span-full py-10 text-center text-slate-400 font-medium">No vehicles available at the moment.</div>
          ) : (
            vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 vehicle-card border border-slate-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-navy text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {vehicle.acType}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4 font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gold" />
                      {vehicle.seats} Seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Snowflake className="w-4 h-4 text-gold" />
                      {vehicle.acType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-gold" />
                      {Math.floor(vehicle.seats / 2)} Bags
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting from</span>
                      <p className="text-2xl font-black text-gold">₹{vehicle.perKm}<span className="text-xs font-bold text-slate-400">/km</span></p>
                    </div>
                    <Link
                      to="/book"
                      className="bg-navy text-white px-6 py-2.5 rounded-full font-bold hover:bg-gold hover:text-navy transition-all shadow-lg shadow-navy/10"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 rounded-full font-bold hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
          >
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
}