'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BuildingImage {
  id: number;
  url: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface ImageCarouselProps {
  images: BuildingImage[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
}

export default function ImageCarousel({
  images,
  className = '',
  autoPlay = true,
  interval = 5000,
  showControls = true,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className={`relative w-full h-full bg-gray-900 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold uppercase tracking-widest text-xs">
          No Content Configured
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className={`relative w-full overflow-hidden bg-gray-900 ${className}`}>
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={image.url}
              alt={image.title || 'Slide'}
              fill
              className="object-cover"
              priority={true}
              sizes="100vw"
              unoptimized
            />
            {/* Subtle gradient only at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Content Overlay - Positioned at bottom center */}
      <div className="absolute inset-x-0 bottom-16 flex justify-center pointer-events-none z-[10]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {currentImage.title && (
              <h2 className="text-sm md:text-lg lg:text-xl font-medium text-white mb-4 tracking-[0.1em] drop-shadow-md">
                {currentImage.title}
              </h2>
            )}
            {currentImage.buttonLink && currentImage.buttonText && (
              <Link
                href={currentImage.buttonLink}
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-5 py-2.5 rounded-full font-medium uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-white transition-all transform hover:scale-105 pointer-events-auto shadow-lg"
              >
                {currentImage.buttonText}
                <span className="text-base">→</span>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {images.length > 1 && showControls && (
        <>
          {/* Left Button - Centered Vertically */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-[20] w-12 h-12 md:w-14 md:h-14 border border-white/20 hover:bg-white hover:text-gray-900 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
          >
            <span className="text-lg md:text-xl">←</span>
          </button>

          {/* Right Button - Centered Vertically */}
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[20] w-12 h-12 md:w-14 md:h-14 border border-white/20 hover:bg-white hover:text-gray-900 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
          >
            <span className="text-lg md:text-xl">→</span>
          </button>

          {/* Pagination Dots - At Bottom */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex gap-3 z-[20]">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 transition-all duration-500 rounded-full ${index === currentIndex ? 'w-12 bg-[#D4AF37]' : 'w-4 bg-white/30'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

