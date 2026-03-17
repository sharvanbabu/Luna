"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Users, ArrowRight, CheckCircle2, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function HRSetupPage() {
  const router = useRouter();
  const [isJiraConnecting, setIsJiraConnecting] = useState(false);
  const [isJiraConnected, setIsJiraConnected] = useState(false);
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState("");

  const handleJiraConnect = () => {
    setIsJiraConnecting(true);
    // Mocking an OAuth flow delay
    setTimeout(() => {
      setIsJiraConnecting(false);
      setIsJiraConnected(true);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !employees) return;
    
    // Redirect to payment page with number of employees
    router.push(`/payment?employees=${employees}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative bg-background selection:bg-primary/30 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute left-0 top-0 w-[800px] h-[800px] bg-secondary/5 blur-[250px] rounded-full -z-10 pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 relative z-10 w-full">
        <div className="w-full max-w-lg bg-card border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl relative">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-medium tracking-tight text-white mb-3">Organization Setup</h1>
            <p className="text-secondary-text text-sm">Configure your workspace and prepare your team for Luna.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Integrations */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">1</span>
                Connect Integrations
              </h2>
              
              <div className="bg-[#1A2333]/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Jira Software</h3>
                    <p className="text-xs text-secondary-text">Sync your team's project data</p>
                  </div>
                </div>
                
                {isJiraConnected ? (
                  <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Connected
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleJiraConnect}
                    disabled={isJiraConnecting}
                    className="bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isJiraConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                  </button>
                )}
              </div>
            </div>

            {/* Step 2: Organization Details */}
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">2</span>
                Workspace Details
              </h2>

              <div>
                <label className="block text-sm font-medium mb-2 text-secondary-text">Organization Email</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@company.com"
                    className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-secondary-text">Number of Employees</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text/50" />
                  <input
                    type="number"
                    min="1"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    required
                    placeholder="e.g. 50"
                    className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner text-sm"
                  />
                </div>
                <p className="text-xs text-secondary-text mt-2">Licenses will be provisioned based on this number.</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,140,255,0.3)] mt-6 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
            >
              Continue to Payment
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
