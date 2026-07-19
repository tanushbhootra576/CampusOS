"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LogOut, Activity, Globe, PlusCircle, Shield, Users, 
  BarChart3, ClipboardList, Key, Settings, Mail, Flag, Save, Bell 
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navGroups = [
    {
      title: "Core",
      items: [
        { name: "Dashboard", href: "/super-admin", icon: Activity },
        { name: "Analytics", href: "/super-admin/analytics", icon: BarChart3 },
      ]
    },
    {
      title: "Entities",
      items: [
        { name: "Communities", href: "/super-admin/communities", icon: Globe },
        { name: "Create Community", href: "/super-admin/communities/create", icon: PlusCircle },
        { name: "Admins", href: "/super-admin/admins", icon: Shield },
        { name: "Users", href: "/super-admin/users", icon: Users },
      ]
    },
    {
      title: "System",
      items: [
        { name: "Audit Logs", href: "/super-admin/audit-logs", icon: ClipboardList },
        { name: "Roles & Permissions", href: "/super-admin/roles-permissions", icon: Key },
        { name: "Email Templates", href: "/super-admin/email-templates", icon: Mail },
        { name: "Feature Flags", href: "/super-admin/feature-flags", icon: Flag },
      ]
    },
    {
      title: "Infrastructure",
      items: [
        { name: "System Settings", href: "/super-admin/system-settings", icon: Settings },
        { name: "Backup & Restore", href: "/super-admin/backup-restore", icon: Save },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#1A1A1A] font-sans flex selection:bg-[#D95A3B] selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1A1A1A]/10 bg-[#F4F3EF] hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-8 border-b border-[#1A1A1A]/10 shrink-0">
          <Link href="/" className="font-black text-xl tracking-tighter uppercase">
            Campus_OS<span className="text-[#D95A3B]">©</span>
          </Link>
          <div className="text-[10px] font-bold uppercase tracking-widest text-red-600 mt-1">Super Admin</div>
        </div>
        
        <nav className="flex-1 p-6 flex flex-col gap-8">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-3 px-2">
                {group.title}
              </div>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`flex items-center gap-3 px-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        isActive 
                          ? "bg-black text-white" 
                          : "text-[#1A1A1A]/70 hover:bg-black/5 hover:text-[#1A1A1A]"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-50"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-[#1A1A1A]/10 shrink-0">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-2 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-red-600/70 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4 opacity-70" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen">
        <header className="h-24 border-b border-[#1A1A1A]/10 px-8 flex items-center justify-between sticky top-0 bg-[#F4F3EF]/80 backdrop-blur-md z-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50">
            System Status: <span className="text-green-600">All Systems Nominal</span>
          </div>
          <button className="w-10 h-10 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </header>
        
        <div className="p-8 lg:p-12 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
