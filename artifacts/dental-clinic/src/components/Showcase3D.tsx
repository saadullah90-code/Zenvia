import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Showcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo('.showcase-text-1', { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 1 })
        .fromTo('.showcase-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '+=0.5');

      return () => { tl.kill(); };
    });

    // Mobile
    mm.add('(max-width: 767px)', () => {
      const t1 = gsap.from('.showcase-text-1', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      return () => { t1.kill(); };
    });

    return () => { mm.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="showcase-section" className="h-screen bg-[#0A0E1A] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-noise opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      {/* The master tooth from Home.tsx will float above this section */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white pointer-events-none">
        <div className="showcase-text-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tight font-display drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Precision<br/>Engineering.</h2>
          <p className="text-2xl text-slate-300 font-medium">We treat your teeth like masterpieces.</p>
        </div>
        <div className="showcase-text-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">
          <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tight font-display drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400"><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 drop-shadow-[0_0_30px_rgba(11,99,246,0.6)]">Inside Out.</span></h2>
          <p className="text-2xl text-slate-300 font-medium">Uncovering the beauty of perfect dental health.</p>
        </div>
      </div>
    </section>
  );
}
