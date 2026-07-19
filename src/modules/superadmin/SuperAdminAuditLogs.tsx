"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, CheckCircle2, ShieldAlert, Zap, Download } from "lucide-react";
import { useState } from "react";

const auditLogsData = [
  { id: "1", action: "System Backup Created", type: "System", user: "system", ip: "10.0.0.1", time: "10 mins ago", status: "Success", details: "Manual snapshot backup-2026-10-24" },
  { id: "2", action: "User Role Updated", type: "Security", user: "superadmin", ip: "192.168.1.45", time: "1 hour ago", status: "Success", details: "Promoted sarah.j to Community Lead" },
  { id: "3", action: "Failed Authentication", type: "Security", user: "unknown", ip: "45.22.11.90", time: "2 hours ago", status: "Error", details: "Invalid password for admin@campusos.com (3 attempts)" },
  { id: "4", action: "Community Deleted", type: "Admin", user: "marcus.c", ip: "192.168.1.12", time: "5 hours ago", status: "Warning", details: "Deleted inactive 'Chess Club'" },
  { id: "5", action: "Feature Flag Toggled", type: "System", user: "superadmin", ip: "192.168.1.45", time: "1 day ago", status: "Success", details: "Enabled 'Beta Analytics Dashboard'" },
  { id: "6", action: "API Rate Limit Exceeded", type: "System", user: "anonymous", ip: "112.55.33.21", time: "2 days ago", status: "Error", details: "Rate limit triggered on /api/events" },
];

export default function SuperAdminAuditLogs() {
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
            Audit Logs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Detailed timeline of all system and administrative actions.
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
              placeholder="Search logs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
            Filter <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
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
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">User / IP</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {auditLogsData.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm">{log.action}</div>
                    <div className="text-xs font-medium text-black/40 mt-1 max-w-sm truncate">{log.details}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-black/60 bg-black/5 px-2 py-1 rounded-md">{log.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold">{log.user}</div>
                    <div className="text-xs font-mono text-black/40 mt-1">{log.ip}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-black/60 font-medium">{log.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      log.status === "Success" ? "bg-green-50 text-green-700" :
                      log.status === "Warning" ? "bg-orange-50 text-orange-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {log.status === "Success" ? <CheckCircle2 className="w-3 h-3" /> :
                       log.status === "Warning" ? <ShieldAlert className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-black/5 flex items-center justify-between text-sm font-bold text-black/40">
          <div>Showing 1 to 6 of 84,291 logs</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-black/10 rounded-full hover:bg-gray-50 disabled:opacity-50 transition-colors">Previous</button>
            <button className="px-4 py-2 border border-black/10 rounded-full hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
