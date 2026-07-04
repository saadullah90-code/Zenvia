import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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

  const links = ['Services', 'About', 'Gallery', 'Team', 'FAQ'];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-black text-gradient tracking-tight">Lumina</div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-700 hover:text-primary transition-colors relative group text-sm uppercase tracking-wider">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="hidden md:block">
            <button className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider hover-elevate hover:shadow-lg hover:shadow-primary/30 transition-all">
              Book Visit
            </button>
          </div>

          <button 
            className="md:hidden text-slate-800"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] glass-dark flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {links.map(link => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-3xl font-bold uppercase tracking-wider hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
              <button className="mt-8 bg-primary text-white px-8 py-4 rounded-full text-xl font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
                Book Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
