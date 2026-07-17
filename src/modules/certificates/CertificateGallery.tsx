"use client";

import { Search, Award, Download, ExternalLink } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "June 2026",
    image: "/images/certificate-placeholder.png",
    verified: true,
  },
  {
    id: 2,
    title: "Google AI Workshop",
    issuer: "Google Developers",
    date: "April 2026",
    image: "/images/certificate-placeholder.png",
    verified: true,
  },
  {
    id: 3,
    title: "Hackathon Winner",
    issuer: "CampusOS",
    date: "March 2026",
    image: "/images/certificate-placeholder.png",
    verified: false,
  },
];

export default function CertificateGallery() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Award className="text-yellow-500" />
            My Certificates
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all your achievements.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search certificates..."
            className="w-full border rounded-xl pl-10 py-3 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-52 bg-gray-200 flex items-center justify-center text-gray-500">
              Certificate Preview
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold">
                {certificate.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {certificate.issuer}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Issued: {certificate.date}
              </p>

              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium ${
                  certificate.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {certificate.verified ? "Verified" : "Pending Verification"}
              </span>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-3 hover:bg-gray-100">
                  <Download size={18} />
                  Download
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700">
                  <ExternalLink size={18} />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}