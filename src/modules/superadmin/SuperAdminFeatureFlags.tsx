"use client";

import { motion } from "framer-motion";
import { Flag, Search, ChevronDown, CheckCircle2, ShieldAlert } from "lucide-react";
import { useState } from "react";

const featureFlagsData = [
  { id: "1", name: "Beta Analytics Dashboard", key: "feature.analytics.v2", description: "Enables the new high-performance analytics dashboard for community leads.", enabled: true, environment: "Production" },
  { id: "2", name: "AI Content Moderation", key: "feature.ai.moderation", description: "Automatically scans community posts for inappropriate content using LLMs.", enabled: false, environment: "Production" },
  { id: "3", name: "Mobile App Push Notifications", key: "feature.mobile.push", description: "Enables push notification routing to the new iOS/Android apps.", enabled: true, environment: "Production" },
  { id: "4", name: "Stripe Payment Gateway", key: "feature.payments.stripe", description: "Allows communities to collect dues via Stripe instead of manual tracking.", enabled: false, environment: "Beta" },
  { id: "5", name: "Custom Domain Support", key: "feature.domains.custom", description: "Allows communities to map their own custom domains to their pages.", enabled: false, environment: "Development" },
];

export default function SuperAdminFeatureFlags() {
  const [search, setSearch] = useState("");
  const [flags, setFlags] = useState(featureFlagsData);

  const toggleFlag = (id: string) => {
    setFlags(flags.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3"
          >
            Feature Flags
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Toggle experimental features and manage progressive rollouts safely.
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
              placeholder="Search flags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            Create Flag
          </button>
        </motion.div>
      </div>

      <div className="grid gap-4">
        {flags.map((flag, i) => (
          <motion.div 
            key={flag.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.05) }}
            className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-black/10 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold">{flag.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                  flag.environment === "Production" ? "bg-green-50 text-green-600" :
                  flag.environment === "Beta" ? "bg-purple-50 text-purple-600" :
                  "bg-orange-50 text-orange-600"
                }`}>
                  {flag.environment}
                </span>
              </div>
              <p className="text-sm font-medium text-black/60 mb-3 max-w-3xl">
                {flag.description}
              </p>
              <div className="inline-block bg-gray-50 border border-black/5 rounded-md px-2 py-1 font-mono text-xs text-black/40">
                {flag.key}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40">
                {flag.enabled ? "Enabled" : "Disabled"}
              </div>
              <button 
                onClick={() => toggleFlag(flag.id)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                  flag.enabled ? 'bg-black' : 'bg-black/10'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    flag.enabled ? 'translate-x-7' : 'translate-x-1'
                  } shadow-sm`}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
