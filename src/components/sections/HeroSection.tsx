// HeroSection.tsx
//
// ─── COLOR THEME OPTIONS ────────────────────────────────────────────────────
//
//  THEME A — "Warm Sand" (matches reference design)
//    accent panel bg : #F5E6C8   text-dark : #1A1714   gold : #D6B98C
//
//  THEME B — "Cool Fog"
//    accent panel bg : #D8E4EC   text-dark : #1C2127   blue : #7B9EA8
//
//  THEME C — "Deep Forest"
//    accent panel bg : #C8D8D0   text-dark : #1A2320   green : #4A7C6B
//
//  THEME D — "Dusty Rose"
//    accent panel bg : #EDD5CE   text-dark : #1F1919   rose : #B8857A
//
//  To switch: change the `THEME` constant below.
// ────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { supabase } from '../../config/supabase';

// ── Theme config ─────────────────────────────────────────────────────────────
const THEMES = {
    A: {
        panelBg: '#F5E6C8',       // warm sand — reference design
        accent: '#D6B98C',
        textDark: '#1A1714',
        btnPrimary: 'bg-[#1A1714] text-[#F8F5F0] hover:bg-[#2E2620]',
        btnSecondary:
            'border border-[#1A1714]/30 text-[#1A1714]/70 hover:border-[#1A1714] hover:text-[#1A1714]',
        badge: 'bg-[#1A1714] text-[#F5E6C8]',
        dotActive: 'bg-[#1A1714]',
        dotInactive: 'bg-[#1A1714]/25',
        label: 'text-[#1A1714]/50',
    },
    B: {
        panelBg: '#D8E4EC',
        accent: '#7B9EA8',
        textDark: '#1C2127',
        btnPrimary: 'bg-[#1C2127] text-white hover:bg-[#2C3540]',
        btnSecondary:
            'border border-[#1C2127]/30 text-[#1C2127]/70 hover:border-[#1C2127] hover:text-[#1C2127]',
        badge: 'bg-[#1C2127] text-[#D8E4EC]',
        dotActive: 'bg-[#1C2127]',
        dotInactive: 'bg-[#1C2127]/25',
        label: 'text-[#1C2127]/50',
    },
    C: {
        panelBg: '#C8D8D0',
        accent: '#4A7C6B',
        textDark: '#1A2320',
        btnPrimary: 'bg-[#1A2320] text-white hover:bg-[#243530]',
        btnSecondary:
            'border border-[#1A2320]/30 text-[#1A2320]/70 hover:border-[#1A2320] hover:text-[#1A2320]',
        badge: 'bg-[#1A2320] text-[#C8D8D0]',
        dotActive: 'bg-[#1A2320]',
        dotInactive: 'bg-[#1A2320]/25',
        label: 'text-[#1A2320]/50',
    },
    D: {
        panelBg: '#EDD5CE',
        accent: '#B8857A',
        textDark: '#1F1919',
        btnPrimary: 'bg-[#1F1919] text-white hover:bg-[#2E2626]',
        btnSecondary:
            'border border-[#1F1919]/30 text-[#1F1919]/70 hover:border-[#1F1919] hover:text-[#1F1919]',
        badge: 'bg-[#1F1919] text-[#EDD5CE]',
        dotActive: 'bg-[#1F1919]',
        dotInactive: 'bg-[#1F1919]/25',
        label: 'text-[#1F1919]/50',
    },
} as const;

// ← Change 'A' to 'B', 'C', or 'D' to switch theme
const THEME = THEMES['B'];
interface Product {
    id: string
    name: string
    slug: string
    tag: string
    image_urls: string[]
    price: number
    original_price: number | null
    collections: {
        name: string
        slug: string
    } | null
}



const INTERVAL_MS = 4000;

function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const product = products[current];
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select(`
            *,
            collections:collections!products_collection_id_fkey (
                name,
                slug
            )
            `)    
            .eq("tag", "Sale");
        if (error) {
            console.error(error.message)
            return
        }
        console.log(data)
        setProducts(data ?? [])
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    // ── Initial entrance animation ────────────────────────────────────────────
    useGSAP(
        () => {
            const tl = gsap.timeline({ delay: 0.2 });
            tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
                .from('.hero-name', { y: 60, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.3')
                .from('.hero-collection', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
                .from('.hero-price', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
                .from('.hero-btns', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
                .from('.hero-image', { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=1');
        },
        { scope: heroRef }
    );

    // ── Product transition animation ──────────────────────────────────────────
    const goTo = (index: number) => {
        if (transitioning || index === current) return;
        setTransitioning(true);

        // Fade out current
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrent(index);
                setTransitioning(false);
            },
        });

        tl.to('.hero-image', { x: -40, opacity: 0, duration: 0.35, ease: 'power2.in' })
            .to(
                ['.hero-name', '.hero-collection', '.hero-price', '.hero-label'],
                { y: -20, opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.04 },
                '<'
            );
    };

    // After current changes — animate in
    useEffect(() => {
        if (transitioning) return;
        const tl = gsap.timeline();
        tl.fromTo('.hero-image', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
            .fromTo(
                ['.hero-label', '.hero-name', '.hero-collection', '.hero-price'],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
                '<0.1'
            )
            .fromTo('.hero-btns', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');
    }, [current]);

    // ── Auto-advance interval ─────────────────────────────────────────────────
    useEffect(() => {
        if (products.length === 0) return;

        intervalRef.current = setInterval(() => {
            goTo((current + 1) % products.length);
        }, INTERVAL_MS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [current, products.length]);

    // Reset interval on manual nav
    const handleDotClick = (i: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        goTo(i);
        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, INTERVAL_MS);
    };
    if (!product) {
        return <div>Loading...</div>;
    } else
        return (
            <section
                ref={heroRef}
                className="relative w-full overflow-hidden bg-white"
                style={{ minHeight: '100vh', paddingTop: '60px' /* navbar height */ }}
            >
                {/* ── Layout: left text / right image panel ─────────────────────────── */}
                <div className="flex h-full min-h-[calc(100vh-60px)]">

                    {/* Left — text content */}
                    <div className="relative z-10 flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24 py-20">

                        {/* Vertical progress bar (left edge) */}
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
                            {products.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDotClick(i)}
                                    aria-label={`Go to product ${i + 1}`}
                                    className="relative h-8 w-[2px] overflow-hidden rounded-full"
                                    style={{ background: `${THEME.dotInactive.replace('bg-[', '').replace(']', '')}` }}
                                >
                                    <span
                                        className={`absolute inset-0 rounded-full transition-transform duration-700 ${THEME.dotActive}`}
                                        style={{
                                            transform: i === current ? 'scaleY(1)' : 'scaleY(0)',
                                            transformOrigin: 'top',
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        <div ref={textRef} className="max-w-md">
                            {/* Label */}
                            <p
                                className={`hero-label mb-4 text-xs tracking-[0.35em] uppercase font-medium ${THEME.label}`}
                            >
                                {product?.tag}
                            </p>

                            {/* Product name */}
                            <h1
                                className="hero-name mb-2 text-6xl md:text-8xl font-semibold tracking-tight"
                                style={{ fontFamily: 'Georgia, serif', color: THEME.textDark }}
                            >
                                {product.name}
                            </h1>

                            {/* Collection */}
                            <p
                                className={`hero-collection mb-8 text-sm tracking-wide ${THEME.label}`}
                            >
                                {product.collections?.name}
                            </p>

                            {/* Price */}
                            <div className="hero-price mb-10 flex items-baseline gap-3">
                                <span
                                    className="text-2xl font-semibold"
                                    style={{ color: THEME.textDark }}
                                >
                                    {product.price}
                                </span>
                                {product.original_price && (
                                    <span className={`text-sm line-through ${THEME.label}`}>
                                        {product.original_price}
                                    </span>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="hero-btns flex items-center gap-4">
                                <button
                                    className={`rounded-none px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${THEME.btnSecondary}`}
                                >
                                    Discover
                                </button>
                                <button
                                    className={`rounded-none px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ${THEME.btnPrimary}`}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Bottom dots (mobile) */}
                        <div className="mt-12 flex gap-2 md:hidden">
                            {products.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDotClick(i)}
                                    className={`h-0.5 transition-all duration-500 rounded-full ${i === current ? `w-8 ${THEME.dotActive}` : `w-4 ${THEME.dotInactive}`
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right — accent panel with product image */}
                    <div
                        className="relative hidden md:flex w-[45%] lg:w-[50%] items-center justify-center overflow-hidden"
                        style={{ backgroundColor: THEME.panelBg }}
                    >
                        {/* NEW ARRIVALS label — vertical, like reference */}
                        <p
                            className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase font-medium"
                            style={{ color: THEME.textDark, opacity: 0.45 }}
                        >
                            New Arrivals
                        </p>

                        {/* Product image */}
                        <div
                            ref={imageRef}
                            className="hero-image relative flex items-center justify-center "
                            style={{ width: '78%', maxWidth: '480px' }}
                        >
                            <img
                                key={product.id}
                                src={product.image_urls[0]}
                                alt={product.name}
                                className="w-full h-auto object-contain drop-shadow-2xl mix-blend-screen"
                                style={{ maxHeight: '65vh' }}
                            />

                            {/* Sale badge — shown when there's an original price */}
                            {product.original_price && (
                                <span
                                    className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${THEME.badge}`}
                                >
                                    Sale
                                </span>
                            )}
                        </div>

                        {/* Bottom indicator dots */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                            {products.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDotClick(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className={`h-[2px] rounded-full transition-all duration-500 ${i === current ? `w-8 ${THEME.dotActive}` : `w-4 ${THEME.dotInactive}`
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
}

export default HeroSection;