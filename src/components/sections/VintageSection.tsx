import UseReveal from "../hooks/UseReveal";
import ProductSection from "../ProductCard";
function VintageSection() {
    const ref = UseReveal();
    return (
        <section className="py-24 px-6 md:px-14 bg-[#0B0B0B] overflow-hidden"
            ref={ref}>

            {/* Heading */}
            <div className="text-center max-w-4xl mx-auto mb-20">

                <p className="uppercase tracking-[0.3em] text-[#D6B98C] text-sm mb-4">
                    WATCH-HUB
                </p>

                <h2
                    style={{ fontFamily: "Nikanely" }}
                    className="text-5xl md:text-7xl text-[#F8F5F0]"
                >
                    Vintage Vibes
                </h2>

                <p className="text-[#F8F5F0]/60 mt-8 leading-8 text-lg">
                    Discover vintage-inspired watches crafted with timeless
                    aesthetics and modern precision. Designed to capture
                    classic elegance while fitting effortlessly into
                    contemporary lifestyles.
                </p>
            </div>

            {/* Cards */}
            <div >

                <ProductSection />

            </div>
        </section>
    );
}

export default VintageSection;