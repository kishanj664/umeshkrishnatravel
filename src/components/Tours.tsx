import { Check, Plane, Hotel, Utensils, Camera } from "lucide-react";

const tours = [
  {
    name: "Explorer",
    price: 999,
    duration: "5 Days",
    color: "from-sky-400 to-blue-500",
    popular: false,
    features: [
      "Round-trip flights",
      "3-star accommodation",
      "Breakfast included",
      "City tour",
      "Travel insurance",
      "24/7 Support",
    ],
  },
  {
    name: "Adventurer",
    price: 1999,
    duration: "10 Days",
    color: "from-violet-500 to-purple-600",
    popular: true,
    features: [
      "Round-trip flights",
      "4-star accommodation",
      "All meals included",
      "Guided tours",
      "Travel insurance",
      "Airport transfers",
      "Photo sessions",
      "24/7 Support",
    ],
  },
  {
    name: "Luxury",
    price: 3999,
    duration: "14 Days",
    color: "from-amber-400 to-orange-500",
    popular: false,
    features: [
      "Business class flights",
      "5-star resort stay",
      "All meals + drinks",
      "Private guided tours",
      "Premium insurance",
      "Private transfers",
      "Yacht excursion",
      "Spa access",
      "Personal concierge",
    ],
  },
];

export default function Tours() {
  return (
    <section id="tours" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Plane className="w-4 h-4" />
            Tour Packages
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">
              Perfect Package
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            All-inclusive tour packages designed to make your travel experience seamless and unforgettable.
          </p>
        </div>

        {/* What's Included Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Plane, label: "Flights", desc: "Comfortable air travel" },
            { icon: Hotel, label: "Hotels", desc: "Premium accommodations" },
            { icon: Utensils, label: "Meals", desc: "Delicious local cuisine" },
            { icon: Camera, label: "Activities", desc: "Guided experiences" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.name}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-lg border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                tour.popular ? "border-violet-500 scale-105" : "border-transparent"
              }`}
            >
              {tour.popular && (
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
                  ⭐ Most Popular
                </div>
              )}
              <div className={`bg-gradient-to-br ${tour.color} p-8 text-white`}>
                <h3 className="text-2xl font-extrabold mb-1">{tour.name}</h3>
                <p className="text-white/70 text-sm mb-6">{tour.duration} package</p>
                <div className="text-5xl font-extrabold">
                  ${tour.price.toLocaleString()}
                  <span className="text-lg font-normal text-white/70"> /person</span>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {tour.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-600 text-sm">
                      <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                    tour.popular
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
