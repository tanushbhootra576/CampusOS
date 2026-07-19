"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Share2, Users, Calendar, FolderGit2, BookOpen, CheckCircle2, MapPin, Link2, Megaphone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CommunityHomeTab from "./tabs/CommunityHomeTab";
import CommunityAboutTab from "./tabs/CommunityAboutTab";
import CommunityMembersTab from "./tabs/CommunityMembersTab";
import CommunityEventsTab from "./tabs/CommunityEventsTab";
import CommunityBlogsTab from "./tabs/CommunityBlogsTab";
import CommunityProjectsTab from "./tabs/CommunityProjectsTab";
import CommunityGalleryTab from "./tabs/CommunityGalleryTab";
import CommunityLeaderboardTab from "./tabs/CommunityLeaderboardTab";
import CommunityAnnouncementsTab from "./tabs/CommunityAnnouncementsTab";

// ─── Mock Community Data ───────────────────────────────────────────────────
const communityData: Record<string, {
  name: string; tagline: string; category: string; members: number; events: number;
  projects: number; blogs: number; founded: string; faculty: string;
  cover: string; logo: string; coreTeam: string[];
}> = {
  default: {
    name: "Google Developer Student Clubs",
    tagline: "Empowering students to build solutions for local communities using Google tech.",
    category: "Technical",
    members: 850, events: 32, projects: 18, blogs: 45,
    founded: "2018",
    faculty: "Dr. Rajesh Kumar",
    cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    logo: "GD",
    coreTeam: ["AR", "PS", "KM", "DN", "RS"],
  },
};

const TABS = ["Home", "About", "Members", "Events", "Blogs", "Projects", "Gallery", "Leaderboard", "Announcements"];

interface CommunityDetailPageProps {
  slug: string;
}

export default function CommunityDetailPage({ slug }: CommunityDetailPageProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMember, setIsMember] = useState(false);
  const [tabBarSticky, setTabBarSticky] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const community = communityData[slug] ?? communityData.default;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTabBarSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const tabContent: Record<string, React.ReactNode> = {
    Home: <CommunityHomeTab communityName={community.name} isMember={isMember} onJoin={() => setIsMember(true)} />,
    About: <CommunityAboutTab />,
    Members: <CommunityMembersTab />,
    Events: <CommunityEventsTab />,
    Blogs: <CommunityBlogsTab />,
    Projects: <CommunityProjectsTab />,
    Gallery: <CommunityGalleryTab />,
    Leaderboard: <CommunityLeaderboardTab />,
    Announcements: <CommunityAnnouncementsTab />,
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] font-sans selection:bg-[#D95A3B] selection:text-white">

      {/* ─── Hero Section ──────────────────────────────────────── */}
      <div ref={heroRef} className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-80 w-full overflow-hidden relative">
          <img src={community.cover} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F3EF] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-black/60 shrink-0">
              {community.logo}
            </motion.div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-8">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">{community.category}</span>
                <span className="text-xs font-bold text-black/40">Founded {community.founded}</span>
              </div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-2">
                {community.name}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-black/60 font-medium max-w-xl mb-4">
                {community.tagline}
              </motion.p>

              {/* Faculty */}
              <div className="flex items-center gap-2 text-xs font-bold text-black/50 mb-6">
                <span>Faculty Coordinator:</span>
                <span className="text-black/80">{community.faculty}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {isMember ? (
                  <div className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" /> You&apos;re a Member
                  </div>
                ) : (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsMember(true)}
                    className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
                    Join Community
                  </motion.button>
                )}
                <button className="flex items-center gap-2 bg-white border border-black/10 px-5 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Core Team */}
            <div className="hidden lg:flex flex-col items-end gap-3 pt-8">
              <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Core Team</div>
              <div className="flex items-center">
                {community.coreTeam.map((avatar, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full bg-white border-2 border-[#F4F3EF] shadow-sm flex items-center justify-center text-xs font-black text-black/60 ${i > 0 ? "-ml-3" : ""}`}>
                    {avatar}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Members", value: community.members.toLocaleString() + "+" },
              { icon: Calendar, label: "Events", value: community.events + " hosted" },
              { icon: FolderGit2, label: "Projects", value: community.projects + " published" },
              { icon: BookOpen, label: "Blogs", value: community.blogs + " articles" },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-black/5 shadow-sm px-5 py-4 flex items-center gap-4">
                <stat.icon className="w-5 h-5 text-black/30 shrink-0" />
                <div>
                  <div className="text-xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-xs font-bold text-black/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── Sticky Tab Bar ────────────────────────────────────── */}
      <div ref={tabBarRef} className={`sticky top-0 z-30 bg-[#F4F3EF]/90 backdrop-blur-md transition-shadow ${tabBarSticky ? "shadow-sm border-b border-black/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto scrollbar-none py-2">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors rounded-full ${activeTab === tab ? "text-black bg-white shadow-sm" : "text-black/40 hover:text-black/70"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Content + Sidebar ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex gap-8 items-start">
          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Sticky Sidebar ────────────────────────────────── */}
          <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0 sticky top-24">
            {/* Quick Stats */}
            <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-black">{community.logo}</div>
              <h3 className="font-black text-base">{community.name}</h3>
              <div className="space-y-2 text-sm font-medium text-black/60">
                <div className="flex items-center gap-2"><Users className="w-4 h-4" />{community.members.toLocaleString()}+ Members</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />VIT Vellore, Tamil Nadu</div>
                <div className="flex items-center gap-2"><Link2 className="w-4 h-4" /><a href="#" className="text-blue-600 hover:underline">gdsc.community</a></div>
              </div>
              <button onClick={() => setIsMember(prev => !prev)}
                className={`w-full py-3 rounded-full text-sm font-bold transition-colors ${isMember ? "bg-green-600 text-white" : "bg-black text-white hover:bg-black/80"}`}>
                {isMember ? "✓ You're a Member" : "Join Community"}
              </button>
            </div>

            {/* Next Event */}
            <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">Next Event</h4>
              <p className="font-black text-sm leading-tight">Web Dev Workshop: React & Next.js</p>
              <p className="text-xs text-black/50 font-medium mt-2">Oct 28, 2026 · 6:00 PM · SJT 110</p>
              <button className="w-full mt-4 bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-black/80 transition-colors">Register</button>
            </div>

            {/* Latest Announcement */}
            <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-black/40 mb-4 flex items-center gap-2">
                <Megaphone className="w-3.5 h-3.5" /> Latest Announcement
              </h4>
              <p className="font-bold text-sm leading-tight">Core Team Applications Now Open!</p>
              <p className="text-xs text-black/40 font-medium mt-2">2 days ago</p>
              <button onClick={() => setActiveTab("Announcements")} className="w-full mt-4 border border-black/10 py-2.5 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors">View All</button>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Join Community CTA (if not a member) ─────────────── */}
      {!isMember && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="bg-black rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Ready to join {community.name}?</h2>
              <p className="text-white/60 font-medium max-w-md">Access exclusive workshops, hackathons, mentorship, and a thriving community of builders. Membership is free for all students.</p>
            </div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setIsMember(true)}
              className="bg-white text-black px-8 py-4 rounded-full text-sm font-black tracking-wide hover:bg-gray-100 transition-colors shrink-0">
              Join Community →
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
