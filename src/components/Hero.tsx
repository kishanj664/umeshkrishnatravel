import { useState } from "react";
import { MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { locations } from "../data/routes";
import { vehicles } from "../data/vehicles";

export default function Hero() {
  const [bookingType, setBookingType] = useState("one_way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const bookingTypes = [
    { id: "one_way", label: "One Way" },
    { id: "round_trip", label: "Round Trip" },
    { id: "local", label: "Local" },
    { id: "airport", label: "Airport" },
    { id: "tour", label: "Tour" }
  ];

  const getQuote = () => {
    alert(`Quote request sent!\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nVehicle: ${vehicleType || "Any"}\n\nOur team will contact you shortly at 9353075628`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/tours/murudeshwar.jpg"
          alt="Murudeshwar Temple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
      </div>

      <div className="relative z-10 w-full px-6 py-32 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <img src="/logo.jpeg" alt="UK Travels" className="h-24 w-auto mx-auto mb-6 drop-shadow-2xl" />
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            Your Trusted Travel Partner
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
            UMESH KRISHNA{" "}
            <span className="text-gold">
              TRAVELS
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            Your Trusted Travel Partner in Udupi & Manipal
          </p>
          <p className="text-md text-gold font-medium">
            Well-Maintained Vehicles for All Your Travel Needs
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {bookingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setBookingType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  bookingType === type.id
                    ? "bg-gold text-navy"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-slate-400 uppercase">From</p>
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent outline-none"
                >
                  <option value="">Select Pickup</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-slate-400 uppercase">To</p>
                <select
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent outline-none"
                >
                  <option value="">Select Drop</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <Calendar className="w-5 h-5 text-gold shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-slate-400 uppercase">Date</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <Clock className="w-5 h-5 text-gold shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-slate-400 uppercase">Time</p>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <Users className="w-5 h-5 text-gold shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-slate-400 uppercase">Vehicle</p>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent outline-none"
                >
                  <option value="">Any Vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={getQuote}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-light text-navy font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Quote
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#services"
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Explore Services</span>
            <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>

      <a
        href="tel:9353075628"
        className="call-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 2.58 3.7 2.17 4.14 1.92 4.76 1.92 5.44 1.92 11.22 6.78 16.08 12.74 16.08c.68 0 1.3-.25 1.74-.69l.7-.7c.55-.56.88-1.31.88-2.14 0-.54-.45-.99-.99-.99h-.01z"/>
        </svg>
      </a>

      <a
        href="https://wa.me/919353075628"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </section>
  );
}