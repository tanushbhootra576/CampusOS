"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, X, ZoomIn, FolderOpen } from "lucide-react";
import { useState } from "react";

const albums = [
  { id: "1", name: "TechSprint 2026", count: 48, cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
  { id: "2", name: "Annual Meetup", count: 32, cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" },
  { id: "3", name: "Hackathon 2025", count: 67, cover: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800&auto=format&fit=crop" },
];

const photos = [
  { id: "1", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", caption: "TechSprint 2026 Opening" },
  { id: "2", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", caption: "Team Collaboration" },
  { id: "3", src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop", caption: "Coding Session" },
  { id: "4", src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=800&auto=format&fit=crop", caption: "Workshop Demo" },
  { id: "5", src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop", caption: "Panel Discussion" },
  { id: "6", src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", caption: "Prize Distribution" },
  { id: "7", src: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop", caption: "Final Presentation" },
  { id: "8", src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop", caption: "Night Session" },
];

export default function CommunityGalleryTab() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const currentPhoto = photos.find(p => p.id === lightbox);

  const columns = [photos.filter((_, i) => i % 2 === 0), photos.filter((_, i) => i % 2 !== 0)];

  return (
    <div className="space-y-8">
      {/* Albums */}
      <div>
        <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-black/40" /> Albums
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {albums.map((album, i) => (
            <motion.div key={album.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer h-40">
              <img src={album.cover} alt={album.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <p className="font-black text-base">{album.name}</p>
                <p className="text-xs font-medium text-white/70">{album.count} photos</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full"><Download className="w-4 h-4 text-white" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
        <input type="text" placeholder="Search photos..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors" />
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 gap-4">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-4">
            {col.map((photo, i) => (
              <motion.div key={photo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                onClick={() => setLightbox(photo.id)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group bg-gray-100">
                <img src={photo.src} alt={photo.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight: ci === 0 && i % 2 === 0 ? "200px" : "150px" }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && currentPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" onClick={() => setLightbox(null)}>
              <X className="w-5 h-5 text-white" />
            </button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
              <img src={currentPhoto.src} alt={currentPhoto.caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
              <p className="text-white/70 text-center mt-4 font-medium">{currentPhoto.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
