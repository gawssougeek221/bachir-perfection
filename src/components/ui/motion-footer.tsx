"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface CinematicFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CinematicFooter({ children, className }: CinematicFooterProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const revealWrapperRef = useRef<HTMLDivElement>(null);
  const bachirTextRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!spacerRef.current || !footerRef.current || !revealWrapperRef.current) return;

      // Curtain reveal via clip-path
      gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.5,
        },
      }).fromTo(
        revealWrapperRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", ease: "none" },
      );

      // Giant BACHIR parallax
      if (bachirTextRef.current) {
        gsap.to(bachirTextRef.current, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: spacerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });
      }

      // Aurora glow breathing
      if (auroraRef.current) {
        gsap.to(auroraRef.current, {
          scale: 1.15,
          opacity: 0.25,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Stagger fade-up for .footer-reveal
      const revealEls = footerRef.current.querySelectorAll<HTMLElement>(".footer-reveal");
      if (revealEls.length > 0) {
        gsap.fromTo(
          revealEls,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out",
            scrollTrigger: {
              trigger: spacerRef.current,
              start: "top 80%",
              end: "bottom 40%",
              scrub: 1,
            },
          },
        );
      }

      // Infinite GSAP marquee
      const marquees = footerRef.current.querySelectorAll<HTMLElement>(".footer-marquee");
      marquees.forEach((marquee) => {
        const inner = marquee.querySelector<HTMLElement>(".footer-marquee-inner");
        if (!inner) return;
        const totalWidth = inner.scrollWidth / 2;
        gsap.set(inner, { x: 0 });
        gsap.to(inner, {
          x: -totalWidth,
          duration: totalWidth / 80,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: number) => `${parseFloat(String(x)) % -totalWidth}px`),
          },
        });
      });

      // Magnetic pills
      const pills = footerRef.current.querySelectorAll<HTMLElement>(".footer-pill");
      pills.forEach((pill) => {
        const pillTl = gsap.timeline({ paused: true });
        pillTl.to(pill, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        pill.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = pill.getBoundingClientRect();
          gsap.to(pill, {
            x: ((e.clientX - rect.left) - rect.width / 2) * 0.3,
            y: ((e.clientY - rect.top) - rect.height / 2) * 0.3,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        pill.addEventListener("mouseleave", () => pillTl.restart());
      });
    },
    { scope: footerRef },
  );

  return (
    <>
      <div ref={spacerRef} className={className} style={{ minHeight: "60vh" }} />
      <div ref={footerRef} style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <div
          ref={revealWrapperRef}
          style={{ clipPath: "inset(100% 0 0 0)", background: "#F8F8F6", overflow: "hidden" }}
        >
          {/* Giant BACHIR background text */}
          <div ref={bachirTextRef} aria-hidden="true" style={{
            position: "absolute", bottom: "-0.05em", left: 0, right: 0,
            textAlign: "center", pointerEvents: "none", userSelect: "none", zIndex: 0,
          }}>
            <div ref={auroraRef} aria-hidden="true" style={{
              position: "absolute", top: "50%", left: "50%", width: "70%", height: "60%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)",
              filter: "blur(80px)", opacity: 0.12, pointerEvents: "none",
            }} />
            <span style={{
              fontSize: "15vw", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.85,
              color: "#D4AF37", opacity: 0.1, display: "block", position: "relative", zIndex: 1,
            }}>
              BACHIR
            </span>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </div>
      </div>
    </>
  );
}
