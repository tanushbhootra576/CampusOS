"use client";

import { useEffect, useState } from "react";
import { Search, Users, ExternalLink, Shield } from "lucide-react";

interface Community {
  _id: string;
  name: string;
  description: string;
  logoUrl?: string;
  members: any[];
}

export default function CommunityList() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("/api/clubs");
        const data = await res.json();
        setCommunities(data);
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCommunities();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading clubs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Shield className="text-blue-600" />
            Campus Clubs
          </h1>
          <p className="text-gray-500 mt-2">Explore and join student organizations.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search clubs..."
            className="w-full rounded-xl border pl-10 py-3 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {communities.map((club) => (
          <div key={club._id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                {club.logoUrl ? <img src={club.logoUrl} alt={club.name} className="w-full h-full rounded-full object-cover" /> : club.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{club.name}</h2>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <Users size={14} /> {club.members?.length || 0} Members
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              {club.description}
            </p>
            <button className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 transition font-semibold">
              <ExternalLink size={18} />
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
