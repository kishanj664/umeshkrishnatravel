import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award, Users, Car, Clock, Target, Eye, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-white/70 text-lg">Learn more about Umesh Krishna Travels</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/tours/udupi.webp"
                alt="Udupi Krishna Temple"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl font-bold text-navy mt-2 mb-6">Your Trusted Travel Partner</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Umesh Krishna Travels has been serving the people of Udupi, Manipal, and entire Karnataka with 
                premium transportation services for over a decade. We understand that travel is not just about 
                reaching a destination - it's about the experience along the way.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our fleet consists of well-maintained vehicles ranging from sedans to luxury buses, ensuring 
                we have the perfect vehicle for every type of travel requirement. With experienced drivers, 
                transparent pricing, and 24/7 customer support, we strive to make every journey memorable.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-7 h-7 text-gold" />
                  </div>
                  <p className="font-bold text-navy">5+ Years</p>
                  <p className="text-sm text-slate-500">Experience</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-7 h-7 text-gold" />
                  </div>
                  <p className="font-bold text-navy">100+</p>
                  <p className="text-sm text-slate-500">Customers</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Car className="w-7 h-7 text-gold" />
                  </div>
                  <p className="font-bold text-navy">1</p>
                  <p className="text-sm text-slate-500">Vehicle</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-7 h-7 text-gold" />
                  </div>
                  <p className="font-bold text-navy">4.8</p>
                  <p className="text-sm text-slate-500">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Mission</h3>
              <p className="text-slate-600">
                To provide safe, comfortable, and affordable travel solutions while maintaining the highest 
                standards of customer service. We aim to be the most trusted name in transportation across Karnataka.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Vision</h3>
              <p className="text-slate-600">
                To become the leading travel service provider in South India, known for reliability, 
                professionalism, and customer satisfaction. We envision expanding our services while 
                maintaining our core values.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy">Service Areas</h2>
            <p className="text-slate-600 mt-4">We operate across these locations in Karnataka</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Udupi", "Manipal", "Mangalore", "Mangalore Airport", "Kundapura", "Byndoor", "Kollur", "Murudeshwar", "Gokarna", "Dharmasthala", "Coorg", "Bangalore", "Mysore", "Goa"].map((city) => (
              <span key={city} className="bg-navy text-white px-6 py-3 rounded-full font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}