"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { CreditCard, Lock, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const employees = parseInt(searchParams.get("employees") || "0", 10);
  const email = searchParams.get("email") || "";
  
  const PRICE_PER_EMPLOYEE = 15; // $15 per employee / month
  const total = employees * PRICE_PER_EMPLOYEE;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md bg-card border border-white/5 rounded-[32px] p-10 shadow-2xl relative text-center flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-medium text-white mb-2">Payment Successful!</h2>
        <p className="text-secondary-text mb-8 text-sm">Your licenses have been provisioned.</p>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirecting to your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl bg-card border border-white/5 rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
      {/* Order Summary Sidebar */}
      <div className="bg-[#1A2333] p-8 md:w-2/5 border-b md:border-b-0 md:border-r border-white/5">
        <h3 className="text-lg font-medium text-white mb-6">Order Summary</h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-text">Luna Enterprise</span>
            <span className="text-white">${PRICE_PER_EMPLOYEE}/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary-text">Employees x {employees || 0}</span>
            <span className="text-white">${total}</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 mt-auto">
          <div className="flex justify-between items-end">
            <span className="text-sm text-secondary-text">Total due today</span>
            <span className="text-2xl font-medium text-white">${total}</span>
          </div>
        </div>
        
        {email && (
           <div className="mt-4 text-xs text-secondary-text/60 truncate">
             Account: {email}
           </div>
        )}
      </div>

      {/* Payment Details */}
      <div className="p-8 md:w-3/5">
        <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Payment details
        </h2>

        <form onSubmit={handlePayment} className="space-y-5">
          <div>
            <label className="block text-xs font-medium mb-1.5 text-secondary-text">Card Information</label>
            <div className="bg-[#1A2333]/50 border border-white/10 rounded-xl overflow-hidden shadow-inner">
              <input
                type="text"
                required
                placeholder="Card number"
                className="w-full bg-transparent px-4 py-3 placeholder-white/20 text-white focus:outline-none text-sm border-b border-white/10"
              />
              <div className="flex">
                <input
                  type="text"
                  required
                  placeholder="MM / YY"
                  className="w-1/2 bg-transparent px-4 py-3 placeholder-white/20 text-white focus:outline-none text-sm border-r border-white/10"
                />
                <input
                  type="text"
                  required
                  placeholder="CVC"
                  className="w-1/2 bg-transparent px-4 py-3 placeholder-white/20 text-white focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div>
             <label className="block text-xs font-medium mb-1.5 text-secondary-text">Name on card</label>
             <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-[#1A2333]/50 border border-white/10 rounded-xl px-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 transition-all shadow-inner text-sm"
             />
          </div>

          <button
            type="submit"
            disabled={isProcessing || !employees}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all mt-6 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(124,140,255,0.3)]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay ${total}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative bg-background selection:bg-primary/30 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-8 relative z-10 w-full max-w-xl">
        <Link href="/hr-setup" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 relative z-10 w-full">
         <Suspense fallback={<div className="text-secondary-text">Loading payment details...</div>}>
           <PaymentForm />
         </Suspense>
      </div>
    </div>
  );
}
