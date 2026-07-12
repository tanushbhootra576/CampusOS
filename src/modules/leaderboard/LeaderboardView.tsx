export default function LeaderboardView() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Community Leaderboard</h2>
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Rank</th>
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4 font-bold text-yellow-500">#1</td>
              <td className="p-4">Alice Smith</td>
              <td className="p-4">1250</td>
            </tr>
            <tr className="border-t">
              <td className="p-4 font-bold text-gray-400">#2</td>
              <td className="p-4">Bob Jones</td>
              <td className="p-4">980</td>
            </tr>
            <tr className="border-t">
              <td className="p-4 font-bold text-orange-400">#3</td>
              <td className="p-4">Charlie Brown</td>
              <td className="p-4">850</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
