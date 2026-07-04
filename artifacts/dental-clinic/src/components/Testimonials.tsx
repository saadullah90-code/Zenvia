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
    treatment: "Laser Whitening"
  },
  {
    name: "James D.",
    quote: "From the futuristic waiting room to the precision of the treatments, everything here feels lightyears ahead of normal clinics.",
    rating: 5,
    treatment: "Full Restoration"
  },
  {
    name: "Emily R.",
    quote: "I used to have severe dental anxiety, but the team here completely changed my perspective. Truly a premium experience.",
    rating: 5,
    treatment: "General Care"
  },
  {
    name: "Michael T.",
    quote: "Got my invisible aligners here. The 3D scanning process was quick, and the results have exceeded my expectations.",
    rating: 5,
    treatment: "Orthodontics"
  },
  {
    name: "Jessica W.",
    quote: "Every detail is thoughtfully designed. It doesn't even feel like a dental clinic, more like a luxury spa.",
    rating: 5,
    treatment: "Cosmetic"
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // Continuous marquee animation
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1
    });
  }, []);

  return (
    <section id="testimonials" className="py-40 bg-slate-50 relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 mb-20 text-center reveal-up">
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight font-display text-slate-900">Patient Stories.</h2>
        <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
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
              className="w-[350px] md:w-[450px] shrink-0 glass rounded-[2rem] p-10 hover:-translate-y-2 transition-transform duration-500 cursor-pointer shadow-lg hover:shadow-2xl bg-white/60"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-1 text-primary">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  {t.treatment}
                </div>
              </div>
              <p className="text-xl text-slate-700 font-medium mb-10 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {t.name.charAt(0)}
                </div>
                <p className="font-bold text-slate-900 tracking-wide text-lg">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
