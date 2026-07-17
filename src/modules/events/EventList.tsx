"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Search,
  Users,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  image?: string;
  attendees: number;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  async function registerEvent(id: string) {
    try {
      await fetch(`/api/events/${id}/register`, {
        method: "POST",
      });

      setEvents((prev) =>
        prev.map((event) =>
          event._id === id
            ? {
                ...event,
                attendees: event.attendees + 1,
              }
            : event
        )
      );
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        Loading events...
      </div>
    );
  }

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
            key={event._id}
            className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition"
          >

            <img
              src={event.image || "/images/event-placeholder.png"}
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

              <button
                onClick={() => registerEvent(event._id)}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
              >
                Register Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}