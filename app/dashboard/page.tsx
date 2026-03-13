"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, Moon, Activity, User, LogOut, 
  TrendingUp, ArrowUpRight, ChevronRight, Menu, X, Info
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, 
  BarChart, Bar
} from "recharts";

const sleepData = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 78 },
  { day: "Wed", score: 85 },
  { day: "Thu", score: 82 },
  { day: "Fri", score: 90 },
  { day: "Sat", score: 94 },
  { day: "Sun", score: 88 }
];

const consistencyData = [
  { time: "10PM", value: 40 },
  { time: "11PM", value: 80 },
  { time: "12AM", value: 30 },
  { time: "1AM", value: 10 }
];

export default function DashboardPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    router.push("/");
  };

  const navItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", active: true },
    { icon: <Moon className="w-4 h-4" />, label: "Sleep Insights", active: false },
    { icon: <Activity className="w-4 h-4" />, label: "Routine", active: false },
    { icon: <User className="w-4 h-4" />, label: "Profile", active: false }
  ];

  return (
    <div className="min-h-screen bg-background flex selection:bg-primary/30 selection:text-white">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-background">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            LUNA
          </div>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-1">
          {navItems.map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${item.active ? "bg-card border border-white/5 text-primary font-medium shadow-lg" : "text-secondary-text hover:text-white hover:bg-white/5"}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-text hover:text-white hover:bg-white/5 transition-all text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[200px] rounded-full -z-10 pointer-events-none" />
        
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-6 bg-background z-20">
          <div className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            LUNA
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute inset-0 top-16 bg-background/95 backdrop-blur-xl z-50 flex flex-col animate-fade-in border-t border-white/5">
            <nav className="flex-1 py-6 px-4 space-y-1">
              {navItems.map((item, i) => (
                <button key={i} className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${item.active ? "bg-card border border-white/5 text-primary font-medium" : "text-secondary-text"}`}>
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-white/5 pb-8">
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-secondary-text">
                <LogOut className="w-5 h-5" />
                <span className="text-base">Logout</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 w-full max-w-6xl mx-auto">
          <header className="mb-10 animate-fade-in">
            <h1 className="text-2xl font-medium tracking-tight text-white mb-2">Sleep Intelligence</h1>
            <p className="text-secondary-text text-sm">Your restorative data for today.</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Top KPI row */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Sleep Score Widget */}
                <div className="bg-card border border-white/5 rounded-[24px] p-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-all">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-secondary-text text-sm font-medium flex items-center gap-2">
                      <Moon className="w-4 h-4" /> Sleep Score
                    </h3>
                    <div className="bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 border border-green-500/20">
                      <TrendingUp className="w-3 h-3" /> +4
                    </div>
                  </div>
                  <div className="text-5xl font-semibold text-white tracking-tighter mb-2">
                    88<span className="text-2xl text-secondary-text font-normal ml-1">/100</span>
                  </div>
                  <p className="text-xs text-secondary-text/80 leading-relaxed mt-4">
                    Excellent recovery. You achieved 2h 15m of deep sleep.
                  </p>
                </div>

                {/* Stress Indicator */}
                <div className="bg-card border border-white/5 rounded-[24px] p-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-all">
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-secondary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-secondary-text text-sm font-medium flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Stress Index
                    </h3>
                    <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">Optimal</div>
                  </div>
                  <div className="flex items-end gap-3 mb-2">
                    <div className="text-5xl font-semibold text-white tracking-tighter">24</div>
                    <div className="text-secondary-text pb-1 text-xs">HRV: 68ms</div>
                  </div>
                  <div className="w-full bg-[#1A2333]/50 rounded-full h-1.5 mt-6 border border-white/5 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary w-1/4 h-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Weekly Graph */}
              <div className="bg-card border border-white/5 rounded-[24px] p-6 shadow-xl relative z-10">
                <h3 className="text-white text-sm font-medium mb-6">Weekly Sleep Trends</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sleepData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C8CFF" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#7C8CFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="day" stroke="#9BA3AF80" axisLine={false} tickLine={false} dy={10} fontSize={11} />
                      <YAxis stroke="#9BA3AF80" axisLine={false} tickLine={false} fontSize={11} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#121827', borderColor: '#ffffff10', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                        itemStyle={{ color: '#7C8CFF' }}
                        cursor={{ stroke: '#ffffff10', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#7C8CFF" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Insight Card */}
              <div className="bg-gradient-to-br from-primary/10 to-card border border-primary/20 rounded-[24px] p-6 shadow-[0_0_30px_rgba(124,140,255,0.05)] relative overflow-hidden group h-min">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <h3 className="font-medium text-white text-sm">Luna Insight</h3>
                </div>
                <p className="text-white leading-relaxed mb-6 font-medium text-lg tracking-tight">
                  You slept 45 minutes longer than last week.
                </p>
                <button className="bg-background border border-white/10 hover:border-primary/50 text-white text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
                  Analyze pattern <ChevronRight className="w-3 h-3 text-secondary-text" />
                </button>
              </div>

              {/* Consistency Graph */}
              <div className="bg-card border border-white/5 rounded-[24px] p-6 shadow-xl flex flex-col h-64">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-white text-sm font-medium">Sleep consistency</h3>
                  <Info className="w-4 h-4 text-secondary-text/50" />
                </div>
                <div className="flex-1 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consistencyData}>
                      <XAxis dataKey="time" stroke="#9BA3AF80" axisLine={false} tickLine={false} dy={10} fontSize={10} />
                      <Tooltip cursor={{ fill: '#ffffff05' }} contentStyle={{ backgroundColor: '#121827', borderColor: '#ffffff10', borderRadius: '8px', fontSize: '11px' }} />
                      <Bar dataKey="value" fill="#C3B8FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
