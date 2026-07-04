import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Cosmetic Dentist",
    image: "/team-1.png",
    bio: "Pioneer in laser dentistry with 15+ years crafting perfect smiles.",
    stats: "10k+ Smiles"
  },
  {
    name: "Dr. Michael Chen",
    role: "Orthodontic Specialist",
    image: "/team-2.png",
    bio: "Expert in invisible alignment and structural jaw correction.",
    stats: "Top 1% Invisalign"
  }
];

export function Team() {
  useEffect(() => {
    gsap.utils.toArray('.team-card').forEach((card: any) => {
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="team" className="py-40 bg-slate-50 relative border-t border-slate-200/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 font-display">Meet the Masters.</h2>
          <p className="text-xl text-slate-600 font-medium">
            World-renowned specialists dedicated to the art and science of dentistry. 
            Precision crafted by the best in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="team-card group relative rounded-[2.5rem] overflow-hidden glass p-4 bg-white/80 hover:bg-white transition-colors duration-500 shadow-xl"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-8">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glow ring on hover */}
                <div className="absolute inset-0 border-4 border-primary/0 group-hover:border-primary/50 rounded-[2rem] transition-colors duration-500 z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white z-20">
                  <div className="inline-block bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    {member.stats}
                  </div>
                  <p className="text-lg font-medium leading-relaxed">{member.bio}</p>
                </div>
              </div>
              <div className="text-center px-4 pb-6">
                <h3 className="text-3xl font-black text-slate-900 mb-2 font-display">{member.name}</h3>
                <p className="text-primary font-bold tracking-wide uppercase text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
