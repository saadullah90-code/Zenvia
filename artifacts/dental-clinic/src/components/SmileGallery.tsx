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
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="py-40 bg-[#05070D] relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white font-display">Transformations.</h2>
          <p className="text-xl text-slate-400 font-medium">
            Real results. Slide to see the before and after of our signature treatments.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-[0_0_50px_rgba(11,99,246,0.15)] border border-white/10 select-none"
            onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
            onTouchMove={handleDrag}
            onMouseDown={handleDrag}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <img src="/after-teeth.png" alt="After Treatment" className="w-full h-full object-cover pointer-events-none filter contrast-125" />
              <div className="absolute bottom-8 right-8 bg-[#0A0E1A]/80 backdrop-blur-md px-6 py-3 rounded-full font-bold text-white text-sm tracking-widest pointer-events-none shadow-xl border border-white/10">
                AFTER
              </div>
            </div>

            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 border-r-4 border-primary shadow-[20px_0_50px_rgba(0,0,0,0.8)]"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img src="/before-teeth.png" alt="Before Treatment" className="w-full h-full object-cover pointer-events-none filter brightness-75 contrast-125 sepia-[.2]" />
              <div className="absolute bottom-8 left-8 bg-[#0A0E1A]/80 backdrop-blur-md px-6 py-3 rounded-full font-bold text-white text-sm tracking-widest pointer-events-none shadow-xl border border-white/10">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_20px_rgba(11,99,246,0.8)] z-10 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 bg-[#0A0E1A] rounded-full shadow-[0_0_30px_rgba(11,99,246,0.5)] flex items-center justify-center border-2 border-primary group-hover:scale-110 transition-transform">
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
