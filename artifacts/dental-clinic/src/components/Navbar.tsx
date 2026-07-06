import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SparkleButton } from '@/components/SparkleButton';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Braces', href: '#braces' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container mx-auto px-5">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled ? 'glass-card px-4 sm:px-6 py-2.5' : 'px-2 py-1'
            }`}
          >
            <a href="#home" className="flex items-center text-2xl tracking-tight">
              <span className="font-extrabold text-primary">Zen</span>
              <span className="font-extrabold text-foreground">via</span>
            </a>

            <nav className="hidden lg:flex items-center gap-9">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="relative text-sm font-bold text-foreground/70 hover:text-primary transition-colors group"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <SparkleButton href="#contact" size="sm">
                Book Appointment
              </SparkleButton>
            </div>

            <button
              className="lg:hidden text-foreground glass-card p-2.5 rounded-full"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-foreground bg-muted p-2.5 rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-7">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.15 }}
                  className="text-4xl font-extrabold text-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <SparkleButton href="#contact" size="lg" className="mt-6" onClick={() => setOpen(false)}>
                Book Appointment
              </SparkleButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
