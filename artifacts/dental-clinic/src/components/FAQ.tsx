import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Does laser teeth whitening hurt?",
    a: "Not at all. Our advanced laser whitening system is designed to be completely painless, minimizing sensitivity while maximizing results in just one session."
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, we believe premium dental care should be accessible. We offer flexible 0% interest financing plans tailored to your budget."
  },
  {
    q: "How often should I have a professional cleaning?",
    a: "We recommend a comprehensive cleaning and checkup every 6 months to maintain optimal oral health and catch potential issues early."
  },
  {
    q: "Are invisible aligners faster than traditional braces?",
    a: "In many cases, yes. Our custom aligner treatments often achieve results in 6-12 months, depending on the complexity of your case."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-40 bg-[#05070D] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white font-display">Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Questions.</span></h2>
          <p className="text-xl text-slate-400 font-medium">Everything you need to know about the Lumina experience.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-[#0A0E1A]/80 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden reveal-up transition-all hover:shadow-[0_0_30px_rgba(11,99,246,0.1)] hover:border-primary/30"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <button 
                className="w-full px-8 py-8 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-xl font-bold text-white font-display tracking-tight pr-8 group-hover:text-primary transition-colors">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? 'bg-primary text-white shadow-[0_0_20px_rgba(11,99,246,0.4)]' : 'bg-white/5 text-slate-400 border border-white/10 group-hover:bg-white/10'}`}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-slate-400 leading-relaxed font-medium text-lg border-t border-white/5 pt-6 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
