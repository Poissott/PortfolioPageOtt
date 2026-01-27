"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface IntroAnimationProps {
  onComplete: () => void;
  keywords?: string[];
}

export default function IntroAnimation({ 
  onComplete, 
  keywords = ["Developer", "Designer", "Creator", "Innovator", "Dreamer"] 
}: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Call onComplete when container starts fading (not at the end)
    const callOnComplete = () => onComplete();

    // 1. Start with blank screen (already visible)
    
    // 2. Spotlight effect fades in (0.5s delay, then 1s fade)
    tl.to(spotlightRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5
    });

    // 3. Keywords slide through the spotlight
    keywordsRef.current.forEach((keyword, index) => {
      if (!keyword) return;
      
      const direction = index % 2 === 0 ? 1 : -1; // Alternate left-right
      const startX = direction === 1 ? "-100%" : "100%";
      const endX = direction === 1 ? "100%" : "-100%";

      tl.fromTo(
        keyword,
        {
          x: startX,
          opacity: 0,
        },
        {
          x: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        `+=${index === 0 ? 0.5 : 0.2}` // First keyword after spotlight, others with slight delay
      )
      .to(
        keyword,
        {
          x: endX,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        },
        `+=${0.4}` // Hold for 0.4s before sliding out
      );
    });

    // 4. Spotlight fades out and intro screen transitions away
    tl.to(spotlightRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, "-=0.5")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onStart: callOnComplete, // Trigger main animations when fadeout starts
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#1a1a2e", // Dark blue-purple background
      }}
    >
      {/* Spotlight Effect */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle 400px at 50% 50%, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.08) 30%, 
            transparent 70%)`,
        }}
      />

      {/* Keywords Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) keywordsRef.current[index] = el;
            }}
            className="absolute text-8xl font-bold opacity-0"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(102, 126, 234, 0.5)",
            }}
          >
            {keyword}
          </div>
        ))}
      </div>

      {/* Additional glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at 50% 50%, 
            rgba(102, 126, 234, 0.1) 0%, 
            transparent 70%)`,
        }}
      />
    </div>
  );
}
