
const collections = [
    {
        id: 1,
        title: "Classic",
        subtitle: "Timeless elegance for everyday sophistication.",
        image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Modern",
        subtitle: "Contemporary designs with a refined edge.",
        image:
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Leather Series",
        subtitle: "Luxury-inspired watches crafted for daily wear.",
        image:
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Everyday Essentials",
        subtitle: "Affordable watches designed to elevate your style.",
        image:
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function Collections() {
    return (
        <section className="w-full bg-[#0F0F0F] py-20 px-6 md:px-14">
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

                <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                    Designed for modern lifestyles with timeless aesthetics and
                    luxury-inspired craftsmanship.
                </p>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {collections.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-3xl bg-[#1A1A1A] shadow-2xl"
                    >
                        {/* Image */}
                        <div className="overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-125 w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 md:p-10 z-10">
                            <h3
                                style={{ fontFamily: "Nikanely" }}
                                className="text-4xl md:text-5xl text-[#F8F5F0]"
                            >
                                {item.title}
                            </h3>

                            <p className="text-gray-300 mt-4 max-w-md leading-relaxed">
                                {item.subtitle}
                            </p>

                            <button className="mt-6 px-6 py-3 border border-[#D6B98C] text-[#D6B98C] rounded-full transition duration-300 hover:bg-[#D6B98C] hover:text-black">
                                Explore Collection
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}