"use client";

import { useSession } from "next-auth/react";
import {
  Users,
  CalendarDays,
  ClipboardList,
  Bell,
  PlusCircle,
  UserCog,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Members",
    value: "1,245",
    change: "+34 this week",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Active Events",
    value: "4",
    change: "2 starting today",
    icon: CalendarDays,
    color: "bg-green-500",
  },
  {
    title: "Pending Approvals",
    value: "12",
    change: "Needs attention",
    icon: ClipboardList,
    color: "bg-orange-500",
  },
];

const activities = [
  "John Doe joined Robotics Club",
  "AI Workshop registrations opened",
  "Hackathon submissions are live",
  "Certificate approved for Sarah",
];

const announcements = [
  "Campus Hackathon starts tomorrow.",
  "New community guidelines released.",
  "Club recruitment closes Friday.",
];

const events = [
  {
    title: "AI Workshop",
    date: "18 July",
  },
  {
    title: "Hackathon",
    date: "20 July",
  },
  {
    title: "Club Fair",
    date: "25 July",
  },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back
          </h1>

          <p className="text-gray-500 mt-2">
            {session?.user?.name ||
              session?.user?.email ||
              "Admin"}
          </p>
        </div>

        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="profile"
            className="w-14 h-14 rounded-full shadow border"
          />
        )}
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white border p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>

                  <p className="text-green-600 text-sm mt-3 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    {card.change}
                  </p>
                </div>

                <div
                  className={`${card.color} p-3 rounded-xl text-white h-fit`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Activity */}

        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold text-xl mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-none pb-3"
              >
                <span>{activity}</span>

                <span className="text-xs text-gray-400">
                  2 hrs ago
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold text-xl mb-5">
            Upcoming Events
          </h2>

          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.title}
                className="border rounded-xl p-4 hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {event.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Announcements */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={20} />

            <h2 className="font-semibold text-xl">
              Announcements
            </h2>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement}
                className="rounded-lg bg-gray-50 p-4"
              >
                {announcement}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold text-xl mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-4 hover:bg-blue-700 transition">
              <PlusCircle size={20} />
              Create Event
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border py-4 hover:bg-gray-100 transition">
              <UserCog size={20} />
              Manage Members
            </button>

            <button className="rounded-xl border py-4 hover:bg-gray-100 transition">
              View Reports
            </button>

            <button className="rounded-xl border py-4 hover:bg-gray-100 transition">
              Manage Clubs
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}