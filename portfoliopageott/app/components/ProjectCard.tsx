"use client";

import { useState, useEffect } from "react";

interface ProjectCardProps {
  images: string[];
  title: string;
  description: string;
  githubUrl?: string;
  deployedUrl?: string;
}

export default function ProjectCard({
  images,
  title,
  description,
  githubUrl,
  deployedUrl,
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-cycle through images if there are multiple
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setSlideDirection('right');
      
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 50); // Brief delay for animation trigger
    }, 4000); // Changing image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-96 bg-black dark:bg-black overflow-hidden rounded-lg flex items-center justify-center">
        {images.length > 0 ? (
          <>
            <div className="relative w-full h-full">
              <img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out ${
                  isTransitioning
                    ? slideDirection === 'right'
                      ? 'translate-x-full'
                      : '-translate-x-full'
                    : 'translate-x-0'
                }`}
                style={{
                  animation: isTransitioning
                    ? 'none'
                    : slideDirection === 'right'
                    ? 'slideInFromLeft 1s ease-in-out'
                    : 'slideInFromRight 1s ease-in-out',
                }}
              />
            </div>
            {/* Image indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
            No Image
          </div>
        )}

        {/* Hover Links Overlay */}
        <div
          className={`absolute top-4 right-4 flex gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* GitHub Link */}
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 dark:bg-zinc-800/90 p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-6 h-6 text-zinc-900 dark:text-zinc-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          ) : (
            <div className="bg-zinc-300/50 dark:bg-zinc-700/50 p-2 rounded-full cursor-not-allowed shadow-lg">
              <svg
                className="w-6 h-6 text-zinc-400 dark:text-zinc-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          )}

          {/* Deployed Website Link */}
          {deployedUrl ? (
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 dark:bg-zinc-800/90 p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-6 h-6 text-zinc-900 dark:text-zinc-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>
          ) : (
            <div className="bg-zinc-300/50 dark:bg-zinc-700/50 p-2 rounded-full cursor-not-allowed shadow-lg">
              <svg
                className="w-6 h-6 text-zinc-400 dark:text-zinc-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Title and Description */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          {title}
        </h3>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
