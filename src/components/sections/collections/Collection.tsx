import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

interface Watch {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

// 1. Structure arrays indexed exactly by their clean URL slugs
const collectionsData: Record<string, Watch[]> = {
  "classic": [
    { id: 'c1', name: 'The Heritage Chrono', price: 189, rating: 4.9, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800' },
    { id: 'c2', name: 'Imperial Gold Minimalist', price: 215, rating: 4.8, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' },
    { id: 'c3', name: 'Midnight Oxford Leather', price: 165, rating: 5.0, image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=800' },
    { id: 'c4', name: 'The Sovereign Automatic', price: 249, rating: 4.9, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800' }
  ],
  "modern": [
    { id: 'm1', name: 'Minimalist Slate', price: 195, rating: 4.7, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800' }
  ],
  "leather-series": [
    { id: 'l1', name: 'Classic Tan Horizon', price: 175, rating: 4.9, image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&q=80&w=800' }
  ],
  "everyday-essentials": [
    { id: 'e1', name: 'The Daily Commuter', price: 120, rating: 4.6, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800' }
  ]
};

export default function Collection(): React.JSX.Element {
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // 2. Extract route parameters
  const { collectionName } = useParams<{ collectionName: string }>();
  
  // Match the parameter against our collection datasets safely
  const currentSlug = collectionName?.toLowerCase() || "";
  const watches = collectionsData[currentSlug] || [];

  // Helper utility to turn "leather-series" into "Leather Series" cleanly for the heading
  const formatHeading = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toggleWishlist = (id: string): void => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 3. Fallback Layout if the collection path does not match anything valid
  if (!collectionsData[currentSlug]) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-[#F8F5F0] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-light">Collection Not Found</h2>
        <Link to="/" className="text-[#D6B98C] border-b border-[#D6B98C] pb-0.5 hover:text-[#F8F5F0] hover:border-[#F8F5F0] transition-colors">
          Return to featured selections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F8F5F0] font-sans antialiased selection:bg-[#D6B98C] selection:text-[#0B0B0B] relative overflow-hidden">
      {/* Decorative Cinematic Overlay */}
      <div className="absolute top-0 left-0 w-full h-125 bg-linear-to-b from-[#151515] to-transparent opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#F8F5F0] opacity-60 mb-4 font-medium">
            Curated Heritage
          </p>
          <h1 className="text-5xl md:text-7xl text-[#F8F5F0] tracking-wide mb-6 font-['Nikanely',serif]">
            {formatHeading(currentSlug)}
          </h1>
          <div className="h-px bg-[#D6B98C] mx-auto mb-6 w-15" />
          <p className="max-w-xl mx-auto text-sm md:text-base text-[rgba(248,245,240,0.6)] font-light leading-relaxed tracking-wide">
            Timeless craftsmanship tailored for modern daily wear. Experience high-end vintage aesthetics engineered without compromise.
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {watches.map((watch: Watch) => {
            const isFavorite = wishlist.includes(watch.id);
            return (
              <div 
                key={watch.id}
                className="group relative flex flex-col h-full"
              >
                {/* Image Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-[#151515] aspect-3/4 mb-5 border border-[rgba(255,255,255,0.05)] shadow-2xl">
                  
                  {/* Subtle Cinematic Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B0B0B]/70 via-transparent to-transparent opacity-80 z-10 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Pure CSS Slow Zoom Product Image */}
                  <img 
                    src={watch.image} 
                    alt={watch.name}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />

                  {/* Floating Action Menu (Quick View & Wishlist) */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 md:opacity-0 md:translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <button 
                      onClick={() => toggleWishlist(watch.id)}
                      className="p-3 rounded-full bg-[#0B0B0B]/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[#F8F5F0] hover:text-[#D6B98C] transition-colors duration-300"
                      aria-label="Add to wishlist"
                    >
                      <Heart 
                        size={16} 
                        fill={isFavorite ? "#D6B98C" : "none"} 
                        stroke={isFavorite ? "#D6B98C" : "currentColor"} 
                        className="transition-transform duration-200 active:scale-75" 
                      />
                    </button>
                    <button 
                      className="p-3 rounded-full bg-[#0B0B0B]/80 backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[#F8F5F0] hover:text-[#D6B98C] transition-colors duration-300"
                      aria-label="Quick view"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* Floating Quick Add Button for Desktop */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-[calc(100%-2rem)] md:opacity-0 md:translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden md:block">
                    <button className="w-full py-3 px-4 rounded-full bg-[#D6B98C] text-[#0B0B0B] font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#F8F5F0] active:scale-[0.98]">
                      <ShoppingBag size={14} />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="flex flex-col grow px-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sans text-base text-[#F8F5F0] font-normal tracking-wide group-hover:text-[#D6B98C] transition-colors duration-300">
                      {watch.name}
                    </h3>
                    <span className="font-sans text-base font-medium text-[#D6B98C]">
                      ${watch.price}
                    </span>
                  </div>

                  {/* Rating Display */}
                  <div className="flex items-center gap-1 mb-4 opacity-70">
                    <Star size={12} fill="#D6B98C" stroke="#D6B98C" />
                    <span className="text-xs text-[rgba(248,245,240,0.6)] pt-px">
                      {watch.rating.toFixed(1)} / 5.0
                    </span>
                  </div>

                  {/* Mobile-only Explicit Add to Cart Button */}
                  <div className="mt-auto md:hidden">
                    <button className="w-full py-2.5 rounded-full bg-transparent border border-[#D6B98C] text-[#D6B98C] font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300 active:bg-[#D6B98C]/10">
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}