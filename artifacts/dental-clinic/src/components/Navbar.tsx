import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Services', 'About', 'Gallery', 'Team', 'Testimonials', 'FAQ'];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0A0E1A]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-3xl font-black text-white tracking-tight font-display drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Lumina</div>
          
          <nav className="hidden lg:flex items-center gap-10 font-bold">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-300 hover:text-white transition-colors relative group text-xs uppercase tracking-widest">
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full shadow-[0_0_10px_rgba(11,99,246,0.8)]"></span>
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:block">
            <MagneticButton className="bg-primary text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(11,99,246,0.4)] hover:shadow-[0_0_30px_rgba(11,99,246,0.6)]">
              Book Visit
            </MagneticButton>
          </div>

          <button 
            className="lg:hidden text-white bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#0A0E1A] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.05]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <button 
              className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full z-10 border border-white/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-8 relative z-10">
              {links.map((link, i) => (
                <motion.a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-white text-4xl font-black uppercase tracking-wider hover:text-primary transition-colors font-display drop-shadow-md"
                >
                  {link}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 + 0.2 }}
              >
                <button className="mt-8 bg-primary text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(11,99,246,0.5)] border border-primary/50">
                  Book Visit
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
