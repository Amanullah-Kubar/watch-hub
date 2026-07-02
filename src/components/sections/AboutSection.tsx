// AboutSection.tsx
//
// Matches Stile design system:
//   bg:        #FFFFFF / #F8F5F0
//   dark:      #1A2320
//   accent:    #4A7C6B  (Deep Forest Green — Theme C)
//   panel:     #C8D8D0
//   serif:     Georgia
//   tracking:  tight headings, wide labels

import { ArrowRight, ShieldCheck, Truck, BadgeDollarSign, Clock3 } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    desc: "Crafted with durable materials and refined finishing on every piece.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Reliable shipping designed for a smooth, worry-free experience.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Luxury",
    desc: "Premium-inspired style without the inflated heritage price tag.",
  },
  {
    icon: Clock3,
    title: "Timeless Design",
    desc: "Minimal aesthetics that hold up — on the wrist, in every room.",
  },
];

export default function AboutSection() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ background: "#F8F5F0" }}
      aria-label="About Stile"
    >
      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-8 py-24 md:px-16 lg:grid-cols-2 lg:items-center">

        {/* ── Left — text ─────────────────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <p
            className="mb-5 text-[10px] tracking-[0.45em] uppercase font-medium"
            style={{ color: "#4A7C6B" }}
          >
            About Stile
          </p>

          {/* Headline */}
          <h2
            className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight"
            style={{ fontFamily: "Georgia, serif", color: "#1A2320" }}
          >
            Luxury Aesthetics
            <span
              className="block italic mt-1"
              style={{ color: "#4A7C6B" }}
            >
              Made Affordable
            </span>
          </h2>

          {/* Hairline */}
          <div
            className="my-8"
            style={{
              height: "1px",
              width: "64px",
              background: "#4A7C6B",
            }}
          />

          {/* Body copy */}
          <p
            className="text-base leading-relaxed max-w-lg"
            style={{ color: "#1A2320", opacity: 0.65 }}
          >
            Stile was built for people who appreciate timeless watch design
            without spending absurd sums on branding disguised as "heritage."
            We focus on elegant aesthetics, modern craftsmanship, and
            everyday wearability.
          </p>

          <p
            className="mt-5 text-sm leading-relaxed max-w-lg"
            style={{ color: "#1A2320", opacity: 0.45 }}
          >
            Every collection combines luxury-inspired visuals with practical
            pricing — so style becomes accessible without sacrificing
            sophistication.
          </p>

          {/* ── Feature cards ──────────────────────────────────────────── */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group flex gap-4 items-start p-5 transition-colors duration-200"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #C8D8D0",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#4A7C6B";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#C8D8D0";
                }}
              >
                <Icon
                  size={22}
                  style={{ color: "#4A7C6B", flexShrink: 0, marginTop: "2px" }}
                />
                <div>
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#1A2320" }}
                  >
                    {title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#1A2320", opacity: 0.5 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — image ────────────────────────────────────────────── */}
        <div className="relative">
          {/* Sage background block — offset decorative panel */}
          <div
            className="absolute -top-8 -right-8 bottom-8 left-8 -z-0"
            style={{ background: "#C8D8D0" }}
          />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ zIndex: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop"
              alt="Stile luxury watch on wrist"
              className="w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              style={{ height: "560px" }}
            />

            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,35,32,0.80) 0%, rgba(26,35,32,0.10) 50%, transparent 100%)",
              }}
            />

            {/* Floating card */}
            <div
              className="absolute bottom-8 left-8 right-8 p-6 max-w-xs"
              style={{
                background: "rgba(26,35,32,0.72)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(200,216,208,0.15)",
              }}
            >
              <p
                className="text-[9px] tracking-[0.4em] uppercase mb-3"
                style={{ color: "#4A7C6B" }}
              >
                Stile
              </p>
              <h3
                className="text-2xl font-semibold leading-snug mb-4"
                style={{ fontFamily: "Georgia, serif", color: "#F8F5F0" }}
              >
                Designed for Everyday Elegance
              </h3>
              <button
                className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:gap-4"
                style={{ color: "#C8D8D0" }}
              >
                Explore Collections
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}