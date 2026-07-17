"use client";

import {
  CalendarDays,
  MapPin,
  Search,
  Users,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Tech Symposium 2026",
    date: "22 July 2026",
    location: "Main Auditorium",
    attendees: 320,
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description:
      "Join industry experts and students for talks, workshops, and networking.",
  },
  {
    id: 2,
    title: "Hackathon 24 Hours",
    date: "28 July 2026",
    location: "Innovation Lab",
    attendees: 180,
    category: "Competition",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    description:
      "Build innovative solutions with your team and compete for exciting prizes.",
  },
  {
    id: 3,
    title: "AI Workshop",
    date: "5 August 2026",
    location: "Seminar Hall",
    attendees: 140,
    category: "Workshop",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    description:
      "Hands-on session covering modern AI tools and machine learning workflows.",
  },
];

export default function EventList() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold">
            Upcoming Events
          </h1>

          <p className="text-gray-500 mt-2">
            Discover workshops, competitions and campus activities.
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search events..."
            className="w-full border rounded-xl pl-10 py-3 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-3">

        {[
          "All",
          "Technology",
          "Workshop",
          "Competition",
          "Sports",
        ].map((item) => (
          <button
            key={item}
            className="border rounded-full px-4 py-2 hover:bg-blue-600 hover:text-white transition"
          >
            {item}
          </button>
        ))}

      </div>

      {/* Event Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {events.map((event) => (

          <div
            key={event.id}
            className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition"
          >

            <img
              src={event.image}
              alt={event.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-6">

              <span className="text-sm font-semibold text-blue-600">
                {event.category}
              </span>

              <h2 className="text-xl font-bold mt-2">
                {event.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {event.description}
              </p>

              <div className="space-y-2 mt-5 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {event.date}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {event.location}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {event.attendees} Registered
                </div>

              </div>

              <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition">
                Register Now
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}