"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback((e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    }

    const target = e.target as HTMLElement;
    const interactive = target.closest(
      'a, button, [data-cursor="pointer"], input, textarea'
    );

    if (interactive) {
      setIsHovering(true);
      const text = interactive.getAttribute("data-cursor-text");
      setCursorText(text || "");
    } else {
      setIsHovering(false);
      setCursorText("");
    }
  }, []);

  useEffect(() => {
    // Detect touch device
    if ("ontouchstart" in window) {
      setIsHidden(true);
      return;
    }

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", () => setIsClicking(true));
    document.addEventListener("mouseup", () => setIsClicking(false));
    document.addEventListener("mouseleave", () => setIsHidden(true));
    document.addEventListener("mouseenter", () => setIsHidden(false));

    // Smooth follower animation
    let rafId: number;
    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;

      if (followerRef.current) {
        const size = isHovering ? 64 : 32;
        followerRef.current.style.transform = `translate3d(${followerPos.current.x - size / 2}px, ${followerPos.current.y - size / 2}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", () => setIsClicking(true));
      document.removeEventListener("mouseup", () => setIsClicking(false));
      document.removeEventListener("mouseleave", () => setIsHidden(true));
      document.removeEventListener("mouseenter", () => setIsHidden(false));
      cancelAnimationFrame(rafId);
    };
  }, [updateCursor, isHovering]);

  if (isHidden) return null;

  return (
    <>
      {/* Main dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isHovering ? "#D4AF37" : "#fff",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
          willChange: "transform",
        }}
      />

      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
        style={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          borderRadius: "50%",
          border: `1px solid ${isHovering ? "#D4AF37" : "rgba(255,255,255,0.4)"}`,
          transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s",
          willChange: "transform",
          opacity: isClicking ? 0.5 : 1,
        }}
      >
        {cursorText && (
          <span
            className="text-[10px] tracking-wider uppercase text-[#D4AF37] font-medium whitespace-nowrap"
            style={{ mixBlendMode: "difference" }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
