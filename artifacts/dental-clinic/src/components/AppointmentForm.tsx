import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a preferred date'),
});

type FormValues = z.infer<typeof formSchema>;

export function AppointmentForm() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
  };

  return (
    <section id="book" className="py-32 relative bg-white overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">
              Your journey to a perfect smile begins here.
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Schedule your free consultation today. Our specialists will design a custom treatment plan just for you.
            </p>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-semibold text-lg">+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div className="reveal-up glass p-10 rounded-3xl relative shadow-2xl border border-white/40">
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
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                <p className="text-slate-600 text-lg mb-8">Our team will contact you shortly to confirm your appointment details.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  Book another appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input 
                    {...register('name')}
                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input 
                    {...register('phone')}
                    className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="(555) 000-0000"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Service</label>
                    <select 
                      {...register('service')}
                      className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="whitening">Teeth Whitening</option>
                      <option value="orthodontics">Orthodontics</option>
                      <option value="implants">Implants</option>
                      <option value="general">General Checkup</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date</label>
                    <input 
                      type="date"
                      {...register('date')}
                      className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
