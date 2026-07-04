import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ProceduralTooth } from './3d/ProceduralTooth';

gsap.registerPlugin(ScrollTrigger);

export function Showcase3D() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create a pinned timeline for the 3D showcase
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    tl.fromTo('.showcase-text-1', { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 1 })
      .fromTo('.showcase-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      // In a real scenario with a complex model, we'd animate the R3F camera or model pieces here via a store/ref
      .to('.showcase-canvas-container', { scale: 1.5, duration: 2 }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 showcase-canvas-container z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Environment preset="studio" />
          <ProceduralTooth scale={1.8} />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white pointer-events-none">
        <div className="showcase-text-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 className="text-5xl md:text-7xl font-black mb-4">Precision Engineering.</h2>
          <p className="text-xl text-slate-300">We treat your teeth like masterpieces.</p>
        </div>
        <div className="showcase-text-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-0">
          <h2 className="text-5xl md:text-7xl font-black mb-4 text-cyan-400">Inside Out.</h2>
          <p className="text-xl text-slate-300">Uncovering the beauty of perfect dental health.</p>
        </div>
      </div>
    </section>
  );
}
