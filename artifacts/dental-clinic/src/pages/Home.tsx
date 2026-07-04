import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProceduralTooth } from '@/components/3d/ProceduralTooth';
import { Services } from '@/components/Services';
import { Showcase3D } from '@/components/Showcase3D';
import { SmileGallery } from '@/components/SmileGallery';
import { Team } from '@/components/Team';
import { Testimonials } from '@/components/Testimonials';
import { AppointmentForm } from '@/components/AppointmentForm';
import { FAQ } from '@/components/FAQ';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    // Simple reveal animations
    gsap.utils.toArray('.reveal-up').forEach((elem: any) => {
      gsap.fromTo(elem, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          }
        }
      );
    });

  }, [loading]);

  return (
    <div className="bg-background text-foreground min-h-screen" ref={containerRef}>
      <CustomCursor />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Navbar />

          {/* Hero */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
               <img src="/hero-bg.png" alt="Background" className="w-full h-full object-cover opacity-30 mix-blend-multiply" />
            </div>
            
            <div className="absolute inset-0 z-10 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Environment preset="city" />
                <PresentationControls global polar={[-0.4, 0.2]} azimuth={[-0.4, 0.2]} snap>
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <ProceduralTooth scale={1.8} position={[1, 0, 0]} />
                  </Float>
                </PresentationControls>
              </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-20 pointer-events-none">
              <div className="max-w-3xl">
                <motion.h1 
                  className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-tight mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  The Future of <br/>
                  <span className="text-gradient">Dentistry.</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-slate-600 mb-10 max-w-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Experience world-class care in a premium, stress-free environment. Precision meets luxury.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="pointer-events-auto"
                >
                  <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30">
                    Book Your Consultation
                  </button>
                </motion.div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center text-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent mb-2" />
              <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
            </motion.div>
          </section>

          {/* About / Stats */}
          <section id="about" className="py-32 bg-white relative">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="reveal-up">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Redefining the Dental Experience.</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    We combine cutting-edge technology with unparalleled comfort to provide treatments that are precise, painless, and profoundly better. Welcome to the new standard of oral care.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-5xl font-black text-primary mb-2">15k+</div>
                      <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">Happy Patients</div>
                    </div>
                    <div>
                      <div className="text-5xl font-black text-primary mb-2">20+</div>
                      <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">Years Experience</div>
                    </div>
                  </div>
                </div>
                <div className="relative reveal-up">
                  <div className="aspect-square rounded-3xl overflow-hidden glass p-2 relative z-10 shadow-2xl">
                    <img src="/tech-1.png" alt="Tech" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                  <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-cyan-200/60 rounded-full blur-[80px] -z-0"></div>
                </div>
              </div>
            </div>
          </section>

          <Services />
          
          <Showcase3D />
          
          <SmileGallery />
          
          <Team />
          
          <Testimonials />
          
          <AppointmentForm />
          
          <FAQ />

          <Footer />
        </>
      )}
    </div>
  );
}
