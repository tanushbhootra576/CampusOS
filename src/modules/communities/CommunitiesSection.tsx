"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronDown, Users, Calendar, ArrowRight, Code, Cpu, 
  Cloud, Shield, Palette, Camera, Rocket, Music, Trophy, 
  BookOpen, Gamepad2, CheckCircle2, ChevronRight, ChevronLeft, Menu, MapPin, 
  Clock, Plus
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// --- Dummy Data ---
const CATEGORIES = [
  { icon: Code, name: "Programming" },
  { icon: Cpu, name: "AI & ML" },
  { icon: Trophy, name: "Robotics" },
  { icon: Cloud, name: "Cloud Computing" },
  { icon: Shield, name: "Cybersecurity" },
  { icon: Palette, name: "Design" },
  { icon: Rocket, name: "Entrepreneurship" },
  { icon: Camera, name: "Photography" },
  { icon: Music, name: "Music" },
  { icon: Trophy, name: "Sports" },
  { icon: BookOpen, name: "Literature" },
  { icon: Gamepad2, name: "Gaming" }
];

const FEATURED_COMMUNITIES = [
  {
    slug: "codechef-vit",
    name: "CodeChef VIT",
    desc: "A community of passionate competitive programmers and software developers.",
    members: "1,200+",
    events: "45",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    logo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80"
  },
  {
    slug: "gdsc",
    name: "Google Developer Student Clubs",
    desc: "Empowering students to build solutions for their local communities using Google tech.",
    members: "850+",
    events: "32",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80"
  },
  {
    slug: "aws-cloud-club",
    name: "AWS Cloud Club",
    desc: "Learn, build, and deploy highly scalable architectures on Amazon Web Services.",
    members: "600+",
    events: "20",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80"
  }
];

const ALL_COMMUNITIES = [
  {
    slug: "acm",
    name: "ACM Student Chapter",
    desc: "Advancing computing as a science and profession.",
    cat: "Programming",
    members: "900",
    events: "12",
    projects: "34",
    status: "Active",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80"
  },
  {
    slug: "ieee",
    name: "IEEE Student Branch",
    desc: "Fostering technological innovation and excellence for the benefit of humanity.",
    cat: "Engineering",
    members: "1,100",
    events: "50",
    projects: "15",
    status: "Active",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  },
  {
    slug: "mlsc",
    name: "Microsoft Learn Student Club",
    desc: "A community of student developers who want to learn, build and share.",
    cat: "Cloud Computing",
    members: "750",
    events: "25",
    projects: "40",
    status: "Invite Only",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80"
  },
  {
    slug: "design-community",
    name: "Design Community",
    desc: "UI/UX, graphic design, and creative thinkers collaborating on real projects.",
    cat: "Design",
    members: "420",
    events: "15",
    projects: "120",
    status: "Active",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80"
  },
  {
    slug: "cybersecurity-cell",
    name: "Cybersecurity Cell",
    desc: "Learn ethical hacking, network security, and cryptography.",
    cat: "Cybersecurity",
    members: "380",
    events: "8",
    projects: "15",
    status: "Active",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80"
  },
  {
    slug: "ecell",
    name: "Entrepreneurship Cell",
    desc: "Building the next generation of campus startups and founders.",
    cat: "Entrepreneurship",
    members: "600",
    events: "30",
    projects: "25",
    status: "Active",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80"
  }
];

const FAQS = [
  { q: "How do I join a community?", a: "Simply browse the communities, find one that interests you, and click 'Join'. Some communities have an open policy, while others may require admin approval or an interview process." },
  { q: "Can I join multiple clubs?", a: "Yes! You can join as many communities as you can actively manage. We recommend balancing your academic workload with 2-3 active community memberships." },
  { q: "Is there any membership fee?", a: "Most communities are completely free to join. Certain professional chapters (like IEEE or ACM) might have a subsidized annual fee for premium benefits and global membership." },
  { q: "How are community leaders selected?", a: "Leaders are typically elected or selected through an interview process during the annual core committee recruitment drive held at the beginning of each academic year." }
];

export function CommunitiesSection({ previewOnly = false, hideHero = false }: { previewOnly?: boolean, hideHero?: boolean } = {}) {
  const [search, setSearch] = useState("");
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  
  return (
    <main className="bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-black selection:text-white pb-32">
      
      {!hideHero && (
        <>
          {/* 2. HERO SECTION */}
          <section className="relative px-6 md:px-12 pt-32 md:pt-48 pb-20 max-w-[1440px] mx-auto overflow-hidden">
        {/* Subtle background gradient blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-[100px] opacity-70 -z-10 translate-x-1/4 -translate-y-1/4"></div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-black/70 text-xs font-bold uppercase tracking-widest mb-8 border border-black/5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Over 50+ Active Clubs
            </div>
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tight mb-6">
              Discover Student Communities.
            </h1>
            <p className="text-lg md:text-xl text-black/60 font-medium leading-relaxed mb-10 max-w-xl">
              Explore technical, cultural, entrepreneurial, and recreational communities. Join like-minded students, participate in events, build projects, and grow your network.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
              <Link href="/communities" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center block">
                Explore Communities
              </Link>
              <Link href="/auth/signup" className="w-full sm:w-auto px-8 py-4 bg-white border border-black/10 text-black rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors block text-center">
                <Plus className="w-5 h-5" /> Create Community
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block h-[600px] w-full"
          >
            {/* Abstract floating cards illustration */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl rounded-[40px] border border-white shadow-2xl overflow-hidden p-8">
              <div className="absolute top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-12 -right-12 w-64 h-64 bg-pink-100 rounded-full blur-[80px]"></div>
              
              <div className="relative h-full flex flex-col gap-6 transform rotate-[-2deg] scale-105 justify-center">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                    className="bg-white p-6 rounded-3xl shadow-xl border border-black/5 flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-100"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-1/3 bg-gray-200 rounded-full"></div>
                      <div className="h-3 w-2/3 bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
        </>
      )}

      {!previewOnly && (
        <>
      {/* 3. STICKY SEARCH & FILTERS */}
      <section className="sticky top-20 z-40 px-6 md:px-12 py-4 bg-white/80 backdrop-blur-xl border-y border-black/5 mb-24">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
            <input 
              type="text" 
              placeholder="Search Communities..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-black/5 rounded-full outline-none focus:bg-white focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {["Category", "Sort By", "Club Size", "Status"].map((filter, i) => (
              <button key={i} className="whitespace-nowrap px-4 py-2.5 bg-white border border-black/10 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                {filter} <ChevronDown className="w-4 h-4 text-black/40" />
              </button>
            ))}
            <button className="whitespace-nowrap px-4 py-2.5 text-black/50 text-sm font-bold hover:text-black transition-colors">
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* 4. COMMUNITY CATEGORIES */}
      <section className="px-6 md:px-12 mb-32 max-w-[1440px] mx-auto">
        <h2 className="text-2xl font-black mb-8 tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 8. STATISTICS & TESTIMONIALS */}
      <section className="px-6 md:px-12 mb-32 max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-12">By the numbers</h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              { val: "50+", label: "Communities" },
              { val: "10k+", label: "Active Students" },
              { val: "600+", label: "Events Hosted" },
              { val: "2.5k+", label: "Projects Built" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-black tracking-tighter text-blue-600 mb-2">{stat.val}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-black/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-black text-white p-12 rounded-[32px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
          <svg className="w-10 h-10 text-blue-400 mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p className="text-2xl font-medium leading-relaxed mb-10 relative z-10">
            "Joining the Developer Club completely changed my college trajectory. I built projects I'm proud of and secured an internship at a top tech company."
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10"></div>
            <div>
              <div className="font-bold">Sarah Jenkins</div>
              <div className="text-sm text-white/50">Core Committee, GDSC</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5 UPCOMING COMMUNITY EVENTS */}
      <section className="px-6 md:px-12 py-32 bg-[#F4F3EF] mb-32 border-y border-black/5">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl font-black tracking-tight mb-12">Upcoming Community Events</h2>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
            {[
              { title: "Intro to React Native", community: "GDSC", date: "Oct 24", venue: "Lab 3", seats: "15" },
              { title: "Cloud Architecture 101", community: "AWS Club", date: "Oct 26", venue: "Auditorium", seats: "40" },
              { title: "Competitive Coding", community: "CodeChef VIT", date: "Oct 28", venue: "Main Hall", seats: "8" },
              { title: "UI/UX Design Workshop", community: "Design Co.", date: "Oct 29", venue: "Studio A", seats: "25" }
            ].map((evt, i) => (
              <div key={i} className="min-w-[300px] snap-center bg-white rounded-3xl border border-black/5 shadow-sm p-6 group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="h-40 bg-gray-100 rounded-2xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{evt.community}</div>
                </div>
                <h4 className="text-xl font-bold tracking-tight mb-4 group-hover:text-blue-600 transition-colors">{evt.title}</h4>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-black/60 font-medium"><Calendar className="w-4 h-4" /> {evt.date}</div>
                  <div className="flex items-center gap-2 text-sm text-black/60 font-medium"><MapPin className="w-4 h-4" /> {evt.venue}</div>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-auto">
                  <span className="text-xs font-bold text-orange-600">{evt.seats} seats left</span>
                  <button className="text-sm font-bold bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors">Register</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. JOIN PROCESS */}
      <section className="px-6 md:px-12 py-32 bg-white border-y border-black/5 mb-32">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-20">How to join a community</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-black/5 z-0"></div>
            
            {[
              { step: 1, title: "Browse", desc: "Filter by your interests and discover communities." },
              { step: 2, title: "Apply", desc: "Click join and fill out the quick application form." },
              { step: 3, title: "Approval", desc: "Wait for the community admins to accept your request." },
              { step: 4, title: "Participate", desc: "Attend events, join the group chat, and start building." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-xl font-black mb-6 shadow-sm">
                  {s.step}
                </div>
                <h4 className="text-lg font-black tracking-tight mb-2">{s.title}</h4>
                <p className="text-sm font-medium text-black/60 max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="px-6 md:px-12 mb-32 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black tracking-tight text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                className="w-full px-6 py-5 text-left font-bold flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-black/40 transition-transform ${activeFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeFAQ === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 text-black/60 font-medium text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="px-6 md:px-12 mb-32">
        <div className="max-w-[1440px] mx-auto bg-gradient-to-br from-gray-900 to-black text-white rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-[clamp(3rem,6vw,5rem)] font-black tracking-tighter leading-none mb-8">
              Find Your Community.<br/>Build Your Future.
            </h2>
            <p className="text-xl text-white/60 font-medium mb-12">
              Join thousands of students who are already learning, building, and growing together on CampusOS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link href="/communities" className="px-10 py-5 bg-white text-black rounded-full font-bold shadow-xl hover:scale-105 transition-transform text-lg text-center block">
                Explore Communities
              </Link>
              <Link href="/auth/signup" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-colors text-lg text-center block">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      </>
      )}

      </main>
  );
}

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
