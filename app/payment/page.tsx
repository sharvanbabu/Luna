"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { CheckCircle2, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

const PLANS = [
  { id: "1m", title: "1 Month", priceINR: 350, description: "Monthly flexibility" },
  { id: "3m", title: "3 Months", priceINR: 750, description: "Quarterly savings" },
  { id: "6m", title: "6 Months", priceINR: 1300, description: "Half-yearly commitment" },
  { id: "1y", title: "1 Year", priceINR: 2100, description: "Best value annually" }
];

function SubscriptionPlans() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "admin@company.com";
  const employees = parseInt(searchParams.get("employees") || "1", 10);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("1m");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];
  const totalAmount = selectedPlan.priceINR * employees;

  const handleBuy = async () => {
    setIsProcessing(true);
    
    // Amount must be passed in paise to the Razorpay API
    const amountInPaise = totalAmount * 100;

    try {
      // 1. Create order ID remotely via Node Razorpay SDK
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise })
      });
      const order = await orderRes.json();
      
      if (order.error) {
         throw new Error(order.error);
      }

      // 2. Initialize Razorpay UI options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Luna Enterprise",
        description: `Subscription: ${selectedPlan.title}`,
        order_id: order.id,
        handler: async function (response: any) {
             // 3. Verify cryptographic signature post-purchase
             const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   razorpay_order_id: response.razorpay_order_id,
                   razorpay_payment_id: response.razorpay_payment_id,
                   razorpay_signature: response.razorpay_signature,
                })
             });
             const verifyData = await verifyRes.json();
             
             if (verifyData.success) {
                setIsProcessing(false);
                setIsSuccess(true);
                setTimeout(() => {
                  router.push("/dashboard");
                }, 2000);
             } else {
                alert("Payment verification failed. Missing signature.");
                setIsProcessing(false);
             }
        },
        prefill: { email },
        theme: { color: "#7C8CFF" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
          alert(response.error.description);
          setIsProcessing(false);
      });
      rzp.open();
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md bg-card border border-white/5 rounded-[32px] p-10 shadow-2xl relative text-center flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-medium text-white mb-2">Subscription Active!</h2>
        <p className="text-secondary-text mb-8 text-sm">Your premium HR plan has been successfully provisioned.</p>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirecting to your dashboard...
        </div>
      </div>
    );
  }

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onReady={() => setIsScriptLoaded(true)}
      />
      <div className="w-full max-w-4xl bg-card border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl relative flex flex-col items-center">
        <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">Select your plan</h2>
        <p className="text-secondary-text text-sm mb-10 text-center max-w-md">Choose the premium duration that fits your organization's wellness strategy.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-10">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden focus:outline-none flex flex-col ${
                selectedPlanId === plan.id 
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(124,140,255,0.15)] ring-1 ring-primary/50" 
                  : "border-white/10 bg-[#1A2333]/50 hover:border-white/20"
              }`}
            >
              <div className="text-secondary-text text-sm font-medium mb-2">{plan.title}</div>
              <div className="text-3xl font-semibold text-white mb-2">₹{plan.priceINR} <span className="text-sm text-secondary-text font-normal">/user</span></div>
              <div className="text-xs text-secondary-text/80 leading-relaxed mt-auto pr-6">{plan.description}</div>
              
              {selectedPlanId === plan.id && (
                <div className="absolute top-4 right-4 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center w-full max-w-sm">
          <div className="flex justify-between items-center w-full mb-6 text-sm">
             <span className="text-secondary-text">Number of Employees:</span>
             <span className="text-white font-medium">{employees}</span>
          </div>

          <button
            onClick={handleBuy}
            disabled={isProcessing || !isScriptLoaded}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(124,140,255,0.4)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2 text-sm"
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Preparing Checkout...</>
            ) : !isScriptLoaded ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Loading SDK...</>
            ) : (
              <><ShieldCheck className="w-5 h-5" /> Pay ₹{totalAmount.toLocaleString('en-IN')} with Razorpay</>
            )}
          </button>
          <div className="mt-4 text-xs text-secondary-text/60 text-center flex items-center justify-center gap-1.5 font-medium">
             Prices listed in INR. End-to-end encrypted processing.
          </div>
        </div>
      </div>
    </>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative bg-background selection:bg-primary/30 selection:text-white pb-24">
      {/* Background Orbs */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-8 relative z-10 w-full max-w-4xl">
        <Link href="/hr-setup" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Setup
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 w-full">
         <Suspense fallback={<div className="text-secondary-text flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading subscription details...</div>}>
           <SubscriptionPlans />
         </Suspense>
      </div>
    </div>
  );
}
