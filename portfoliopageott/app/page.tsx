"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroAnimation from "./components/IntroAnimation";
import ThemeToggle from "./components/ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const helloWorldRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const nightOverlayRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [startMainAnimation, setStartMainAnimation] = useState(false);

  // Lock scrolling during intro animation
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  useEffect(() => {
    if (!startMainAnimation) return;

    // Animate Hello World letters
    if (helloWorldRef.current) {
      const letters = helloWorldRef.current.querySelectorAll('.letter');
      
      letters.forEach((letter, index) => {
        // Alternate directions for each letter
        const directions = [
          { x: -200, y: -200, rotation: -180 },
          { x: 200, y: -150, rotation: 180 },
          { x: -150, y: 200, rotation: 90 },
          { x: 150, y: 200, rotation: -90 },
          { x: -250, y: 100, rotation: 270 },
          { x: 250, y: -100, rotation: -270 },
        ];
        
        const direction = directions[index % directions.length];
        
        gsap.fromTo(
          letter,
          {
            opacity: 0,
            x: direction.x,
            y: direction.y,
            rotation: direction.rotation,
            scale: 0.3,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            delay: 0.3 + (index * 0.08), // Add 0.3s base delay for intro fadeout
            ease: "back.out(1)",
          }
        );
      });
    }

    // Animate each section on scroll
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const leftContent = section.querySelector('.left-content');
      const rightContent = section.querySelector('.right-content');

      // Fade in and slide up animation
      gsap.fromTo(
        leftContent,
        {
          opacity: 0,
          y: 100,
          x: -50,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightContent,
        {
          opacity: 0,
          y: 100,
          x: 50,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Day to night transition on scroll
    if (firstSectionRef.current && nightOverlayRef.current) {
      // Set initial state explicitly
      gsap.set(nightOverlayRef.current, { opacity: 0 });
      gsap.set(firstSectionRef.current, { filter: "brightness(1) contrast(1) saturate(1)" });

      gsap.fromTo(
        nightOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 0.7,
          scrollTrigger: {
            trigger: firstSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        firstSectionRef.current,
        { filter: "brightness(1) contrast(1) saturate(1)" },
        {
          filter: "brightness(0.6) contrast(1.1) saturate(0.8)",
          scrollTrigger: {
            trigger: firstSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [startMainAnimation]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setStartMainAnimation(true);
  };

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <>
      <ThemeToggle />
      
      {showIntro && (
        <IntroAnimation 
          onComplete={handleIntroComplete}
          keywords={["Developer.", "Designer.", "Innovator.", "Film Bro."]}
        />
      )}
      
      <div className="min-h-[400vh] bg-zinc-50 dark:bg-black relative">
      {/* 12 Column Grid Container - First Section with Background */}
      <div 
        ref={(el) => {
          addToRefs(el, 0);
          if (el) firstSectionRef.current = el;
        }}
        className="grid grid-cols-12 gap-0 min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'var(--bg-image)',
        }}
      >
        {/* Night overlay - transitions from day to night on scroll */}
        <div 
          ref={nightOverlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 20, 50, 0.6) 0%, rgba(0, 10, 30, 0.8) 100%)',
            opacity: 0,
          }}
        />
        
        {/* Black overlay edges */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
          }}
        />
        
        {/* Left 6 Columns */}
        <div className="col-span-6 flex items-center justify-start pl-16 left-content relative z-10">
          {/* Gradient overlay for left text */}
          <div className="absolute inset-0" 
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
            }}
          />
          <div ref={helloWorldRef} className="text-9xl text-zinc-100 dark:text-zinc-200 relative z-10" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}>
            <div className="block">
              {"Hello,".split("").map((char, index) => (
                <span
                  key={index}
                  className="letter inline-block"
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="block">
              {"World!".split("").map((char, index) => (
                <span
                  key={index + 6}
                  className="letter inline-block"
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right 6 Columns */}
        <div className="col-span-6 flex items-center justify-center right-content relative z-10">
          {/* Gradient overlay for right text */}
          <div className="absolute inset-0" 
            style={{
              background: 'linear-gradient(270deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
            }}
          />
          <div className="text-zinc-100 dark:text-zinc-200 text-2xl relative z-10" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
            <p>Hey! I'm Ott Allik. </p>
            <p>Here you can see what I've been working on. </p>
          </div>
        </div>
      </div>

      {/* Additional sections to demonstrate the zigzag */}
      <div 
        ref={(el) => addToRefs(el, 1)}
        className="grid grid-cols-12 gap-0 min-h-screen relative z-20"
      >
        <div className="col-span-6 flex items-center justify-center left-content">
          <div className="text-zinc-400 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 2 - Left</h2>
            <p className="text-lg">Content on the left side</p>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center right-content">
          <div className="text-zinc-400 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 2 - Right</h2>
            <p className="text-lg">Content on the right side</p>
          </div>
        </div>
      </div>

      <div 
        ref={(el) => addToRefs(el, 2)}
        className="grid grid-cols-12 gap-0 min-h-screen relative z-20"
      >
        <div className="col-span-6 flex items-center justify-center left-content">
          <div className="text-zinc-400 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 3 - Left</h2>
            <p className="text-lg">More content here</p>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center right-content">
          <div className="text-zinc-400 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 3 - Right</h2>
            <p className="text-lg">And more on this side</p>
          </div>
        </div>
      </div>

      <div 
        ref={(el) => addToRefs(el, 3)}
        className="grid grid-cols-12 gap-0 min-h-screen relative z-20"
      >
        <div className="col-span-6 flex items-center justify-center left-content">
          <div className="text-zinc-400 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 4 - Left</h2>
            <p className="text-lg">Final section left</p>
          </div>
        </div>
        <div className="col-span-6 flex items-center justify-center right-content">
          <div className="text-zinc-400 dark:text-zinc-200 text-4xl p-8">
            <h2 className="font-bold mb-4">Section 4 - Right</h2>
            <p className="text-lg">Final section right</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
