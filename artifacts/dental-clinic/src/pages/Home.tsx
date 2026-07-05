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

          const kx = isDesktop ? 0.3 : 0.2; // horizontal sway
          const s0 = isDesktop ? 1 : 0.82; // base scale
          const op = isDesktop ? 1 : 0.5; // travel opacity (softer on mobile for readability)

          gsap.set(outer, { x: 0, y: 0, rotate: 0, scale: s0, opacity: 1 });

          // Splash belongs to the hero — pop is handled by Framer; fade it out as we leave
          if (splashRef.current) {
            gsap.to(splashRef.current, {
              opacity: 0,
              scale: 0.7,
              ease: 'none',
              scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 },
            });
          }

          // Tooth travels DOWN the page (monotonic y), sways side to side, and rotates continuously
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(outer, { x: () => -vw() * kx, y: () => vh() * 0.12, rotate: 45, scale: s0 * 0.82, opacity: op, ease: 'none' })
            .to(outer, { x: () => vw() * kx, y: () => vh() * 0.22, rotate: 95, scale: s0 * 0.74, opacity: op, ease: 'none' })
            .to(outer, { x: () => -vw() * (kx * 0.9), y: () => vh() * 0.3, rotate: 150, scale: s0 * 0.66, opacity: op, ease: 'none' })
            .to(outer, { x: () => vw() * kx, y: () => vh() * 0.36, rotate: 210, scale: s0 * 0.6, opacity: op, ease: 'none' })
            .to(outer, { x: 0, y: () => vh() * 0.32, rotate: 270, scale: s0 * 0.64, opacity: op, ease: 'none' });

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
        className="fixed inset-0 z-30 pointer-events-none flex justify-center items-start pt-[19vh] md:items-center md:pt-0"
        style={{ perspective: 1000 }}
      >
        <div className="relative w-[76vw] max-w-[360px] md:max-w-[460px] lg:max-w-[520px] aspect-square">
          {/* Splash — pops up from behind on load */}
          <motion.img
            ref={splashRef}
            src="/splash-blue.png"
            alt=""
            aria-hidden
            initial={{ scale: 0.2, opacity: 0 }}
            animate={loading ? {} : { scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 130, damping: 12, delay: 0.25 }}
            className="absolute inset-0 w-full h-full object-contain"
          />

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

      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex flex-col overflow-hidden pt-28 pb-14">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d7ecfb] via-[#eaf5fd] to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[85vw] h-[55vh] bg-[#bfe3fb] rounded-full blur-[130px] opacity-70" />

        <div className="container mx-auto px-5 relative z-10 flex-1 flex flex-col">
          {/* Headline (sits behind the tooth) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={loading ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative z-0 text-center font-extrabold uppercase leading-[0.85] tracking-tighter text-[13vw] sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            <span className="text-primary/25">Every</span>{' '}
            <span className="text-gradient">Smile Matters</span>
          </motion.h1>

          {/* Spacer where the floating tooth lives */}
          <div className="flex-1 min-h-[42vh] md:min-h-[34vh]" />

          {/* Info card + stats (above the tooth) */}
          <div className="grid lg:grid-cols-2 gap-8 items-end mt-auto relative z-40">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={loading ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card rounded-3xl p-7 max-w-md"
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
              className="flex flex-wrap gap-8 lg:justify-end"
            >
              {stats.map((s) => (
                <div key={s.label} className="min-w-[110px]">
                  <p className="text-4xl lg:text-5xl font-extrabold text-primary leading-none">{s.value}</p>
                  <p className="mt-2 text-sm font-bold text-muted-foreground max-w-[130px]">{s.label}</p>
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
