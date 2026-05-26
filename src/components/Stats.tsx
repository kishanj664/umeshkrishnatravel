import CountUp from "react-countup";

const stats = [
  { number: 100, suffix: "+", label: "Happy Customers" },
  { number: 1, suffix: "", label: "Reliable Vehicle" },
  { number: 5, suffix: "+", label: "Years Experience" },
  { number: 24, suffix: "/7", label: "Service" }
];

export default function Stats() {
  return (
    <section className="py-16 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                <CountUp end={stat.number} duration={2} separator="," />
                {stat.suffix}
              </div>
              <p className="text-white/60 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}