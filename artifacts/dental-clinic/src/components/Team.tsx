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
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.team-card').forEach((card: any) => {
        gsap.fromTo(card,
          { clipPath: 'inset(100% 0 0 0)', y: 50 },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="py-40 bg-[#0A0E1A] relative border-t border-white/5 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 reveal-up">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white font-display">Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Masters.</span></h2>
          <p className="text-xl text-slate-400 font-medium">
            World-renowned specialists dedicated to the art and science of dentistry. 
            Precision crafted by the best in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="team-card group relative rounded-[2.5rem] overflow-hidden glass-dark p-4 hover:bg-[#0f1524] transition-colors duration-500 shadow-2xl border border-white/5 hover:border-primary/30"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-8 bg-[#0A0E1A]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale-[50%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Glow ring on hover */}
                <div className="absolute inset-0 border-[3px] border-primary/0 group-hover:border-primary/50 rounded-[2rem] transition-colors duration-500 z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white z-20">
                  <div className="inline-block bg-primary/20 backdrop-blur-md border border-primary/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(11,99,246,0.3)]">
                    {member.stats}
                  </div>
                  <p className="text-lg font-medium leading-relaxed drop-shadow-md">{member.bio}</p>
                </div>
              </div>
              <div className="text-center px-4 pb-6">
                <h3 className="text-3xl font-black text-white mb-2 font-display tracking-tight group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
