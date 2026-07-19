"use client";

import { motion } from "framer-motion";
import { Search, GitBranch, Link2, Star } from "lucide-react";
import { useState } from "react";

const members = [
  { id: "1", name: "Arjun Rao", role: "President", avatar: "AR", dept: "CSE", year: "4th", skills: ["React", "Node.js", "ML"], points: 4820 },
  { id: "2", name: "Priya Sharma", role: "Vice President", avatar: "PS", dept: "ECE", year: "3rd", skills: ["Python", "Data Science"], points: 4100 },
  { id: "3", name: "Karan Mehta", role: "Tech Lead", avatar: "KM", dept: "CSE", year: "3rd", skills: ["Go", "Docker", "K8s"], points: 3750 },
  { id: "4", name: "Divya Nair", role: "Design Lead", avatar: "DN", dept: "IT", year: "2nd", skills: ["Figma", "UI/UX"], points: 3200 },
  { id: "5", name: "Rohan Singh", role: "Core Member", avatar: "RS", dept: "CSE", year: "2nd", skills: ["React", "TypeScript"], points: 2100 },
  { id: "6", name: "Sneha Patel", role: "Core Member", avatar: "SP", dept: "CSE", year: "2nd", skills: ["Java", "Spring Boot"], points: 1900 },
  { id: "7", name: "Aditya Kumar", role: "Member", avatar: "AK", dept: "ECE", year: "1st", skills: ["C++", "Competitive"], points: 1200 },
  { id: "8", name: "Meera Iyer", role: "Member", avatar: "MI", dept: "IT", year: "1st", skills: ["Python", "ML"], points: 980 },
];

const roleColors: Record<string, string> = {
  "President": "bg-purple-50 text-purple-700",
  "Vice President": "bg-blue-50 text-blue-700",
  "Tech Lead": "bg-green-50 text-green-700",
  "Design Lead": "bg-orange-50 text-orange-700",
  "Core Member": "bg-yellow-50 text-yellow-700",
  "Member": "bg-gray-50 text-gray-600",
};

export default function CommunityMembersTab() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const roles = ["All", "President", "Vice President", "Tech Lead", "Design Lead", "Core Member", "Member"];

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.dept.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "All" || m.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <input type="text" placeholder="Search by name, department..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {roles.map(role => (
            <button key={role} onClick={() => setFilterRole(role)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filterRole === role ? "bg-black text-white" : "bg-white border border-black/10 text-black/60 hover:bg-gray-50"}`}>
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((member, i) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 hover:shadow-md transition-all group">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-3 text-xl font-black text-black/60 group-hover:bg-black group-hover:text-white transition-all">
                {member.avatar}
              </div>
              <p className="font-black">{member.name}</p>
              <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1 ${roleColors[member.role] || "bg-gray-50 text-gray-600"}`}>
                {member.role}
              </span>
              <p className="text-xs text-black/40 font-medium mt-1">{member.dept} · {member.year} Year</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center mb-4">
              {member.skills.slice(0, 3).map(s => (
                <span key={s} className="text-[10px] font-bold bg-black/5 text-black/60 px-2 py-0.5 rounded-md">{s}</span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs font-bold text-black/40 mb-4">
              <Star className="w-3 h-3 text-yellow-500" /> {member.points.toLocaleString()} pts
            </div>
            <div className="flex gap-2 justify-center">
              <button className="p-2 rounded-lg bg-gray-50 hover:bg-black/5 transition-colors"><GitBranch className="w-4 h-4 text-black/50" /></button>
              <button className="p-2 rounded-lg bg-gray-50 hover:bg-black/5 transition-colors"><Link2 className="w-4 h-4 text-black/50" /></button>
              <button className="flex-1 bg-black text-white rounded-full text-xs font-bold py-2 hover:bg-black/80 transition-colors">View Profile</button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-black/40 font-bold">No members found matching your search.</div>
      )}
    </div>
  );
}
