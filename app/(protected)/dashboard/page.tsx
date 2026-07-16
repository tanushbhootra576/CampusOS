import { ArrowUpRight, ArrowRight, Activity, Users, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-6xl">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
          Command<br />Center.
        </h1>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40">
          Overview of your CampusOS metrics
        </p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { label: "Active Projects", value: "12", icon: Activity, trend: "+2" },
          { label: "Community Rank", value: "04", icon: Users, trend: "Top 5%" },
          { label: "Upcoming Events", value: "03", icon: Calendar, trend: "This Week" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#1A1A1A]/10 p-8 flex flex-col justify-between aspect-square group hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-colors duration-500">
            <div className="flex justify-between items-start">
              <stat.icon className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:text-[#D95A3B] transition-colors" />
              <div className="text-[10px] font-bold uppercase tracking-widest bg-[#1A1A1A]/5 group-hover:bg-white/10 px-3 py-1 rounded-full">
                {stat.trend}
              </div>
            </div>
            <div>
              <div className="text-6xl font-black tracking-tighter mb-2 group-hover:text-[#D95A3B] transition-colors">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-50">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end border-b-2 border-[#1A1A1A] pb-4 mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Recent Activity</h2>
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#D95A3B] hover:text-[#1A1A1A] transition-colors">View All</button>
          </div>
          
          <div className="flex flex-col gap-6">
            {[
              { title: "Hackathon 2026 Registration Opened", time: "2 hours ago", type: "Event" },
              { title: "AI Club Leadership Meeting", time: "5 hours ago", type: "Community" },
              { title: "Campus Network Maintenance", time: "1 day ago", type: "System" },
            ].map((item, i) => (
              <div key={i} className="group flex justify-between items-center py-4 border-b border-[#1A1A1A]/10 cursor-pointer">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-1">{item.type} // {item.time}</div>
                  <div className="text-lg font-bold group-hover:text-[#D95A3B] transition-colors">{item.title}</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#D95A3B] group-hover:border-[#D95A3B] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
           <div className="flex justify-between items-end border-b-2 border-[#1A1A1A] pb-4 mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Quick Actions</h2>
          </div>
          <div className="flex flex-col gap-4">
            <button className="w-full text-left p-6 border border-[#1A1A1A]/10 hover:border-[#1A1A1A] bg-white hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex justify-between items-center group">
              Create Event
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full text-left p-6 border border-[#1A1A1A]/10 hover:border-[#1A1A1A] bg-white hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex justify-between items-center group">
              Draft Post
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
