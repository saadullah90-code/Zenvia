import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';

const services = ['General Check-up', 'Teeth Whitening', 'Braces & Aligners', 'Dental Implants', 'Root Canal', 'Kids Dentistry'];

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="relative rounded-[2.5rem] bg-primary overflow-hidden shadow-glow-blue">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#35c6ff]/30 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-14">
            {/* Left info */}
            <div className="text-white">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70 mb-3">Book Appointment</p>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Ready for your<br />best smile yet?
              </h2>
              <p className="mt-5 text-white/85 max-w-md leading-relaxed">
                Book a visit and our team will confirm your appointment shortly. We're open
                10:00 AM – 07:00 PM, ready to welcome you.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  { icon: Phone, label: '+44 20 1234 5678' },
                  { icon: Mail, label: 'hello@zenvia.com' },
                  { icon: MapPin, label: '12 Smile Street, London, UK' },
                  { icon: Clock, label: 'Open daily · 10:00 AM – 07:00 PM' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                      <c.icon size={18} />
                    </span>
                    <span className="font-semibold">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-7 md:p-8"
            >
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name">
                    <input required type="text" placeholder="Jane Doe" className="input" />
                  </Field>
                  <Field label="Phone">
                    <input required type="tel" placeholder="+44 ..." className="input" />
                  </Field>
                </div>
                <Field label="Email">
                  <input required type="email" placeholder="you@email.com" className="input" />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Service">
                    <select className="input" defaultValue="">
                      <option value="" disabled>Choose one</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred date">
                    <input type="date" className="input" />
                  </Field>
                </div>

                <button
                  type="submit"
                  className={`sparkle-btn mt-2 w-full sm:w-auto ${sent ? 'pointer-events-none' : ''}`}
                >
                  {sent ? (
                    <>
                      <Check size={18} /> <span className="text">Request received</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="20" height="20" className="sparkle" aria-hidden="true">
                        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
                      </svg>
                      <span className="text">Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--muted) / 0.4);
          padding: 0.8rem 1rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
