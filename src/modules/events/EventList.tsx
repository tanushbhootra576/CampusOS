"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, MapPin, Calendar, Clock, ArrowUpRight, Users, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const myEvents = [
  { id: "1", title: "React Native Workshop", community: "Google Developer Student Clubs", date: "Tomorrow", time: "4:00 PM - 6:00 PM", location: "Lab 3", type: "Workshop", status: "Upcoming", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Cloud Architecture 101", community: "AWS Cloud Club", date: "Oct 26, 2026", time: "2:00 PM - 5:00 PM", location: "Main Auditorium", type: "Seminar", status: "Upcoming", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
];

const pastEvents = [
  { id: "3", title: "UI/UX Design Sprint", community: "Design Co.", date: "Oct 15, 2026", time: "10:00 AM - 4:00 PM", location: "Studio A", type: "Hackathon", status: "Attended", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" },
];

export default function EventList() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Upcoming");

  const displayEvents = activeTab === "Upcoming" ? myEvents : pastEvents;

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
            My Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Track your registrations, schedule, and past attendance.
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
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-black/5 rounded-full w-fit">
        {["Upcoming", "Past Events"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === tab ? "bg-white shadow-sm text-black" : "text-black/50 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {displayEvents.map((evt, i) => (
          <motion.div
            key={evt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-white rounded-3xl border border-black/5 shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Thumbnail */}
            <div className="w-full md:w-48 h-48 md:h-full rounded-2xl bg-gray-100 overflow-hidden relative shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${evt.image}')` }}
              ></div>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black">
                {evt.type}
              </div>
            </div>

            {/* Event Details */}
            <div className="flex-1 flex flex-col w-full">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-black/50 uppercase tracking-widest">
                  <Users className="w-3 h-3" /> {evt.community}
                </div>
                {evt.status === "Upcoming" ? (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0">
                    Registered
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> Attended
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-black tracking-tight mb-6 group-hover:text-[#D95A3B] transition-colors">{evt.title}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black/40 uppercase tracking-widest mb-1">
                    <Calendar className="w-3 h-3" /> Date
                  </div>
                  <div className="font-bold text-sm">{evt.date}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black/40 uppercase tracking-widest mb-1">
                    <Clock className="w-3 h-3" /> Time
                  </div>
                  <div className="font-bold text-sm">{evt.time}</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black/40 uppercase tracking-widest mb-1">
                    <MapPin className="w-3 h-3" /> Location
                  </div>
                  <div className="font-bold text-sm">{evt.location}</div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-black/5 flex justify-end gap-4">
                {evt.status === "Attended" && (
                  <button className="text-sm font-bold text-black/50 hover:text-black transition-colors px-4 py-2">
                    View Certificate
                  </button>
                )}
                <Link href={`/events/${evt.id}`} className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
                  Details <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}