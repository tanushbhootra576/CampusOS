"use client";

import { useEffect, useState } from "react";
import { Search, Trophy, Medal } from "lucide-react";

interface UserScore {
  id: string;
  name: string;
  email: string;
  image?: string;
  score: number;
  projects: number;
  blogs: number;
  events: number;
}

export default function LeaderboardView() {
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading leaderboard...
      </div>
    );
  }

  const podium = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            Community Leaderboard
          </h1>

          <p className="text-gray-500 mt-2">
            Top contributors across CampusOS.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search student..."
            className="w-full border rounded-xl pl-10 py-3 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Top 3 */}

      <div className="grid md:grid-cols-3 gap-6">
        {podium.map((student, index) => (
          <div
            key={student.id}
            className={`rounded-2xl p-6 shadow-lg text-center ${
              index === 0
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                : index === 1
                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                : "bg-gradient-to-r from-orange-300 to-orange-400 text-white"
            }`}
          >
            <Medal size={36} className="mx-auto mb-3" />

            <h2 className="text-2xl font-bold">
              #{index + 1}
            </h2>

            <p className="text-xl font-semibold mt-3">
              {student.name}
            </p>

            <p className="mt-2 text-lg">
              {student.score} pts
            </p>

            <div className="mt-4 text-sm">
              Projects: {student.projects} • Blogs: {student.blogs} • Events: {student.events}
            </div>
          </div>
        ))}
      </div>

      {/* Rankings Table */}

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Score</th>
              <th className="p-4 text-left">Projects</th>
              <th className="p-4 text-left">Blogs</th>
              <th className="p-4 text-left">Events</th>
            </tr>
          </thead>

          <tbody>
            {others.map((student, index) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-semibold">
                  #{index + 4}
                </td>

                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.score}
                </td>

                <td className="p-4">
                  {student.projects}
                </td>

                <td className="p-4">
                  {student.blogs}
                </td>

                <td className="p-4">
                  {student.events}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}