import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function HeroScene() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.5 });
  const containerRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      x.set(mx);
      y.set(my);
    };
    const el = containerRef.current;
    if (el) {
      el.addEventListener('pointermove', onMove);
    }
    return () => {
      if (el) el.removeEventListener('pointermove', onMove);
    };
  }, [x, y]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#0b0e16] text-white overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft vignette and cursor glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 800px at 50% -200px, rgba(139,92,246,0.15), transparent 60%)',
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: smoothX, top: smoothY }}
        aria-hidden
      >
        <div
          className="h-64 w-64 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(124,58,237,0.25), rgba(124,58,237,0.12) 35%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      {/* Copy overlay */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="space-y-6">
            <p className="text-sm tracking-[0.35em] uppercase text-violet-200/80">The Beginning · The Spark</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight text-white/95">
              Rishika Lawankar
            </h1>
            <p className="text-lg sm:text-xl text-violet-100/80 max-w-2xl">
              Curiosity began as silence. In the dim between logic and dream, fragments gathered — a
              rhythm of code, patience, and wonder.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-violet-200/80">
              <Badge>Team Leader</Badge>
              <Badge>App Developer · Kotlin</Badge>
              <Badge>Java Specialist</Badge>
              <Badge>Former Frontend Intern · React</Badge>
            </div>
          </div>

          <div className="mt-16 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />

          <p className="mt-6 max-w-xl text-violet-100/70">
            Scroll to drift through chapters. Let the light follow your curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-violet-300/20 bg-white/5 px-3 py-1 text-xs backdrop-blur-sm">
      {children}
    </span>
  );
}
