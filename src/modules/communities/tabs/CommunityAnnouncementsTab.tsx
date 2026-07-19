"use client";

import { motion } from "framer-motion";
import { Paperclip, Pin, AlertCircle } from "lucide-react";

const announcements = [
  { id: "1", title: "Core Team Applications Now Open!", body: "We're looking for passionate students to join our core team for the 2026-27 academic year. Applications are open for roles in Design, Tech, Marketing, and Events. Apply before November 5, 2026.", author: "Arjun Rao", avatar: "AR", role: "President", date: "Oct 24, 2026", pinned: true, important: true, attachments: ["Application_Form.pdf"] },
  { id: "2", title: "Congratulations to Our Hackathon Winners! 🎉", body: "Team 'ByteForce' (Karan, Rohan, Aditya) secured 1st place at the National Cloud Hackathon hosted by AWS! They won ₹1,00,000 in prizes and AWS credits. We couldn't be more proud!", author: "Priya Sharma", avatar: "PS", role: "Vice President", date: "Oct 20, 2026", pinned: false, important: false, attachments: [] },
  { id: "3", title: "Workshop Venue Change - Oct 28", body: "Please note that the upcoming Web Dev Workshop venue has been changed from SJT 110 to AB1 201 due to scheduling conflicts. The time remains the same: 6:00 PM. Update your calendars!", author: "Divya Nair", avatar: "DN", role: "Event Lead", date: "Oct 18, 2026", pinned: false, important: true, attachments: [] },
  { id: "4", title: "New Resources: Interview Prep Guide", body: "We've compiled a comprehensive interview preparation guide covering DSA, System Design, and Behavioral rounds. All members can access it via the Resources section. Happy grinding! 💪", author: "Karan Mehta", avatar: "KM", role: "Tech Lead", date: "Oct 15, 2026", pinned: false, important: false, attachments: ["Interview_Prep_Guide_v2.pdf", "DSA_Sheet.xlsx"] },
];

export default function CommunityAnnouncementsTab() {
  return (
    <div className="space-y-4">
      {/* Pinned first */}
      {[...announcements.filter(a => a.pinned), ...announcements.filter(a => !a.pinned)].map((ann, i) => (
        <motion.div key={ann.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className={`bg-white rounded-3xl border shadow-sm p-6 md:p-8 ${ann.pinned ? "border-[#D95A3B]/20 bg-red-50/10" : "border-black/5"}`}>
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-black shrink-0">{ann.avatar}</div>

            <div className="flex-1 min-w-0">
              {/* Header badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {ann.pinned && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-[#D95A3B] text-white px-2 py-0.5 rounded-full">
                    <Pin className="w-2.5 h-2.5" /> Pinned
                  </span>
                )}
                {ann.important && (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-2.5 h-2.5" /> Important
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-black text-xl tracking-tight leading-tight mb-1">{ann.title}</h3>

              {/* Author + date */}
              <div className="flex items-center gap-2 text-xs font-medium text-black/40 mb-4">
                <span className="font-bold text-black/60">{ann.author}</span>
                <span>·</span>
                <span>{ann.role}</span>
                <span>·</span>
                <span>{ann.date}</span>
              </div>

              {/* Body */}
              <p className="text-black/70 font-medium leading-relaxed text-sm mb-5">{ann.body}</p>

              {/* Attachments */}
              {ann.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ann.attachments.map(file => (
                    <button key={file} className="flex items-center gap-2 text-xs font-bold text-black/60 bg-black/5 px-3 py-2 rounded-xl hover:bg-black/10 transition-colors">
                      <Paperclip className="w-3.5 h-3.5" />{file}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
