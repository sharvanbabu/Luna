"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function EmployeeSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative bg-background selection:bg-primary/30 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[250px] rounded-full -z-10 pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 relative z-10 w-full">
        <div className="w-full max-w-md bg-card border border-white/5 rounded-[32px] p-10 shadow-2xl relative text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          
          <h1 className="text-3xl font-medium tracking-tight text-white mb-4">Setup Complete!</h1>
          
          <p className="text-secondary-text text-sm leading-relaxed mb-10">
            Thank you for connecting your Luna and Jira accounts. Your anonymous data will now be synced with your organization's stress analytics dashboard to help improve workplace wellbeing.
          </p>

          <Link 
            href="/"
            className="w-full bg-white text-background font-medium py-3.5 rounded-xl transition-all shadow-lg hover:bg-gray-200 mt-2 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
          >
            Return to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
