import {
    ArrowRight,
    ShieldCheck,
    Truck,
    BadgeDollarSign,
    Clock3,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa";
export default function AboutSection() {
    return (
        <section className="bg-[#0B0B0B] text-white py-24 px-6 md:px-14 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>
                    <p className="uppercase tracking-[0.3em] text-[#D6B98C] text-sm mb-4">
                        ABOUT WATCH-HUB
                    </p>

                    <h2
                        style={{ fontFamily: "Nikanely" }}
                        className="text-5xl md:text-7xl leading-tight text-[#F8F5F0]"
                    >
                        Luxury Aesthetics
                        <span className="block text-[#D6B98C] italic mt-2">
                            Made Affordable
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed mt-8 max-w-2xl">
                        WATCH-HUB was built for people who appreciate timeless
                        watch designs without spending absurd amounts of money on
                        branding campaigns disguised as “heritage.” We focus on
                        elegant aesthetics, modern craftsmanship, and everyday
                        wearability.
                    </p>

                    <p className="text-gray-500 leading-relaxed mt-6">
                        Every collection is designed to combine luxury-inspired
                        visuals with practical pricing so style becomes
                        accessible without sacrificing sophistication.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
                        <div className="bg-[#151515] border border-white/5 rounded-3xl p-5 flex gap-4 items-start hover:border-[#D6B98C]/30 transition">
                            <ShieldCheck className="text-[#D6B98C]" size={28} />

                            <div>
                                <h4 className="text-lg font-medium text-[#F8F5F0]">
                                    Premium Quality
                                </h4>

                                <p className="text-gray-500 text-sm mt-1">
                                    Crafted with durable materials and refined
                                    finishing.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#151515] border border-white/5 rounded-3xl p-5 flex gap-4 items-start hover:border-[#D6B98C]/30 transition">
                            <Truck className="text-[#D6B98C]" size={28} />

                            <div>
                                <h4 className="text-lg font-medium text-[#F8F5F0]">
                                    Fast Delivery
                                </h4>

                                <p className="text-gray-500 text-sm mt-1">
                                    Reliable shipping designed for smooth
                                    customer experience.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#151515] border border-white/5 rounded-3xl p-5 flex gap-4 items-start hover:border-[#D6B98C]/30 transition">
                            <BadgeDollarSign
                                className="text-[#D6B98C]"
                                size={28}
                            />

                            <div>
                                <h4 className="text-lg font-medium text-[#F8F5F0]">
                                    Affordable Luxury
                                </h4>

                                <p className="text-gray-500 text-sm mt-1">
                                    Premium-inspired style without premium
                                    pricing.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#151515] border border-white/5 rounded-3xl p-5 flex gap-4 items-start hover:border-[#D6B98C]/30 transition">
                            <Clock3 className="text-[#D6B98C]" size={28} />

                            <div>
                                <h4 className="text-lg font-medium text-[#F8F5F0]">
                                    Timeless Design
                                </h4>

                                <p className="text-gray-500 text-sm mt-1">
                                    Minimal aesthetics designed for every
                                    occasion.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative">
                    {/* Main Image */}
                    <div className="relative overflow-hidden rounded-[40px] border border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop"
                            alt="Luxury Watch"
                            className="w-full h-175 object-cover hover:scale-105 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Floating Card */}
                        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 max-w-sm">
                            <p className="text-[#D6B98C] text-sm uppercase tracking-[0.2em]">
                                WATCH-HUB
                            </p>

                            <h3
                                style={{ fontFamily: "Nikanely" }}
                                className="text-3xl text-[#F8F5F0] mt-3"
                            >
                                Designed for Everyday Elegance
                            </h3>

                            <button className="mt-5 flex items-center gap-2 text-[#D6B98C] hover:gap-4 transition-all duration-300">
                                Explore Collections
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="border-t border-white/10 mt-24 pt-12 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div>
                    <h3
                        style={{ fontFamily: "Nikanely" }}
                        className="text-4xl text-[#F8F5F0]"
                    >
                        WATCH-HUB
                    </h3>

                    <p className="text-gray-500 mt-4 leading-relaxed">
                        Luxury-inspired watches designed for modern lifestyles
                        with timeless aesthetics and accessible pricing.
                    </p>

                    {/* Socials */}
                    <div className="flex gap-4 mt-6">
                        <button className="p-3 rounded-full bg-[#151515] border border-white/5 hover:bg-[#D6B98C] hover:text-black transition">
                            <FaFacebookF size={14} />
                        </button>

                        <button className="p-3 rounded-full bg-[#151515] border border-white/5 hover:bg-[#D6B98C] hover:text-black transition">
                            <FaInstagram size={14} />
                        </button>


                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-xl text-[#F8F5F0] mb-5">
                        Collections
                    </h4>

                    <ul className="space-y-3 text-gray-500">
                        <a href="#collections" className="hover:text-[#D6B98C] transition cursor-pointer">
                            <li>
                                Featured Collections
                            </li>
                        </a>

                        <a href="#vintage" className="hover:text-[#D6B98C] transition cursor-pointer">
                            <li>
                                Vintage Collection
                            </li>
                        </a>
                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Classic Watches
                        </li>

                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Modern Series
                        </li>

                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Leather Collection
                        </li>

                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Everyday Essentials
                        </li>

                        <a href="#about" className="hover:text-[#D6B98C] transition cursor-pointer">
                            <li>
                                About Us
                            </li>
                        </a>

                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-xl text-[#F8F5F0] mb-5">
                        Support
                    </h4>

                    <ul className="space-y-3 text-gray-500">
                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Contact Us
                        </li>

                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Shipping Policy
                        </li>

                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            Returns & Refunds
                        </li>

                        <li className="hover:text-[#D6B98C] transition cursor-pointer">
                            FAQs
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-xl text-[#F8F5F0] mb-5">
                        Stay Updated
                    </h4>

                    <p className="text-gray-500 mb-5">
                        Subscribe for latest arrivals and exclusive collections.
                    </p>

                    <div className="flex items-center bg-[#151515] rounded-full overflow-hidden border border-white/10">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-transparent px-5 py-4 outline-none flex-1 text-sm"
                        />

                        <button className="bg-[#D6B98C] text-black px-5 py-4 hover:opacity-90 transition">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}