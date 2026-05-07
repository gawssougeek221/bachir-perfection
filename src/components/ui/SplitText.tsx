"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  as?: React.ElementType;
  children: string;
  className?: string;
  splitBy?: "chars" | "words";
  stagger?: number;
  duration?: number;
  y?: number;
}

export default function SplitText({
  as: Tag = "p",
  children,
  className = "",
  splitBy = "words",
  stagger = 0.05,
  duration = 0.8,
  y = 40,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".split-el");
    if (elements.length === 0) return;

    gsap.from(elements, {
      y,
      opacity: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [stagger, duration, y]);

  const parts = splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <Tag ref={containerRef as React.Ref<any>} className={className}>
      {parts.map((part, i) => (
        <span key={i} className="split-el inline-block" style={{ willChange: "transform, opacity" }}>
          {part}
          {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
