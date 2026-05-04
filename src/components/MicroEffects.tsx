"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

// ---------- MAGNETIC MORPHING BUTTON WITH RIPPLE ----------
export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target = "",
  rel = "",
  cursorText = "GO",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  cursorText?: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });

      // Inner text shift for depth
      const inner = btn.querySelector(".btn-inner");
      if (inner) {
        gsap.to(inner, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
      const inner = btn.querySelector(".btn-inner");
      if (inner) {
        gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      }
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={btnRef as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      data-cursor="pointer"
      data-cursor-text={cursorText}
      onMouseDown={addRipple}
    >
      <span className="btn-inner relative z-10 flex items-center gap-2">{children}</span>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            animation: "rippleExpand 1s ease-out forwards",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes rippleExpand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
      `}</style>
    </Tag>
  );
}

// ---------- SCROLL COLOR TRANSITION WRAPPER ----------
export function ScrollColorTransition({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !colorRef.current) return;

    // Morph the background color from dark to light based on scroll
    gsap.to(colorRef.current, {
      background: "linear-gradient(180deg, #F8F8F6 0%, #F8F8F6 100%)",
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        ref={colorRef}
        className="absolute inset-0 transition-none"
        style={{
          background: "linear-gradient(180deg, #050505 0%, #050505 100%)",
          willChange: "background",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ---------- TEXT THAT SCALES WITH SCRUB ----------
export function ScrubScaleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { scale: 0.6, opacity: 0, letterSpacing: "0.2em" },
      {
        scale: 1,
        opacity: 1,
        letterSpacing: "-0.02em",
        ease: "power3.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {text}
    </div>
  );
}

// ---------- HORIZONTAL LINE THAT DRAWS ON SCROLL ----------
export function ScrollLine({
  className = "",
  color = "#D4AF37",
}: {
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className={`h-px origin-left ${className}`}
      style={{
        background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        willChange: "transform",
      }}
    />
  );
}
