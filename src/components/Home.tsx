
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutSection from './sections/AboutSection';
import VintageSection from './sections/VintageSection';
import Luxury from './sections/Luxury';
import Collections from './sections/CollectionsSection';
import HeroSection from './sections/HeroSection';

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

            <div id='collections' data-aos="fade-up" data-aos-delay="150">
                <Collections />
            </div>

            <div id='luxury' data-aos="fade-up" data-aos-delay="200">
                <Luxury />
            </div>

            <div id='vintage' data-aos="zoom-in-up" data-aos-delay="200">
                <VintageSection />
            </div>

            <div id='about' data-aos="fade-up" data-aos-delay="300">
                <AboutSection />
            </div>
        </div>
    )
}

export default Home
