"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { CommunitiesSection } from "../src/modules/communities/CommunitiesSection";

import { HTMLMotionProps } from "framer-motion";

// Fluid Magnetic Button Component
interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}
const MagneticButton = ({ children, className, onMouseEnter, onMouseLeave, ...props }: MagneticButtonProps) => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();

  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isVisible = useRef(true);
  const isAtTop = useRef(true);

  const setNavbarState = useCallback((show: boolean, atTop: boolean) => {
    if (!navRef.current) return;
    
    if (isVisible.current !== show) {
      isVisible.current = show;
      if (show) {
        navRef.current.style.transform = "translateX(-50%) translateY(0)";
        navRef.current.style.opacity = "1";
        const inner = navRef.current.firstElementChild as HTMLElement;
        if (inner) inner.style.pointerEvents = "auto";
      } else {
        navRef.current.style.transform = "translateX(-50%) translateY(-150%)";
        navRef.current.style.opacity = "0";
        const inner = navRef.current.firstElementChild as HTMLElement;
        if (inner) inner.style.pointerEvents = "none";
      }
    }

    if (isAtTop.current !== atTop) {
      isAtTop.current = atTop;
      const inner = navRef.current.firstElementChild as HTMLElement;
      if (inner) {
        inner.style.backgroundColor = atTop ? "transparent" : "rgba(255, 255, 255, 0.8)";
        inner.style.backdropFilter = atTop ? "none" : "blur(24px)";
        inner.style.borderColor = atTop ? "transparent" : "rgba(229, 231, 235, 0.5)";
        inner.style.boxShadow = atTop ? "none" : "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)";
      }
    }
  }, []);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.transform = "translateX(-50%) translateY(0)";
      navRef.current.style.opacity = "1";
      const inner = navRef.current.firstElementChild as HTMLElement;
      if (inner) inner.style.pointerEvents = "auto";
    }
    lastScrollY.current = window.scrollY;
    const THRESHOLD = 10;

    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (Math.abs(delta) < THRESHOLD) return;

        if (currentY <= 20) {
          setNavbarState(true, true);
        } else if (delta > 0) {
          setNavbarState(false, false);
        } else {
          setNavbarState(true, false);
        }
        lastScrollY.current = currentY;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [setNavbarState]);
  
  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Parallax values
  const y1 = useTransform(smoothProgress, [0, 1], [0, 300]);
  const yHeroText = useTransform(smoothProgress, [0, 1], [0, 150]);
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
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.05 }
    }),
  };

  const splitText = (text: string, delayOffset: number = 0) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-2 mr-4 lg:mr-8">
        <motion.span 
          custom={i + delayOffset} 
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

  const articles = [
    {
      title: "How Student Clubs Can Grow 3x Faster with Digital Management",
      category: "Community",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      date: "Nov 12, 2026",
      readTime: "5 min read",
      excerpt: "Discover the exact digital frameworks and tools that top-performing student organizations use to triple their engagement and membership base.",
      author: "Sarah Jenkins",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      title: "Building the Perfect Campus Event Experience",
      category: "Events",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      date: "Oct 28, 2026",
      readTime: "8 min read",
      excerpt: "From registration friction to post-event surveys, learn how to craft an unforgettable experience that keeps students coming back.",
      author: "Marcus Doe",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    {
      title: "Why Every University Needs a Central Campus Platform",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      date: "Oct 15, 2026",
      readTime: "6 min read",
      excerpt: "Siloed communication channels are killing campus culture. Here's why centralizing your digital ecosystem is the only way forward.",
      author: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=elena"
    },
    {
      title: "Managing 5000+ Students Without Chaos",
      category: "Operations",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
      date: "Sep 30, 2026",
      readTime: "7 min read",
      excerpt: "An inside look at how large universities automate their daily operations, from attendance tracking to resource allocation.",
      author: "David Chen",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
      title: "Top 10 Productivity Tips for Student Leaders",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
      date: "Sep 14, 2026",
      readTime: "4 min read",
      excerpt: "Balancing academics and club leadership doesn't have to lead to burnout. Master your time with these proven strategies.",
      author: "Aisha Patel",
      avatar: "https://i.pravatar.cc/150?u=aisha"
    },
    {
      title: "Behind the Design of CampusOS",
      category: "Product",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      date: "Aug 22, 2026",
      readTime: "10 min read",
      excerpt: "Take a deep dive into the design decisions, typography choices, and editorial aesthetic that shapes the CampusOS interface.",
      author: "Product Team",
      avatar: "https://i.pravatar.cc/150?u=product"
    }
  ];

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
      <div
        ref={navRef}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: isVisible.current ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-150%)",
          opacity: isVisible.current ? 1 : 0,
          pointerEvents: "none",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 9999,
          width: "95%",
          maxWidth: "1400px",
          height: "fit-content",
          willChange: "transform, opacity",
        }}
      >
        <nav 
          style={{
            backgroundColor: isAtTop.current ? "transparent" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: isAtTop.current ? "none" : "blur(24px)",
            borderColor: isAtTop.current ? "transparent" : "rgba(229, 231, 235, 0.5)",
            boxShadow: isAtTop.current ? "none" : "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          className="flex justify-between items-center py-2 px-6 rounded-full border text-[#1A1A1A]"
        >
          <div className="font-bold text-sm tracking-widest uppercase">
            Campus_OS<span className="text-[#D95A3B]">©</span>
          </div>
          
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            <Link href="/dashboard" className="hidden md:block hover:text-[#D95A3B] transition-colors">Platform</Link>
            <Link href="/about" className="hidden md:block hover:text-[#D95A3B] transition-colors">Manifesto</Link>
            <MagneticButton 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors cursor-none"
            >
              <Menu className="w-4 h-4" />
            </MagneticButton>
          </div>
        </nav>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#1A1A1A] text-[#F4F3EF] flex flex-col justify-center px-8 cursor-none"
          >
            {/* Close Button inside menu */}
            <div className="absolute top-8 right-8 flex justify-end">
              <MagneticButton 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors cursor-none"
              >
                <X className="w-4 h-4" />
              </MagneticButton>
            </div>
            
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
              <span className="text-[#D95A3B] text-xs font-bold uppercase tracking-widest mb-8">Navigation</span>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="overflow-hidden">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#D95A3B] transition-colors block leading-none pb-2">Platform.</Link>
              </motion.div>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="overflow-hidden">
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#D95A3B] transition-colors block leading-none pb-2">Manifesto.</Link>
              </motion.div>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="overflow-hidden">
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#D95A3B] transition-colors block leading-none pb-2">Login.</Link>
              </motion.div>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="overflow-hidden">
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)} className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:text-[#D95A3B] transition-colors block leading-none pb-2">Register.</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 pb-16 md:pb-32 pt-32 cursor-none">
        
        {/* Mouse Following Glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-soft-light hidden md:block"
          animate={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 90, 59, 0.15), transparent 40%)`,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        />

        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
          <motion.div style={{ scale: scaleImage }} className="w-full h-full origin-bottom">
            {/* Animated Gradient Blobs */}
            <motion.div 
              animate={{ 
                x: [0, 40, -20, 0], 
                y: [0, -50, 30, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#EAE8E3] rounded-full blur-3xl opacity-50 mix-blend-multiply"
            />
            <motion.div 
              animate={{ 
                x: [0, -40, 30, 0], 
                y: [0, 40, -30, 0],
                scale: [1, 0.9, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#D95A3B] rounded-full blur-3xl opacity-20 mix-blend-multiply"
            />
          </motion.div>
        </div>

        <motion.div 
          style={{ y: yHeroText }}
          className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12"
        >
          <div className="max-w-5xl">
            <h1 className="text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter uppercase">
              {splitText("Elevate Your", 0)}
              <br />
              <span className="text-[#D95A3B]">{splitText("Campus.", 2)}</span>
            </h1>
          </div>
          
          <motion.div 
            style={{ opacity: opacityFade }}
            className="flex flex-col gap-6 max-w-sm lg:pb-4"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl font-medium text-[#1A1A1A]/70 leading-relaxed"
            >
              An editorial approach to campus management. Pure clarity, zero friction, absolute control.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-4"
            >
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
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Campus Insights Section */}
      <section className="relative py-32 px-8 bg-[#F4F3EF] z-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-[#D95A3B] mb-6 bg-[#D95A3B]/10 px-4 py-2 rounded-full inline-block">Insights</div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter text-[#1A1A1A] mb-6 leading-[0.9]">Latest from<br className="hidden md:block"/> CampusOS</h2>
            <p className="text-lg md:text-xl text-[#1A1A1A]/70 max-w-2xl font-medium leading-relaxed">
              Discover ideas, guides, product updates, campus success stories, and best practices for modern student communities.
            </p>
          </motion.div>

          {/* Magazine Layout */}
          <div className="flex flex-col gap-8">
            
            {/* Featured Article (Full Width) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-80 lg:h-auto lg:w-3/5 overflow-hidden bg-gray-100">
                <div className="absolute top-6 left-6 z-10 bg-[#D95A3B] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full tracking-[0.2em] shadow-lg">
                  Featured Story
                </div>
                <img 
                  src={articles[0].image} 
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col justify-center flex-1 p-10 md:p-16">
                <div className="flex items-center gap-3 text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-widest mb-6">
                  <span>{articles[0].date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D95A3B]"></span>
                  <span>{articles[0].readTime}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#1A1A1A] mb-6 leading-[1.1] group-hover:text-[#D95A3B] transition-colors">
                  {articles[0].title}
                </h3>
                
                <p className="text-[#1A1A1A]/70 font-medium mb-12 text-lg leading-relaxed max-w-xl">
                  {articles[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <img src={articles[0].avatar} alt={articles[0].author} className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <div className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">{articles[0].author}</div>
                      <div className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest mt-1">Editor in Chief</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D95A3B]">
                    Read Article <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.slice(1, 4).map((article, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-[#1A1A1A] text-[10px] font-bold uppercase px-3 py-1.5 rounded-full tracking-widest shadow-sm">
                      {article.category}
                    </div>
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 p-8">
                    <h4 className="text-2xl font-black tracking-tight text-[#1A1A1A] mb-4 leading-snug group-hover:text-[#D95A3B] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-[#1A1A1A]/70 font-medium mb-8 line-clamp-2 text-sm leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src={article.avatar} alt={article.author} className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">{article.author}</span>
                      </div>
                      <div className="text-[#1A1A1A]/30 text-[10px] font-bold uppercase tracking-widest">
                        {article.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-20 text-center flex justify-center"
          >
            <Link href="/blogs" className="group flex items-center justify-center gap-3 bg-[#1A1A1A] text-[#F4F3EF] px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D95A3B] transition-colors duration-500 cursor-none">
              View All Articles 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Massive Call to Action */}
      <CommunitiesSection previewOnly={true} />
      <section className="relative pt-40 bg-[#D95A3B] text-[#F4F3EF] overflow-hidden flex flex-col items-center justify-center min-h-[80vh] cursor-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none"
        >
          <div className="w-[150vw] h-[150vw] border-[1px] border-white rounded-full"></div>
          <div className="absolute w-[100vw] h-[100vw] border-[1px] border-white rounded-full"></div>
          <div className="absolute w-[50vw] h-[50vw] border-[1px] border-white rounded-full"></div>
        </motion.div>

        <div 
          className="relative z-10 text-center flex flex-col items-center flex-1 justify-center my-20"
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
        <footer className="w-full mt-auto pt-24 px-8 pb-8 flex flex-col md:flex-row justify-between items-end relative z-10 bg-[#D95A3B]">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-black tracking-tighter uppercase">Campus_OS<span className="text-[#1A1A1A]">©</span></h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">2026 // ALL RIGHTS RESERVED</p>
          </div>
          <div className="flex gap-8 mt-12 md:mt-0 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
            <Link href="/about" className="hover:text-white transition-colors">Manifesto</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Platform</Link>
            <Link href="https://github.com" className="hover:text-white transition-colors">Source</Link>
          </div>
        </footer>
      </section>

    </main>
  );
}
