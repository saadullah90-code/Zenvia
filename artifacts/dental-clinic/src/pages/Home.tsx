import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { SparkleButton } from '@/components/SparkleButton';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Problems } from '@/components/Problems';
import { Braces } from '@/components/Braces';
import { Treatments } from '@/components/Treatments';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '150+', label: 'Expert Dentists' },
  { value: '20+', label: 'Dental Clinics across UK' },
  { value: '03+', label: 'Countries presence' },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const toothOuter = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLImageElement>(null);

  // Framer mouse tilt for the floating tooth (kept on a separate node from GSAP)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 60, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 60, damping: 18 });

  // Deterministic load-at-top
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tiltX.set(nx * 12);
      tiltY.set(ny * -12);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [tiltX, tiltY]);

  // Smooth scroll + traveling / rotating tooth (desktop + mobile)
  useEffect(() => {
    if (loading) return;

    window.scrollTo(0, 0);

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Reveal sections on scroll
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Traveling + rotating tooth — same animation on desktop AND mobile, tuned per size
      const mm = gsap.matchMedia();
      mm.add(
        { isDesktop: '(min-width: 768px)', isMobile: '(max-width: 767px)' },
        (context) => {
          const outer = toothOuter.current;
          if (!outer) return;

          const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };
          const vw = () => window.innerWidth;
          const vh = () => window.innerHeight;

          const kx = isDesktop ? 0.3 : 0.22; // horizontal sway
          const s0 = isDesktop ? 1 : 0.9; // base scale
          const op = isDesktop ? 1 : 0.85; // travel opacity (kept high so the tooth stays visible on mobile)

          gsap.set(outer, { x: 0, y: 0, rotate: 0, scale: s0, opacity: 1 });

          // Splash belongs to the hero — smoothly fade it out as the hero leaves,
          // and it fades back in when scrolling back up (scrub reverses automatically).
          if (splashRef.current) {
            gsap.to(splashRef.current, {
              opacity: 0,
              scale: 0.78,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: '#home',
                start: 'top top',
                end: 'bottom 30%',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            });
          }

          // Tooth travels DOWN the page (monotonic y), sways side to side, rotates continuously,
          // and returns to a fully upright position (360deg) by the footer — just like it started.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(outer, { x: () => -vw() * kx, y: () => vh() * 0.12, rotate: 50, scale: s0 * 0.84, opacity: op, ease: 'none' })
            .to(outer, { x: () => vw() * kx, y: () => vh() * 0.22, rotate: 120, scale: s0 * 0.76, opacity: op, ease: 'none' })
            .to(outer, { x: () => -vw() * (kx * 0.9), y: () => vh() * 0.3, rotate: 195, scale: s0 * 0.68, opacity: op, ease: 'none' })
            .to(outer, { x: () => vw() * kx, y: () => vh() * 0.34, rotate: 285, scale: s0 * 0.66, opacity: op, ease: 'none' })
            .to(outer, { x: 0, y: () => vh() * 0.3, rotate: 360, scale: s0 * 0.72, opacity: op, ease: 'power2.out' });

          return () => {
            gsap.set(outer, { clearProps: 'all' });
            if (splashRef.current) gsap.set(splashRef.current, { clearProps: 'all' });
          };
        },
      );

      return () => mm.revert();
    }, mainRef);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <div ref={mainRef} className="relative bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>{loading && <Preloader onComplete={() => setLoading(false)} />}</AnimatePresence>

      <Navbar />

      {/* Fixed tooth + splash unit (all devices) — splash pops up, tooth drops from top, travels + rotates */}
      <div
        className="fixed inset-0 pointer-events-none flex justify-center items-start pt-[9vh] md:items-center md:pt-0"
        style={{ perspective: 1000, zIndex: 10 }}
      >
        <div className="relative w-[74vw] max-w-[330px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[520px] aspect-square">
          {/* Splash — Framer pops it up from behind on load; GSAP fades it on scroll (separate nodes, no transform conflict) */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={loading ? {} : { scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 130, damping: 12, delay: 0.25 }}
            className="absolute inset-0"
          >
            <img
              ref={splashRef}
              src="/splash-blue.png"
              alt=""
              aria-hidden
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* GSAP-controlled travel/rotate node */}
          <div ref={toothOuter} className="absolute inset-0 flex items-center justify-center">
            {/* Framer intro: tooth drops in from the top after the preloader */}
            <motion.div
              initial={{ y: -460, opacity: 0, rotate: -16 }}
              animate={loading ? {} : { y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="relative w-[64%]"
            >
              {/* Mouse tilt */}
              <motion.div style={{ rotateX: springY, rotateY: springX }}>
                {/* Gentle idle tilt at rest */}
                <motion.div
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 m-auto w-4/5 h-4/5 rounded-full bg-primary/25 blur-3xl" />
                  <img
                    src="/tooth-hero.png"
                    alt="3D dental tooth"
                    className="relative w-full drop-shadow-[0_28px_42px_rgba(20,120,200,0.35)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero backdrop (BELOW the tooth): gradient, glow blob, and giant serif typography.
          This is a sibling layer UNDER the fixed tooth so the tooth renders in front of the
          serif/background but still behind the hero card (which lives in the section above).
          The card cannot beat the tooth via z-index alone because the section forms its own
          stacking context, so we split the hero across three sibling layers instead. */}
      <div
        className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#d7ecfb] via-[#eaf5fd] to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[85vw] h-[55vh] bg-[#bfe3fb] rounded-full blur-[130px] opacity-70" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={loading ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute inset-x-0 top-[10vh] md:top-1/2 md:-translate-y-1/2 flex flex-col items-center text-center leading-[0.76] select-none"
        >
          <span className="font-serif-display uppercase text-[27vw] md:text-[20vw] lg:text-[17.5vw] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-primary/40 via-primary/20 to-primary/[0.06]">
            Smile
          </span>
          <span className="font-serif-display uppercase text-[27vw] md:text-[20vw] lg:text-[17.5vw] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-primary/30 via-primary/15 to-primary/[0.04] -mt-[0.14em]">
            Matters
          </span>
        </motion.h1>
      </div>

      {/* ===== HERO ===== (transparent, ABOVE the tooth so card/stats stay readable over it) */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden pt-28 pb-14"
        style={{ zIndex: 20 }}
      >
        <div className="container mx-auto px-5 relative flex-1 flex flex-col justify-end">
          {/* Info card + stats (above the tooth) */}
          <div className="grid lg:grid-cols-2 gap-8 items-end mt-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card hero-info-card rounded-3xl p-7 max-w-md"
            >
              <p className="text-foreground/70 font-semibold leading-relaxed">
                Our skilled dentists use advanced technology to offer complete care in a comfortable
                and friendly environment.
              </p>
              <div className="flex items-center gap-2 mt-6 text-sm">
                <Clock size={18} className="text-primary" />
                <span className="font-bold text-foreground">We're Open</span>
                <span className="text-muted-foreground font-semibold">10:00 AM – 07:00 PM</span>
              </div>
              <SparkleButton href="#contact" className="mt-6">
                Book Appointment
              </SparkleButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap gap-3 sm:gap-4 lg:justify-end"
            >
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 min-w-[104px] flex-1 sm:flex-none">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-none">{s.value}</p>
                  <p className="mt-2 text-xs sm:text-sm font-bold text-muted-foreground max-w-[130px]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee />

      <div data-reveal><About /></div>
      <div data-reveal><Problems /></div>
      <div data-reveal><Braces /></div>
      <div data-reveal><Treatments /></div>
      <div data-reveal><Testimonials /></div>
      <div data-reveal><FAQ /></div>
      <div data-reveal><Contact /></div>

      <Footer />
    </div>
  );
}
