import { Phone, Clock } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-navy text-white py-2 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <a href="tel:9353075628" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">9353075628</span>
          </a>
          <span className="text-white/30">|</span>
          <a href="tel:9535171753" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">9535171753</span>
          </a>
        </div>
        <div className="flex items-center gap-2 bg-red-accent px-3 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-semibold">24/7 Service Available</span>
        </div>
      </div>
    </div>
  );
}