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
    <section id="faq" className="py-40 bg-slate-50 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-slate-900 font-display">Common Questions.</h2>
          <p className="text-xl text-slate-600 font-medium">Everything you need to know about the Lumina experience.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden reveal-up transition-all hover:shadow-lg hover:border-primary/30"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <button 
                className="w-full px-8 py-8 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-xl font-bold text-slate-900 font-display tracking-tight pr-8">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}
                >
                  <ChevronDown />
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
                    <div className="px-8 pb-8 text-slate-600 leading-relaxed font-medium text-lg">
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
