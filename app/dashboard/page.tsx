"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, Moon, Activity, User, LogOut, 
  TrendingUp, ArrowUpRight, ChevronRight, Menu, X, Info, Users, Plus, AlertTriangle, 
  Flame, Zap, BarChart3, Pill, ShieldCheck, HeartPulse
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, 
  BarChart, Bar
} from "recharts";

import { 
  mockEmployees, 
  calculateAdvancedStressFactors, 
  getBurnoutStatus,
  type Employee
} from "@/lib/mockData";

export default function DashboardPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "analytics">("overview");

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
        department: "Engineering", 
        avgSleepScore: 0,
        avgSleepHours: 0,
        recoveryPercentage: 0,
        circadianAlignment: 0,
        sprintPointsTotal: 0,
        sprintPointsDone: 0,
        daysRemaining: 0,
        uniqueTicketsTouched24h: 0,
        afterHoursSignals: 0,
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
  
  const employeeStats = connectedEmployees.map(emp => ({
    ...emp,
    factors: calculateAdvancedStressFactors(emp)
  }));

  const avgStress = activeCount > 0 
    ? Math.round(employeeStats.reduce((acc, emp) => acc + emp.factors.workloadStress, 0) / activeCount) 
    : 0;

  const avgRecovery = activeCount > 0
    ? Math.round(connectedEmployees.reduce((acc, emp) => acc + emp.recoveryPercentage, 0) / activeCount)
    : 0;
  
  const highRiskCount = employeeStats.filter(e => e.factors.totalBurnoutRisk >= 75).length;
  const avgSleep = activeCount > 0 
    ? (connectedEmployees.reduce((acc, emp) => acc + emp.avgSleepHours, 0) / activeCount).toFixed(1)
    : 0;

  // Departmental Data for Heatmap
  const departments = ["Engineering", "Product", "Sales", "Design", "Operations"];
  const departmentStats = departments.map(dept => {
    const deptEmps = employeeStats.filter(e => e.department === dept);
    const avgRisk = deptEmps.length > 0 
      ? Math.round(deptEmps.reduce((acc, e) => acc + e.factors.totalBurnoutRisk, 0) / deptEmps.length) 
      : 0;
    return { name: dept, risk: avgRisk, count: deptEmps.length };
  });

  const chartData = [
    { name: "Mon", stress: 45, recovery: 70 },
    { name: "Tue", stress: 52, recovery: 65 },
    { name: "Wed", stress: 68, recovery: 45 },
    { name: "Thu", stress: 85, recovery: 32 },
    { name: "Fri", stress: 72, recovery: 48 },
    { name: "Sat", stress: 30, recovery: 85 },
    { name: "Sun", stress: 25, recovery: 92 },
  ];

  const navItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Org Overview", id: "overview" },
    { icon: <BarChart3 className="w-4 h-4" />, label: "Burnout Analytics", id: "analytics" },
    { icon: <Users className="w-4 h-4" />, label: "Directory", id: "directory" },
    { icon: <User className="w-4 h-4" />, label: "Settings", id: "settings" }
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
            <button 
              key={i} 
              onClick={() => (item.id === "overview" || item.id === "analytics") && setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${activeTab === item.id ? "bg-card border border-white/5 text-primary font-medium shadow-lg" : "text-secondary-text hover:text-white hover:bg-white/5"}`}
            >
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
                <button 
                  key={i} 
                  onClick={() => {
                    (item.id === "overview" || item.id === "analytics") && setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${activeTab === item.id ? "bg-card border border-white/5 text-primary font-medium" : "text-secondary-text"}`}
                >
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
              <h1 className="text-2xl font-medium tracking-tight text-white mb-1">
                {activeTab === "overview" ? "Organization Overview" : "Burnout Analytics"}
              </h1>
              <p className="text-secondary-text text-sm">
                {activeTab === "overview" 
                  ? "Monitor workforce stress analytics and burnout risks." 
                  : "Cross-correlating Jira activity with Luna sleep intelligence."}
              </p>
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
                
                {/* Avg Burnout Risk */}
                <div className="bg-card border border-white/5 rounded-2xl p-5 shadow-lg group hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Avg Burnout Risk
                    </h3>
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-semibold text-white">{Math.round((avgStress * 0.6) + ((100 - avgRecovery) * 0.4))}</div>
                    <div className="text-orange-400/80 text-xs pb-1 font-medium">Elevated</div>
                  </div>
                </div>

                {/* Avg Workload Stress */}
                <div className="bg-card border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-white/10 transition-all">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Workload Stress
                    </h3>
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-end gap-3 relative z-10">
                    <div className="text-3xl font-semibold text-white tracking-tighter">{avgStress}</div>
                    <div className="text-secondary-text text-xs pb-1">Jira Signals</div>
                  </div>
                </div>

                {/* Avg Recovery */}
                <div className="bg-card border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute right-0 bottom-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Luna Recovery
                    </h3>
                    <Moon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-end gap-3 relative z-10">
                    <div className="text-3xl font-semibold text-white tracking-tighter">{avgRecovery}%</div>
                    <div className="text-emerald-400 text-xs pb-1 font-medium">Healthy</div>
                  </div>
                </div>

                {/* High Risk Count */}
                <div className="bg-card border border-red-500/10 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute right-0 bottom-0 w-24 h-24 bg-red-500/10 blur-2xl rounded-full" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-secondary-text text-xs font-medium flex items-center gap-2">
                       Burnout Alerts
                    </h3>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-3xl font-semibold text-white relative z-10">{highRiskCount}</div>
                  {highRiskCount > 0 && <p className="text-xs text-red-400 mt-2 relative z-10">Immediate action recommended.</p>}
                </div>
              </div>

              {activeTab === "analytics" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 animate-slide-up">
                  {/* Organizational Balance Chart */}
                  <div className="bg-card border border-white/5 rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-white text-base font-medium flex items-center gap-2">
                         <Activity className="w-4 h-4 text-primary" />
                         Org Stress vs. Recovery Balance
                       </h3>
                       <div className="flex items-center gap-4 text-xs font-medium">
                         <div className="flex items-center gap-1.5 text-primary">
                           <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Stress
                         </div>
                         <div className="flex items-center gap-1.5 text-emerald-400">
                           <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Recovery
                         </div>
                       </div>
                    </div>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7C8CFF" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#7C8CFF" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#ffffff40', fontSize: 12 }} 
                            dy={10}
                          />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#141B2D', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '12px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="stress" stroke="#7C8CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
                          <Area type="monotone" dataKey="recovery" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRecovery)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Anonymized Department Heatmap */}
                  <div className="bg-card border border-white/5 rounded-3xl p-6 shadow-xl">
                    <div className="mb-8">
                       <h3 className="text-white text-base font-medium flex items-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-secondary-text" />
                         Anonymized Risk Heatmap
                       </h3>
                       <p className="text-xs text-secondary-text mt-1">Departments flagged by Burnout Correlation Engine.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                       {departmentStats.map((dept, i) => (
                         <div 
                          key={i} 
                          className={`p-4 rounded-2xl border transition-all ${
                            dept.risk > 70 ? "bg-red-500/10 border-red-500/20" : 
                            dept.risk > 40 ? "bg-amber-500/10 border-amber-500/20" : 
                            "bg-emerald-500/5 border-emerald-500/10"
                          }`}
                         >
                           <div className="text-[10px] uppercase font-bold text-secondary-text tracking-wider mb-1">{dept.name}</div>
                           <div className={`text-xl font-semibold mb-1 ${
                             dept.risk > 70 ? "text-red-400" : 
                             dept.risk > 40 ? "text-amber-400" : 
                             "text-emerald-400"
                           }`}>{dept.risk}%</div>
                           <div className="text-[9px] text-secondary-text">{dept.count} Members tracked</div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-xs text-secondary-text">
                         <Info className="w-3.5 h-3.5" />
                         Aggregation prevents individual identification.
                       </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Employee Data Table */}
              <div className="bg-card border border-white/5 rounded-[24px] shadow-xl overflow-hidden animate-slide-up">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                   <h3 className="text-white text-base font-medium">Individual Insights</h3>
                   <span className="text-xs text-secondary-text bg-white/5 px-3 py-1 rounded-full flex items-center gap-1.5">
                     <ShieldCheck className="w-3 h-3" /> Luna Privacy Protocol Active
                   </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs text-secondary-text bg-[#1A2333]/50">
                      <tr>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Employee</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Department</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Workload Stress</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10 text-center">Recovery Score</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10">Burnout Status</th>
                        <th className="px-6 py-4 font-medium border-b border-white/5 relative z-10 text-right">Actionable Insight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {employees.map((emp) => {
                        const isPending = emp.status === "pending";
                        const factors = calculateAdvancedStressFactors(emp);
                        const status = getBurnoutStatus(factors.totalBurnoutRisk);

                        return (
                          <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-white">{emp.name}</div>
                              <div className="text-xs text-secondary-text uppercase text-[10px] tracking-widest mt-0.5">#{emp.id}</div>
                            </td>
                            <td className="px-6 py-4">
                               <span className="text-xs text-secondary-text">{emp.department || "General"}</span>
                            </td>
                            <td className="px-6 py-4">
                              {isPending ? <span className="text-secondary-text/50">-</span> : 
                                <div className="flex items-center gap-3">
                                  <div className="w-20 bg-[#1A2333] rounded-full h-1.5 overflow-hidden">
                                     <div 
                                      className="bg-primary h-full rounded-full" 
                                      style={{ width: `${factors.workloadStress}%` }}
                                     />
                                  </div>
                                  <span className="text-xs text-white font-medium">{factors.workloadStress}</span>
                                </div>
                              }
                            </td>
                            <td className="px-6 py-4 text-center">
                              {isPending ? <span className="text-secondary-text/50">-</span> : 
                                <span className={`text-sm font-medium ${emp.recoveryPercentage > 70 ? "text-emerald-400" : emp.recoveryPercentage > 40 ? "text-amber-400" : "text-red-400"}`}>
                                    {emp.recoveryPercentage}%
                                </span>
                              }
                            </td>
                            <td className="px-6 py-4">
                              {isPending ? (
                                <span className="text-secondary-text/30 text-xs">Waiting for sync...</span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  {status.icon === "Flame" && <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
                                  {status.icon === "AlertTriangle" && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                                  {status.icon === "Check" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                                  <span className={`text-xs font-semibold ${status.color}`}>
                                    {status.label}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                               {isPending ? <span className="text-secondary-text/50">-</span> : (
                                  <div className="flex flex-col items-end">
                                     {factors.totalBurnoutRisk > 75 ? (
                                       <span className="text-red-400 text-xs font-medium flex items-center gap-1.5 bg-red-400/5 px-2 py-1 rounded">
                                          <HeartPulse className="w-3 h-3" /> Grant Wellness Day
                                       </span>
                                     ) : factors.workloadStress > 70 && emp.recoveryPercentage < 60 ? (
                                       <span className="text-amber-400 text-xs font-medium bg-amber-400/5 px-2 py-1 rounded">
                                          Reduce Sprint Points
                                       </span>
                                     ) : (
                                       <span className="text-emerald-400 text-xs font-medium">Productive Baseline</span>
                                     )}
                                  </div>
                               )}
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
