import FeaturedCategories from "../components/featured-categories";
import HeroSection from "../components/hero-section";
import HowItWorks from "../components/how-it-works";
import Navbar from "../components/navbar";
import ValueProposition from "../components/value-prop";

export default function LandingScreen() {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <HeroSection />
            <ValueProposition />
            <HowItWorks />
            <FeaturedCategories />
        </div>
    );
}
