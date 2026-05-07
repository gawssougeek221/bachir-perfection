"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

interface CardStackProps<T> {
  items: T[];
  renderCard: (item: T, index: number, isActive: boolean) => React.ReactNode;
  autoplayInterval?: number;
  loop?: boolean;
  className?: string;
}

export function CardStack<T>({
  items,
  renderCard,
  autoplayInterval = 3000,
  loop = true,
  className = "",
}: CardStackProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !stackRef.current) return;

    const cards = stackRef.current.querySelectorAll<HTMLDivElement>(".stack-card");
    if (cards.length === 0) return;

    const arrangeCards = (activeIndex: number) => {
      cards.forEach((card, i) => {
        const offset = i - activeIndex;
        const absOffset = Math.abs(offset);
        const isActive = i === activeIndex;

        gsap.to(card, {
          x: offset * 60,
          y: offset * 20,
          rotation: offset * 3,
          scale: 1 - absOffset * 0.05,
          opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.25,
          zIndex: cards.length - absOffset,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    };

    // Initial arrange
    arrangeCards(0);

    // Autoplay
    intervalRef.current = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % items.length;
      arrangeCards(currentIndex.current);
    }, autoplayInterval);

    // Drag/swipe
    let startX = 0;
    const container = containerRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          currentIndex.current = currentIndex.current > 0 ? currentIndex.current - 1 : items.length - 1;
        } else {
          currentIndex.current = (currentIndex.current + 1) % items.length;
        }
        arrangeCards(currentIndex.current);
      }
      // Restart autoplay
      intervalRef.current = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % items.length;
        arrangeCards(currentIndex.current);
      }, autoplayInterval);
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, { scope: containerRef, dependencies: [items.length, autoplayInterval] });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={stackRef} className="relative flex items-center justify-center" style={{ minHeight: "560px" }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="stack-card absolute"
            style={{ willChange: "transform, opacity" }}
          >
            {renderCard(item, i, i === 0)}
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/10 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
