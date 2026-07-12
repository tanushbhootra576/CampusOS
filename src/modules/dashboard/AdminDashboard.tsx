"use client";

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-500 mt-1">Welcome back, {session?.user?.name || session?.user?.email || "Admin"}! Here is what's happening today.</p>
        </div>
        {session?.user?.image && (
          <img src={session.user.image} alt="Profile" className="w-12 h-12 rounded-full border-2 border-blue-100 shadow-sm" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl">
          <h3 className="text-gray-500 font-medium text-sm">Total Members</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,245</p>
        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl">
          <h3 className="text-gray-500 font-medium text-sm">Active Events</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl">
          <h3 className="text-gray-500 font-medium text-sm">Pending Approvals</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm">
            + Create Event
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition">
            Manage Members
          </button>
        </div>
      </div>
    </div>
  );
}
