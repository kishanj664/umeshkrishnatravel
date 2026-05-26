import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User as UserIcon, ListChecks } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Fleet", path: "/fleet" },
    { name: "Tours", path: "/tours" },
    { name: "My Booking", path: "/book?tab=my" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.jpeg" alt="UK Travels" className="h-10 w-auto rounded-lg shadow-md object-contain" />
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
              UK<span className="text-gold">Travels</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.name === "My Booking" && !user) {
                    e.preventDefault();
                    setIsLoginModalOpen(true);
                  }
                }}
                className="text-sm font-medium text-white/90 hover:text-gold transition-colors"
              >
                {user?.role === 'owner' && link.name === 'My Booking' ? 'Owner Panel' : link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  <UserIcon className="w-4 h-4 text-gold" />
                  <span className="text-xs font-medium truncate max-w-[100px]">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-white/90 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-sm font-medium text-white/90 hover:text-gold transition-colors"
              >
                Sign In
              </button>
            )}
            <Link
              to="/book"
              className="bg-gold text-navy text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-navy/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-xl">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.name === "My Booking" && !user) {
                    e.preventDefault();
                    setIsLoginModalOpen(true);
                  }
                  setIsOpen(false);
                }}
                className="text-white font-medium text-left hover:text-gold transition-colors"
              >
                {user?.role === 'owner' && link.name === 'My Booking' ? 'Owner Panel' : link.name}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-white font-medium text-left hover:text-red-400 transition-colors"
              >
                Logout ({user.email})
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsOpen(false);
                }}
                className="text-white font-medium text-left hover:text-gold transition-colors"
              >
                Sign In
              </button>
            )}
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="bg-gold text-navy text-sm font-semibold px-5 py-2.5 rounded-full text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}