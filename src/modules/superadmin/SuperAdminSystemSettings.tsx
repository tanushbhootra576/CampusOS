"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Globe, Server, Save, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SuperAdminSystemSettings() {
  const [activeTab, setActiveTab] = useState("General");
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    { name: "General", icon: Globe },
    { name: "Security", icon: Shield },
    { name: "Infrastructure", icon: Server },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3"
          >
            System Settings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Configure global platform variables, security policies, and environment variables.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-all w-[140px] justify-center"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
            {isSaved ? "Saved" : "Save Changes"}
          </button>
        </motion.div>
      </div>

      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 bg-gray-50/50 border-r border-black/5 p-6 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all w-full text-left ${
                activeTab === tab.name 
                  ? "bg-white text-black shadow-sm border border-black/5" 
                  : "text-black/50 hover:bg-black/5 hover:text-black"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl space-y-10"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">{activeTab} Settings</h2>
              <p className="text-sm font-medium text-black/50">
                {activeTab === "General" ? "Configure platform identity and basic settings." : 
                 activeTab === "Security" ? "Manage authentication, session limits, and password policies." : 
                 "Configure database connections, API keys, and external services."}
              </p>
            </div>

            {activeTab === "General" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black/70">Platform Name</label>
                  <input type="text" defaultValue="CampusOS" className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-bold focus:outline-none focus:border-black/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black/70">Support Email</label>
                  <input type="email" defaultValue="support@campusos.com" className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-bold focus:outline-none focus:border-black/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black/70">Timezone</label>
                  <select className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-bold focus:outline-none focus:border-black/30 transition-colors appearance-none">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-black/5 rounded-2xl">
                  <div>
                    <div className="font-bold text-sm">Require Two-Factor Authentication</div>
                    <div className="text-xs text-black/50 mt-1 font-medium">Force all Super Admins to use 2FA.</div>
                  </div>
                  <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-black transition-colors focus:outline-none">
                    <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7 shadow-sm" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-black/5 rounded-2xl">
                  <div>
                    <div className="font-bold text-sm">Session Timeout</div>
                    <div className="text-xs text-black/50 mt-1 font-medium">Automatically log out inactive users.</div>
                  </div>
                  <select className="px-4 py-2 bg-white border border-black/10 rounded-lg text-sm font-bold focus:outline-none focus:border-black/30 transition-colors">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>4 Hours</option>
                    <option>24 Hours</option>
                  </select>
                </div>
                <div className="space-y-2 pt-4">
                  <label className="text-sm font-bold text-black/70">Allowed IP Addresses (CIDR)</label>
                  <textarea rows={3} defaultValue="0.0.0.0/0 (All allowed)" className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-mono text-black/60 focus:outline-none focus:border-black/30 transition-colors" />
                </div>
              </div>
            )}

            {activeTab === "Infrastructure" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black/70">Database URI</label>
                  <input type="password" defaultValue="mongodb+srv://admin:*******@cluster0.mongodb.net/campusos" className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-mono text-black/60 focus:outline-none focus:border-black/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black/70">AWS S3 Bucket Name</label>
                  <input type="text" defaultValue="campusos-prod-assets" className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm font-mono text-black/60 focus:outline-none focus:border-black/30 transition-colors" />
                </div>
                <div className="space-y-2 pt-4">
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <h4 className="text-sm font-bold text-red-700 mb-2">Danger Zone</h4>
                    <p className="text-xs font-medium text-red-600/70 mb-4">
                      Modifying infrastructure settings can result in immediate platform downtime. Please ensure you know what you are doing.
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors">
                      Unlock Infrastructure Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
