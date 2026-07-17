"use client";

import {
  Search,
  Github,
  ExternalLink,
  Star,
  Eye,
  Code2,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI Resume Screener",
    description:
      "An NLP-powered platform that ranks resumes based on job descriptions using machine learning.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    tech: ["Python", "Next.js", "FastAPI"],
    stars: 145,
    views: 1250,
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "CampusOS",
    description:
      "A centralized campus management platform for clubs, events, blogs, and projects.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    tech: ["Next.js", "TypeScript", "MongoDB"],
    stars: 220,
    views: 1850,
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "TruthLens AI",
    description:
      "AI-powered fake news detection system using transformer models.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    tech: ["TensorFlow", "React"],
    stars: 98,
    views: 940,
    github: "#",
    demo: "#",
  },
];

export default function ProjectShowcase() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Code2 className="text-blue-600" />
            Student Project Showcase
          </h1>

          <p className="text-gray-500 mt-2">
            Explore innovative projects built by the CampusOS community.
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search projects..."
            className="w-full rounded-xl border pl-10 py-3 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-3">

        {[
          "All",
          "AI",
          "Web",
          "Mobile",
          "Blockchain",
          "IoT",
        ].map((item) => (
          <button
            key={item}
            className="rounded-full border px-4 py-2 hover:bg-blue-600 hover:text-white transition"
          >
            {item}
          </button>
        ))}

      </div>

      {/* Project Grid */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects.map((project) => (

          <div
            key={project.id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-6">

              <h2 className="text-xl font-bold">
                {project.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">

                {project.tech.map((tech) => (

                  <span
                    key={tech}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>

                ))}

              </div>

              <div className="flex justify-between mt-6 text-gray-500 text-sm">

                <div className="flex gap-4">

                  <span className="flex items-center gap-1">
                    <Star size={16} />
                    {project.stars}
                  </span>

                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {project.views}
                  </span>

                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <a
                  href={project.github}
                  className="flex-1 flex justify-center items-center gap-2 rounded-xl border py-3 hover:bg-gray-100"
                >
                  <Github size={18} />
                  Code
                </a>

                <a
                  href={project.demo}
                  className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700"
                >
                  <ExternalLink size={18} />
                  Demo
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}