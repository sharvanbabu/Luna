"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, Moon, Activity, User, LogOut, 
  TrendingUp, ArrowUpRight, ChevronRight, Menu, X, Info, Users, Plus, AlertTriangle
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, 
  BarChart, Bar
} from "recharts";

import { 
  mockEmployees, 
  calculateStressScore, 
  getStressLevel,
  type Employee
} from "@/lib/mockData";

export default function DashboardPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleLogout = () => {
    router.push("/");
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    // Add pending employee mock
    setEmployees(prev => [
      ...prev, 
      {
        id: `e${Date.now()}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        status: "pending",
        avgSleepScore: 0,
        avgSleepHours: 0,
        tasksAssigned: 0,
        tasksCompleted: 0,
        overdueTasks: 0,
      }
    ]);
    
    setInviteEmail("");
    setIsInviteModalOpen(false);
  };

  const connectedEmployees = employees.filter(e => e.status === "connected");
  
  // Aggregate Metrics
  const totalEmployees = employees.length;
  const activeCount = connectedEmployees.length;
  const totalStress = connectedEmployees.reduce((acc, emp) => acc + calculateStressScore(emp), 0);
  const avgStress = activeCount > 0 ? Math.round(totalStress / activeCount) : 0;
  
  const highRiskCount = connectedEmployees.filter(e => calculateStressScore(e) >= 65).length;
  const avgSleep = activeCount > 0 
    ? (connectedEmployees.reduce((acc, emp) => acc + emp.avgSleepHours, 0) / activeCount).toFixed(1)
    : 0;

  const navItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Org Overview", active: true },
    { icon: <Users className="w-4 h-4" />, label: "Directory", active: false },
    { icon: <Activity className="w-4 h-4" />, label: "Analytics", active: false },
    { icon: <User className="w-4 h-4" />, label: "Settings", active: false }
  ];

// Intentionally empty logic removed below

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

        <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 w-full max-w-7xl mx-auto">
          <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-white mb-1">Organization Overview</h1>
              <p className="text-secondary-text text-sm">Monitor workforce stress analytics and burnout risks.</p>
            </div>
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,140,255,0.2)] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Invite Employees
            </button>
          </header>

          {employees.length === 0 ? (
            <div className="bg-card border border-white/5 rounded-[32px] p-12 text-center shadow-xl animate-fade-in flex flex-col items-center max-w-2xl mx-auto mt-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">No employees connected yet</h2>
              <p className="text-secondary-text mb-8 max-w-sm mx-auto">
                Invite your team to connect their Luna App and Jira accounts to start generating organizational stress analytics.
              </p>
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-6 py-3 rounded-xl transition-all"
              >
                Send Invites
              </button>
            </div>
          ) : (
            <>
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                
                {/* Active Employees */}
                <div className="bg-card border border-white/5 rounded-2xl p-5 shadow-lg group hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Active Connections
                    </h3>
                    <Users className="w-4 h-4 text-secondary-text/50" />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-semibold text-white">{activeCount}</div>
                    <div className="text-secondary-text text-sm pb-1">/ {totalEmployees} total</div>
                  </div>
                </div>

                {/* Avg Org Stress */}
                <div className="bg-card border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-white/10 transition-all">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Avg Org Stress
                    </h3>
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-end gap-3 relative z-10">
                    <div className="text-3xl font-semibold text-white tracking-tighter">{avgStress}</div>
                    <div className="text-secondary-text text-xs pb-1">{getStressLevel(avgStress).label}</div>
                  </div>
                </div>

                {/* High Risk Count */}
                <div className="bg-card border border-red-500/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute right-0 bottom-0 w-24 h-24 bg-red-500/10 blur-2xl rounded-full" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       High Risk Employees
                    </h3>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-3xl font-semibold text-white relative z-10">{highRiskCount}</div>
                  {highRiskCount > 0 && <p className="text-xs text-red-400 mt-2 relative z-10">Immediate action recommended.</p>}
                </div>

                {/* Avg Sleep */}
                <div className="bg-card border border-white/5 rounded-2xl p-5 shadow-lg group hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Avg Organization Sleep
                    </h3>
                    <Moon className="w-4 h-4 text-secondary-text/50" />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-semibold text-white">{avgSleep}</div>
                    <div className="text-secondary-text text-sm pb-1">hours/night</div>
                  </div>
                </div>

              </div>
              
              {/* Employee Data Table */}
              <div className="bg-card border border-white/5 rounded-[24px] shadow-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                   <h3 className="text-white text-base font-medium">Employee Analytics</h3>
                   <span className="text-xs text-secondary-text bg-white/5 px-3 py-1 rounded-full">Data anonymized by policy</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs text-secondary-text bg-[#1A2333]/50">
                      <tr>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10 hidden md:table-cell">ID</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Name</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Status</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10 hidden sm:table-cell">Avg Sleep</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Workload / Overdue</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Stress Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {employees.map((emp) => {
                        const isPending = emp.status === "pending";
                        const stressScore = calculateStressScore(emp);
                        const levelConfig = getStressLevel(stressScore);

                        return (
                          <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 text-secondary-text/50 font-mono text-xs hidden md:table-cell">#{emp.id.toUpperCase()}</td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-white">{emp.name}</div>
                              <div className="text-xs text-secondary-text hidden lg:block">{emp.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              {isPending ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                  Pending Invite
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  Connected
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 hidden sm:table-cell">
                              {isPending ? <span className="text-secondary-text/50">-</span> : 
                                <div className="flex items-center gap-2">
                                  <span className="text-white">{emp.avgSleepHours}h</span>
                                  <span className="text-xs text-secondary-text">({emp.avgSleepScore}/100)</span>
                                </div>
                              }
                            </td>
                            <td className="px-6 py-4">
                              {isPending ? <span className="text-secondary-text/50">-</span> : 
                                <div className="flex items-center gap-3">
                                  <div className="w-20 bg-[#1A2333] rounded-full h-1.5 overflow-hidden">
                                     <div 
                                      className="bg-blue-400 h-full rounded-full" 
                                      style={{ width: `${(emp.tasksCompleted / (emp.tasksAssigned || 1)) * 100}%` }}
                                     />
                                  </div>
                                  <span className="text-xs text-secondary-text">{emp.tasksCompleted}/{emp.tasksAssigned}</span>
                                  {emp.overdueTasks > 0 && <span className="text-xs text-red-400 font-medium ml-2">{emp.overdueTasks} Overdue</span>}
                                </div>
                              }
                            </td>
                            <td className="px-6 py-4">
                              {isPending ? <span className="text-secondary-text/50">-</span> : 
                                <div className="flex items-center gap-3">
                                  <div className="text-lg font-medium text-white w-8">{stressScore}</div>
                                  <span className={`text-xs px-2 py-0.5 rounded ${levelConfig.bg} ${levelConfig.color}`}>
                                    {levelConfig.label}
                                  </span>
                                </div>
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Invite Modal Overlay */}
        {isInviteModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
             <div className="bg-card border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                <button 
                  onClick={() => setIsInviteModalOpen(false)}
                  className="absolute top-6 right-6 text-secondary-text hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-medium text-white mb-2">Invite Employee</h2>
                <p className="text-sm text-secondary-text mb-6">Send an invite link for them to connect their Luna App and Jira workspace.</p>
                
                <form onSubmit={handleInvite}>
                  <label className="block text-sm font-medium mb-2 text-secondary-text">Employee Email</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="employee@company.com"
                    className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl px-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all mb-6 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-lg text-sm"
                  >
                    Send Invite Magic Link
                  </button>
                </form>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
