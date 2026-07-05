import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return p + Math.floor(Math.random() * 22) + 16;
      });
    }, 45);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex flex-col items-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-10"
        >
          <span className="text-4xl font-display font-extrabold text-primary tracking-tight">Denta</span>
          <span className="text-4xl font-display font-extrabold text-foreground tracking-tight">Care</span>
        </motion.div>

        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-[#35c6ff]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
        <p className="mt-6 text-xs font-bold text-muted-foreground uppercase tracking-[0.35em]">
          Preparing your smile
        </p>
      </div>
    </motion.div>
  );
}
