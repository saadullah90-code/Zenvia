import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

const pairs = [
  {
    problem: 'Tooth decay & cavities',
    detail: 'Plaque build-up quietly erodes enamel, causing pain and sensitivity.',
    solution: 'Painless fillings & preventive sealants',
    result: 'We restore the tooth and protect it from future decay in a single visit.',
  },
  {
    problem: 'Crooked or gapped teeth',
    detail: 'Misalignment affects your bite, cleaning, and confidence when you smile.',
    solution: 'Braces & invisible aligners',
    result: 'A guided, comfortable plan gently moves teeth into perfect position.',
  },
  {
    problem: 'Missing teeth',
    detail: 'Gaps shift neighbouring teeth and weaken the jaw over time.',
    solution: 'Implants & natural dentures',
    result: 'Durable, natural-looking replacements that feel like your own teeth.',
  },
  {
    problem: 'Stained & dull smile',
    detail: 'Coffee, tea, and time leave teeth looking tired and discoloured.',
    solution: 'Professional whitening',
    result: 'A brighter, radiant smile in one clinical whitening session.',
  },
];

export function Problems() {
  return (
    <section id="problems" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
      <div className="container mx-auto px-5 relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent mb-3">Problems &amp; Solutions</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
            Every problem has a <span className="text-primary">smile-first</span> solution
          </h2>
          <p className="mt-5 text-muted-foreground">
            Whatever brings you in, we pair it with a clear, gentle treatment plan — so you always
            know what is happening and why.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pairs.map((p, i) => (
            <motion.div
              key={p.problem}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-3xl border border-border bg-background overflow-hidden shadow-soft"
            >
              <div className="grid sm:grid-cols-2">
                {/* Problem */}
                <div className="p-7 border-b sm:border-b-0 sm:border-r border-border">
                  <div className="flex items-center gap-2 text-accent mb-3">
                    <AlertTriangle size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Problem</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">{p.problem}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
                </div>
                {/* Solution */}
                <div className="p-7 bg-primary/5">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <ShieldCheck size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Solution</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-primary">{p.solution}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.result}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-7 py-4 bg-foreground text-white">
                <span className="text-sm font-bold">Book a consultation for this</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
