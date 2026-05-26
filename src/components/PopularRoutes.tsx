import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { popularRoutes } from "../data/routes";

export default function PopularRoutes() {
  if (popularRoutes.length === 0) return null;
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">Popular Routes</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Where We Go</h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Popular destinations from Udupi & Manipal with transparent pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.slice(0, 8).map((route, index) => (
            <div
              key={index}
              className="bg-navy-light rounded-2xl p-6 border border-white/10 hover:border-gold/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">{route.from}</p>
                  <p className="text-white/60 text-sm">to</p>
                  <p className="text-gold font-semibold">{route.to}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {route.duration}
                </span>
                <span>{route.distance}</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs text-white/50">Sedan</p>
                  <p className="text-white font-bold">₹{route.sedan}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">SUV</p>
                  <p className="text-white font-bold">₹{route.suv}</p>
                </div>
              </div>

              <Link
                to="/book"
                className="block text-center mt-4 w-full bg-gold text-navy py-2 rounded-lg font-semibold hover:bg-gold-light transition-colors"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}