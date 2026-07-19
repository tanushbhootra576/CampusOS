"use client";

import { motion } from "framer-motion";
import { Users, Globe, Activity, ShieldAlert, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Total Users", value: "14,291", change: "+12%", icon: Users, color: "bg-blue-50 text-blue-600" },
  { name: "Active Communities", value: "124", change: "+3", icon: Globe, color: "bg-orange-50 text-orange-600" },
  { name: "System Health", value: "99.9%", change: "Nominal", icon: Activity, color: "bg-green-50 text-green-600" },
  { name: "Active Admins", value: "42", change: "Online", icon: ShieldAlert, color: "bg-purple-50 text-purple-600" },
];

const auditLogs = [
  { action: "Community Created", target: "Data Science Club", user: "admin@campus.edu", time: "10 mins ago", status: "success" },
  { action: "User Banned", target: "john.doe@campus.edu", user: "moderator1", time: "1 hour ago", status: "warning" },
  { action: "System Backup", target: "Database Snapshot", user: "system", time: "3 hours ago", status: "success" },
  { action: "Role Updated", target: "sarah.j (Added as Admin)", user: "superadmin", time: "5 hours ago", status: "success" },
  { action: "Failed Login", target: "unknown IP 192.168.1.1", user: "anonymous", time: "12 hours ago", status: "error" },
];

export default function SuperAdminDashboard() {
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
            Platform Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Monitor CampusOS instances, usage, and system health.
          </motion.p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`p-3 rounded-2xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-black/40 bg-black/5 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <div className="text-3xl font-black tracking-tight mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-black/50">{stat.name}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content: Audit Logs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight">Recent Audit Logs</h2>
            <Link href="/super-admin/audit-logs" className="text-sm font-bold text-black/50 hover:text-black flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <div className="divide-y divide-black/5">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex gap-4 p-4 md:p-6 hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    log.status === "success" ? "bg-green-50 text-green-600" :
                    log.status === "warning" ? "bg-orange-50 text-orange-600" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {log.status === "success" ? <CheckCircle2 className="w-5 h-5" /> : 
                     log.status === "warning" ? <ShieldAlert className="w-5 h-5" /> : 
                     <Zap className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold">
                        {log.action} <span className="font-medium text-black/60">on</span> {log.target}
                      </p>
                      <p className="text-xs font-medium text-black/40 mt-1">
                        Performed by <span className="text-black/60">{log.user}</span>
                      </p>
                    </div>
                    <div className="text-xs font-bold text-black/40">
                      {log.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar Content: System Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight">System Infrastructure</h2>
          </div>
          
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-black/60">Database Cluster</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Healthy</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="text-xs font-medium text-black/40 mt-2">45% capacity utilized</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-black/60">Storage Bucket</span>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Warning</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs font-medium text-black/40 mt-2">85% capacity utilized (1.2TB / 1.5TB)</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-black/60">Cache Node</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Healthy</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="text-xs font-medium text-black/40 mt-2">25% memory utilized</div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-black/5">
              <Link href="/super-admin/system-settings" className="flex items-center justify-center w-full gap-2 bg-black text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
                Manage Infrastructure
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
