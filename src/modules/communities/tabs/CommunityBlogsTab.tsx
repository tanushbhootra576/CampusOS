"use client";

import { motion } from "framer-motion";
import { Heart, MessageSquare, BookOpen } from "lucide-react";
import { useState } from "react";

const blogs = [
  { id: "1", title: "Getting Started with Docker in 2026", author: "Arjun Rao", avatar: "AR", readTime: "5 min", category: "DevOps", date: "Oct 20, 2026", likes: 142, comments: 28, cover: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "How I cracked my Google Interview as a 3rd Year", author: "Priya Sharma", avatar: "PS", readTime: "8 min", category: "Career", date: "Oct 18, 2026", likes: 310, comments: 54, cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Understanding Neural Networks from Scratch", author: "Karan Mehta", avatar: "KM", readTime: "12 min", category: "AI/ML", date: "Oct 15, 2026", likes: 98, comments: 19, cover: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "Building a REST API with Go and Gin", author: "Rohan Singh", avatar: "RS", readTime: "6 min", category: "Backend", date: "Oct 10, 2026", likes: 76, comments: 11, cover: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800&auto=format&fit=crop" },
];

const catColors: Record<string, string> = {
  DevOps: "bg-blue-50 text-blue-600",
  Career: "bg-purple-50 text-purple-600",
  "AI/ML": "bg-orange-50 text-orange-600",
  Backend: "bg-green-50 text-green-600",
};

export default function CommunityBlogsTab() {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {blogs.map((blog, i) => (
        <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col md:flex-row">
          <div className="md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
            <img src={blog.cover} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${catColors[blog.category] || "bg-gray-50 text-gray-600"}`}>{blog.category}</span>
                <span className="text-xs font-medium text-black/40">{blog.date}</span>
              </div>
              <h3 className="text-xl font-black tracking-tight leading-tight mb-4 group-hover:text-[#D95A3B] transition-colors">{blog.title}</h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">{blog.avatar}</div>
                <div>
                  <p className="text-sm font-bold">{blog.author}</p>
                  <p className="text-xs text-black/40 font-medium">{blog.readTime} read</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5">
              <div className="flex items-center gap-6">
                <button onClick={() => toggleLike(blog.id)} className={`flex items-center gap-2 text-sm font-bold transition-colors ${liked.has(blog.id) ? "text-red-500" : "text-black/40 hover:text-red-400"}`}>
                  <Heart className={`w-5 h-5 ${liked.has(blog.id) ? "fill-current" : ""}`} />
                  {blog.likes + (liked.has(blog.id) ? 1 : 0)}
                </button>
                <div className="flex items-center gap-2 text-sm font-bold text-black/40">
                  <MessageSquare className="w-5 h-5" />{blog.comments}
                </div>
              </div>
              <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-black/80 transition-colors">
                <BookOpen className="w-4 h-4" /> Read Article
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
