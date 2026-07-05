import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Services } from '@/components/Services';
import { Showcase3D } from '@/components/Showcase3D';
import { SmileGallery } from '@/components/SmileGallery';
import { Team } from '@/components/Team';
import { Testimonials } from '@/components/Testimonials';
import { AppointmentForm } from '@/components/AppointmentForm';
import { FAQ } from '@/components/FAQ';

gsap.registerPlugin(ScrollTrigger);

function MagneticButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> | any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center overflow-hidden transition-colors ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  // Refs for the persistent tooth
  const toothOuterRef = useRef<HTMLDivElement>(null);
  const tooth1Ref = useRef<HTMLImageElement>(null);
  const tooth2Ref = useRef<HTMLImageElement>(null);
  const tooth3Ref = useRef<HTMLImageElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);
  
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const resetScroll = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    resetScroll();

    const toothImgs = [tooth1Ref.current, tooth2Ref.current, tooth3Ref.current];
    const crossfade = (idx: number) => {
      toothImgs.forEach((img, i) => {
        if (img) gsap.to(img, { opacity: i === idx ? 1 : 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      });
    };

    let mm: ReturnType<typeof gsap.matchMedia> | undefined;

    const ctx = gsap.context(() => {
      // Reveal animations for standard text
      gsap.utils.toArray('.reveal-up').forEach((elem: any) => {
        gsap.fromTo(elem,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
            }
          }
        );
      });

      mm = gsap.matchMedia();

      // Desktop: section-anchored waypoints so the traveling tooth stays in
      // sync with each section regardless of the pinned Showcase scroll length.
      mm.add('(min-width: 768px)', () => {
        const outer = toothOuterRef.current;
        if (!outer) return;

        gsap.set(outer, { x: 0, y: 0, scale: 1, rotate: 0 });
        // Cinematic entrance: descend from the top on load.
        gsap.from(outer, { y: '-150vh', scale: 0.8, duration: 2, ease: 'power4.out' });

        // Travel INTO the pinned showcase (center + grow), then keep it alive
        // (slow rotate + pulse) across the full pinned distance.
        gsap.to(outer, {
          x: '0vw', y: '0vh', scale: 1.15, rotate: 0, ease: 'none',
          scrollTrigger: { trigger: '#showcase-section', start: 'top bottom', end: 'top top', scrub: 1 },
        });
        gsap.to(outer, {
          rotate: 35, scale: 1.25, ease: 'none',
          scrollTrigger: { trigger: '#showcase-section', start: 'top top', end: '+=150%', scrub: 1 },
        });

        // Angle morphs anchored to section centers.
        ScrollTrigger.create({ trigger: '#services', start: 'top center', onEnter: () => crossfade(1), onLeaveBack: () => crossfade(0) });
        ScrollTrigger.create({ trigger: '#showcase-section', start: 'top center', onEnter: () => crossfade(2), onLeaveBack: () => crossfade(1) });

        // Section waypoints: each tween runs while that section approaches the
        // top, starting from the tooth's previous state for continuous motion.
        const waypoints = [
          { sel: '#about',        x: '28vw',  y: '12vh', scale: 0.62, rotate: 12 },
          { sel: '#services',     x: '-28vw', y: '8vh',  scale: 0.5,  rotate: -10 },
          { sel: '#gallery',      x: '24vw',  y: '6vh',  scale: 0.62, rotate: 18 },
          { sel: '#team',         x: '-24vw', y: '5vh',  scale: 0.55, rotate: -16 },
          { sel: '#testimonials', x: '0vw',   y: '10vh', scale: 0.46, rotate: 6 },
          { sel: '#book',         x: '26vw',  y: '4vh',  scale: 0.5,  rotate: -6 },
        ];
        waypoints.forEach((w) => {
          gsap.to(outer, {
            x: w.x, y: w.y, scale: w.scale, rotate: w.rotate, ease: 'none',
            scrollTrigger: { trigger: w.sel, start: 'top bottom', end: 'top top', scrub: 1 },
          });
        });

        // Settle + fade out near the end.
        gsap.to(outer, {
          y: '20vh', scale: 0.4, opacity: 0.4, ease: 'none',
          scrollTrigger: { trigger: '#faq', start: 'top center', end: 'bottom bottom', scrub: 1 },
        });
      });

      // Mobile: no heavy horizontal travel; a simple, cinematic vertical drift.
      mm.add('(max-width: 767px)', () => {
        const outer = toothOuterRef.current;
        if (!outer) return;

        gsap.set(outer, { x: 0, y: 0, scale: 0.8, rotate: 0 });
        gsap.from(outer, { y: '-60vh', scale: 0.5, duration: 1.6, ease: 'power4.out' });

        gsap.to(outer, {
          y: '40vh', scale: 0.5, rotate: 120, ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        ScrollTrigger.create({ trigger: '#showcase-section', start: 'top center', onEnter: () => crossfade(2), onLeaveBack: () => crossfade(0) });
      });
    }, containerRef);

    // Deterministic top-load: only real user input disables the reset guard,
    // never our own programmatic scrollTo (which also emits Lenis 'scroll').
    let userScrolled = false;
    const markScrolled = () => { userScrolled = true; };
    window.addEventListener('wheel', markScrolled, { passive: true });
    window.addEventListener('touchstart', markScrolled, { passive: true });
    window.addEventListener('keydown', markScrolled);
    window.addEventListener('pointerdown', markScrolled);

    const onRefresh = () => {
      if (!userScrolled) resetScroll();
    };
    ScrollTrigger.addEventListener('refresh', onRefresh);

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      resetScroll();
    });
    const t = setTimeout(() => {
      if (!userScrolled) resetScroll();
    }, 400);

    return () => {
      mm?.revert();
      ctx.revert();
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      window.removeEventListener('wheel', markScrolled);
      window.removeEventListener('touchstart', markScrolled);
      window.removeEventListener('keydown', markScrolled);
      window.removeEventListener('pointerdown', markScrolled);
    };
  }, [loading]);

  return (
    <div className="bg-[#0A0E1A] text-white min-h-[100dvh]" ref={containerRef} id="main-container">
      <CustomCursor />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Navbar />

          {/* PERSISTENT TOOTH CONTAINER */}
          <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-30 flex items-center justify-center overflow-hidden">
            {/* Outer node: GSAP-only scroll transforms (x/y/scale/rotate) */}
            <div
              ref={toothOuterRef}
              className="relative w-[80vw] md:w-[60vw] max-w-[800px] flex items-center justify-center will-change-transform"
            >
              {/* Inner node: Framer mouse-tilt (kept off the GSAP-controlled node) */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{ rotateX, rotateY }}
              >
              {/* Floating animation layered on top of scroll animation */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img 
                  ref={tooth1Ref}
                  src="/tooth-1.png" 
                  alt="Dental Implant Front" 
                  className="absolute inset-0 w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(11,99,246,0.5)] will-change-transform"
                  style={{ opacity: 1 }}
                />
                <img 
                  ref={tooth2Ref}
                  src="/tooth-2.png" 
                  alt="Dental Implant Angle" 
                  className="absolute inset-0 w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(11,99,246,0.5)] will-change-transform"
                  style={{ opacity: 0 }}
                />
                <img 
                  ref={tooth3Ref}
                  src="/tooth-3.png" 
                  alt="Dental Implant Back" 
                  className="absolute inset-0 w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(11,99,246,0.5)] will-change-transform"
                  style={{ opacity: 0 }}
                />
              </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Hero */}
          <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0A0E1A]">
            <div className="absolute inset-0 z-0 bg-noise opacity-[0.05]" />
            <div className="absolute inset-0 z-0">
               <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-primary/10 to-transparent mix-blend-screen" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-20 pointer-events-none">
              <div className="max-w-3xl">
                <motion.h1 
                  className="text-7xl md:text-[110px] font-black text-white tracking-tighter leading-[1] mb-8 font-display drop-shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  The Future of <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Dentistry.</span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-slate-300 mb-12 max-w-xl font-medium"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  Experience world-class care in a premium, stress-free environment. Precision meets luxury.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto"
                >
                  <MagneticButton className="bg-primary text-white px-10 py-5 rounded-full text-lg font-bold shadow-[0_0_40px_rgba(11,99,246,0.4)] hover:shadow-[0_0_60px_rgba(11,99,246,0.6)] transition-shadow group">
                    Book Your Consultation
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center text-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent mb-3 rounded-full shadow-[0_0_10px_rgba(11,99,246,0.8)]" />
              <span className="text-xs font-bold tracking-widest uppercase font-display text-white">Scroll</span>
            </motion.div>
          </section>

          {/* About / Stats */}
          <section id="about" className="py-40 bg-[#0A0E1A] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="reveal-up">
                  <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight font-display leading-[1.1]">Redefining the<br/>Dental Experience.</h2>
                  <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
                    We combine cutting-edge technology with unparalleled comfort to provide treatments that are precise, painless, and profoundly better. Welcome to the new standard of oral care.
                  </p>
                  <div className="flex gap-16">
                    <div>
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 mb-3 font-display drop-shadow-lg">15k+</div>
                      <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">Happy Patients</div>
                    </div>
                    <div>
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 mb-3 font-display drop-shadow-lg">20+</div>
                      <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">Years Experience</div>
                    </div>
                  </div>
                </div>
                <div className="relative reveal-up">
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-dark p-3 relative z-10 shadow-2xl">
                    <img src="/tech-1.png" alt="Advanced Dental Technology" className="w-full h-full object-cover rounded-[2rem] filter brightness-90 contrast-125" />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
                  </div>
                  <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] -z-0"></div>
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
