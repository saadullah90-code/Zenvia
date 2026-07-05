import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TOOTH =
  'M32 6 C22 6 14 12 14 24 C14 33 16 40 18 48 C19.4 54 20.8 58 24 58 C27 58 27.6 52 28.6 46 C29.3 41.6 30.1 39 32 39 C33.9 39 34.7 41.6 35.4 46 C36.4 52 37 58 40 58 C43.2 58 44.6 54 46 48 C48 40 50 33 50 24 C50 12 42 6 32 6 Z';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        return p + Math.floor(Math.random() * 6) + 4;
      });
    }, 70);
    return () => clearInterval(timer);
  }, [onComplete]);

  const p = Math.min(progress, 100) / 100;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* soft glow */}
      <div className="absolute w-[320px] h-[320px] rounded-full bg-primary/15 blur-[90px]" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 64 64" width="132" height="132" className="drop-shadow-[0_12px_30px_rgba(20,120,200,0.35)]">
            <defs>
              <clipPath id="toothFill">
                <rect x="0" y={64 * (1 - p)} width="64" height={64 * p} />
              </clipPath>
              <linearGradient id="toothGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="#35c6ff" />
              </linearGradient>
            </defs>
            {/* faint base tooth */}
            <path d={TOOTH} fill="hsl(var(--primary) / 0.10)" />
            {/* rising fill */}
            <path d={TOOTH} fill="url(#toothGrad)" clipPath="url(#toothFill)" />
            {/* self-drawing outline */}
            <motion.path
              d={TOOTH}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-4xl font-display font-extrabold tracking-tight"
        >
          <span className="text-primary">Zen</span>
          <span className="text-foreground">via</span>
        </motion.div>

        <div className="mt-6 w-56 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-[#35c6ff]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
        <p className="mt-5 text-xs font-bold text-muted-foreground uppercase tracking-[0.35em]">
          Preparing your smile
        </p>
      </div>
    </motion.div>
  );
}
