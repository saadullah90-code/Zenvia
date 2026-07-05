import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'How often should I visit the dentist?',
    a: 'For most patients we recommend a check-up and clean every six months. If you are undergoing treatment we will tailor a schedule that suits you.',
  },
  {
    q: 'Do you offer painless treatments?',
    a: 'Yes. We use modern anaesthetic techniques and gentle technology so the vast majority of our procedures are completely comfortable.',
  },
  {
    q: 'Are clear aligners as effective as braces?',
    a: 'For most alignment cases, clear aligners deliver excellent results while staying virtually invisible. Our orthodontists will advise the best option for your smile.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Our clinics are open from 10:00 AM to 07:00 PM, and we offer flexible appointment slots throughout the week.',
  },
  {
    q: 'Do you treat children?',
    a: 'Absolutely. Our kids dentistry team creates a calm, friendly experience so children build healthy habits and positive memories.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent mb-3">FAQ</p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              Questions,<br />answered
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xs">
              Can't find what you're looking for? Our friendly team is always happy to help.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-3xl border transition-colors ${
                    isOpen ? 'border-primary bg-primary/5' : 'border-border bg-background'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-6"
                  >
                    <span className="text-lg font-extrabold text-foreground">{f.q}</span>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isOpen ? 'bg-primary text-white rotate-45' : 'bg-white text-primary border border-border'
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
