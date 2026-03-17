"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2, Moon, AlertCircle, Link as LinkIcon, Smartphone } from "lucide-react";

export default function EmployeeSetupPage() {
  const router = useRouter();
  
  const [lunaState, setLunaState] = useState<"idle" | "connecting" | "connected">("idle");
  const [jiraState, setJiraState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [hasConsented, setHasConsented] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const connectLuna = () => {
    setLunaState("connecting");
    setTimeout(() => setLunaState("connected"), 1200);
  };

  const connectJira = async () => {
    setJiraState("connecting");
    try {
      const response = await fetch('/api/jira');
      if (!response.ok) {
         throw new Error('Jira API connection failed.');
      }
      setJiraState("connected");
    } catch (error) {
       console.error(error);
       setJiraState("error");
    }
  };

  const handleFinish = () => {
    if (lunaState !== "connected" || jiraState !== "connected" || !hasConsented) return;
    setIsFinishing(true);
    setTimeout(() => {
      // Typically we'd flag user as setup complete in DB here
      // Route them to a placeholder or success page, or auto-log them into their own employee view.
      // Since requirements focus heavily on the HR dashboard, we will redirect them to a simple success page.
      router.push("/employee-setup/success");
    }, 1500);
  };

  const allConnected = lunaState === "connected" && jiraState === "connected";

  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative bg-background selection:bg-primary/30 selection:text-white">
      <div className="absolute left-0 top-0 w-[800px] h-[800px] bg-secondary/5 blur-[250px] rounded-full -z-10 pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 relative z-10 w-full">
        <div className="w-full max-w-lg bg-card border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl relative">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-medium tracking-tight text-white mb-3">Welcome to Luna</h1>
            <p className="text-secondary-text text-sm">Connect your tools to enable stress analytics for your organization.</p>
          </div>

          <div className="space-y-6">
            
            {/* Luna App Connection */}
            <div className="bg-[#1A2333]/50 border border-white/5 rounded-2xl p-5 flex items-center justify-between transition-all hover:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white flex items-center gap-2">
                    Luna Sleep App
                  </h3>
                  <p className="text-xs text-secondary-text mt-1">Sync your nightly sleep metrics</p>
                </div>
              </div>
              
              {lunaState === "connected" ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </div>
              ) : (
                <button
                  onClick={connectLuna}
                  disabled={lunaState === "connecting"}
                  className="bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 min-w-[100px] justify-center"
                >
                  {lunaState === "connecting" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
                </button>
              )}
            </div>

            {/* Jira Connection */}
            <div className="bg-[#1A2333]/50 border border-white/5 rounded-2xl p-5 flex items-center justify-between transition-all hover:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Jira Software</h3>
                  <p className="text-xs text-secondary-text mt-1">Sync workload and task status</p>
                </div>
              </div>
              
              {jiraState === "connected" ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </div>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={connectJira}
                    disabled={jiraState === "connecting"}
                    className="bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 min-w-[100px] justify-center"
                  >
                    {jiraState === "connecting" ? <Loader2 className="w-4 h-4 animate-spin" /> : (jiraState === "error" ? "Retry" : "Connect")}
                  </button>
                  {jiraState === "error" && <span className="text-red-400 text-xs text-right mt-1">Connection Refused: Missing Credentials</span>}
                </div>
              )}
            </div>

            {/* Consent Area */}
            <div className={`transition-all duration-500 ${allConnected ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mt-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-start pt-1">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={hasConsented}
                      onChange={(e) => setHasConsented(e.target.checked)}
                      disabled={!allConnected}
                    />
                    <div className="w-5 h-5 rounded border border-white/20 bg-background peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white block mb-1">Data Sharing Agreement</span>
                    <span className="text-xs text-secondary-text leading-relaxed block">
                      I consent to allow my sleep metrics and work pressure indicators to be securely shared with my organization for anonymous and aggregated stress analytics. 
                    </span>
                  </div>
                </label>
              </div>

              <button
                onClick={handleFinish}
                disabled={!allConnected || !hasConsented || isFinishing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,140,255,0.3)] mt-8 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
              >
                {isFinishing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Finalizing...</>
                ) : (
                  <>Complete Setup <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
