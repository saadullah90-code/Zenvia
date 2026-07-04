import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Showcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;
    
    // Create a pinned timeline for the showcase
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    });

    tl.fromTo('.showcase-text-1', { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 1 })
      .to(imageRef.current, { scale: 1.5, y: -50, duration: 2 }, 0)
      .fromTo('.showcase-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=1")
      .to(imageRef.current, { scale: 1.8, y: -100, duration: 2 }, "-=1");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-[#0A0E1A] relative overflow-hidden flex items-center justify-center border-t border-white/5">
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img 
          ref={imageRef}
          src="/tooth-showcase.png" 
          alt="Dental Implant" 
          className="w-full max-w-[600px] h-auto object-contain opacity-90 drop-shadow-[0_0_50px_rgba(11,99,246,0.3)]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white pointer-events-none">
        <div className="showcase-text-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight font-display drop-shadow-2xl">Precision<br/>Engineering.</h2>
          <p className="text-2xl text-slate-300 font-medium">We treat your teeth like masterpieces.</p>
        </div>
        <div className="showcase-text-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight font-display drop-shadow-2xl"><span className="text-primary">Inside Out.</span></h2>
          <p className="text-2xl text-slate-300 font-medium">Uncovering the beauty of perfect dental health.</p>
        </div>
      </div>
    </section>
  );
}
