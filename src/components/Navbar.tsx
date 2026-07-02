// Navbar.tsx
import { useEffect, useRef, useState } from 'react';
import AuthWidget from './AuthWidget';
import CartModal from './CartModal';

// ─── Color theme options ───────────────────────────────────────────────────
// Option A (current warm gold):  bg=#FFFFFF  accent=#D6B98C  text=#1A1714
// Option B (cool slate):         bg=#FFFFFF  accent=#7B9EA8  text=#1C2127
// Option C (deep emerald):       bg=#FFFFFF  accent=#4A7C6B  text=#1A2320
// Option D (dusty rose):         bg=#FFFFFF  accent=#B8857A  text=#1F1919
// Pick one by setting THEME below:
const THEME = {
    // Warm gold — mirrors the reference design exactly
    bg: 'bg-white',
    border: 'border-[#B8857A]/20',
    logo: 'text-[#1F1919]',
    navLink: 'text-[#1A1714]/70 hover:text-[#1A1714]',
    iconStroke: 'stroke-[#1A1714]/70 hover:stroke-[#1A1714]',
    shadow: 'shadow-[0_2px_20px_rgba(0,0,0,0.06)]',
} as const;

const NAV_LINKS = ['Collection', 'Catalog', 'About Us', 'Blog'];

function Navbar() {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    const [cartOpen, setCartOpen] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    const currentY = window.scrollY;
                    if (currentY < 10) {
                        setVisible(true);
                    } else if (currentY > lastScrollY.current) {
                        // Scrolling down — hide
                        setVisible(false);
                    } else {
                        // Scrolling up — show
                        setVisible(true);
                    }
                    lastScrollY.current = currentY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={[
                    'fixed top-0 left-0 right-0 z-50',
                    THEME.bg,
                    THEME.border,
                    THEME.shadow,
                    'border-b',
                    'transition-transform duration-400 ease-in-out',
                    visible ? 'translate-y-0' : '-translate-y-full',
                ].join(' ')}
                style={{ transitionDuration: '380ms' }}
            >
                <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-6">

                    {/* Hamburger (mobile) */}
                    <button
                        aria-label="Menu"
                        className="flex flex-col gap-[5px] md:hidden"
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className={`block h-[1.5px] w-5 bg-current ${THEME.logo}`}
                            />
                        ))}
                    </button>

                    {/* Logo */}
                    <a
                        href="/"
                        className={`text-xl font-semibold tracking-tight hover:cursor-pointer lowercase ${THEME.logo}`}
                        style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}
                    >
                        Watch Hub<span className="text-[#D6B98C]">.</span>
                    </a>

                    {/* Center nav links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link}
                                href={`#${link.trim().toLowerCase().replace(/\s+/g, "-")}`}
                                className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${THEME.navLink}`}
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* Right icons */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <button aria-label="Search" className="p-1">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth={1.8}
                                className={`transition-colors duration-200 ${THEME.iconStroke}`}
                            >
                                <circle cx="11" cy="11" r="7" />
                                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                            </svg>
                        </button>

                        {/* Auth */}
                        <AuthWidget />

                        {/* Cart */}
                        <button aria-label="Cart" className="relative p-1"
                            onClick={() => { setCartOpen(true) }}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth={1.8}
                                className={`transition-colors duration-200 ${THEME.iconStroke}`}
                            >
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            {/* Cart badge */}
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D6B98C] text-[9px] font-bold text-white">

                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <CartModal
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            />

        </>
    );
}

export default Navbar;