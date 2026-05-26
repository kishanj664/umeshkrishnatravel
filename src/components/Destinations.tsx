import { useState } from "react";
import { MapPin, Star, Clock, Heart } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "/images/destination-paris.jpg",
    rating: 4.9,
    duration: "7 Days",
    price: 2499,
    category: "City",
    tag: "Most Popular",
    tagColor: "bg-amber-500",
    description: "Experience the city of love with its iconic Eiffel Tower, world-class cuisine, and vibrant art scene.",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "/images/destination-bali.jpg",
    rating: 4.8,
    duration: "10 Days",
    price: 1899,
    category: "Beach",
    tag: "Best Value",
    tagColor: "bg-emerald-500",
    description: "Immerse yourself in Bali's rich culture, stunning temples, and breathtaking rice terraces.",
  },
  {
    id: 3,
    name: "Maldives",
    image: "/images/destination-maldives.jpg",
    rating: 5.0,
    duration: "8 Days",
    price: 4299,
    category: "Beach",
    tag: "Luxury",
    tagColor: "bg-violet-500",
    description: "Indulge in overwater bungalows surrounded by the world's most pristine turquoise waters.",
  },
  {
    id: 4,
    name: "Santorini, Greece",
    image: "/images/destination-santorini.jpg",
    rating: 4.9,
    duration: "6 Days",
    price: 2999,
    category: "City",
    tag: "Romantic",
    tagColor: "bg-rose-500",
    description: "Discover the magic of Santorini's iconic blue-domed churches and breathtaking sunset views.",
  },
  {
    id: 5,
    name: "African Safari",
    image: "/images/destination-safari.jpg",
    rating: 4.7,
    duration: "12 Days",
    price: 5499,
    category: "Adventure",
    tag: "Adventure",
    tagColor: "bg-orange-500",
    description: "Witness the majesty of Africa's wildlife on an unforgettable safari through the savanna.",
  },
  {
    id: 6,
    name: "Kyoto, Japan",
    image: "/images/destination-japan.jpg",
    rating: 4.8,
    duration: "9 Days",
    price: 3199,
    category: "City",
    tag: "Cultural",
    tagColor: "bg-pink-500",
    description: "Journey through ancient temples, cherry blossoms, and the timeless beauty of Japanese tradition.",
  },
];

const categories = ["All", "Beach", "City", "Adventure"];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState<number[]>([]);

  const filtered = activeCategory === "All"
    ? destinations
    : destinations.filter((d) => d.category === activeCategory);

  const toggleLike = (id: number) =>
    setLiked((prev) => prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]);

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            Top Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
              Popular Places
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Hand-picked destinations offering unforgettable experiences for every type of traveler.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-4 left-4 ${dest.tagColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                  {dest.tag}
                </span>
                <button
                  onClick={() => toggleLike(dest.id)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      liked.includes(dest.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-sm font-medium">
                  <MapPin className="w-4 h-4 text-sky-300" />
                  {dest.name}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-slate-800">{dest.rating}</span>
                    <span className="text-xs text-slate-400">(Reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {dest.duration}
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-5">{dest.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">From</span>
                    <div className="text-2xl font-extrabold text-slate-900">
                      ${dest.price.toLocaleString()}
                      <span className="text-sm font-normal text-slate-400"> /person</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-sky-200 transition-all duration-300 hover:-translate-y-0.5">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-sky-500 text-sky-600 font-semibold px-8 py-3 rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}
