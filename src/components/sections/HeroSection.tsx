import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function HeroSection() {
    const heroRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.from(".hero-subtitle", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    ".hero-title",
                    {
                        y: 80,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power4.out",
                    },
                    "-=0.4"
                )
                .from(
                    ".hero-text",
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.7"
                );

            // Subtle floating effect
            gsap.to(".hero-title", {
                y: -8,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        },
        { scope: heroRef }
    );

    return (
        <section
            ref={heroRef}
            className="relative flex items-center justify-start h-screen px-6 text-center"
            style={{
                backgroundImage: "url(/src/assets/hero.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="hover:cursor-pointer max-w-4xl space-y-8">
                <p className="hero-subtitle uppercase tracking-[0.45em] text-[#D6B98C]/70 text-xs md:text-sm">
                    Style In Every Tick
                </p>

                <h2
                    className="hero-title text-5xl md:text-7xl leading-tight text-[#F8F5F0]"
                    style={{ fontFamily: "Nikanely" }}
                >
                    Luxury Inspired Watches
                    <span className="block text-[#D6B98C] italic mt-2">
                        for Everyday Wear
                    </span>
                </h2>

                <p className="hero-text text-[#F8F5F0]/60 max-w-2xl mx-auto leading-8 text-sm md:text-base">
                    Discover stylish, reliable, and modern watches crafted for
                    everyday confidence without overspending. Premium aesthetics,
                    durable quality, and prices that actually make sense.
                </p>
            </div>
        </section>
    );
}

export default HeroSection;