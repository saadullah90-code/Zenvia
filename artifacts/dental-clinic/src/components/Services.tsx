import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, Sparkles, Activity, Shield, Stethoscope, Baby } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: 'Teeth Whitening', desc: 'Advanced laser whitening for a brighter, glowing smile.', icon: Sparkles, bgPattern: 'radial-gradient(circle at 20% 20%, rgba(11,99,246,0.1) 0%, transparent 50%)' },
  { id: 2, title: 'Orthodontics', desc: 'Invisible aligners and modern braces for perfect alignment.', icon: Smile, bgPattern: 'linear-gradient(135deg, rgba(11,99,246,0.05) 0%, transparent 100%)' },
  { id: 3, title: 'Implants', desc: 'Permanent, natural-looking replacements for missing teeth.', icon: Shield, bgPattern: 'radial-gradient(circle at 80% 80%, rgba(11,99,246,0.1) 0%, transparent 50%)' },
  { id: 4, title: 'Root Canal', desc: 'Painless endodontic therapy using microscopic precision.', icon: Activity, bgPattern: 'linear-gradient(45deg, transparent 0%, rgba(11,99,246,0.05) 100%)' },
  { id: 5, title: 'Cosmetic', desc: 'Veneers and bonding to redesign your smile aesthetic.', icon: Stethoscope, bgPattern: 'radial-gradient(circle at 50% 0%, rgba(11,99,246,0.1) 0%, transparent 60%)' },
  { id: 6, title: 'Pediatric', desc: 'Gentle, stress-free care designed specially for children.', icon: Baby, bgPattern: 'radial-gradient(circle at 0% 100%, rgba(11,99,246,0.1) 0%, transparent 60%)' },
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Smooth 3D hover using GSAP quickTo
    const xTo = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(x * 20); // 20 deg rotation max
      yTo(-y * 20);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(cardRef.current, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "power3.out" });
    };

    cardRef.current.addEventListener('mousemove', handleMouseMove);
    cardRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardRef.current?.removeEventListener('mousemove', handleMouseMove);
      cardRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      className="service-card relative w-full aspect-square rounded-[2rem] glass-dark p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#0f1524] transition-colors shadow-2xl overflow-hidden border border-white/5 hover:border-primary/30"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="absolute inset-0 opacity-100 transition-opacity" style={{ background: service.bgPattern }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(-10px)" }}></div>
      
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(11,99,246,0.2)] flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:bg-primary/20">
          <Icon size={32} strokeWidth={2} />
        </div>
        <h3 className="text-3xl font-black text-white mb-4 font-display tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
      </div>
      
      <p className="text-slate-400 font-medium leading-relaxed relative z-10" style={{ transform: "translateZ(20px)" }}>
        {service.desc}
      </p>

      {/* Decorative arrow */}
      <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 bg-white/5" style={{ transform: "translateZ(30px)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </div>
    </div>
  );
}

export function Services() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.service-card', 
        { y: 100, opacity: 0, rotationX: 10 },
        { 
          y: 0, opacity: 1, rotationX: 0, 
          duration: 1, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="py-40 bg-[#0A0E1A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight font-display text-white">Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Care.</span></h2>
          <p className="text-xl text-slate-400 font-medium">
            A full spectrum of advanced dental treatments tailored to your unique needs, powered by tomorrow's technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
