"use client";

import { Search, Trophy, Medal, Flame, TrendingUp } from "lucide-react";

const leaderboard = [
  {
    rank: 1,
    name: "Alice Smith",
    points: 1250,
    streak: 42,
    change: "+2",
  },
  {
    rank: 2,
    name: "Bob Jones",
    points: 1180,
    streak: 31,
    change: "0",
  },
  {
    rank: 3,
    name: "Charlie Brown",
    points: 1125,
    streak: 25,
    change: "-1",
  },
  {
    rank: 4,
    name: "David Lee",
    points: 980,
    streak: 20,
    change: "+3",
  },
  {
    rank: 5,
    name: "Emma Watson",
    points: 940,
    streak: 18,
    change: "+1",
  },
];

const podium = leaderboard.slice(0, 3);
const others = leaderboard.slice(3);

export default function LeaderboardView() {
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

        {podium.map((student) => (

          <div
            key={student.rank}
            className={`rounded-2xl p-6 shadow-lg text-center ${
              student.rank === 1
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                : student.rank === 2
                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                : "bg-gradient-to-r from-orange-300 to-orange-400 text-white"
            }`}
          >
            <Medal size={36} className="mx-auto mb-3" />

            <h2 className="text-2xl font-bold">
              #{student.rank}
            </h2>

            <p className="text-xl font-semibold mt-3">
              {student.name}
            </p>

            <p className="mt-2 text-lg">
              {student.points} pts
            </p>

            <div className="mt-4 flex justify-center gap-4 text-sm">

              <div className="flex items-center gap-1">
                <Flame size={16} />
                {student.streak}
              </div>

              <div className="flex items-center gap-1">
                <TrendingUp size={16} />
                {student.change}
              </div>

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
              <th className="p-4 text-left">Points</th>
              <th className="p-4 text-left">Streak</th>
              <th className="p-4 text-left">Trend</th>

            </tr>

          </thead>

          <tbody>

            {others.map((student) => (

              <tr
                key={student.rank}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-4 font-semibold">
                  #{student.rank}
                </td>

                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.points}
                </td>

                <td className="p-4">
                  {student.streak}
                </td>

                <td className="p-4 text-green-600 font-medium">
                  {student.change}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}