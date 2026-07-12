export default function EventList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder Event Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">Tech Symposium 2026</h3>
            <p className="text-gray-600 mt-2">Join us for the biggest tech event of the year.</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Register Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
