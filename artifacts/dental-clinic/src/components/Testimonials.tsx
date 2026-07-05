import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'Invisalign patient',
    img: '/patient-smiling.jpg',
    text: 'The whole team made me feel completely at ease. My aligners were painless and my smile has never looked better.',
  },
  {
    name: 'James Carter',
    role: 'Implant patient',
    img: '/dentist-portrait.jpg',
    text: 'I was nervous about implants, but Zenvia explained every step. The result feels exactly like my own teeth.',
  },
  {
    name: 'Amelia Brooks',
    role: 'Whitening patient',
    img: '/healthy-smile.jpg',
    text: 'Modern, spotless clinic and genuinely caring staff. My whitening results were incredible in a single visit.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
            Smiles that speak <span className="text-primary">for us</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative rounded-3xl bg-white border border-border p-8 shadow-soft"
            >
              <Quote className="text-primary/20 absolute top-6 right-6" size={44} />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={18} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed relative z-10">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-7 pt-6 border-t border-border">
                <img src={r.img} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-extrabold text-foreground text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
