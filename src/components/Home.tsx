
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutSection from './sections/AboutSection';
import VintageSection from './sections/VintageSection';
import Luxury from './sections/Footer';
import HeroSection from './sections/HeroSection';
import Catalog from './sections/Catalog';
import Footer from './sections/Footer';

function Home() {
    useEffect(() => {
        AOS.init({
            duration: 900,
            once: false,
            mirror: false,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }, []);
    return (
        <div className="min-h-screen bg-[#15120F] text-[#F8F5F0] overflow-hidden">
            <section data-aos="fade-up" data-aos-delay="100">
                <HeroSection />
            </section>

            <div id='catalog' data-aos="fade-up" data-aos-delay="150">
                <Catalog />
            </div>

            <div id='about-us' data-aos="fade-up" data-aos-delay="300">
                <AboutSection />
            </div>

            <div id='blog' data-aos="fade-up" data-aos-delay="200">
                <Footer />
            </div>
        </div>
    )
}

export default Home
