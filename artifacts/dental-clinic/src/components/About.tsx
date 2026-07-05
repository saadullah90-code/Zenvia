import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const tags = [
  { label: 'Dental Care', img: '/clinic-interior.jpg', className: 'top-4 left-4' },
  { label: 'Dentures', img: '/patient-smiling.jpg', className: 'top-4 right-4' },
  { label: 'Teeth Alignment', img: '/dentist-portrait.jpg', className: 'bottom-4 right-4' },
  { label: 'Dental Treatments', img: '/teeth-cleaning.jpg', className: 'bottom-4 left-4' },
];

const points = [
  'Advanced technology with a gentle, personal touch',
  'Certified specialists across every dental field',
  'Comfortable, welcoming clinics built around you',
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="relative py-24 md:py-32 bg-background overflow-hidden" ref={ref}>
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — heading */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-7xl md:text-8xl font-extrabold text-muted-foreground/25 leading-none"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-5xl md:text-6xl font-extrabold text-foreground -mt-2"
            >
              Zen<span className="text-primary">via</span>
            </motion.h2>

            <div className="mt-8 max-w-md">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent mb-3">Our Vision</p>
              <p className="text-muted-foreground leading-relaxed">
                At Zenvia, our vision is to blend advanced technology with compassionate care to
                create a welcoming space. We aim to inspire confident, healthy smiles through
                innovation and treatment personalized to every patient.
              </p>

              <ul className="mt-8 space-y-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="text-foreground/80 font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — image mosaic */}
          <div className="grid grid-cols-2 gap-4">
            {tags.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl p-1.5 glass-card glass-hover ${
                  i % 2 === 0 ? 'mt-0' : 'mt-8'
                }`}
              >
                <div className="relative rounded-[1.4rem] overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.label}
                    className="w-full h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md border border-white/60 px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow">
                    {t.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
