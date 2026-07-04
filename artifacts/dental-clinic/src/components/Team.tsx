import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Cosmetic Dentist",
    image: "/team-1.png",
    bio: "Pioneer in laser dentistry with 15+ years crafting perfect smiles."
  },
  {
    name: "Dr. Michael Chen",
    role: "Orthodontic Specialist",
    image: "/team-2.png",
    bio: "Expert in invisible alignment and structural jaw correction."
  }
];

export function Team() {
  return (
    <section id="team" className="py-32 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-up">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Meet the Masters.</h2>
          <p className="text-xl text-slate-600">
            World-renowned specialists dedicated to the art and science of dentistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              className="group relative rounded-[2.5rem] overflow-hidden glass p-4 reveal-up"
              whileHover={{ y: -10 }}
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white">
                  <p className="text-lg font-medium">{member.bio}</p>
                </div>
              </div>
              <div className="text-center px-4 pb-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
