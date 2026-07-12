import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[90vh] bg-slate-50 flex flex-col justify-center py-12 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content - Typography & CTA */}
        <div className="flex flex-col gap-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 text-slate-800 font-semibold text-sm w-max border border-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            The Campus Operating System
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
            Unify Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-violet-600">
              Campus.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Stop juggling spreadsheets and group chats. CampusOS brings every club, event, and student project into one powerful, centralized workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/events" className="group relative px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg overflow-hidden flex justify-center items-center">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                Explore Platform 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            <Link href="/dashboard" className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-slate-900 transition-colors flex justify-center items-center">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Right Content - Bento Box Grid */}
        <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
          {/* Bento Box 1 - Events (Large) */}
          <div className="col-span-2 row-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Event Hub</h3>
            <p className="text-slate-500 font-medium max-w-sm">Seamless ticketing and registrations for symposiums and workshops.</p>
            
            {/* Mock UI Element */}
            <div className="absolute bottom-0 left-8 right-8 h-32 bg-slate-50 rounded-t-2xl border border-b-0 border-slate-200 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-2">
                <div className="w-1/2 h-4 bg-slate-200 rounded-full"></div>
                <div className="w-1/4 h-6 bg-blue-100 rounded-md"></div>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                <div className="w-2/3 h-4 bg-slate-200 rounded-full"></div>
                <div className="w-1/5 h-6 bg-blue-100 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Bento Box 2 - Leaderboard */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden group hover:ring-4 ring-slate-200 transition-all">
            <h3 className="text-xl font-bold mb-2">Global Leaderboards</h3>
            <p className="text-slate-400 text-sm">Gamify open-source contributions.</p>
            <div className="absolute -bottom-4 -right-4 text-7xl opacity-50 group-hover:scale-110 transition-transform">🏆</div>
          </div>

          {/* Bento Box 3 - Projects */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-6 relative overflow-hidden group hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            <h3 className="text-xl font-bold mb-2">Project Showcases</h3>
            <p className="text-blue-100 text-sm">A unified portfolio for your campus.</p>
            <div className="absolute -bottom-4 -right-4 text-7xl opacity-50 group-hover:scale-110 transition-transform">🚀</div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
