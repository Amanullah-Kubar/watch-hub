// hooks/useReveal.js

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function UseReveal(animation = {}) {
    const ref = useRef(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            ...animation,
        });
    });

    return ref;
}