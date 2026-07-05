import { motion } from 'framer-motion';
import { Sparkles, Clock, Smile, ArrowUpRight } from 'lucide-react';

const features = [
  { icon: Smile, title: 'Invisible aligners', text: 'Clear, removable trays that straighten discreetly.' },
  { icon: Sparkles, title: 'Ceramic braces', text: 'Tooth-coloured brackets that blend right in.' },
  { icon: Clock, title: 'Faster results', text: 'Modern systems shorten treatment time.' },
];

export function Braces() {
  return (
    <section id="braces" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-white to-primary/10 border border-white p-8 shadow-soft">
              <img src="/braces.png" alt="Clear dental aligners and braces" className="w-full drop-shadow-2xl" />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-soft px-5 py-4 border border-border">
              <p className="text-3xl font-extrabold text-primary leading-none">98%</p>
              <p className="text-xs font-semibold text-muted-foreground mt-1">patient satisfaction</p>
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent mb-3">Braces &amp; Aligners</p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              Straighten your smile, <span className="text-primary">quietly</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              From invisible aligners to modern ceramic braces, our orthodontists design a plan around
              your lifestyle — comfortable, discreet, and built for lasting results.
            </p>

            <div className="mt-9 grid sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white border border-border p-5 shadow-soft"
                >
                  <f.icon className="text-primary mb-3" size={24} />
                  <h4 className="font-extrabold text-foreground text-sm">{f.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-bold shadow-glow-blue hover:-translate-y-0.5 transition-transform"
            >
              Start your alignment
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
