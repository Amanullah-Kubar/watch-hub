// Footer.tsx
//
// Stile site footer — Deep Forest Green theme (C)
// Sits on dark #1A2320 to create a deliberate section break from
// the light AboutSection above it.

import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const NAV = {
  Collections: [
    { label: "New Arrivals", href: "#" },
    { label: "Ironworks", href: "#" },
    { label: "Sport", href: "#" },
    { label: "Italian", href: "#" },
    { label: "Gold", href: "#" },
    { label: "About Us", href: "#about-us" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "FAQs", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: "#1A2320" }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16 py-20">

        {/* ── Top grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="/"
              className="text-2xl font-semibold tracking-tight lowercase"
              style={{ fontFamily: "Georgia, serif", color: "#F8F5F0" }}
            >
              stile<span style={{ color: "#4A7C6B" }}>.</span>
            </a>

            <p
              className="mt-5 text-sm leading-relaxed max-w-xs"
              style={{ color: "#F8F5F0", opacity: 0.4 }}
            >
              Luxury-inspired watches designed for modern lifestyles —
              timeless aesthetics, accessible pricing.
            </p>

            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {[
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaXTwitter, label: "X / Twitter" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(200,216,208,0.12)",
                    color: "#F8F5F0",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#4A7C6B";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#4A7C6B";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,216,208,0.12)";
                  }}
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="mb-6 text-[10px] tracking-[0.35em] uppercase font-medium"
              style={{ color: "#4A7C6B" }}
            >
              Collections
            </h4>
            <ul className="space-y-3">
              {NAV.Collections.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(248,245,240,0.45)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "#C8D8D0")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "rgba(248,245,240,0.45)")
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="mb-6 text-[10px] tracking-[0.35em] uppercase font-medium"
              style={{ color: "#4A7C6B" }}
            >
              Support
            </h4>
            <ul className="space-y-3">
              {NAV.Support.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(248,245,240,0.45)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "#C8D8D0")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "rgba(248,245,240,0.45)")
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="mb-6 text-[10px] tracking-[0.35em] uppercase font-medium"
              style={{ color: "#4A7C6B" }}
            >
              Stay Updated
            </h4>
            <p
              className="mb-5 text-sm leading-relaxed"
              style={{ color: "rgba(248,245,240,0.45)" }}
            >
              Subscribe for latest arrivals and exclusive offers. Save 10% on
              your first purchase.
            </p>

            {/* Input row */}
            <div
              className="flex items-stretch overflow-hidden"
              style={{ border: "1px solid rgba(200,216,208,0.15)" }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                style={{ color: "#F8F5F0" }}
              />
              <button
                className="flex items-center justify-center px-4 transition-colors duration-200"
                style={{ background: "#4A7C6B", color: "#F8F5F0" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#3D6A5A")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "#4A7C6B")
                }
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div
          className="mt-16 flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderTop: "1px solid rgba(200,216,208,0.10)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(248,245,240,0.25)" }}
          >
            © {new Date().getFullYear()} Stile. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(248,245,240,0.25)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "#C8D8D0")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "rgba(248,245,240,0.25)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}