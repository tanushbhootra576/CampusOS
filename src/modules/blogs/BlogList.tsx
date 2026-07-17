"use client";

import {
  Search,
  Clock3,
  Heart,
  Bookmark,
  User,
} from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "How to Contribute to Open Source",
    author: "Jane Doe",
    category: "Open Source",
    readTime: "6 min read",
    date: "2 days ago",
    likes: 124,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    description:
      "Open source contribution is one of the fastest ways to improve your coding skills, collaborate with developers worldwide, and build an impressive portfolio.",
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    author: "John Smith",
    category: "Web Development",
    readTime: "8 min read",
    date: "5 days ago",
    likes: 89,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    description:
      "Learn the basics of Next.js, routing, layouts, server components, and how to build scalable React applications.",
  },
  {
    id: 3,
    title: "Mastering Competitive Programming",
    author: "Alex Johnson",
    category: "Programming",
    readTime: "10 min read",
    date: "1 week ago",
    likes: 213,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    description:
      "A roadmap for improving problem-solving skills and preparing for coding contests like ICPC and CodeChef.",
  },
];

export default function BlogList() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold">
            Latest Articles & Blogs
          </h1>

          <p className="text-gray-500 mt-2">
            Discover tutorials, tech insights, and community stories.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full rounded-xl border pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Featured Blog */}

      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

        <div className="p-10">

          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            Featured
          </span>

          <h2 className="text-4xl font-bold mt-5">
            {blogs[0].title}
          </h2>

          <p className="mt-4 text-blue-100 max-w-2xl">
            {blogs[0].description}
          </p>

          <button className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50">
            Read Article
          </button>

        </div>

      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-3">

        {[
          "All",
          "Programming",
          "Open Source",
          "AI",
          "Web Development",
        ].map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full border hover:bg-blue-600 hover:text-white transition"
          >
            {category}
          </button>
        ))}

      </div>

      {/* Blog Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((blog) => (

          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={blog.image}
              alt={blog.title}
              className="h-52 w-full object-cover"
            />

            <div className="p-6">

              <span className="text-sm text-blue-600 font-semibold">
                {blog.category}
              </span>

              <h2 className="text-xl font-bold mt-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {blog.description}
              </p>

              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                  <User size={16} />
                  {blog.author}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {blog.readTime}
                </div>

              </div>

              <div className="flex items-center justify-between mt-6">

                <div className="flex items-center gap-4 text-gray-500">

                  <div className="flex items-center gap-1">
                    <Heart size={18} />
                    {blog.likes}
                  </div>

                  <Bookmark size={18} />

                </div>

                <button className="text-blue-600 font-semibold hover:underline">
                  Read More →
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}