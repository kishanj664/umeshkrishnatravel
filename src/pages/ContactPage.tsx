import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We received your message and will contact you shortly at ${formData.phone}`);
    setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">We'd love to hear from you</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Phone</h3>
                    <p className="text-slate-600 mb-1">Call us for instant booking</p>
                    <a href="tel:9353075628" className="text-gold font-semibold hover:underline">+91 9353075628</a>
                    <p className="text-gold font-semibold">+91 9535171753</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Email</h3>
                    <p className="text-slate-600 mb-1">Send us your queries</p>
                    <a href="mailto:umeshkrishnatravels@gmail.com" className="text-gold font-semibold hover:underline">
                      umeshkrishnatravels@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Location</h3>
                    <p className="text-slate-600">Udupi & Manipal</p>
                    <p className="text-slate-500 text-sm">Karnataka, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">Service Hours</h3>
                    <p className="text-slate-600">24/7 - Always available</p>
                    <p className="text-slate-500 text-sm">Including holidays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-2">WhatsApp</h3>
                    <p className="text-slate-600">Chat with us</p>
                    <a 
                      href="https://wa.me/919353075628" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-500 font-semibold hover:underline"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-navy rounded-2xl">
                <h3 className="text-white font-bold text-xl mb-4">Emergency Booking?</h3>
                <p className="text-white/70 mb-6">
                  For immediate booking assistance, call us directly. We prioritize urgent requests.
                </p>
                <a
                  href="tel:9353075628"
                  className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold-light"
                >
                  <Phone className="w-5 h-5" />
                  Call Emergency Line
                </a>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Request</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-navy py-4 rounded-lg font-semibold hover:bg-gold-light transition-all"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}