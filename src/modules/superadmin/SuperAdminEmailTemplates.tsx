"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, Mail, Eye, Edit3, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const templatesData = [
  { id: "1", name: "Welcome Email", subject: "Welcome to CampusOS!", type: "Onboarding", lastEdited: "2 days ago", active: true },
  { id: "2", name: "Password Reset", subject: "Reset your CampusOS password", type: "Security", lastEdited: "1 week ago", active: true },
  { id: "3", name: "Event Invitation", subject: "You're invited: {{event.name}}", type: "Community", lastEdited: "3 weeks ago", active: true },
  { id: "4", name: "Community Join Request", subject: "New member request for {{community.name}}", type: "Community", lastEdited: "1 month ago", active: true },
  { id: "5", name: "Weekly Digest", subject: "Your CampusOS Weekly Digest", type: "Marketing", lastEdited: "2 months ago", active: false },
];

export default function SuperAdminEmailTemplates() {
  const [search, setSearch] = useState("");
  const [activeTemplate, setActiveTemplate] = useState(templatesData[0]);

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
            Email Templates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Design and manage automated emails sent by the platform.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 w-full md:w-auto"
        >
          <button className="flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
            <Send className="w-4 h-4" />
            Send Test
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            <Edit3 className="w-4 h-4" />
            Edit HTML
          </button>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
        {/* Templates List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 bg-white rounded-3xl border border-black/5 shadow-sm flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-black/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-black/5 rounded-full text-sm font-medium placeholder:text-black/30 focus:outline-none focus:border-black/20 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {templatesData.map((template) => (
              <button 
                key={template.id}
                onClick={() => setActiveTemplate(template)}
                className={`w-full text-left p-4 rounded-2xl transition-all ${
                  activeTemplate.id === template.id 
                    ? "bg-black text-white shadow-md" 
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold tracking-tight">{template.name}</span>
                  {template.active && <CheckCircle2 className={`w-4 h-4 ${activeTemplate.id === template.id ? "text-white/60" : "text-green-500"}`} />}
                </div>
                <div className={`text-xs font-medium truncate ${activeTemplate.id === template.id ? "text-white/70" : "text-black/50"}`}>
                  {template.subject}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Template Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
            <div>
              <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Subject Line</div>
              <div className="text-lg font-bold">{activeTemplate.subject}</div>
            </div>
            <div className="flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-full">
              <Eye className="w-4 h-4 text-black/50" />
              <span className="text-xs font-bold uppercase tracking-widest text-black/50">Preview</span>
            </div>
          </div>
          
          <div className="flex-1 p-8 bg-gray-100 flex items-start justify-center overflow-y-auto">
            {/* Mock Email Client Wrapper */}
            <div className="bg-white w-full max-w-lg rounded-xl shadow-sm border border-black/5 overflow-hidden">
              <div className="border-b border-black/5 px-6 py-4 flex items-center gap-4 bg-gray-50/50">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">CampusOS <span className="text-black/40 font-medium">&lt;noreply@campusos.com&gt;</span></div>
                  <div className="text-xs text-black/40">To: student@university.edu</div>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="font-black text-xl tracking-tighter uppercase">
                  Campus_OS<span className="text-[#D95A3B]">©</span>
                </div>
                
                {activeTemplate.id === "1" && (
                  <>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome to the future of campus life.</h1>
                    <p className="text-black/70 leading-relaxed">
                      Hi {"{{user.firstName}}"},<br/><br/>
                      We're thrilled to have you on board. CampusOS is your centralized hub for discovering communities, registering for events, and tracking your university journey.
                    </p>
                    <div className="pt-4">
                      <button className="bg-black text-white px-6 py-3 rounded-xl text-sm font-bold w-full md:w-auto hover:bg-black/80 transition-colors">
                        Complete your profile
                      </button>
                    </div>
                  </>
                )}
                {activeTemplate.id !== "1" && (
                  <>
                    <h1 className="text-2xl font-bold tracking-tight">Email Content Preview</h1>
                    <p className="text-black/70 leading-relaxed">
                      This is a preview of the {activeTemplate.name} template. The actual dynamic data will be injected at runtime.
                    </p>
                    <div className="p-4 bg-gray-50 rounded-xl border border-black/5 font-mono text-xs text-black/60 break-all">
                      {`{"templateId": "${activeTemplate.id}", "data": {...}}`}
                    </div>
                  </>
                )}
                
                <div className="pt-8 mt-8 border-t border-black/5 text-xs text-black/40">
                  You are receiving this email because you are registered on CampusOS.<br/>
                  © 2026 CampusOS. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
