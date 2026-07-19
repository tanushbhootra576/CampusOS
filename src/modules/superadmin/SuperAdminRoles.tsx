"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, CheckCircle2, ShieldAlert, Key, Plus, Lock } from "lucide-react";
import { useState } from "react";

const rolesData = [
  { id: "1", role: "Super Admin", users: 5, description: "Full access to all system features and configuration." },
  { id: "2", role: "System Moderator", users: 12, description: "Can manage users, audit logs, and global communities." },
  { id: "3", role: "Community Lead", users: 124, description: "Full control over assigned communities (events, members)." },
  { id: "4", role: "Event Coordinator", users: 450, description: "Can create and manage events within assigned communities." },
  { id: "5", role: "Student Member", users: 13500, description: "Default role. Can join communities, register for events." },
];

const permissionsData = [
  { module: "Platform Dashboard", superAdmin: true, moderator: true, commLead: false, member: false },
  { module: "User Management", superAdmin: true, moderator: true, commLead: false, member: false },
  { module: "System Settings", superAdmin: true, moderator: false, commLead: false, member: false },
  { module: "Community Management", superAdmin: true, moderator: true, commLead: true, member: false },
  { module: "Event Creation", superAdmin: true, moderator: true, commLead: true, member: false },
  { module: "Event Registration", superAdmin: true, moderator: true, commLead: true, member: true },
];

export default function SuperAdminRoles() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight mb-2"
          >
            Roles & Permissions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Define access levels and fine-grained permissions across the platform.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            <Plus className="w-4 h-4" />
            Create Role
          </button>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Roles List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 space-y-4"
        >
          {rolesData.map((role, i) => (
            <div key={role.id} className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-black/40 bg-black/5 px-3 py-1 rounded-full">
                  {role.users.toLocaleString()} Users
                </div>
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-[#D95A3B] transition-colors">{role.role}</h3>
              <p className="text-sm font-medium text-black/60">{role.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Permissions Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Lock className="w-5 h-5 text-black/40" /> Permission Matrix
            </h2>
            <button className="text-sm font-bold text-[#D95A3B] hover:text-[#c4492c] transition-colors">
              Edit Matrix
            </button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-black/5 text-xs font-bold uppercase tracking-widest text-black/40">
                  <th className="px-6 py-4">Module / Action</th>
                  <th className="px-6 py-4 text-center">Super Admin</th>
                  <th className="px-6 py-4 text-center">Moderator</th>
                  <th className="px-6 py-4 text-center">Comm. Lead</th>
                  <th className="px-6 py-4 text-center">Member</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {permissionsData.map((perm, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm">{perm.module}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {perm.superAdmin ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-black/20">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {perm.moderator ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-black/20">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {perm.commLead ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-black/20">-</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {perm.member ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-black/20">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
