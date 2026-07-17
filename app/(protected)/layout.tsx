"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, Calendar, Users, Folder, Settings, Bell } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Clubs", href: "/communities", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Announcements", href: "/announcements", icon: Bell },
    { name: "Projects", href: "/projects", icon: Folder },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#1A1A1A] font-sans flex selection:bg-[#D95A3B] selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1A1A1A]/10 bg-[#F4F3EF] hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-[#1A1A1A]/10">
          <Link href="/" className="font-black text-xl tracking-tighter uppercase">
            Campus_OS<span className="text-[#D95A3B]">©</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-8 flex flex-col gap-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Modules</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive ? "text-[#D95A3B]" : "text-[#1A1A1A]/70 hover:text-[#1A1A1A]"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-50"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-[#1A1A1A]/10">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 hover:text-[#D95A3B] transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4 opacity-50" />
            Terminate
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="h-24 border-b border-[#1A1A1A]/10 px-8 flex items-center justify-between sticky top-0 bg-[#F4F3EF]/80 backdrop-blur-md z-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50">
            System Status: <span className="text-green-600">Online</span>
          </div>
          <button className="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </header>
        
        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
