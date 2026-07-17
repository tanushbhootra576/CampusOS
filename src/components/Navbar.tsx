"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 text-gray-800 p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🎓 CampusOS
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/events" className="hover:text-blue-600 font-medium transition">Events</Link>
          <Link href="/blogs" className="hover:text-blue-600 font-medium transition">Blogs</Link>
          <Link href="/projects" className="hover:text-blue-600 font-medium transition">Projects</Link>
          <Link href="/leaderboard" className="hover:text-blue-600 font-medium transition">Leaderboard</Link>
          <Link href="/dashboard" className="hover:text-blue-600 font-medium transition">Dashboard</Link>
          
          <div className="border-l pl-6 border-gray-300">
            {session ? (
              <button 
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/auth/signin" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
