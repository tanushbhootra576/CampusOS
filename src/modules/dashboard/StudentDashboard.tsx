"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Award, Folder, ArrowUpRight, Clock, MapPin, Plus, Activity } from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Active Clubs", value: "3", change: "+1", icon: Users, color: "bg-blue-50 text-blue-600" },
  { name: "Upcoming Events", value: "2", change: "This week", icon: Calendar, color: "bg-orange-50 text-orange-600" },
  { name: "Certificates", value: "12", change: "+2", icon: Award, color: "bg-purple-50 text-purple-600" },
  { name: "Live Projects", value: "4", change: "Active", icon: Folder, color: "bg-green-50 text-green-600" },
];

const upcomingEvents = [
  { title: "React Native Workshop", community: "GDSC", time: "Tomorrow, 4:00 PM", location: "Lab 3" },
  { title: "Cloud Architecture 101", community: "AWS Club", time: "Oct 26, 2:00 PM", location: "Auditorium" },
  { title: "Design Sprint", community: "Design Co.", time: "Oct 28, 10:00 AM", location: "Studio A" },
];

const recentActivity = [
  { action: "Registered for", target: "React Native Workshop", time: "2 hours ago" },
  { action: "Joined", target: "AWS Cloud Club", time: "1 day ago" },
  { action: "Earned certificate for", target: "Intro to Python", time: "3 days ago" },
  { action: "Submitted project to", target: "Hackathon 2026", time: "1 week ago" },
];

export default function StudentDashboard() {
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
            Welcome back, Sarah
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black/60 font-medium"
          >
            Here's what's happening in your campus life today.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/communities" className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black/80 transition-colors">
            <Plus className="w-4 h-4" />
            Discover Clubs
          </Link>
        </motion.div>
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
        {/* Main Content: Upcoming Schedule */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight">Upcoming Schedule</h2>
            <Link href="/my-events" className="text-sm font-bold text-black/50 hover:text-black flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-2">
            {upcomingEvents.map((evt, i) => (
              <div key={i} className="flex gap-6 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-[#F4F3EF] flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-black/50 uppercase">{evt.time.split(',')[0]}</span>
                  <span className="text-lg font-black">{evt.time.includes('Oct') ? evt.time.split(' ')[1] : evt.time.split(',')[1].split(':')[0]}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold tracking-tight mb-1 group-hover:text-[#D95A3B] transition-colors">{evt.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-bold text-black/50">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {evt.community}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {evt.time.split(', ')[1] || evt.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Content: Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          </div>
          
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6">
            <div className="space-y-8">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== recentActivity.length - 1 && (
                    <div className="absolute top-8 left-4 bottom-[-32px] w-[2px] bg-gray-100"></div>
                  )}
                  <div className="w-8 h-8 rounded-full bg-[#F4F3EF] flex items-center justify-center shrink-0 relative z-10 border-4 border-white">
                    <Activity className="w-3 h-3 text-black/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      <span className="text-black/60">{activity.action}</span>{" "}
                      <span className="font-bold">{activity.target}</span>
                    </p>
                    <p className="text-xs font-bold text-black/40 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
