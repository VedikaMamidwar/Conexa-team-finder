import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Trusted from "../components/landing/Trusted";
import Features from "../components/landing/Features";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import HowItWorks from "../components/landing/HowItWorks";
import Statistics from "../components/landing/Statistics";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";
import FindTeammatesPreview from "../components/landing/FindTeammatesPreview";

export default function Landing() {
    return (
        <div className="bg-slate-50 text-slate-900">
            <Navbar />

            <Hero />

            <Trusted />

            <Features />

            <DashboardShowcase />

            <HowItWorks />

            <Statistics />

            <Testimonials />

            <FindTeammatesPreview />

            <FAQ />

            <CTA />

            <Footer />
        </div>
    );
}