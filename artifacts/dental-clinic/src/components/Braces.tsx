import { motion } from 'framer-motion';
import { Sparkles, Clock, Smile } from 'lucide-react';
import { SparkleButton } from '@/components/SparkleButton';

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
            <div className="relative rounded-[2.5rem] p-8 glass-card">
              <img src="/braces.png" alt="Clear dental aligners and braces" className="w-full drop-shadow-2xl" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 glass-card">
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
                  whileHover={{ y: -6 }}
                  className="rounded-2xl p-5 glass-card glass-hover"
                >
                  <f.icon className="text-primary mb-3" size={24} />
                  <h4 className="font-extrabold text-foreground text-sm">{f.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>

            <SparkleButton href="#contact" className="mt-9">
              Start your alignment
            </SparkleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
