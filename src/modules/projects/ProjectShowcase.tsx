/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ExternalLink,
  Star,
  Eye,
  Code2,
} from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  stars: number;
  views: number;
  githubUrl: string;
  demoUrl: string;
}

export default function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading projects...
      </div>
    );
  }

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
        {["All", "AI", "Web", "Mobile", "Blockchain", "IoT"].map((item) => (
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
            key={project._id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <img
              src={project.image || "/images/project-placeholder.png"}
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
                {project.techStack.map((tech) => (
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
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center items-center gap-2 rounded-xl border py-3 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89 5 5 0 0 0-.15-3.82s-1.18-.38-3.9 1.4a13.3 13.3 0 0 0-7 0C4.3 3.86 3.12 4.24 3.12 4.24a5 5 0 0 0-.15 3.82 5.5 5.5 0 0 0-1.5 3.89c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path></svg>
                  Code
                </a>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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