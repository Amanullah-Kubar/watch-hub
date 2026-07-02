// Collection.tsx
//
// Stile — Collection page
// Theme C: Deep Forest Green
//   bg:       #F8F5F0
//   dark:     #1A2320
//   accent:   #4A7C6B
//   panel:    #C8D8D0
//   card bg:  #FFFFFF

import React, { useState } from "react";
import { Heart, ShoppingBag, Eye, Star, ArrowLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Watch {
  id: string;
  name: string;
  collection: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  tag?: "New" | "Sale" | "Limited";
  image: string;
}

// ── Collections data ──────────────────────────────────────────────────────────
const collectionsData: Record<string, Watch[]> = {
  ironworks: [
    { id: "iw1", name: "CALEA", collection: "Ironworks", price: 1499, originalPrice: 2100, rating: 4.9, reviews: 128, tag: "New",     image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80" },
    { id: "iw2", name: "VERON", collection: "Ironworks", price: 1199,                    rating: 4.8, reviews: 94,                   image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80" },
    { id: "iw3", name: "ASHEZ", collection: "Ironworks", price: 399,  originalPrice: 599, rating: 5.0, reviews: 210, tag: "Sale",    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80" },
    { id: "iw4", name: "FORGE", collection: "Ironworks", price: 899,                    rating: 4.7, reviews: 61,                   image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80" },
    { id: "iw5", name: "DURAL", collection: "Ironworks", price: 1099,                   rating: 4.8, reviews: 77,  tag: "Limited",  image: "https://images.unsplash.com/photo-1624776289839-6ab6e9dcc3b4?w=800&q=80" },
    { id: "iw6", name: "CREST", collection: "Ironworks", price: 1349,                   rating: 4.6, reviews: 43,                   image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80" },
  ],
  sport: [
    { id: "sp1", name: "MANARO", collection: "Sport", price: 1199,                   rating: 4.7, reviews: 185, tag: "New",     image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80" },
    { id: "sp2", name: "TEMPO",  collection: "Sport", price: 849,                    rating: 4.8, reviews: 102,                  image: "https://images.unsplash.com/photo-1548171915-f68c747cbf26?w=800&q=80" },
    { id: "sp3", name: "APEX",   collection: "Sport", price: 699, originalPrice: 999, rating: 4.6, reviews: 78,  tag: "Sale",   image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80" },
    { id: "sp4", name: "TRACK",  collection: "Sport", price: 599,                    rating: 4.5, reviews: 55,                  image: "https://images.unsplash.com/photo-1598531546012-8aded5f18cb0?w=800&q=80" },
    { id: "sp5", name: "DELTA",  collection: "Sport", price: 979,                    rating: 4.9, reviews: 39,  tag: "Limited", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80" },
    { id: "sp6", name: "SURGE",  collection: "Sport", price: 749,                    rating: 4.7, reviews: 63,                  image: "https://images.unsplash.com/photo-1533139143976-30918502d57a?w=800&q=80" },
  ],
  italian: [
    { id: "it1", name: "ROMANO", collection: "Italian", price: 2299,                    rating: 5.0, reviews: 47,  tag: "Limited", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80" },
    { id: "it2", name: "LUCE",   collection: "Italian", price: 1799,                    rating: 4.9, reviews: 82,                  image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&q=80" },
    { id: "it3", name: "VENTI",  collection: "Italian", price: 1499,                    rating: 4.8, reviews: 66,  tag: "New",     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
    { id: "it4", name: "MARE",   collection: "Italian", price: 2099,                    rating: 4.9, reviews: 51,                  image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80" },
    { id: "it5", name: "SOLE",   collection: "Italian", price: 1899, originalPrice: 2400, rating: 4.7, reviews: 38, tag: "Sale",   image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=80" },
    { id: "it6", name: "AURA",   collection: "Italian", price: 2599,                    rating: 4.8, reviews: 29,                  image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80" },
  ],
  gold: [
    { id: "go1", name: "BLING",  collection: "Gold", price: 1999, originalPrice: 2800, rating: 4.8, reviews: 93,  tag: "Sale",    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
    { id: "go2", name: "AURUM",  collection: "Gold", price: 3499,                      rating: 4.9, reviews: 41,  tag: "Limited", image: "https://images.unsplash.com/photo-1533139143976-30918502d57a?w=800&q=80" },
    { id: "go3", name: "LUXE",   collection: "Gold", price: 2799,                      rating: 4.7, reviews: 68,                  image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80" },
    { id: "go4", name: "REGAL",  collection: "Gold", price: 4199,                      rating: 5.0, reviews: 22,  tag: "New",     image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80" },
    { id: "go5", name: "CROWN",  collection: "Gold", price: 2499,                      rating: 4.8, reviews: 57,                  image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80" },
    { id: "go6", name: "GILDED", collection: "Gold", price: 3199,                      rating: 4.9, reviews: 34,                  image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80" },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const TAG_STYLE: Record<string, React.CSSProperties> = {
  New:     { background: "#C8D8D0", color: "#1A2320" },
  Sale:    { background: "#4A7C6B", color: "#F8F5F0" },
  Limited: { background: "#1A2320", color: "#F8F5F0" },
};

function formatHeading(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ── WatchCard ─────────────────────────────────────────────────────────────────
function WatchCard({
  watch,
  isFav,
  onToggleFav,
}: {
  watch: Watch;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#EEF3F1", aspectRatio: "3/4" }}
      >
        <img
          src={watch.image}
          alt={watch.name}
          className="h-full w-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          draggable={false}
        />

        {/* Tag */}
        {watch.tag && (
          <span
            className="absolute top-3 left-3 px-2 py-[3px] text-[9px] font-bold tracking-[0.2em] uppercase"
            style={TAG_STYLE[watch.tag]}
          >
            {watch.tag}
          </span>
        )}

        {/* Action buttons — slide in on hover */}
        <div
          className="absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(8px)",
          }}
        >
          <button
            onClick={onToggleFav}
            aria-label="Wishlist"
            className="flex h-9 w-9 items-center justify-center transition-colors duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid #C8D8D0",
              color: isFav ? "#4A7C6B" : "#1A2320",
            }}
          >
            <Heart size={15} fill={isFav ? "#4A7C6B" : "none"} stroke="currentColor" />
          </button>
          <button
            aria-label="Quick view"
            className="flex h-9 w-9 items-center justify-center transition-colors duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid #C8D8D0",
              color: "#1A2320",
            }}
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Quick add — slide up on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 hidden md:block transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <button
            className="flex w-full items-center justify-center gap-2 py-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-200"
            style={{ background: "#1A2320", color: "#F8F5F0" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#4A7C6B")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#1A2320")
            }
          >
            <ShoppingBag size={13} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2 px-1">
        {/* Name + price row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="text-sm font-semibold tracking-tight transition-colors duration-200"
            style={{
              fontFamily: "Georgia, serif",
              color: hovered ? "#4A7C6B" : "#1A2320",
            }}
          >
            {watch.name}
          </h3>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-semibold" style={{ color: "#1A2320" }}>
              ${watch.price.toLocaleString()}
            </span>
            {watch.originalPrice && (
              <span
                className="block text-[11px] line-through"
                style={{ color: "#1A2320", opacity: 0.35 }}
              >
                ${watch.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star size={11} fill="#4A7C6B" stroke="#4A7C6B" />
          <span className="text-[11px]" style={{ color: "#1A2320", opacity: 0.5 }}>
            {watch.rating.toFixed(1)} · {watch.reviews} reviews
          </span>
        </div>

        {/* Mobile CTA */}
        <button
          className="md:hidden mt-3 flex w-full items-center justify-center gap-2 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase"
          style={{
            border: "1px solid #1A2320",
            color: "#1A2320",
          }}
        >
          <ShoppingBag size={12} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ── Collection Page ───────────────────────────────────────────────────────────
export default function Collection(): React.JSX.Element {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { collectionName } = useParams<{ collectionName: string }>();

  const slug = collectionName?.toLowerCase() ?? "";
  const watches = collectionsData[slug];

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ── 404 state ───────────────────────────────────────────────────────────────
  if (!watches) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-6"
        style={{ background: "#F8F5F0" }}
      >
        <p
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: "#4A7C6B" }}
        >
          Collection not found
        </p>
        <h2
          className="text-4xl font-semibold"
          style={{ fontFamily: "Georgia, serif", color: "#1A2320" }}
        >
          Nothing here yet.
        </h2>
        <Link
          to="/"
          className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase transition-colors duration-200"
          style={{ color: "#4A7C6B" }}
        >
          <ArrowLeft size={14} />
          Back to collections
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F8F5F0" }}
    >
      {/* ── Hero banner ──────────────────────────────────────────────────────── */}
      <div
        className="w-full"
        style={{ background: "#1A2320", paddingTop: "60px" /* navbar height */ }}
      >
        <div className="mx-auto max-w-7xl px-8 md:px-16 py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            {/* Breadcrumb */}
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
              style={{ color: "rgba(200,216,208,0.5)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#C8D8D0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,216,208,0.5)")
              }
            >
              <ArrowLeft size={12} />
              All Collections
            </Link>

            <p
              className="mb-3 text-[10px] tracking-[0.45em] uppercase font-medium"
              style={{ color: "#4A7C6B" }}
            >
              Stile Collection
            </p>
            <h1
              className="text-5xl md:text-7xl font-semibold leading-none tracking-tight"
              style={{ fontFamily: "Georgia, serif", color: "#F8F5F0" }}
            >
              {formatHeading(slug)}
            </h1>
          </div>

          {/* Right — item count */}
          <p
            className="text-sm"
            style={{ color: "rgba(248,245,240,0.35)", flexShrink: 0 }}
          >
            {watches.length} pieces
          </p>
        </div>

        {/* Bottom divider — sage hairline */}
        <div style={{ height: "1px", background: "#4A7C6B", opacity: 0.3 }} />
      </div>

      {/* ── Filter bar ───────────────────────────────────────────────────────── */}
      <div
        className="sticky top-[60px] z-40 w-full"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #C8D8D0",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 md:px-16 py-4">
          <div className="flex items-center gap-6">
            {["All", "New", "Sale", "Limited"].map((f) => (
              <button
                key={f}
                className="text-[10px] tracking-[0.3em] uppercase font-medium transition-colors duration-200"
                style={{ color: f === "All" ? "#1A2320" : "rgba(26,35,32,0.4)" }}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(26,35,32,0.4)" }}>
            Sort: Featured
          </p>
        </div>
      </div>

      {/* ── Product grid ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {watches.map((watch) => (
            <WatchCard
              key={watch.id}
              watch={watch}
              isFav={wishlist.includes(watch.id)}
              onToggleFav={() => toggleWishlist(watch.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA strip ─────────────────────────────────────────────────── */}
      <div
        className="w-full py-16 mt-8"
        style={{ background: "#C8D8D0" }}
      >
        <div className="mx-auto max-w-7xl px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "#4A7C6B" }}>
              Can't decide?
            </p>
            <h3
              className="text-3xl font-semibold"
              style={{ fontFamily: "Georgia, serif", color: "#1A2320" }}
            >
              Explore all collections
            </h3>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-200"
            style={{ background: "#1A2320", color: "#F8F5F0" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = "#4A7C6B")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = "#1A2320")
            }
          >
            View Catalog
            <ArrowLeft size={14} style={{ transform: "rotate(180deg)" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}