import { useState } from 'react';
import { motion } from 'framer-motion';

const parts = [
  { id: 'sensor-index', label: 'Index Sensor', desc: 'Gesture detection · precision mapping' },
  { id: 'sensor-thumb', label: 'Thumb Sensor', desc: 'Adaptive touch · nuanced input' },
  { id: 'imu', label: 'IMU Module', desc: 'Orientation · motion awareness' },
  { id: 'processor', label: 'Microcontroller', desc: 'Signal fusion · low-latency' },
  { id: 'bluetooth', label: 'Wireless Link', desc: 'Seamless device communication' },
];

export default function ProjectGlove() {
  const [active, setActive] = useState(parts[0].id);

  return (
    <section className="relative bg-[#0b0e16] text-white py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <p className="text-sm tracking-[0.35em] uppercase text-violet-200/80">The Voice · The Project</p>
        <div className="mt-2 flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white/95">Sign-to-Speech Glove</h2>
            <p className="mt-3 max-w-2xl text-violet-100/80">
              Leadership isn’t about command — it’s about clarity. This prototype channels gestures into
              audible speech, crafted with teamwork, design empathy, and calm precision.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {parts.map((p) => (
                <li key={p.id}>
                  <button
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                    className={`w-full text-left rounded-xl border px-3 py-3 transition-colors ${
                      active === p.id
                        ? 'border-violet-400/40 bg-violet-400/10'
                        : 'border-violet-300/10 bg-white/[0.03] hover:bg-white/[0.06]'
                    }`}
                  >
                    <p className="text-sm font-medium text-violet-100/90">{p.label}</p>
                    <p className="text-xs text-violet-200/70">{p.desc}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <GloveViz activeId={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function GloveViz({ activeId }) {
  const glow = {
    sensor: activeId.includes('sensor') ? 'shadow-[0_0_40px_8px_rgba(167,139,250,0.25)]' : '',
    imu: activeId === 'imu' ? 'shadow-[0_0_40px_8px_rgba(244,114,182,0.2)]' : '',
    processor: activeId === 'processor' ? 'shadow-[0_0_40px_8px_rgba(129,140,248,0.2)]' : '',
    bluetooth: activeId === 'bluetooth' ? 'shadow-[0_0_40px_8px_rgba(94,234,212,0.2)]' : '',
  };

  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl border border-violet-300/10 bg-gradient-to-b from-[#0d1120] to-[#0a0d17]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/10 blur-2xl" />
      </div>

      {/* Palm */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        className={`absolute left-1/2 top-1/2 h-48 w-36 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-violet-300/10 ${glow.processor}`}
      />

      {/* Fingers as capsules */}
      <Finger x="-20%" delay={0.0} active={activeId === 'sensor-index'} glow={glow.sensor} />
      <Finger x="-5%" delay={0.05} active={activeId.includes('sensor')} glow={glow.sensor} />
      <Finger x="10%" delay={0.08} active={activeId.includes('sensor')} glow={glow.sensor} />
      <Finger x="25%" delay={0.11} active={activeId.includes('sensor')} glow={glow.sensor} />

      {/* Thumb */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`absolute left-[25%] bottom-[28%] h-6 w-20 rounded-full bg-white/[0.06] border border-violet-300/10 ${
          activeId === 'sensor-thumb' ? glow.sensor : ''
        }`}
      />

      {/* IMU, MCU, BT nodes */}
      <Node x="50%" y="30%" label="IMU" active={activeId === 'imu'} extraGlow={glow.imu} />
      <Node x="50%" y="55%" label="MCU" active={activeId === 'processor'} extraGlow={glow.processor} />
      <Node x="65%" y="45%" label="BT" active={activeId === 'bluetooth'} extraGlow={glow.bluetooth} />
    </div>
  );
}

function Finger({ x, delay, active, glow }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute left-[calc(50%+${x})] top-[10%] h-28 w-8 -translate-x-1/2 rounded-full bg-white/[0.06] border border-violet-300/10 ${
        active ? glow : ''
      }`}
    />
  );
}

function Node({ x, y, label, active, extraGlow }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div
        className={`h-6 w-6 rounded-full border border-violet-300/20 bg-white/[0.06] ${active ? extraGlow : ''}`}
      />
      <p className="mt-1 text-xs text-center text-violet-200/80">{label}</p>
    </div>
  );
}
