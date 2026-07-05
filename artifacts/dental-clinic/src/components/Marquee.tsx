import { Plus } from 'lucide-react';

const items = ['Braces', 'Zenvia', 'Dentist', 'Dentures', 'Implants', 'Whitening', 'Aligners'];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="relative bg-primary py-6 overflow-hidden select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="text-white/95 text-3xl md:text-4xl font-extrabold px-6 tracking-tight">
              {item}
            </span>
            <Plus className="text-white/50 mx-2" size={28} strokeWidth={3} />
          </div>
        ))}
      </div>
    </section>
  );
}
