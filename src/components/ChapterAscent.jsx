import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ChapterAscent() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 0.5]);

  return (
    <section ref={ref} className="relative bg-[#0b0e16] text-white py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div style={{ y: y2, opacity }} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mb-12">
          <p className="text-sm tracking-[0.35em] uppercase text-violet-200/80">The Growth · The Ascent</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-white/95">Every bug was a riddle.</h2>
          <p className="mt-3 max-w-3xl text-violet-100/80">
            Steps became rhythm. Java shaped rigor, Kotlin taught elegance. With each fix, the horizon
            moved closer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ParallaxCard styleY={y1} title="Java · Foundation" code={`public class Spark {\n  public static void main(String[] args) {\n    System.out.println(\"hello, horizon\");\n  }\n}`} />
          <ParallaxCard styleY={y2} title="Kotlin · Flow" code={`data class Step(val note: String)\nfun climb() {\n  listOf(\"focus\", \"patience\").forEach(::println)\n}`} />
          <ParallaxCard styleY={y1} title="React · Vision" code={`export function Pulse() {\n  return <div className='dot' />\n}`} />
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({ title, code, styleY }) {
  return (
    <motion.div
      style={{ y: styleY }}
      whileHover={{ y: -8, rotateX: 2 }}
      className="group relative rounded-2xl border border-violet-300/10 bg-white/[0.03] p-5 backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <h3 className="text-lg font-medium text-violet-100/90">{title}</h3>
        <pre className="mt-4 max-h-56 overflow-auto rounded-lg bg-[#0f1220] p-4 text-[12.5px] leading-relaxed text-violet-100/90 shadow-inner">
          <code>
            {code}
          </code>
        </pre>
        <p className="mt-3 text-sm text-violet-200/70">Every fix — a step closer.</p>
      </div>
    </motion.div>
  );
}
