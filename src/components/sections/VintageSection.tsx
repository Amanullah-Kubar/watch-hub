import {
    Heart,
    ShoppingBag,
    Eye,
    Star,
} from "lucide-react";

const vintageWatches = [
    {
        id: 1,
        name: "Heritage Gold",
        price: "RS: 149",
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Retro Classic",
        price: "RS: 129",
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Vintage Noir",
        price: "RS: 169",
        rating: 5.0,
        image:
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Royal Leather",
        price: "RS: 139",
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop",
    },
];

function VintageSection() {
    return (
        <section className="py-24 px-6 md:px-14 bg-[#0B0B0B] overflow-hidden">

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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

                {vintageWatches.map((watch) => (
                    <div
                        key={watch.id}
                        className="group relative bg-[#151515] rounded-4xl overflow-hidden border border-white/5 hover:border-[#D6B98C]/30 transition duration-500 shadow-2xl"
                    >

                        {/* Image */}
                        <div className="relative overflow-hidden">

                            <img
                                src={watch.image}
                                alt={watch.name}
                                className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            {/* Floating Actions */}
                            <div className="absolute top-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-500">

                                <button className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[#D6B98C] hover:text-black transition">
                                    <Heart size={18} />
                                </button>

                                <button className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[#D6B98C] hover:text-black transition">
                                    <Eye size={18} />
                                </button>

                            </div>

                            {/* Rating */}
                            <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full">

                                <Star
                                    size={16}
                                    className="fill-[#D6B98C] text-[#D6B98C]"
                                />

                                <span className="text-sm text-white">
                                    {watch.rating}
                                </span>

                            </div>

                        </div>

                        {/* Content */}
                        <div className="p-6">

                            <h3
                                style={{ fontFamily: "Nikanely" }}
                                className="text-3xl text-[#F8F5F0]"
                            >
                                {watch.name}
                            </h3>

                            <p className="text-[#D6B98C] text-2xl mt-2">
                                {watch.price}
                            </p>

                            <p className="text-[#F8F5F0]/50 mt-4 leading-7 text-sm">
                                Vintage-inspired craftsmanship designed for
                                refined everyday wear.
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-8">

                                <button className="flex-1 flex items-center justify-center gap-2 bg-[#D6B98C] text-black py-3 rounded-full font-medium hover:scale-[1.02] transition duration-300">
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </button>

                                <button className="w-14 flex items-center justify-center border border-[#D6B98C]/30 text-[#D6B98C] rounded-full hover:bg-[#D6B98C] hover:text-black transition duration-300">
                                    <Heart size={18} />
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
}

export default VintageSection;