// CatalogSlider.tsx
//
// Infinite auto-scrolling collection rows for Stile.
// Each collection gets its own row; odd rows scroll left, even scroll right.
// Pure CSS animation — no JS scroll needed, zero layout jank.
//
// Theme C — Deep Forest Green
//   bg:       #1A2320
//   accent:   #4A7C6B
//   panel:    #C8D8D0
//   card bg:  #1F2B28
//   text:     #F8F5F0

import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";


// ── Types ─────────────────────────────────────────────────────────────────────
interface Watch {
    id: string;
    name: string;
    collection: string;
    price: string;
    tag?: "Sale" | "New" | "Limited";
    src: string;
}

interface Collection {
    slug: string;
    label: string;
    direction: "left" | "right";
    watches: Watch[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
// Replace `src` with your real product images.

// ── Tag colors ────────────────────────────────────────────────────────────────
const TAG_STYLE: Record<string, string> = {
    Sale: "bg-[#4A7C6B] text-[#F8F5F0]",
    New: "bg-[#C8D8D0] text-[#1A2320]",
    Limited: "bg-[#F8F5F0]/10 text-[#F8F5F0] border border-[#F8F5F0]/20",
};

// ── WatchCard ────────────────────────────────────────────────────────────────
function WatchCard({ watch }: { watch: Watch }) {
    return (
        <div
            className="group relative flex-shrink-0 cursor-pointer overflow-hidden"
            style={{
                width: "240px",
                marginRight: "24px",
                background: "#1F2B28",
            }}
        >
            {/* Image area */}
            <div
                className="relative overflow-hidden"
                style={{ height: "220px", background: "#243530" }}
            >
                <img
                    src={watch.src}
                    alt={watch.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                />

                {/* Tag */}
                {watch.tag && (
                    <span
                        className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase ${TAG_STYLE[watch.tag]}`}
                    >
                        {watch.tag}
                    </span>
                )}

                {/* Hover overlay — quick-shop hint */}
                <div className="absolute inset-0 flex items-end justify-center bg-[#1A2320]/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pb-5">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8D8D0] font-medium">
                        Quick View
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="px-4 py-4">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#4A7C6B]/70 mb-1">
                    {watch.collection}
                </p>
                <h3
                    className="text-[#F8F5F0] text-base font-semibold tracking-tight mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    {watch.name}
                </h3>
                <p className="text-[#C8D8D0] text-sm font-medium">RS: {watch.price}</p>
            </div>
        </div>
    );
}

// ── InfiniteRow ───────────────────────────────────────────────────────────────
function InfiniteRow({
    collection,
}: {
    collection: Collection;
}) {
    // Duplicate items to create seamless loop
    const items = [...collection.watches, ...collection.watches, ...collection.watches];
    const isLeft = collection.direction === "left";

    return (
        <div className="overflow-hidden" style={{ position: "relative" }}>
            {/* Edge fade masks */}
            <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10"
                style={{
                    width: "80px",
                    background: "linear-gradient(to right, #1A2320, transparent)",
                }}
            />
            <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10"
                style={{
                    width: "80px",
                    background: "linear-gradient(to left, #1A2320, transparent)",
                }}
            />

            {/* Scrolling track */}
            <div
                className={isLeft ? "catalog-scroll-left" : "catalog-scroll-right"}
                style={{
                    display: "flex",
                    width: "max-content",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                }}
                // Pause on hover
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
                }}
            >
                {items.map((watch, i) => (
                    <WatchCard key={`${watch.id}-${i}`} watch={watch} />
                ))}
            </div>
        </div>
    );
}

// ── Main CatalogSlider ────────────────────────────────────────────────────────
function Catalog() {
    const [collections, setCollections] = useState<Collection[]>([])

    const fetchWatches = async () => {
        const { data, error } = await supabase.from('catalog_view')
            .select('*')

        if (error) {
            alert(error)
            return
        }
        console.log('catalog data ', data)
        // group into collections
        const grouped: Record<string, Collection> = {};

        data?.forEach((p: any, index) => {
            const slug = p.collection_slug;

            if (!grouped[slug]) {
                grouped[slug] = {
                    slug,
                    label: p.collection_name,
                    direction: (index%2 === 0) ? "left" : "right",
                    watches: [],
                };
            }

            grouped[slug].watches.push({
                id: p.id,
                name: p.name,
                collection: p.collection_name,
                price: `₹${p.price}`,
                tag: p.tag,
                src: p.image_urls?.[0], // 👈 important
            });
        });

        setCollections(Object.values(grouped));
    }
    useEffect(() => {
        fetchWatches()
    }, [])
    return (
        <>
            {/* Keyframe injection */}
            <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-240px * 5 - 24px * 5)); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(calc(-240px * 5 - 24px * 5)); }
          100% { transform: translateX(0); }
        }
        .catalog-scroll-left {
          animation: scrollLeft 28s linear infinite;
        }
        .catalog-scroll-right {
          animation: scrollRight 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .catalog-scroll-left,
          .catalog-scroll-right {
            animation: none !important;
          }
        }
      `}</style>

            <section
                className="w-full py-24"
                style={{ background: "#1A2320" }}
                aria-label="Collections catalog"
            >
                {/* Section header */}
                <div className="mx-auto mb-16 max-w-7xl px-8 md:px-16">
                    <div className="flex items-end justify-between">
                        <div>
                            <p
                                className="mb-2 text-[10px] tracking-[0.4em] uppercase"
                                style={{ color: "#4A7C6B" }}
                            >
                                Our Collections
                            </p>
                            <h2
                                className="text-4xl md:text-5xl font-semibold tracking-tight"
                                style={{ fontFamily: "Georgia, serif", color: "#F8F5F0" }}
                            >
                                Catalog
                            </h2>
                        </div>
                        <a
                            href="#"
                            className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase transition-colors duration-200"
                            style={{ color: "#C8D8D0" }}
                        >
                            View all
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>

                    {/* Hairline rule */}
                    <div
                        className="mt-6"
                        style={{ height: "1px", background: "linear-gradient(to right, #4A7C6B40, transparent)" }}
                    />
                </div>

                {/* Collection rows */}
                <div className="flex flex-col gap-16">
                    {collections.map((col) => (
                        <div key={col.slug}>
                            {/* Row label */}
                            <div className="mx-auto mb-6 max-w-7xl px-8 md:px-16 flex items-center gap-4">
                                <span
                                    className="text-[10px] tracking-[0.4em] uppercase font-medium"
                                    style={{ color: "#4A7C6B" }}
                                >
                                    {col.label} Collection
                                </span>
                                <div
                                    className="flex-1"
                                    style={{ height: "1px", background: "#4A7C6B20" }}
                                />
                                <span
                                    className="text-[10px] tracking-[0.3em] uppercase cursor-pointer transition-colors duration-200 hover:opacity-100"
                                    style={{ color: "#C8D8D0", opacity: 0.5 }}
                                >
                                    Explore →
                                </span>
                            </div>

                            {/* Slider */}
                            <InfiniteRow collection={col} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Catalog;