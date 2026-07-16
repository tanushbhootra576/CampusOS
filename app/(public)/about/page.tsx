"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Manifesto() {
  const noiseOverlay = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    opacity: 0.1,
    mixBlendMode: "overlay" as const,
  };

  return (
    <main className="min-h-screen bg-[#F4F3EF] text-[#1A1A1A] font-sans selection:bg-[#D95A3B] selection:text-white relative pb-32">
      {/* Noise */}
      <div className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.05] mix-blend-multiply" style={noiseOverlay}></div>

      {/* Nav */}
      <nav className="p-8 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity uppercase tracking-widest text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Return to Core
        </Link>
        <div className="font-bold text-sm tracking-widest uppercase">
          Manifesto
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-4 h-4 bg-[#D95A3B] rounded-full mb-12"></div>
          <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-black uppercase tracking-tighter mb-24">
            Zero Friction.<br />
            Pure<br />
            Clarity.
          </h1>

          <div className="space-y-16 text-xl md:text-3xl font-medium leading-tight max-w-3xl">
            <p>
              The digital campus is broken. It is a fragmented mess of isolated tools, confusing interfaces, and redundant data entry. We are burdened by the very systems designed to liberate us.
            </p>
            <p>
              <strong className="text-[#D95A3B]">CampusOS</strong> is our answer.
            </p>
            <p>
              We believe software should not dictate how a community operates. It should disappear. It should be a silent architecture that empowers human connection, creativity, and organization.
            </p>
            <p>
              We stripped away the noise. No more bloated dashboards. No more disjointed event links. What remains is a perfectly balanced, uncompromising ecosystem.
            </p>
            <p>
              Design is not just how it looks. Design is absolute control.
            </p>
            
            <div className="pt-24 pb-12 border-b-4 border-[#1A1A1A]">
              <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-40">End of Document // 2026</p>
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
