import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmileGallery() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="gallery" className="py-40 bg-white relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 font-display">Transformations.</h2>
          <p className="text-xl text-slate-600 font-medium">
            Real results. Slide to see the before and after of our signature treatments.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl select-none"
            onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
            onTouchMove={handleDrag}
            onMouseDown={handleDrag}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <img src="/after-teeth.png" alt="After Treatment" className="w-full h-full object-cover pointer-events-none" />
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full font-bold text-slate-900 text-sm tracking-widest pointer-events-none shadow-xl border border-white/50">
                AFTER
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 border-r-4 border-white shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img src="/before-teeth.png" alt="Before Treatment" className="w-full h-full object-cover pointer-events-none filter brightness-90" />
              <div className="absolute bottom-8 left-8 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full font-bold text-white text-sm tracking-widest pointer-events-none shadow-xl border border-white/10">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-100 hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary rotate-180">
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
