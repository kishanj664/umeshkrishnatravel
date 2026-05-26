import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { tours } from "../data/tours";

export default function TourPackages() {
  if (tours.length === 0) return null;
  return (
    <section id="tours" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">Tour Packages</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Explore Karnataka</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Carefully curated tour packages to the most beautiful destinations in Coastal Karnataka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  {tour.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{tour.name}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {tour.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-sm text-slate-500">Starting from</span>
                    <p className="text-2xl font-bold text-gold">₹{tour.price}</p>
                  </div>
                  <Link
                    to={`/tours/${tour.id}`}
                    className="bg-navy text-white px-5 py-2 rounded-full font-semibold hover:bg-gold hover:text-navy transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            View All Tours
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}