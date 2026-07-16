import { ArrowUpRight, Plus, MapPin, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const events = [
    {
      id: "ev-01",
      title: "Global AI Hackathon '26",
      date: "Oct 24, 2026",
      time: "09:00 AM",
      location: "Innovation Hub",
      status: "Upcoming",
      attendees: 342,
      capacity: 500,
    },
    {
      id: "ev-02",
      title: "Design Systems Workshop",
      date: "Nov 02, 2026",
      time: "14:00 PM",
      location: "Studio B",
      status: "Draft",
      attendees: 0,
      capacity: 50,
    },
    {
      id: "ev-03",
      title: "Founder's Night",
      date: "Sep 15, 2026",
      time: "18:30 PM",
      location: "Main Auditorium",
      status: "Past",
      attendees: 850,
      capacity: 1000,
    }
  ];

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            Event<br />Matrix.
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40">
            Ticketing, logistics, and check-ins
          </p>
        </div>
        <button className="group bg-[#1A1A1A] text-[#F4F3EF] px-8 py-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-[#D95A3B] transition-colors duration-500 whitespace-nowrap">
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
          Initialize Event
        </button>
      </div>

      {/* Stats/Filters */}
      <div className="flex gap-4 mb-8 border-b-2 border-[#1A1A1A] pb-4 overflow-x-auto no-scrollbar">
        {["All (03)", "Upcoming (01)", "Drafts (01)", "Past (01)"].map((filter, i) => (
          <button 
            key={filter}
            className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap px-4 py-2 transition-colors ${
              i === 0 ? "bg-[#1A1A1A] text-white" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <Link href={`/my-events/${event.id}`} key={event.id} className="group flex flex-col border border-[#1A1A1A]/10 bg-white hover:border-[#1A1A1A] hover:shadow-2xl transition-all duration-500">
            {/* Top Bar */}
            <div className="flex justify-between items-center p-6 border-b border-[#1A1A1A]/10">
              <div className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  event.status === 'Upcoming' ? 'bg-green-500' : event.status === 'Draft' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></span>
                {event.status} // {event.id}
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#1A1A1A]/30 group-hover:text-[#D95A3B] transition-colors" />
            </div>

            {/* Main Content */}
            <div className="p-8 flex-1">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 group-hover:text-[#D95A3B] transition-colors">{event.title}</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2">
                    <Calendar className="w-3 h-3" /> Date
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest">{event.date}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2">
                    <Clock className="w-3 h-3" /> Time
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest">{event.time}</div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2">
                    <MapPin className="w-3 h-3" /> Location
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest">{event.location}</div>
                </div>
              </div>
            </div>

            {/* Bottom Bar - Capacity */}
            <div className="p-6 bg-[#1A1A1A]/5 mt-auto">
              <div className="flex justify-between items-end mb-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Capacity</div>
                <div className="text-sm font-black tracking-tighter">{event.attendees} <span className="opacity-40">/ {event.capacity}</span></div>
              </div>
              <div className="w-full h-1 bg-[#1A1A1A]/10">
                <div 
                  className="h-full bg-[#1A1A1A] group-hover:bg-[#D95A3B] transition-colors" 
                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
