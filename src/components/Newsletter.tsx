import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/5 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Get Exclusive Travel Deals
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Subscribe to our newsletter and be the first to receive handpicked deals, travel inspiration, and insider tips.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-white text-lg font-semibold">
            <CheckCircle className="w-7 h-7 text-green-300" />
            You're subscribed! Check your inbox for a welcome gift 🎁
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 px-6 py-4 rounded-xl outline-none focus:border-white/60 focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 justify-center hover:-translate-y-0.5 hover:shadow-lg"
            >
              Subscribe
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-white/50 text-sm mt-5">
          No spam, ever. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
