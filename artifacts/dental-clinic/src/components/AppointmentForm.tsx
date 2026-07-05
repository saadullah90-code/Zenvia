import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function MagneticButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> | any) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center overflow-hidden transition-colors ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a preferred date'),
});

type FormValues = z.infer<typeof formSchema>;

export function AppointmentForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  return (
    <section id="book" className="py-40 bg-[#0A0E1A] relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto glass-dark rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10 items-center">
            <div className="reveal-up">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight font-display text-white leading-[1.1]">Start Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Journey.</span></h2>
              <p className="text-xl text-slate-400 mb-12 font-medium">
                Book a consultation today and discover how we can transform your smile with state-of-the-art precision.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(11,99,246,0.3)] text-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Call Us</h4>
                    <p className="text-slate-400 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] text-cyan-400">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Location</h4>
                    <p className="text-slate-400 font-medium">123 Innovation Drive, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-up bg-[#0A0E1A]/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/10 relative">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(11,99,246,0.4)]">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 font-display">Request Received!</h3>
                  <p className="text-slate-400 text-lg mb-8 font-medium">Our team will contact you shortly to confirm your appointment details.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-primary font-bold hover:text-white transition-colors"
                  >
                    Book another appointment
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3 block">Full Name</label>
                    <input 
                      {...register('name')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium placeholder-slate-600"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3 block">Phone Number</label>
                    <input 
                      {...register('phone')}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium placeholder-slate-600"
                      placeholder="(555) 000-0000"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3 block">Service</label>
                      <select 
                        {...register('service')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium appearance-none"
                      >
                        <option value="" className="bg-[#0A0E1A]">Select...</option>
                        <option value="whitening" className="bg-[#0A0E1A]">Teeth Whitening</option>
                        <option value="orthodontics" className="bg-[#0A0E1A]">Orthodontics</option>
                        <option value="implants" className="bg-[#0A0E1A]">Implants</option>
                        <option value="general" className="bg-[#0A0E1A]">General Checkup</option>
                        <option value="cosmetic" className="bg-[#0A0E1A]">Cosmetic</option>
                      </select>
                      {errors.service && <p className="text-red-400 text-sm mt-2">{errors.service.message}</p>}
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3 block">Preferred Date</label>
                      <input 
                        type="date"
                        {...register('date')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium [color-scheme:dark]"
                      />
                      {errors.date && <p className="text-red-400 text-sm mt-2">{errors.date.message}</p>}
                    </div>
                  </div>

                  <MagneticButton 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(11,99,246,0.3)] hover:shadow-[0_0_50px_rgba(11,99,246,0.5)] transition-shadow group disabled:opacity-70 mt-4 uppercase tracking-wider"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
