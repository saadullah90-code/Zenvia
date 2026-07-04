import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Smile, Sparkles, Activity, Shield, Stethoscope, Baby } from 'lucide-react';

const services = [
  { id: 1, title: 'Teeth Whitening', desc: 'Advanced laser whitening for a brighter, glowing smile.', icon: Sparkles },
  { id: 2, title: 'Orthodontics', desc: 'Invisible aligners and modern braces for perfect alignment.', icon: Smile },
  { id: 3, title: 'Implants', desc: 'Permanent, natural-looking replacements for missing teeth.', icon: Shield },
  { id: 4, title: 'Root Canal', desc: 'Painless endodontic therapy using microscopic precision.', icon: Activity },
  { id: 5, title: 'Cosmetic', desc: 'Veneers and bonding to redesign your smile aesthetic.', icon: Stethoscope },
  { id: 6, title: 'Pediatric', desc: 'Gentle, stress-free care designed specially for children.', icon: Baby },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

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
      className="relative w-full aspect-square rounded-3xl glass p-8 flex flex-col justify-between cursor-pointer group hover:bg-white/60 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(-10px)" }}></div>
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
      </div>
      <p className="text-slate-600 font-medium leading-relaxed" style={{ transform: "translateZ(20px)" }}>
        {service.desc}
      </p>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-up">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Comprehensive Care.</h2>
          <p className="text-xl text-slate-600">
            A full spectrum of advanced dental treatments tailored to your unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
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
