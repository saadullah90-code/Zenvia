import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function MagneticButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> | any) {
  const ref = React.useRef<HTMLButtonElement>(null);
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

export function Footer() {
  return (
    <footer className="bg-[#0A0E1A] text-white pt-32 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-4xl font-black mb-8 text-white font-display tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Lumina</h3>
            <p className="text-slate-400 max-w-md mb-10 text-lg leading-relaxed">
              The future of dentistry is here. Experience world-class care in a premium, stress-free environment.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <MagneticButton key={social} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(11,99,246,0.3)] group">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/80 group-hover:bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                </MagneticButton>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 font-display tracking-wide uppercase text-white">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Our Team', href: '#team' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Contact', href: '#book' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-primary transition-colors inline-block font-medium">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 font-display tracking-wide uppercase text-white">Contact</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li>123 Innovation Drive</li>
              <li>Tech District, CA 90210</li>
              <li>+1 (555) 123-4567</li>
              <li><a href="mailto:hello@luminadental.com" className="hover:text-primary transition-colors">hello@luminadental.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 font-medium">© {new Date().getFullYear()} Lumina Dental. All rights reserved.</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="mt-6 md:mt-0 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors cursor-pointer relative group flex items-center gap-2 uppercase tracking-widest"
          >
            Developed by <span className="text-primary font-black drop-shadow-[0_0_10px_rgba(11,99,246,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(11,99,246,1)] group-hover:text-white transition-all duration-300">BranX</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
