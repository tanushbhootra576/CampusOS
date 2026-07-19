"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";

const events = [
  { id: "1", title: "Web Dev Workshop: React & Next.js", date: "Oct 28, 2026", time: "6:00 PM", venue: "SJT 110", seats: 12, totalSeats: 60, category: "Workshop", status: "upcoming", banner: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800&auto=format&fit=crop" },
  { id: "2", title: "Competitive Programming Contest", date: "Nov 2, 2026", time: "10:00 AM", venue: "Online", seats: 50, totalSeats: 200, category: "Contest", status: "upcoming", banner: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop" },
  { id: "3", title: "Cloud Computing Hackathon", date: "Nov 15, 2026", time: "9:00 AM", venue: "Tech Park, AB1", seats: 0, totalSeats: 100, category: "Hackathon", status: "upcoming", banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop" },
  { id: "4", title: "Open Source Contribution Drive", date: "Sep 30, 2026", time: "2:00 PM", venue: "Online", seats: 0, totalSeats: 300, category: "Workshop", status: "past", banner: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop" },
];

const filters = ["All", "Upcoming", "Past", "Workshop", "Hackathon", "Contest", "Seminar"];
const catColors: Record<string, string> = {
  Workshop: "bg-blue-50 text-blue-600",
  Contest: "bg-green-50 text-green-600",
  Hackathon: "bg-purple-50 text-purple-600",
  Seminar: "bg-orange-50 text-orange-600",
};

export default function CommunityEventsTab() {
  const [filter, setFilter] = useState("All");

  const filtered = events.filter(e => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return e.status === "upcoming";
    if (filter === "Past") return e.status === "past";
    return e.category === filter;
  });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? "bg-black text-white" : "bg-white border border-black/10 text-black/60 hover:bg-gray-50"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event, i) => (
          <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden hover:shadow-md transition-all group">
            <div className="h-40 overflow-hidden">
              <img src={event.banner} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${catColors[event.category] || "bg-gray-50 text-gray-600"}`}>
                  {event.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${event.status === "past" ? "bg-gray-50 text-gray-400" : "bg-green-50 text-green-600"}`}>
                  {event.status}
                </span>
              </div>
              <h4 className="font-black text-lg leading-tight mb-4">{event.title}</h4>
              <div className="space-y-2 text-sm font-medium text-black/60 mb-5">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{event.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{event.time}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.venue}</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" />
                  {event.seats > 0 ? <span className="text-orange-600 font-bold">{event.seats} seats left</span> : <span className="text-red-600 font-bold">Full</span>}
                </div>
              </div>
              <div className="flex gap-3">
                {event.status === "upcoming" && event.seats > 0 && (
                  <button className="flex-1 bg-black text-white py-2.5 rounded-full text-xs font-bold hover:bg-black/80 transition-colors">Register</button>
                )}
                {event.status === "upcoming" && event.seats === 0 && (
                  <button disabled className="flex-1 bg-black/10 text-black/40 py-2.5 rounded-full text-xs font-bold cursor-not-allowed">Waitlist</button>
                )}
                <button className={`${event.status === "upcoming" && event.seats > 0 ? "" : "flex-1"} border border-black/10 text-black/60 py-2.5 px-4 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors`}>
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-black/40 font-bold">No events found for this filter.</div>
      )}
    </div>
  );
}
