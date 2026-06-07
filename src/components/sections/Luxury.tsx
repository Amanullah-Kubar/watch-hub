import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

function Luxury() {

    return (
        <>
            <section className="py-16 px-6 text-center"
                data-aos="fade-up"
            >
                <h3 className="text-3xl md:text-4xl font-serif text-[#F8F5F0] mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    The Essence of Luxury
                </h3>
                <section className="bg-[#0B0B0B] py-24 px-6 md:px-14">


                    <div className=" flex flex-wrap justify-center gap-8 max-w-8xl mx-auto text-[#F8F5F0]/70 leading-7 text-sm md:text-base">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                            <div>
                                <p className="uppercase tracking-[0.3em] text-[#D6B98C] text-sm mb-3">
                                    WATCH-HUB
                                </p>

                                <h2
                                    style={{ fontFamily: "Nikanely" }}
                                    className="text-5xl md:text-7xl text-[#F8F5F0]"
                                >
                                    Featured Products
                                </h2>

                                <p className="text-gray-400 mt-5 max-w-2xl text-lg">
                                    Luxury-inspired timepieces designed to elevate your
                                    everyday style without the luxury markup. Humanity’s
                                    obsession with expensive wrist circles finally made
                                    economically reasonable.
                                </p>
                            </div>

                            <Link to="/collections/luxury" className="flex items-center gap-2 border border-[#D6B98C] text-[#D6B98C] px-6 py-3 rounded-full hover:bg-[#D6B98C] hover:text-black transition duration-300">
                                <button className="text-xs uppercase tracking-wider font-medium">
                                    View All
                                </button>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                        <ProductCard />
                    </div>
                </section>
            </section>



        </>
    )
}

export default Luxury
