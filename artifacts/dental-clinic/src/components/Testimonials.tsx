import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah L.",
    quote: "The most comfortable dental experience I've ever had. The laser whitening was completely painless and the results are stunning.",
    rating: 5
  },
  {
    name: "James D.",
    quote: "From the futuristic waiting room to the precision of the treatments, everything here feels lightyears ahead of normal clinics.",
    rating: 5
  },
  {
    name: "Emily R.",
    quote: "I used to have severe dental anxiety, but the team here completely changed my perspective. Truly a premium experience.",
    rating: 5
  },
  {
    name: "Michael T.",
    quote: "Got my invisible aligners here. The 3D scanning process was quick, and the results have exceeded my expectations.",
    rating: 5
  },
  {
    name: "Jessica W.",
    quote: "Every detail is thoughtfully designed. It doesn't even feel like a dental clinic, more like a luxury spa.",
    rating: 5
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
      duration: 20,
      repeat: -1
    });
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-slate-900 relative overflow-hidden text-white" ref={containerRef}>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 mb-16 text-center reveal-up">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Patient Stories.</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
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
              className="w-[350px] md:w-[450px] shrink-0 glass-dark rounded-3xl p-8 hover:scale-[1.02] transition-transform hover:bg-white/5 cursor-pointer"
            >
              <div className="flex gap-1 mb-6 text-cyan-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <p className="font-bold text-white tracking-wide">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
