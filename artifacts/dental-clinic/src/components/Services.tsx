import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Smile, Sparkles, Activity, Shield, Stethoscope, Baby } from 'lucide-react';

const services = [
  { id: 1, title: 'Teeth Whitening', desc: 'Advanced laser whitening for a brighter, glowing smile.', icon: Sparkles, bgPattern: 'radial-gradient(circle at 20% 20%, rgba(11,99,246,0.1) 0%, transparent 50%)' },
  { id: 2, title: 'Orthodontics', desc: 'Invisible aligners and modern braces for perfect alignment.', icon: Smile, bgPattern: 'linear-gradient(135deg, rgba(11,99,246,0.05) 0%, transparent 100%)' },
  { id: 3, title: 'Implants', desc: 'Permanent, natural-looking replacements for missing teeth.', icon: Shield, bgPattern: 'radial-gradient(circle at 80% 80%, rgba(11,99,246,0.1) 0%, transparent 50%)' },
  { id: 4, title: 'Root Canal', desc: 'Painless endodontic therapy using microscopic precision.', icon: Activity, bgPattern: 'linear-gradient(45deg, transparent 0%, rgba(11,99,246,0.05) 100%)' },
  { id: 5, title: 'Cosmetic', desc: 'Veneers and bonding to redesign your smile aesthetic.', icon: Stethoscope, bgPattern: 'radial-gradient(circle at 50% 0%, rgba(11,99,246,0.1) 0%, transparent 60%)' },
  { id: 6, title: 'Pediatric', desc: 'Gentle, stress-free care designed specially for children.', icon: Baby, bgPattern: 'radial-gradient(circle at 0% 100%, rgba(11,99,246,0.1) 0%, transparent 60%)' },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-square rounded-[2rem] glass-dark p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#0f1524] transition-colors shadow-2xl hover:shadow-[0_20px_60px_rgba(11,99,246,0.2)] hover:-translate-y-2 duration-500 overflow-hidden border border-white/5 hover:border-primary/30"
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
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-40 bg-[#0A0E1A] relative overflow-hidden">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-[1000px] max-w-7xl mx-auto">
          {services.map((service, i) => (
            <div key={service.id} className="reveal-up" style={{ transitionDelay: `${i * 100}ms` }}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
