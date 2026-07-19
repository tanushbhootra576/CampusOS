"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const noiseOverlay = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    opacity: 0.1,
    mixBlendMode: "overlay" as const,
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex font-sans selection:bg-[#D95A3B] selection:text-white">
      {/* Left side: Editorial / Brutalist Poster */}
      <div className="hidden lg:flex w-1/2 bg-[#1A1A1A] text-[#F4F3EF] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none" style={noiseOverlay}></div>
        
        {/* Parallax Geometric Element - Fixed to be a perfect circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-[#F4F3EF]/10 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] border-[1px] border-[#D95A3B]/30 rounded-full flex items-center justify-center">
             <div className="w-4 h-4 bg-[#D95A3B] rounded-full"></div>
          </div>
        </div>

        <div className="relative z-20">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity uppercase tracking-widest text-xs font-bold">
            <ArrowLeft className="w-4 h-4" /> Return
          </Link>
        </div>

        <div className="relative z-20 pb-4">
          <div className="text-[#D95A3B] text-xs font-bold uppercase tracking-[0.3em] mb-6">System Access</div>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,7vw,8rem)] leading-none font-black uppercase tracking-tighter"
          >
            Enter<br/>The Void.
          </motion.h1>
          <p className="mt-8 text-lg font-medium text-[#F4F3EF]/60 max-w-sm">
            Log in to the CampusOS centralized database. Secure your identity.
          </p>
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-[#F4F3EF] text-[#1A1A1A]">
        {/* Mobile back button */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity uppercase tracking-widest text-xs font-bold text-[#1A1A1A]/50">
            <ArrowLeft className="w-4 h-4" /> Return
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
