"use client";

import { motion } from "framer-motion";
import { Database, Download, CloudOff, Cloud, RefreshCw, AlertTriangle, PlayCircle } from "lucide-react";
import { useState } from "react";

const backupHistory = [
  { id: "1", date: "Oct 24, 2026 - 02:00 AM", type: "Automated", size: "1.2 GB", status: "Success" },
  { id: "2", date: "Oct 23, 2026 - 02:00 AM", type: "Automated", size: "1.2 GB", status: "Success" },
  { id: "3", date: "Oct 22, 2026 - 15:30 PM", type: "Manual", size: "1.1 GB", status: "Success" },
  { id: "4", date: "Oct 22, 2026 - 02:00 AM", type: "Automated", size: "1.1 GB", status: "Failed" },
  { id: "5", date: "Oct 21, 2026 - 02:00 AM", type: "Automated", size: "1.1 GB", status: "Success" },
];

export default function SuperAdminBackups() {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => setIsBackingUp(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3"
          >
            Backup & Restore
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Manage database snapshots, configure automated schedules, and restore data.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            onClick={handleBackup}
            disabled={isBackingUp}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-all disabled:opacity-50"
          >
            {isBackingUp ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            {isBackingUp ? "Creating Snapshot..." : "Create Manual Backup"}
          </button>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Storage Stats & Config */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Storage Box */}
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6">
            <h3 className="text-lg font-bold tracking-tight mb-6">Backup Storage</h3>
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-black/5">
                <div className="absolute inset-0 border-8 border-blue-500 rounded-full border-t-transparent border-r-transparent rotate-45"></div>
                <div className="text-center">
                  <div className="text-2xl font-black">45%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Used</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-black/5 pt-4">
              <span className="text-black/50">Total Capacity</span>
              <span>100 GB</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-black/5 pt-4 mt-4">
              <span className="text-black/50">Space Available</span>
              <span className="text-green-600">55 GB</span>
            </div>
          </div>

          {/* Schedule Box */}
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold tracking-tight">Automated Schedule</h3>
              <button className="relative inline-flex h-6 w-10 items-center rounded-full bg-green-500 transition-colors focus:outline-none">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-5 shadow-sm" />
              </button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl text-blue-700">
              <Cloud className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold leading-relaxed">
                Backups run daily at 02:00 AM UTC. Retention period is set to 30 days.
              </p>
            </div>
          </div>
        </motion.div>

        {/* History Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-black/5 bg-gray-50/50">
            <h2 className="text-xl font-bold tracking-tight">Backup History</h2>
            <p className="text-sm font-medium text-black/50 mt-1">Recent automated and manual snapshots.</p>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-xs font-bold uppercase tracking-widest text-black/40">
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {backupHistory.map((backup) => (
                  <tr key={backup.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-sm">
                      {backup.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                        backup.type === "Automated" ? "bg-black/5 text-black/60" : "bg-purple-50 text-purple-600"
                      }`}>
                        {backup.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-black/60">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        backup.status === "Success" ? "bg-green-50 text-green-700" :
                        "bg-red-50 text-red-700"
                      }`}>
                        {backup.status === "Success" ? <Cloud className="w-3 h-3" /> : <CloudOff className="w-3 h-3" />}
                        {backup.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/60 hover:text-black" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-400 hover:text-red-600" title="Restore this backup">
                          <PlayCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-black/5 bg-orange-50/50 flex gap-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-orange-800">Restoring Data</h4>
              <p className="text-xs font-medium text-orange-700 mt-1">
                Restoring from a backup will overwrite all current database records and active sessions. The platform will be placed in maintenance mode during this operation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
