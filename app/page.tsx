"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Users, Zap, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Fluid Magnetic Button Component
const MagneticButton = ({ children, className, onMouseEnter, onMouseLeave, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={(e) => {
        reset();
        if (onMouseLeave) onMouseLeave(e);
      }}
      onMouseEnter={onMouseEnter}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Parallax values
  const y1 = useTransform(smoothProgress, [0, 1], [0, 300]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const opacityFade = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const scaleImage = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Text Reveal Animation variants
  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }
    }),
  };

  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-2 mr-4 lg:mr-8">
        <motion.span 
          custom={i} 
          variants={wordVariants} 
          initial="hidden" 
          animate="visible" 
          className="inline-block"
        >
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <main className="relative bg-[#F4F3EF] text-[#1A1A1A] min-h-screen overflow-hidden selection:bg-[#D95A3B] selection:text-white font-sans">
      
      {/* Custom Fluid Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-[#D95A3B] pointer-events-none z-[100] mix-blend-multiply flex items-center justify-center hidden md:flex"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 3 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-white text-[6px] font-bold tracking-widest uppercase absolute"
            >
              View
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Film Grain Texture */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 w-full h-full opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 p-8 flex justify-between items-center mix-blend-difference text-[#F4F3EF]">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-bold text-sm tracking-widest uppercase"
        >
          Campus_OS<span className="text-[#D95A3B]">©</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]"
        >
          <Link href="/dashboard" className="hidden md:block hover:text-[#D95A3B] transition-colors">Platform</Link>
          <Link href="/about" className="hidden md:block hover:text-[#D95A3B] transition-colors">Manifesto</Link>
          <MagneticButton className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors cursor-none">
            <Menu className="w-4 h-4" />
          </MagneticButton>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 pb-16 md:pb-32 pt-32 cursor-none">
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
          <motion.div style={{ scale: scaleImage }} className="w-full h-full origin-bottom">
            <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#EAE8E3] rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#D95A3B] rounded-full blur-3xl opacity-20 mix-blend-multiply"></div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-5xl">
            <h1 className="text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase">
              {splitText("Elevate Your")}
              <br />
              <span className="text-[#D95A3B]">{splitText("Campus.")}</span>
            </h1>
          </div>
          
          <motion.div 
            style={{ opacity: opacityFade }}
            className="flex flex-col gap-6 max-w-sm lg:pb-4"
          >
            <p className="text-lg md:text-xl font-medium text-[#1A1A1A]/70 leading-relaxed">
              An editorial approach to campus management. Pure clarity, zero friction, absolute control.
            </p>
            <div className="flex items-center gap-4">
              <MagneticButton 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group flex items-center gap-3 bg-[#1A1A1A] text-[#F4F3EF] px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D95A3B] transition-colors duration-500 cursor-none"
              >
                <Link href="/auth/signup" className="flex items-center gap-2">
                  Launch System
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition / Fluid Divider */}
      {/* Massive Call to Action */}
      <section className="relative py-40 bg-[#D95A3B] text-[#F4F3EF] overflow-hidden flex flex-col items-center justify-center min-h-[80vh] cursor-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none"
        >
          <div className="w-[150vw] h-[150vw] border-[1px] border-white rounded-full"></div>
          <div className="absolute w-[100vw] h-[100vw] border-[1px] border-white rounded-full"></div>
          <div className="absolute w-[50vw] h-[50vw] border-[1px] border-white rounded-full"></div>
        </motion.div>

        <div 
          className="relative z-10 text-center flex flex-col items-center flex-1 justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h2 className="text-[clamp(3rem,8vw,10rem)] leading-none font-black uppercase tracking-tighter mb-12">
            The standard<br/>has been set.
          </h2>
          <MagneticButton className="group relative px-12 py-6 bg-[#1A1A1A] text-[#F4F3EF] rounded-full text-lg font-bold uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-500 cursor-none">
            <Link href="/auth/signup" className="relative z-10 flex items-center gap-4">
              Get Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </MagneticButton>
        </div>

        {/* Footer */}
        <footer className="w-full mt-auto pt-24 px-12 pb-8 flex flex-col md:flex-row justify-between items-end relative z-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-black tracking-tighter uppercase">Campus_OS©</h3>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">2026 // ALL RIGHTS RESERVED</p>
          </div>
          <div className="flex gap-8 mt-12 md:mt-0 text-xs font-bold uppercase tracking-widest">
            <Link href="/about" className="hover:opacity-60 transition-opacity">Manifesto</Link>
            <Link href="/dashboard" className="hover:opacity-60 transition-opacity">Platform</Link>
            <Link href="https://github.com" className="hover:opacity-60 transition-opacity">Source</Link>
          </div>
        </footer>
      </section>

    </main>
  );
}
