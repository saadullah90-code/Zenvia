import React from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-bold mb-6 text-white">Lumina Dental</h3>
            <p className="text-slate-400 max-w-sm mb-8">
              The future of dentistry is here. Experience world-class care in a premium, stress-free environment.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/80" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'Our Team', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li>123 Innovation Drive</li>
              <li>Tech District, CA 90210</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@luminadental.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Lumina Dental. All rights reserved.</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="mt-4 md:mt-0 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer relative group"
          >
            Developed by BranX
            <span className="absolute -inset-2 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
