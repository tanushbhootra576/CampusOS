"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Clock, Pin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  club: { name: string; logoUrl?: string };
  isPinned: boolean;
  targetAudience: string[];
  createdAt: string;
}

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading announcements...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Bell className="text-blue-600" />
            Announcements
          </h1>
          <p className="text-gray-500 mt-2">Stay updated with the latest news from clubs and campus.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search announcements..."
            className="w-full rounded-xl border pl-10 py-3 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-2xl border shadow-sm">
            <Bell size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No announcements yet.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement._id} className={`bg-white rounded-2xl p-6 border transition shadow-sm hover:shadow-md ${announcement.isPinned ? 'border-blue-300 bg-blue-50/30' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {announcement.club?.logoUrl ? <img src={announcement.club.logoUrl} alt={announcement.club.name} className="w-full h-full rounded-full" /> : announcement.club?.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="font-semibold">{announcement.club?.name || "Campus"}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                {announcement.isPinned && (
                  <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold bg-blue-100 px-3 py-1 rounded-full">
                    <Pin size={14} /> Pinned
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">{announcement.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
              
              {announcement.targetAudience?.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {announcement.targetAudience.map(aud => (
                    <span key={aud} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {aud}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
