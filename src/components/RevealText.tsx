"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    // Split text into words
    const el = ref.current;
    const text = el.textContent || "";
    el.innerHTML = "";

    const words = text.split(" ");
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.overflow = "hidden";
      wordSpan.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(100%)";
      inner.className = "reveal-word-inner";
      inner.textContent = word;

      wordSpan.appendChild(inner);
      el.appendChild(wordSpan);

      if (i < words.length - 1) {
        const space = document.createTextNode("\u00A0");
        el.appendChild(space);
      }
    });

    // Animate each word
    const innerWords = el.querySelectorAll(".reveal-word-inner");
    gsap.to(innerWords, {
      y: "0%",
      duration: 1.0,
      ease: "power3.out",
      stagger: 0.04,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: ref });

  const Component = Tag as any;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
