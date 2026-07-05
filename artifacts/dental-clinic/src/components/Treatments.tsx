import { motion } from 'framer-motion';
import { Stethoscope, Sparkles, Layers, Smile, ShieldPlus, Baby, Syringe, Gem } from 'lucide-react';

const treatments = [
  { icon: Stethoscope, title: 'General Dentistry', text: 'Check-ups, cleanings and fillings that keep your mouth healthy.' },
  { icon: Sparkles, title: 'Teeth Whitening', text: 'Professional brightening for a confident, radiant smile.' },
  { icon: Layers, title: 'Dental Implants', text: 'Permanent, natural-looking replacements for missing teeth.' },
  { icon: Smile, title: 'Braces & Aligners', text: 'Discreet orthodontics tailored to your bite and lifestyle.' },
  { icon: Gem, title: 'Veneers', text: 'Custom porcelain veneers for a flawless, even smile.' },
  { icon: ShieldPlus, title: 'Root Canal', text: 'Gentle, pain-free therapy that saves your natural tooth.' },
  { icon: Baby, title: 'Kids Dentistry', text: 'Friendly, calming care that makes visits fun for children.' },
  { icon: Syringe, title: 'Gum Care', text: 'Advanced periodontal treatment for healthy gums.' },
];

export function Treatments() {
  return (
    <section id="treatments" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-7xl md:text-8xl font-extrabold text-muted-foreground/20 leading-none">Available</p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-foreground -mt-2">
              Treatments
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            At Zenvia, we offer a wide range of treatments — from routine cleanings and fillings
            to advanced implants and cosmetic dentistry. Personalized care for all your dental needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {treatments.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl p-7 glass-card glass-hover overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <t.icon className="text-primary" size={26} />
              </div>
              <h3 className="text-lg font-extrabold text-foreground">
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
