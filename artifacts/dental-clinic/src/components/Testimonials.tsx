import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah L.",
    quote: "The most comfortable dental experience I've ever had. The laser whitening was completely painless and the results are stunning.",
    rating: 5,
    treatment: "Laser Whitening",
    image: "/testi-1.png"
  },
  {
    name: "James D.",
    quote: "From the futuristic waiting room to the precision of the treatments, everything here feels lightyears ahead of normal clinics.",
    rating: 5,
    treatment: "Full Restoration",
    image: "/testi-2.png"
  },
  {
    name: "Emily R.",
    quote: "I used to have severe dental anxiety, but the team here completely changed my perspective. Truly a premium experience.",
    rating: 5,
    treatment: "General Care",
    image: "/testi-3.png"
  },
  {
    name: "Michael T.",
    quote: "Got my invisible aligners here. The 3D scanning process was quick, and the results have exceeded my expectations.",
    rating: 5,
    treatment: "Orthodontics",
    image: "/testi-2.png"
  },
  {
    name: "Jessica W.",
    quote: "Every detail is thoughtfully designed. It doesn't even feel like a dental clinic, more like a luxury spa.",
    rating: 5,
    treatment: "Cosmetic",
    image: "/testi-1.png"
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous marquee animation
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1
      });

      // Simple stagger reveal for the cards when entering view
      gsap.fromTo('.testi-card-reveal',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="py-40 bg-[#05070D] relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 mb-24 text-center reveal-up">
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight font-display text-white">Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Stories.</span></h2>
        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
          Don't just take our word for it. Hear what our patients have to say about their transformations.
        </p>
      </div>

      <div className="relative z-10 flex overflow-hidden w-full group py-8">
        <div 
          ref={trackRef}
          className="flex gap-8 px-4 w-[200%] md:w-max shrink-0"
        >
          {/* Duplicate the array to create a seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="testi-card-reveal w-[350px] md:w-[450px] shrink-0 glass-dark rounded-[2.5rem] p-10 hover:-translate-y-4 transition-all duration-500 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(11,99,246,0.15)] border border-white/5 hover:border-primary/30"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex gap-1 text-primary drop-shadow-[0_0_8px_rgba(11,99,246,0.8)]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                  {t.treatment}
                </div>
              </div>
              <p className="text-xl text-slate-300 font-medium mb-12 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_15px_rgba(11,99,246,0.2)]">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white tracking-wide text-lg font-display">{t.name}</p>
                  <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Verified Patient</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
