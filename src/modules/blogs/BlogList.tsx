export default function BlogList() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Latest Articles & Blogs</h2>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-blue-600">How to contribute to Open Source?</h3>
            <span className="text-sm text-gray-500">By Jane Doe • 2 days ago</span>
            <p className="text-gray-700">Open source contribution is one of the best ways to learn and grow as a developer...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
