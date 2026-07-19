"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, MoreVertical, Plus, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const communitiesData = [
  { id: "1", name: "Google Developer Student Clubs", type: "Technical", members: 850, status: "Active", created: "Aug 15, 2026", owner: "sarah.j" },
  { id: "2", name: "AWS Cloud Club", type: "Technical", members: 600, status: "Active", created: "Sep 01, 2026", owner: "marcus.c" },
  { id: "3", name: "Design Co.", type: "Creative", members: 420, status: "Active", created: "Jul 10, 2026", owner: "elena.r" },
  { id: "4", name: "Finance Society", type: "Business", members: 310, status: "Pending", created: "Oct 12, 2026", owner: "david.m" },
  { id: "5", name: "Robotics Labs", type: "Technical", members: 150, status: "Suspended", created: "Jan 05, 2026", owner: "alex.t" },
];

export default function SuperAdminCommunities() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight mb-2"
          >
            All Communities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Manage and oversee all student organizations across the platform.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 w-full md:w-auto"
        >
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input 
              type="text" 
              placeholder="Search communities..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
            Filter <ChevronDown className="w-4 h-4" />
          </button>
          <Link href="/super-admin/communities/create" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            <Plus className="w-4 h-4" />
            New
          </Link>
        </motion.div>
      </div>

      {/* Data Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 text-xs font-bold uppercase tracking-widest text-black/40 bg-gray-50/50">
                <th className="px-6 py-4">Community Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Members</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {communitiesData.map((community) => (
                <tr key={community.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold">{community.name}</div>
                    <div className="text-xs font-medium text-black/40 mt-0.5">Owner: {community.owner}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">{community.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold">{community.members.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      community.status === "Active" ? "bg-green-50 text-green-700" :
                      community.status === "Pending" ? "bg-orange-50 text-orange-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {community.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> :
                       community.status === "Suspended" ? <ShieldAlert className="w-3 h-3" /> : null}
                      {community.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-black/60 font-medium">{community.created}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5 text-black/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-black/5 flex items-center justify-between text-sm font-bold text-black/40">
          <div>Showing 1 to 5 of 124 entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-black/10 rounded-full hover:bg-gray-50 disabled:opacity-50 transition-colors">Previous</button>
            <button className="px-4 py-2 border border-black/10 rounded-full hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
