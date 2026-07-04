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
    <section id="faq" className="py-32 bg-slate-50 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Common Questions.</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden reveal-up transition-shadow hover:shadow-md"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <button 
                className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg font-bold text-slate-900">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-primary" />
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
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
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
