import { CommunitiesSection } from "@/src/modules/communities/CommunitiesSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-[#F4F3EF]">
      {/* Simple Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-white/80 backdrop-blur-xl border-b border-black/5 flex justify-between items-center">
        <Link href="/" className="font-black text-xl tracking-tighter uppercase text-[#1A1A1A]">
          Campus_OS<span className="text-[#D95A3B]">©</span>
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>
      </div>

      <div className="pt-20">
        <CommunitiesSection hideHero={true} />
      </div>
    </div>
  );
}
