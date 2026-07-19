"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, LogOut, ArrowRight, ShieldAlert, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const myClubs = [
  { id: "1", name: "Google Developer Student Clubs", role: "Core Member", joinDate: "Aug 2024", eventsAttended: 12, nextEvent: "Tomorrow", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop" },
  { id: "2", name: "AWS Cloud Club", role: "Member", joinDate: "Sep 2024", eventsAttended: 5, nextEvent: "Oct 26", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
  { id: "3", name: "Design Co.", role: "Design Lead", joinDate: "Jul 2024", eventsAttended: 8, nextEvent: "Oct 28", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" },
];

export default function MyClubsPage() {
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
            My Clubs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Communities you are currently a part of.
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
              placeholder="Search my clubs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-black/10 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
            Role <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClubs.map((club, i) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="h-32 bg-gray-100 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${club.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                {club.role.includes("Lead") || club.role.includes("Core") ? (
                  <span className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
                    <ShieldAlert className="w-3 h-3" /> Core
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-white/20">
                    <BadgeCheck className="w-3 h-3" /> Member
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-[#D95A3B] transition-colors">{club.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Role</div>
                  <div className="font-bold text-sm">{club.role}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Joined</div>
                  <div className="font-bold text-sm">{club.joinDate}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Events</div>
                  <div className="font-bold text-sm">{club.eventsAttended} attended</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-1">Next Event</div>
                  <div className="font-bold text-sm text-green-600">{club.nextEvent}</div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                <button className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-2 transition-colors">
                  <LogOut className="w-4 h-4" /> Leave
                </button>
                <Link href={`/communities/${club.id}`} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
                  View <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
