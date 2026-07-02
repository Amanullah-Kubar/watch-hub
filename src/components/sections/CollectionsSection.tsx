import React from "react";
import { useNavigate } from "react-router-dom";

interface CollectionItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
}

const collections: CollectionItem[] = [
    {
        id: 1,
        title: "Classic",
        subtitle: "Timeless elegance for everyday sophistication.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Modern",
        subtitle: "Contemporary designs with a refined edge.",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Leather Series",
        subtitle: "Luxury-inspired watches crafted for daily wear.",
        image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Everyday Essentials",
        subtitle: "Affordable watches designed to elevate your style.",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function Collections(): React.JSX.Element {
    const navigate = useNavigate();

    // Helper function to turn "Leather Series" into "leather-series"
    const handleNavigation = (title: string): void => {
        const path = title.toLowerCase().replace(/\s+/g, "-");
        navigate(`/collections/${path}`);
    };

    return (
        <section className="w-full bg-[#0B0B0B] py-20 px-6 md:px-14"
        >
            {/* Heading */}
            <div className="text-center mb-16">
                <p className="text-[#D6B98C] uppercase tracking-[0.3em] text-sm mb-4">
                    WATCH-HUB
                </p>

                <h2
                    style={{ fontFamily: "Nikanely" }}
                    className="text-5xl md:text-7xl text-[#F8F5F0]"
                >
                    Featured Collections
                </h2>

                <p className="text-[rgba(248,245,240,0.6)] mt-6 max-w-2xl mx-auto text-base md:text-lg font-light">
                    Designed for modern lifestyles with timeless aesthetics and
                    luxury-inspired craftsmanship.
                </p>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {collections.map((item) => (
                    <div
                    data-aos="fade-up"
                        key={item.id}
                        className="group relative overflow-hidden rounded-3xl bg-[#151515] shadow-2xl border border-[rgba(255,255,255,0.05)]"
                    >
                        {/* Image */}
                        <div className="overflow-hidden aspect-16/10">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 md:p-10 z-10 w-full">
                            <h3
                                style={{ fontFamily: "Nikanely" }}
                                className="text-3xl md:text-4xl text-[#F8F5F0] cursor-pointer hover:text-[#D6B98C] transition-colors duration-300 inline-block"
                                onClick={() => handleNavigation(item.title)}
                            >
                                {item.title}
                            </h3>

                            <p className="text-[rgba(248,245,240,0.6)] mt-3 max-w-md text-sm md:text-base leading-relaxed font-light">
                                {item.subtitle}
                            </p>

                            <button 
                                onClick={() => handleNavigation(item.title)}
                                className="mt-6 px-6 py-3 border border-[#D6B98C] text-[#D6B98C] bg-transparent text-xs uppercase tracking-wider font-medium rounded-full transition duration-300 hover:bg-[#D6B98C] hover:text-[#0B0B0B]"
                            >
                                Explore Collection
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}