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
    <section id="book" className="py-40 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto glass rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl bg-white border border-slate-100">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10 items-center">
            <div className="reveal-up">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight font-display text-slate-900 leading-[1.1]">Start Your<br/>Journey.</h2>
              <p className="text-xl text-slate-600 mb-12 font-medium">
                Book a consultation today and discover how we can transform your smile with state-of-the-art precision.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 glass p-6 rounded-2xl bg-slate-50/50">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Call Us</h4>
                    <p className="text-slate-600 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 glass p-6 rounded-2xl bg-slate-50/50">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Location</h4>
                    <p className="text-slate-600 font-medium">123 Innovation Drive, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-up bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 font-display">Request Received!</h3>
                  <p className="text-slate-600 text-lg mb-8 font-medium">Our team will contact you shortly to confirm your appointment details.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Book another appointment
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-slate-700 tracking-wide uppercase mb-2 block">Full Name</label>
                    <input 
                      {...register('name')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-bold text-slate-700 tracking-wide uppercase mb-2 block">Phone Number</label>
                    <input 
                      {...register('phone')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
                      placeholder="(555) 000-0000"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-slate-700 tracking-wide uppercase mb-2 block">Service</label>
                      <select 
                        {...register('service')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium appearance-none"
                      >
                        <option value="">Select...</option>
                        <option value="whitening">Teeth Whitening</option>
                        <option value="orthodontics">Orthodontics</option>
                        <option value="implants">Implants</option>
                        <option value="general">General Checkup</option>
                        <option value="cosmetic">Cosmetic</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-slate-700 tracking-wide uppercase mb-2 block">Preferred Date</label>
                      <input 
                        type="date"
                        {...register('date')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                    </div>
                  </div>

                  <MagneticButton 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 group disabled:opacity-70 mt-4"
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
