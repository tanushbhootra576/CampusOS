"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, MoreVertical, Plus, CheckCircle2, ShieldAlert, Mail } from "lucide-react";
import { useState } from "react";

const usersData = [
  { id: "1", name: "Sarah Jenkins", email: "sarah.j@campus.edu", role: "Student", status: "Active", joined: "Aug 10, 2026", lastActive: "2 mins ago" },
  { id: "2", name: "Marcus Chen", email: "marcus.c@campus.edu", role: "Community Admin", status: "Active", joined: "Aug 15, 2026", lastActive: "1 hour ago" },
  { id: "3", name: "Dr. Elena Rodriguez", email: "elena.r@faculty.campus.edu", role: "Faculty Advisor", status: "Active", joined: "Jul 05, 2026", lastActive: "3 days ago" },
  { id: "4", name: "David Miller", email: "david.m@campus.edu", role: "Student", status: "Suspended", joined: "Oct 12, 2026", lastActive: "1 week ago" },
  { id: "5", name: "System Admin", email: "admin@campusos.com", role: "Super Admin", status: "Active", joined: "Jan 01, 2026", lastActive: "Just now" },
];

export default function SuperAdminUsers() {
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
            User Management
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Manage users, assign roles, and handle access control.
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
              placeholder="Search users..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
            Role <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            <Plus className="w-4 h-4" />
            Invite
          </button>
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
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F4F3EF] flex items-center justify-center text-xs font-black text-black/40 shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        {user.name}
                        <div className="text-xs font-medium text-black/40 mt-0.5 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      user.role.includes("Admin") 
                        ? "bg-purple-50 text-purple-700 border-purple-100"
                        : "bg-gray-50 text-black/60 border-black/5"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      user.status === "Active" ? "bg-green-50 text-green-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {user.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black/60 font-medium">{user.joined}</div>
                    <div className="text-xs text-black/40 font-medium mt-0.5">Last seen: {user.lastActive}</div>
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
          <div>Showing 1 to 5 of 14,291 entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-black/10 rounded-full hover:bg-gray-50 disabled:opacity-50 transition-colors">Previous</button>
            <button className="px-4 py-2 border border-black/10 rounded-full hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
