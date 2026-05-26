import { Award, Users, Car, Clock } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
              Umesh Krishna Travels
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Welcome to Umesh Krishna Travels, your premier travel partner in Udupi & Manipal, Karnataka. 
              With over 10 years of experience in the transportation industry, we have established ourselves 
              as one of the most reliable cab service providers in the region.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our mission is to provide safe, comfortable, and affordable travel solutions to all our customers. 
              Whether you need a local taxi, outstation cab, airport transfer, or tour package, we've got you covered.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-navy">5+ Years</p>
                  <p className="text-sm text-slate-500">Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-navy">100+</p>
                  <p className="text-sm text-slate-500">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-navy">1</p>
                  <p className="text-sm text-slate-500">Vehicle</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-navy">24/7</p>
                  <p className="text-sm text-slate-500">Service</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/images/tours/kollur.jpg"
                alt="Kollur Mookambika"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="/images/tours/sringeri.jpg"
                alt="Sringeri Sharada Peetham"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="/images/tours/udupi.webp"
                alt="Udupi Krishna Temple"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="/images/tours/dharmasthala.jpg"
                alt="Dharmasthala Temple"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}