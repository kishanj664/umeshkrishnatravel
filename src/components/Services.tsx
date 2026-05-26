import { Car, MapPin, Plane, Building2, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Car,
    title: "Local Taxi Service",
    description: "City rides with flexible packages - 4hr/40km, 8hr/80km, 12hr/120km",
    color: "bg-blue-500"
  },
  {
    icon: MapPin,
    title: "Outstation Cabs",
    description: "One-way and round-trip services to major cities",
    color: "bg-green-500"
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Reliable pickup and drop to Mangalore International Airport",
    color: "bg-purple-500"
  },
  {
    icon: Building2,
    title: "Tour Packages",
    description: "Curated trips to Udupi, Murudeshwar, Gokarna, Dharmasthala & more",
    color: "bg-orange-500"
  },
  {
    icon: Users,
    title: "Corporate Travel",
    description: "Business travel solutions for companies and groups",
    color: "bg-teal-500"
  },
  {
    icon: Heart,
    title: "Wedding Car Rental",
    description: "Luxury vehicles for wedding events and special occasions",
    color: "bg-pink-500"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">Premium Travel Solutions</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            We offer comprehensive travel services tailored to your needs across Udupi, Manipal, and entire Karnataka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
              <Link to="/services" className="inline-flex items-center gap-1 text-gold font-semibold mt-4 hover:gap-2 transition-all">
                Learn More <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}