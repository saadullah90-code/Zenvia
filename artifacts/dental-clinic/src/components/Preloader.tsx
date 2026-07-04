import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 150);
          return 100;
        }
        return p + Math.floor(Math.random() * 25) + 20;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A0E1A]"
        exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      >
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="flex flex-col items-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(11,99,246,0.5)] mb-12 border border-white/20"
          >
            <span className="text-white text-4xl font-black font-display">L</span>
          </motion.div>
          
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(11,99,246,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <p className="text-white text-3xl font-display font-black tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {Math.min(progress, 100)}%
            </p>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mt-2">Loading System</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
