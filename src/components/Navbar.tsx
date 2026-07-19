"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs — no re-renders, no flickering
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const isVisible = useRef(false); // source of truth — not state

  // Directly manipulate the DOM node for zero-flicker transitions
  const setNavbarVisible = useCallback((show: boolean) => {
    if (!navRef.current) return;
    if (isVisible.current === show) return; // no-op if already in desired state
    isVisible.current = show;

    if (show) {
      navRef.current.style.transform = "translateX(-50%) translateY(0)";
      navRef.current.style.opacity = "1";
      navRef.current.style.pointerEvents = "auto";
    } else {
      navRef.current.style.transform = "translateX(-50%) translateY(-120%)";
      navRef.current.style.opacity = "0";
      navRef.current.style.pointerEvents = "none";
    }
  }, []);

  useEffect(() => {
    // Start fully hidden — no flash on load
    if (navRef.current) {
      navRef.current.style.transform = "translateX(-50%) translateY(-120%)";
      navRef.current.style.opacity = "0";
      navRef.current.style.pointerEvents = "none";
    }
    lastScrollY.current = window.scrollY;

    const THRESHOLD = 10; // px — ignore micro-jitter

    const onScroll = () => {
      if (rafId.current !== null) return; // already queued

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (Math.abs(delta) < THRESHOLD) return; // ignore tiny movements

        if (currentY <= 20) {
          // At the very top → always hide
          setNavbarVisible(false);
        } else if (delta > 0) {
          // Scrolling DOWN → hide
          setNavbarVisible(false);
        } else {
          // Scrolling UP → show
          setNavbarVisible(true);
        }

        lastScrollY.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [setNavbarVisible]);

  if (pathname === "/" || pathname.startsWith("/auth")) {
    return null;
  }

  const navItems = [
    { name: "Events", path: "/events" },
    { name: "Blogs", path: "/blogs" },
    { name: "Projects", path: "/projects" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
      {/*
        The outer div is a fixed layer handling left/width/z-index.
        The ref div handles the translateY animation via direct DOM manipulation.
        Both translateX(-50%) and translateY are always set together — no override conflict.
      */}
      <div
        ref={navRef}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          /* React will preserve the correct visibility on re-renders */
          transform: isVisible.current ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-120%)",
          opacity: isVisible.current ? 1 : 0,
          pointerEvents: isVisible.current ? "auto" : "none",
          transition:
            "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 9999,
          width: "95%",
          maxWidth: "64rem",
          willChange: "transform, opacity",
        }}
      >
        <nav className="rounded-full bg-white/75 backdrop-blur-xl border border-gray-200/50 shadow-lg shadow-black/5">
          <div className="px-5 py-2 flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
            >
              🎓 <span className="hidden sm:inline">CampusOS</span>
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute inset-0 bg-blue-100/80 rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4 border-l pl-4 border-gray-300/50">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-full transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 9998 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-sm bg-white/90 backdrop-blur-2xl border border-gray-200/60 shadow-2xl rounded-3xl p-4 flex flex-col gap-2 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-4 rounded-2xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50/80 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="h-px bg-gray-200/60 my-2" />

            {session ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full p-4 rounded-2xl text-base font-semibold text-red-600 hover:bg-red-50 text-left transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full p-4 rounded-2xl text-base font-semibold bg-gray-900 text-white text-center hover:bg-gray-800 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
