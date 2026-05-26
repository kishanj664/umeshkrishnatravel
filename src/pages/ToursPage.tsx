import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { tours, tourCategories } from "../data/tours";

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTours = selectedCategory === "all"
    ? tours
    : tours.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tour Packages</h1>
          <p className="text-white/70 text-lg">Explore the beautiful destinations of Karnataka</p>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {tourCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gold text-navy"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-gold text-navy text-sm font-semibold px-4 py-1 rounded-full">
                      {tour.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-navy mb-3">{tour.name}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold" />
                        {tour.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tour.highlights.map((h, i) => (
                        <span key={i} className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-sm text-slate-500">Starting from</span>
                        <p className="text-3xl font-bold text-gold">₹{tour.price}</p>
                      </div>
                      <Link
                        to={`/tours/${tour.id}`}
                        className="bg-navy text-white px-6 py-3 rounded-full font-semibold hover:bg-gold hover:text-navy transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-xl">No tour packages available at the moment. Please check back later or contact us for custom bookings.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-navy rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Custom Tour Packages</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Planning a special trip? We offer customized tour packages tailored to your preferences. 
              Contact us for a personalized itinerary and quote.
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
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}