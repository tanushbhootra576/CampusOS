"use client";

import { motion } from "framer-motion";
import { GitBranch, ExternalLink, Heart, Tag } from "lucide-react";
import { useState } from "react";

const projects = [
  { id: "1", title: "CampusNav", desc: "Indoor AR navigation app for large university campuses. Uses ML for real-time pathfinding.", tech: ["React Native", "TensorFlow", "FastAPI"], contributors: ["AR", "KM", "RS"], likes: 124, tags: ["Mobile", "AR", "ML"], thumb: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "AlumniConnect", desc: "Platform bridging current students with alumni for mentorship, referrals, and career guidance.", tech: ["Next.js", "MongoDB", "Tailwind"], contributors: ["PS", "DN"], likes: 89, tags: ["Web", "Full-Stack"], thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "AutoGrade", desc: "AI-powered automated code evaluation system for competitive programming contest judges.", tech: ["Go", "Docker", "Redis"], contributors: ["AR", "KM"], likes: 203, tags: ["DevOps", "AI", "Open Source"], thumb: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "ResearchHub", desc: "A collaborative platform for students and faculty to discover and participate in research projects.", tech: ["Vue.js", "Django", "PostgreSQL"], contributors: ["PS", "MI"], likes: 67, tags: ["Web", "Research"], thumb: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop" },
];

export default function CommunityProjectsTab() {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const toggleLike = (id: string) => {
    setLiked(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((proj, i) => (
        <motion.div key={proj.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col">
          <div className="h-44 overflow-hidden">
            <img src={proj.thumb} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <h3 className="text-xl font-black tracking-tight mb-2">{proj.title}</h3>
            <p className="text-sm text-black/60 font-medium leading-relaxed mb-4 flex-1">{proj.desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {proj.tech.map(t => <span key={t} className="text-[10px] font-bold bg-black/5 text-black/60 px-2 py-1 rounded-md uppercase tracking-widest">{t}</span>)}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {proj.tags.map(t => <span key={t} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full"><Tag className="w-2.5 h-2.5" />{t}</span>)}
            </div>

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1">
                {proj.contributors.map((c, ci) => (
                  <div key={ci} className={`w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[10px] font-black text-black/60 border-2 border-white ${ci > 0 ? "-ml-2" : ""}`}>{c}</div>
                ))}
                <span className="text-xs font-bold text-black/40 ml-2">{proj.contributors.length} contributors</span>
              </div>
              <button onClick={() => toggleLike(proj.id)} className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${liked.has(proj.id) ? "text-red-500" : "text-black/40 hover:text-red-400"}`}>
                <Heart className={`w-4 h-4 ${liked.has(proj.id) ? "fill-current" : ""}`} />
                {proj.likes + (liked.has(proj.id) ? 1 : 0)}
              </button>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border border-black/10 text-black/60 py-2.5 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors">
                <GitBranch className="w-4 h-4" /> GitHub
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-black/80 transition-colors">
                <ExternalLink className="w-4 h-4" /> Live Demo
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
