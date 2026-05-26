import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Fleet from "../components/Fleet";
import PopularRoutes from "../components/PopularRoutes";
import TourPackages from "../components/TourPackages";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Fleet />
      <PopularRoutes />
      <TourPackages />
      <WhyChooseUs />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}