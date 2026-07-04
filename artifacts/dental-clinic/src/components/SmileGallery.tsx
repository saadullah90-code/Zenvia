import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function SmileGallery() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <section id="gallery" className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-up">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Transformations.</h2>
          <p className="text-xl text-slate-600">
            Real results. Slide to see the before and after of our signature whitening treatment.
          </p>
        </div>

        <div className="max-w-5xl mx-auto reveal-up">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize shadow-2xl select-none"
            onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
            onTouchMove={handleDrag}
            onMouseDown={handleDrag}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <img src="/after-teeth.png" alt="After" className="w-full h-full object-cover pointer-events-none" />
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur px-4 py-2 rounded-full font-bold text-slate-900 text-sm pointer-events-none">
                AFTER
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 border-r-4 border-white"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img src="/before-teeth.png" alt="Before" className="w-full h-full object-cover pointer-events-none" />
              <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full font-bold text-white text-sm pointer-events-none">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary rotate-180">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
