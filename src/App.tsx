import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import FleetPage from "./pages/FleetPage";
import ToursPage from "./pages/ToursPage";
import ContactPage from "./pages/ContactPage";
import BookPage from "./pages/BookPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Routes>
...
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/fleet" element={<FleetPage />} />
      <Route path="/tours" element={<ToursPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/book" element={<BookPage />} />
    </Routes>
  );
}