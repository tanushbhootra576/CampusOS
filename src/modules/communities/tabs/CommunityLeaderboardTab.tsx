"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Award, Calendar, Shield } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Arjun Rao", avatar: "AR", points: 4820, badges: 12, events: 28, level: "Diamond" },
  { rank: 2, name: "Priya Sharma", avatar: "PS", points: 4100, badges: 10, events: 22, level: "Diamond" },
  { rank: 3, name: "Karan Mehta", avatar: "KM", points: 3750, badges: 9, events: 19, level: "Platinum" },
  { rank: 4, name: "Divya Nair", avatar: "DN", points: 3200, badges: 7, events: 16, level: "Platinum" },
  { rank: 5, name: "Rohan Singh", avatar: "RS", points: 2100, badges: 5, events: 11, level: "Gold" },
  { rank: 6, name: "Sneha Patel", avatar: "SP", points: 1900, badges: 4, events: 9, level: "Gold" },
  { rank: 7, name: "Aditya Kumar", avatar: "AK", points: 1200, badges: 3, events: 6, level: "Silver" },
  { rank: 8, name: "Meera Iyer", avatar: "MI", points: 980, badges: 2, events: 4, level: "Silver" },
];

const podiumColors = ["from-yellow-400 to-yellow-500", "from-gray-300 to-gray-400", "from-orange-400 to-orange-500"];
const podiumEmoji = ["🥇", "🥈", "🥉"];
const levelColors: Record<string, string> = {
  Diamond: "text-cyan-600 bg-cyan-50",
  Platinum: "text-purple-600 bg-purple-50",
  Gold: "text-yellow-600 bg-yellow-50",
  Silver: "text-gray-500 bg-gray-50",
};

export default function CommunityLeaderboardTab() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="space-y-12">
      {/* Podium */}
      <div className="flex items-end justify-center gap-4 pt-8 pb-4">
        {[top3[1], top3[0], top3[2]].map((member, i) => {
          const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
          const heights = [" h-28", "h-40", "h-20"];
          return (
            <motion.div key={member.rank} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center gap-3">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-base font-black text-black/60 mx-auto mb-1">{member.avatar}</div>
                <p className="font-black text-sm">{member.name.split(" ")[0]}</p>
                <p className="text-xs font-bold text-black/40">{member.points.toLocaleString()} pts</p>
              </div>
              <div className={`w-24 ${heights[i]} bg-gradient-to-t ${podiumColors[rank - 1]} rounded-t-2xl flex items-start justify-center pt-3`}>
                <span className="text-2xl">{podiumEmoji[rank - 1]}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 text-xs font-bold uppercase tracking-widest text-black/40 bg-gray-50/50">
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4 text-center">Points</th>
                <th className="px-6 py-4 text-center">Badges</th>
                <th className="px-6 py-4 text-center">Events</th>
                <th className="px-6 py-4 text-center">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {leaderboard.map((member, i) => (
                <motion.tr key={member.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                  className={`hover:bg-gray-50 transition-colors ${member.rank <= 3 ? "bg-yellow-50/30" : ""}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {member.rank <= 3 ? <span className="text-xl">{podiumEmoji[member.rank - 1]}</span> : <span className="text-sm font-black text-black/40 w-6">#{member.rank}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">{member.avatar}</div>
                      <span className="font-bold">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-black">{member.points.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 font-bold text-sm">
                      <Award className="w-4 h-4 text-yellow-500" />{member.badges}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 font-bold text-sm">
                      <Calendar className="w-4 h-4 text-black/30" />{member.events}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${levelColors[member.level]}`}>
                      {member.level}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
