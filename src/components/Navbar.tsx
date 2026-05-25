import AboutSection from "./sections/AboutSection";
import Collections from "./sections/Collections";
import HeroSection from "./sections/HeroSection";
import Luxury from "./sections/Luxury";
import VintageSection from "./sections/VintageSection";

export default function Navbar() {
    return (
        <div className="min-h-screen bg-[#15120F] text-[#F8F5F0] overflow-hidden">
            {/* Background Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,185,140,0.12),transparent_35%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(107,79,58,0.18),transparent_40%)] pointer-events-none" />
            {/* Navbar */}
            <nav className="sticky top-0 z-50 px-6 md:px-10 py-5 backdrop-blur-xl border-b border-white/10 bg-[rgba(20,17,14,0.55)] shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-[#D6B98C] via-[#A67C52] to-[#6B4F3A] shadow-[0_4px_18px_rgba(214,185,140,0.35)] border border-white/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-px rounded-2xl bg-[linear-gradient(145deg,#3A2C22,#181310)]" />
                            <span className="relative text-sm font-bold tracking-[0.25em] text-[#F8F5F0]">
                                LX
                            </span>
                        </div>

                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold tracking-wide font-serif text-[#F8F5F0]">
                                Chronova
                            </h1>
                            <p className="text-[10px] tracking-[0.35em] uppercase text-[#D6B98C]/70">
                                Luxury Watches
                            </p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-10 text-sm tracking-wide">
                        {[
                            'Collections',
                            'Luxury',
                            'Vintage',
                            'Smart',
                            'About',
                        ].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative group text-[#F8F5F0]/75 hover:text-[#F8F5F0] transition-all duration-300"
                            >
                                {item}

                                <span className="absolute -bottom-2 left-0 h-px w-0 bg-linear-to-r from-[#D6B98C] to-[#A67C52] transition-all duration-300 group-hover:w-full shadow-[0_0_12px_rgba(214,185,140,0.6)]" />
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Search */}
                        <button className="group relative h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:border-[#D6B98C]/40 transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.3)] overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(214,185,140,0.18),transparent_70%)]" />

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="relative w-5 h-5 text-[#F8F5F0]/80"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>

                        {/* Cart */}
                        <button className="group relative h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:border-[#D6B98C]/40 transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.3)] overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(214,185,140,0.18),transparent_70%)]" />

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="relative w-5 h-5 text-[#F8F5F0]/80"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386a1.5 1.5 0 0 1 1.415 1.01L5.383 5.25m0 0h13.861a.75.75 0 0 1 .73.932l-1.5 6A.75.75 0 0 1 17.747 12H6.621m-1.238-6.75L6.621 12m0 0L5.25 18h12.75m-10.5 3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm10.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                        </button>

                        {/* CTA */}
                        <button className="relative overflow-hidden rounded-2xl px-6 py-3 text-sm tracking-wide font-medium border border-[#D6B98C]/25 bg-[linear-gradient(145deg,#2A211A,#16120F)] shadow-[0_6px_25px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(214,185,140,0.18)] group">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent,rgba(214,185,140,0.15),transparent)] -translate-x-full group-hover:translate-x-full" />

                            <span className="relative flex items-center gap-2 text-[#F8F5F0]">
                                Explore Collection
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Demo Hero */}
            <HeroSection />
            <div id='collections' >
                <Collections />
            </div>

            <div id='luxury' >
                <Luxury />
            </div>

            <div id='vintage' >
                <VintageSection />
            </div>
            <div id='about' >
                <AboutSection />
            </div>
        </div>
    )
}
