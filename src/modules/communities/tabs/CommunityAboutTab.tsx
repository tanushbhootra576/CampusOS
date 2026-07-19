"use client";

import { motion } from "framer-motion";
import { Target, Eye, Award, Globe, Link2, ExternalLink, GitBranch, ChevronDown } from "lucide-react";
import { useState } from "react";

const leads = [
  { name: "Arjun Rao", role: "President", avatar: "AR", dept: "CSE", year: "4th Year" },
  { name: "Priya Sharma", role: "Vice President", avatar: "PS", dept: "ECE", year: "3rd Year" },
  { name: "Karan Mehta", role: "Tech Lead", avatar: "KM", dept: "CSE", year: "3rd Year" },
  { name: "Divya Nair", role: "Design Lead", avatar: "DN", dept: "IT", year: "2nd Year" },
];

const achievements = [
  { title: "Best Technical Club Award", year: "2025", issuer: "VIT University" },
  { title: "National Champions - HackFest 2025", year: "2025", issuer: "CodeChef" },
  { title: "500+ Members Milestone", year: "2024", issuer: "Internal" },
];

const timeline = [
  { year: "2018", event: "Community founded by a group of 12 passionate coders" },
  { year: "2020", event: "Reached 100 members. First national hackathon win." },
  { year: "2022", event: "Launched annual flagship event 'TechSprint'" },
  { year: "2024", event: "Partnered with Google Developer Groups for workshops" },
  { year: "2026", event: "Crossed 1,200 members. Hosting inter-university contests." },
];

const faqs = [
  { q: "How do I join the community?", a: "Click the 'Join Community' button and fill out the onboarding form. Membership is open to all registered students." },
  { q: "Are there membership fees?", a: "No! All our events, workshops, and resources are completely free for members." },
  { q: "How can I be part of the core team?", a: "Core team applications open every semester. Watch our announcements for the next recruitment cycle." },
];

export default function CommunityAboutTab() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-black/5 shadow-sm p-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black tracking-tight mb-3">Our Mission</h3>
          <p className="text-black/60 font-medium leading-relaxed">
            To democratize access to technology education by building a collaborative, inclusive, and high-impact learning community for students across all disciplines.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-black/5 shadow-sm p-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black tracking-tight mb-3">Our Vision</h3>
          <p className="text-black/60 font-medium leading-relaxed">
            To be the premier student tech community in India, producing industry-ready engineers who solve real-world problems with creativity, collaboration, and code.
          </p>
        </motion.div>
      </div>

      {/* Faculty Coordinator */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl border border-black/5 shadow-sm p-8">
        <h3 className="text-xl font-black tracking-tight mb-6">Faculty Coordinator</h3>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-black shrink-0">DR</div>
          <div>
            <p className="font-black text-lg">Dr. Rajesh Kumar</p>
            <p className="text-black/60 font-medium">Professor, Dept. of CSE</p>
            <p className="text-sm text-black/40 font-medium mt-1">rajesh.kumar@vit.ac.in</p>
          </div>
        </div>
      </motion.div>

      {/* Community Leads */}
      <div>
        <h3 className="text-xl font-black tracking-tight mb-6">Core Team</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leads.map((lead, i) => (
            <motion.div key={lead.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 text-center hover:shadow-md transition-all group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4 text-xl font-black text-black/60 group-hover:bg-black group-hover:text-white transition-all">{lead.avatar}</div>
              <p className="font-black text-base">{lead.name}</p>
              <p className="text-xs font-bold text-[#D95A3B] uppercase tracking-widest mt-1">{lead.role}</p>
              <p className="text-xs text-black/40 font-medium mt-1">{lead.dept} · {lead.year}</p>
              <div className="flex justify-center gap-3 mt-4">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><Link2 className="w-4 h-4 text-black/40" /></button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><GitBranch className="w-4 h-4 text-black/40" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl border border-black/5 shadow-sm p-8">
        <h3 className="text-xl font-black tracking-tight mb-6">Social Links</h3>
        <div className="flex flex-wrap gap-4">
          {[{ icon: GitBranch, label: "GitHub", link: "#" }, { icon: Link2, label: "LinkedIn", link: "#" }, { icon: ExternalLink, label: "Twitter", link: "#" }, { icon: Globe, label: "Website", link: "#" }].map(s => (
            <a key={s.label} href={s.link} className="flex items-center gap-2 bg-gray-50 border border-black/5 px-4 py-2 rounded-full text-sm font-bold text-black/60 hover:bg-black hover:text-white transition-all">
              <s.icon className="w-4 h-4" />{s.label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" /> Achievements</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-3xl p-6">
              <div className="text-2xl mb-3">🏆</div>
              <h4 className="font-black text-base leading-tight mb-2">{a.title}</h4>
              <p className="text-xs font-bold text-black/50">{a.issuer} · {a.year}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-xl font-black tracking-tight mb-6">Our Journey</h3>
        <div className="relative pl-8 space-y-6">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-black/10" />
          {timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative">
              <div className="absolute -left-5 w-4 h-4 rounded-full bg-black border-4 border-[#F4F3EF]" />
              <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
                <span className="text-xs font-black uppercase tracking-widest text-black/40">{item.year}</span>
                <p className="font-bold text-sm mt-1">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <h3 className="text-xl font-black tracking-tight mb-6">FAQ</h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                <span className="font-bold">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-black/40 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <div className="px-6 pb-6 text-sm text-black/60 font-medium">{faq.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
