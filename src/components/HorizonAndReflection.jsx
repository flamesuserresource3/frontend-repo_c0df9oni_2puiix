import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function useStarfield(count = 60) {
  const [stars, setStars] = useState(() =>
    Array.from({ length: count }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: randomRange(0.3, 1.6),
    }))
  );
  return [stars, setStars];
}

export default function HorizonAndReflection() {
  const canvasRef = useRef(null);
  const [stars] = useStarfield(70);
  const [selected, setSelected] = useState([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const g = ctx.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, '#0b0e16');
      g.addColorStop(1, '#090b12');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(180, 160, 255, 0.8)';
        ctx.arc(s.x * width, s.y * height * 0.8, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Selection lines
      if (selected.length > 1) {
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(selected[0].x, selected[0].y);
        for (let i = 1; i < selected.length; i++) {
          ctx.lineTo(selected[i].x, selected[i].y);
        }
        ctx.stroke();
      }

      // Horizon water reflection
      const horizonY = height * 0.82;
      ctx.fillStyle = 'rgba(120, 120, 200, 0.06)';
      ctx.fillRect(0, horizonY, width, height - horizonY);

      raf = requestAnimationFrame(draw);
    }

    function onResize() {
      resize();
    }

    resize();
    draw();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [stars, selected]);

  function handleClick(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Snap to nearest star
    let nearest = null;
    let minD = Infinity;
    for (const s of stars) {
      const sx = s.x * rect.width;
      const sy = s.y * rect.height * 0.8;
      const d = Math.hypot(sx - x, sy - y);
      if (d < minD) {
        minD = d;
        nearest = { x: sx, y: sy };
      }
    }

    if (nearest && minD < 40) {
      const next = [...selected, nearest];
      setSelected(next);
      if (next.length >= 6) setComplete(true);
    }
  }

  function reset() {
    setSelected([]);
    setComplete(false);
  }

  return (
    <section className="relative bg-[#090b12] text-white">
      <div className="mx-auto max-w-6xl px-0 sm:px-10">
        <div className="px-6 sm:px-0 py-20">
          <p className="text-sm tracking-[0.35em] uppercase text-violet-200/80">The Dream · The Horizon</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-white/95">Connect the constellations</h2>
          <p className="mt-3 max-w-3xl text-violet-100/80">
            Draw your own path across the night. Each connection is an intention — Unity, Innovation,
            Emotion, Impact.
          </p>
        </div>
      </div>

      <div className="relative h-[60vh] w-full">
        <canvas ref={canvasRef} onClick={handleClick} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-black/40" />
        {complete ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="rounded-2xl border border-violet-300/20 bg-black/30 px-6 py-4 backdrop-blur-sm">
              <p className="text-xl sm:text-2xl font-medium text-violet-100/90">Rishika’s Journey</p>
            </div>
          </motion.div>
        ) : null}
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 pb-24">
        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={reset}
            className="rounded-full border border-violet-300/20 bg-white/5 px-4 py-2 text-sm text-violet-100/90 hover:bg-white/10"
          >
            Reset
          </button>
          <p className="text-violet-200/70 text-sm">Click nearby stars to connect them.</p>
        </div>

        {/* Reflection + Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-sm tracking-[0.35em] uppercase text-violet-200/80">The Reflection · The Soul of Code</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-white/95">Experiences that move hearts</h3>
            <p className="mt-3 max-w-xl text-violet-100/80">
              I build what I believe in — systems and stories where logic serves emotion. Calm,
              intentional, and endlessly curious.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-4">
            <a
              href="#"
              className="rounded-xl border border-violet-300/20 bg-white/5 px-4 py-3 text-sm text-violet-100/90 hover:bg-white/10"
            >
              Resume
            </a>
            <a
              href="#"
              className="rounded-xl border border-violet-300/20 bg-white/5 px-4 py-3 text-sm text-violet-100/90 hover:bg-white/10"
            >
              Projects
            </a>
            <a
              href="#"
              className="rounded-xl border border-violet-300/20 bg-white/5 px-4 py-3 text-sm text-violet-100/90 hover:bg-white/10"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="rounded-xl border border-violet-300/20 bg-white/5 px-4 py-3 text-sm text-violet-100/90 hover:bg-white/10"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-16 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
        <p className="py-10 text-center text-xs tracking-widest text-violet-200/60">
          © {new Date().getFullYear()} · Rishika Lawankar · Calm Futures, Precise Hands
        </p>
      </div>
    </section>
  );
}
