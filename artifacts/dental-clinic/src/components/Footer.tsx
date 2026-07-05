import { ArrowUpRight } from 'lucide-react';

const cols = [
  { title: 'Treatments', links: ['General Dentistry', 'Teeth Whitening', 'Implants', 'Braces & Aligners'] },
  { title: 'Clinic', links: ['About Us', 'Our Vision', 'Testimonials', 'FAQ'] },
  { title: 'Contact', links: ['Book Appointment', 'Opening Hours', 'Find Us', 'Emergencies'] },
];

export function Footer() {
  return (
    <footer className="relative bg-foreground text-white pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-1 text-3xl tracking-tight">
              <span className="font-extrabold text-primary">Denta</span>
              <span className="font-extrabold text-white">Care</span>
            </div>
            <p className="mt-5 text-white/60 max-w-xs leading-relaxed">
              Premium dental care that blends advanced technology with a warm, personal touch.
              Because every smile matters.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold shadow-glow-orange hover:-translate-y-0.5 transition-transform"
            >
              Book Appointment <ArrowUpRight size={17} />
            </a>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-extrabold text-white mb-5">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/60 hover:text-primary transition-colors text-sm font-semibold">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} Denta Care. All rights reserved.</p>
          <p className="text-sm font-semibold text-white/60">
            Developed by{' '}
            <span className="font-extrabold text-primary drop-shadow-[0_0_12px_rgba(20,160,230,0.9)]">
              BranX
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
