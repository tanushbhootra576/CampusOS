export default function ProjectShowcase() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Project Showcase</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-200 h-40 w-full flex items-center justify-center text-gray-500">Project Image Preview</div>
            <div className="p-4">
              <h3 className="font-bold text-lg">AI Resume Screener</h3>
              <p className="text-gray-600 text-sm my-2">An automated tool to screen resumes using NLP.</p>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Python</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Next.js</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
