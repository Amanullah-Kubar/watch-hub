
import {
    Heart,
    ShoppingBag,
    Eye,
    Star,
} from "lucide-react";

const products = [
    {
        id: 1,
        name: "Royal Chrono",
        price: "RS: 89",
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Midnight Elite",
        price: "RS: 99",
        rating: 4.9,
        image:
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Leather Prestige",
        price: "RS: 79",
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Silver Horizon",
        price: "RS: 109",
        rating: 5.0,
        image:
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function ProductSection() {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {products.map((product) => (
            <div
            data-aos="zoom-in-up"
            data-aos-delay="300" // Staggered delay based on product ID
                key={product.id}
                className="group bg-[#151515] rounded-[30px] overflow-hidden border border-white/5 hover:border-[#D6B98C]/30 transition duration-500 shadow-2xl"
            >
                {/* Image Area */}
                <div className="relative overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-95 object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Floating Buttons */}
                    <div className="absolute top-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-500">
                        <button className="bg-black/60 backdrop-blur-md p-3 rounded-full text-white hover:bg-[#D6B98C] hover:text-black transition">
                            <Heart size={18} />
                        </button>

                        <button className="bg-black/60 backdrop-blur-md p-3 rounded-full text-white hover:bg-[#D6B98C] hover:text-black transition">
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
                            {product.rating}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3
                                style={{ fontFamily: "Nikanely" }}
                                className="text-3xl text-[#F8F5F0]"
                            >
                                {product.name}
                            </h3>

                            <p className="text-[#D6B98C] text-2xl mt-2">
                                {product.price}
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[#D6B98C] text-black py-3 rounded-full font-medium hover:scale-[1.02] transition duration-300">
                            <ShoppingBag size={18} />
                            Add to Cart
                        </button>

                        <button className="w-14 flex items-center justify-center border border-[#D6B98C]/40 text-[#D6B98C] rounded-full hover:bg-[#D6B98C] hover:text-black transition duration-300">
                            <Heart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>

    );
}