import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Car, MapPin, Plane, Building2, Users, Heart, Clock, Check } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    icon: Car,
    title: "Local Taxi Service",
    description: "Explore Udupi and Manipal comfortably with our local taxi services. Available for hourly and daily packages.",
    features: ["4hr/40km - ₹800", "8hr/80km - ₹1500", "12hr/120km - ₹2200", "AC Vehicles", "Professional Drivers"],
    highlight: true
  },
  {
    id: 2,
    icon: MapPin,
    title: "Outstation Cabs",
    description: "One-way and round-trip services to major cities like Bangalore, Mangalore, Goa, Coorg, and more.",
    features: ["One-way trips", "Round trips", "Multi-city tours", "Competitive pricing", "Experienced drivers"],
    highlight: true
  },
  {
    id: 3,
    icon: Plane,
    title: "Airport Transfer",
    description: "Reliable pickup and drop services to Mangalore International Airport (IXE).",
    features: ["24/7 availability", "Flight tracking", "Pickup from hotel/home", "Drop at terminal", "Assisted luggage"],
    highlight: true
  },
  {
    id: 4,
    icon: Building2,
    title: "Tour Packages",
    description: "Curated tour packages to the most beautiful destinations in Coastal Karnataka.",
    features: ["Udupi Temple Tour", "Murudeshwar & Gokarna", "Dharmasthala & Kukke", "Coastal Karnataka Circuit", "Custom packages"],
    highlight: false
  },
  {
    id: 5,
    icon: Users,
    title: "Corporate Travel",
    description: "Business travel solutions for corporate companies and groups.",
    features: ["Monthly contracts", "Employee transport", "Airport transfers", "Event management", "Dedicated account manager"],
    highlight: false
  },
  {
    id: 6,
    icon: Heart,
    title: "Wedding Car Rental",
    description: "Luxury vehicles for wedding events and special occasions.",
    features: ["Premium cars", "Decorated vehicles", "Full day rental", "Professional drivers", "Multiple vehicle options"],
    highlight: false
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(1);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-white/70 text-lg">Comprehensive travel solutions for all your needs</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`rounded-2xl p-8 transition-all ${
                  activeService === service.id
                    ? "bg-navy text-white shadow-xl"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
                onClick={() => setActiveService(service.id)}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  activeService === service.id ? "bg-gold" : "bg-gold/20"
                }`}>
                  <service.icon className={`w-7 h-7 ${activeService === service.id ? "text-navy" : "text-gold"}`} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${activeService === service.id ? "text-white" : "text-navy"}`}>
                  {service.title}
                </h3>
                <p className={`mb-4 ${activeService === service.id ? "text-white/70" : "text-slate-600"}`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-gold" />
                      <span className={activeService === service.id ? "text-white/80" : "text-slate-600"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  className={`inline-block mt-6 px-6 py-2 rounded-full font-semibold ${
                    activeService === service.id
                      ? "bg-gold text-navy hover:bg-gold-light"
                      : "bg-navy text-white hover:bg-navy-light"
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Why Choose Our Services?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We pride ourselves on delivering exceptional travel experiences with a focus on safety, comfort, and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">24/7 Availability</h3>
              <p className="text-slate-600">We're available round the clock for all your travel needs, including late night and early morning pickups.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Well-maintained Fleet</h3>
              <p className="text-slate-600">Our vehicles undergo regular maintenance and sanitization to ensure a safe and comfortable journey.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Professional Drivers</h3>
              <p className="text-slate-600">Our drivers are experienced, background-verified, and trained to provide excellent customer service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Contact us now for instant booking and competitive rates. Our team is ready to assist you 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9353075628"
              className="bg-gold text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold-light"
            >
              Call Now
            </a>
            <Link
              to="/book"
              className="bg-white text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold hover:text-navy transition-colors"
            >
              Book Online
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}