"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Megaphone, Star, BookOpen, FolderGit2, ImageIcon, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const upcomingEvents = [
  { id: "1", title: "Web Dev Workshop: React & Next.js", date: "Oct 28, 2026", time: "6:00 PM", venue: "SJT 110", seats: 12, category: "Workshop" },
  { id: "2", title: "Competitive Programming Contest", date: "Nov 2, 2026", time: "10:00 AM", venue: "Online", seats: 50, category: "Contest" },
];

const latestAnnouncements = [
  { id: "1", title: "Core Team Applications Open!", date: "2 days ago", pinned: true },
  { id: "2", title: "Congratulations to our Hackathon winners 🎉", date: "5 days ago", pinned: false },
];

const topContributors = [
  { name: "Arjun R.", points: 4820, role: "President", avatar: "AR" },
  { name: "Priya S.", points: 4100, role: "Tech Lead", avatar: "PS" },
  { name: "Karan M.", points: 3750, role: "Design Lead", avatar: "KM" },
];

const recentBlogs = [
  { title: "Getting Started with Docker in 2026", author: "Arjun R.", readTime: "5 min", date: "Oct 20" },
  { title: "How I cracked my Google Interview", author: "Priya S.", readTime: "8 min", date: "Oct 18" },
];

const featuredProjects = [
  { title: "CampusNav", desc: "Indoor navigation app for VIT", tech: ["React Native", "ML"], stars: 124 },
  { title: "AlumniConnect", desc: "Platform connecting students with alumni", tech: ["Next.js", "MongoDB"], stars: 89 },
];

interface CommunityHomeTabProps {
  communityName: string;
  isMember: boolean;
  onJoin: () => void;
}

export default function CommunityHomeTab({ communityName, isMember, onJoin }: CommunityHomeTabProps) {
  return (
    <div className="space-y-12">
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-black/5 shadow-sm p-8">
        <h2 className="text-2xl font-black tracking-tight mb-4">Welcome to {communityName}</h2>
        <p className="text-black/60 font-medium leading-relaxed max-w-3xl">
          We are a passionate community of developers, designers, and innovators pushing the boundaries of what's possible with technology. Whether you're a seasoned engineer or a curious beginner, there's a place for you here. Join us for weekly workshops, hackathons, and industry mentorship sessions.
        </p>
        {!isMember && (
          <button onClick={onJoin} className="mt-6 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            Join Community <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      {/* Upcoming Events */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-black/40" /> Upcoming Events</h3>
          <button className="text-sm font-bold text-black/50 hover:text-black flex items-center gap-1 transition-colors">View all <ArrowRight className="w-4 h-4" /></button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingEvents.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 hover:shadow-md transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{event.category}</span>
              <h4 className="font-black text-lg mt-3 mb-2 leading-tight">{event.title}</h4>
              <div className="flex flex-wrap gap-4 text-sm font-medium text-black/50 mb-4">
                <span>{event.date}</span><span>{event.time}</span><span>{event.venue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{event.seats} seats left</span>
                <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black/80 transition-colors">Register</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Announcements & Top Contributors side by side */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Megaphone className="w-5 h-5 text-black/40" /> Announcements</h3>
          <div className="space-y-3">
            {latestAnnouncements.map((ann, i) => (
              <motion.div key={ann.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-black/5 shadow-sm p-4 flex gap-4">
                {ann.pinned && <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-0.5 rounded-full h-fit mt-0.5">Pinned</span>}
                <div>
                  <p className="font-bold text-sm">{ann.title}</p>
                  <p className="text-xs text-black/40 font-medium mt-1">{ann.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><TrendingUp className="w-5 h-5 text-black/40" /> Top Contributors</h3>
          <div className="space-y-3">
            {topContributors.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-black/5 shadow-sm p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-black shrink-0">{c.avatar}</div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-xs text-black/40 font-medium">{c.role}</p>
                </div>
                <div className="text-sm font-black">{c.points.toLocaleString()} <span className="text-xs font-bold text-black/40">pts</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Blogs */}
      <div>
        <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><BookOpen className="w-5 h-5 text-black/40" /> Recent Blogs</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {recentBlogs.map((blog, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 hover:shadow-md transition-all cursor-pointer group">
              <h4 className="font-black text-lg leading-tight mb-3 group-hover:text-[#D95A3B] transition-colors">{blog.title}</h4>
              <div className="flex justify-between text-xs font-bold text-black/40">
                <span>{blog.author}</span>
                <span>{blog.readTime} read · {blog.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div>
        <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><FolderGit2 className="w-5 h-5 text-black/40" /> Featured Projects</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredProjects.map((proj, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 hover:shadow-md transition-all">
              <h4 className="font-black text-lg mb-1">{proj.title}</h4>
              <p className="text-sm text-black/60 font-medium mb-4">{proj.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map(t => <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-black/5 text-black/60 px-2 py-1 rounded-md">{t}</span>)}
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-black/40"><Star className="w-4 h-4" />{proj.stars}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
