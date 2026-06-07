import { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import Corosel from './Corosel';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ['Collections', 'Luxury', 'Vintage', 'About'];

    return (
        // Changed z-index here to z-50 so the container sits on top of the hero
        <div className="bg-[#15120F] text-[#F8F5F0] absolute top-0 left-0 w-full z-50">
            {/* Background Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,185,140,0.12),transparent_35%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(107,79,58,0.18),transparent_40%)] pointer-events-none" />

            {/* Navbar */}
            <nav className="relative px-4 md:px-10 py-5 backdrop-blur-xl border-b border-white/10 bg-[rgba(20,17,14,0.55)] shadow-[0_10px_35px_rgba(0,0,0,0.45)] z-50">
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

                    {/* Desktop Navigation & Search */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm tracking-wide">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative group text-[#F8F5F0]/75 hover:text-[#F8F5F0] transition-all duration-300"
                            >
                                {item}
                                <span className="absolute -bottom-2 left-0 h-px w-0 bg-linear-to-r from-[#D6B98C] to-[#A67C52] transition-all duration-300 group-hover:w-full shadow-[0_0_12px_rgba(214,185,140,0.6)]" />
                            </a>
                        ))}

                        {/* Desktop Search Bar */}
                        <div className="relative flex items-center max-w-xs group ms-2">
                            <input
                                type="text"
                                placeholder="Search timepieces..."
                                className="w-48 xl:w-56 bg-white/5 border border-white/10 text-xs pl-4 pr-10 py-2.5 rounded-xl text-[#F8F5F0] placeholder-[#F8F5F0]/40 outline-none focus:border-[#D6B98C]/40 focus:bg-white/10 transition-all duration-300"
                            />
                            <Search className="absolute right-3 w-4 h-4 text-[#F8F5F0]/50 group-focus-within:text-[#D6B98C] transition-colors duration-300" />
                        </div>
                    </div>

                    {/* Action Buttons & Hamburger */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Cart */}
                        <button className="group relative h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:border-[#D6B98C]/40 transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.3)] overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(214,185,140,0.18),transparent_70%)]" />
                            <ShoppingBag className="relative w-5 h-5 text-[#F8F5F0]/80 group-hover:text-[#F8F5F0] transition-colors duration-300" />
                        </button>

                        {/* CTA */}
                        <a href="#collections">
                            <button className="hidden sm:block relative overflow-hidden rounded-2xl px-5 py-3 text-sm tracking-wide font-medium border border-[#D6B98C]/25 bg-[linear-gradient(145deg,#2A211A,#16120F)] shadow-[0_6px_25px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(214,185,140,0.18)] group"

                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent,rgba(214,185,140,0.15),transparent)] -translate-x-full group-hover:translate-x-full" />
                                <span className="relative flex items-center gap-2 text-[#F8F5F0]">
                                    Explore Collection
                                </span>
                            </button>
                        </a>
                        <Corosel />

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden group relative h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center hover:border-[#D6B98C]/40 transition-all duration-300 shadow-[0_4px_18px_rgba(0,0,0,0.3)]"
                            aria-label={isOpen ? "Close Menu" : "Open Menu"}
                        >
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                <Menu className={`absolute w-5 h-5 text-[#F8F5F0]/80 transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'}`} />
                                <X className={`absolute w-5 h-5 text-[#F8F5F0]/80 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'}`} />
                            </div>
                        </button>
                    </div>
                </div>

            </nav>

            {/* Mobile Drawer Overlay - Moved out of <nav> and given fixed positioning parameters */}
            <div className={`lg:hidden fixed inset-0 h-screen bg-[#15120F]/98 backdrop-blur-2xl transition-all duration-500 ease-in-out border-b border-white/5 z-40 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <div className="flex flex-col pt-32 px-6 gap-6 max-w-md mx-auto">

                    {/* Mobile Search Bar */}
                    <div className="relative flex items-center w-full mb-4">
                        <input
                            type="text"
                            placeholder="Search luxury timepieces..."
                            className="w-full bg-white/5 border border-white/10 text-sm pl-4 pr-12 py-3 rounded-xl text-[#F8F5F0] placeholder-[#F8F5F0]/40 outline-none focus:border-[#D6B98C]/40 transition-all duration-300"
                        />
                        <Search className="absolute right-4 w-5 h-5 text-[#F8F5F0]/40" onClick={() => {
                            setIsOpen(!isOpen);
                        }} />
                    </div>

                    {/* Mobile Links */}
                    <div className="flex flex-col gap-4 text-center">
                        {navItems.map((item, idx) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                style={{ transitionDelay: `${isOpen ? idx * 50 : 0}ms` }}
                                className={`text-xl tracking-widest text-[#F8F5F0]/80 hover:text-[#D6B98C] transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                            >
                                {item}
                            </a>
                        ))}
                        <Corosel />
                    </div>

                    {/* Mobile Explore Button */}
                    <button className="sm:hidden mt-6 relative overflow-hidden rounded-xl py-3.5 text-sm tracking-wide font-medium border border-[#D6B98C]/25 bg-[linear-gradient(145deg,#2A211A,#16120F)] text-center text-[#F8F5F0]">
                        Explore Collection
                    </button>
                </div>
            </div>
        </div>
    );
}