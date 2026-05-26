import { Clock, Car, UserCheck, DollarSign, MapPin, Shield, Star, Heart } from "lucide-react";

const features = [
  { icon: Clock, title: "24/7 Service", desc: "Round the clock availability for all your travel needs" },
  { icon: Car, title: "Well-maintained Vehicles", desc: "Regularly serviced, clean and sanitized cabs" },
  { icon: UserCheck, title: "Experienced Drivers", desc: "Professional, polite and knowledgeable drivers" },
  { icon: DollarSign, title: "Affordable Rates", desc: "Best pricing with transparent charges" },
  { icon: MapPin, title: "GPS-enabled Vehicles", desc: "Real-time tracking for your safety" },
  { icon: Shield, title: "No Hidden Charges", desc: "Clear and honest pricing policy" }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">The UK Travels Advantage</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            We prioritize your comfort and safety with every ride
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy mb-1">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}