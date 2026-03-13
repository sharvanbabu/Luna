"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      setErrorMsg("");
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to log in.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      setErrorMsg("");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to sign in with Google.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative bg-background selection:bg-primary/30 selection:text-white">
      {/* Background Orbs */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 blur-[200px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-primary/10 blur-[200px] rounded-full -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24 relative z-10 w-full">
        <div className="text-center mb-10">
          <div className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            LUNA
          </div>
        </div>

        <div className="w-full max-w-md bg-card border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl relative">
          <h1 className="text-2xl font-medium tracking-tight text-white mb-2">Welcome back</h1>
          <p className="text-secondary-text mb-8 text-sm">Log in to access your sleep intelligence dashboard.</p>
          
          <button
            onClick={signInWithGoogle}
            className="w-full bg-white text-background font-medium py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] mb-8 text-sm"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-secondary-text text-xs font-medium uppercase tracking-widest">OR LOGIN WITH EMAIL</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-secondary-text">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text/50" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner text-sm"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message?.toString()}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-secondary-text">Password</label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text/50" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl pl-12 pr-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner text-sm"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-2">{errors.password.message?.toString()}</p>}
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(124,140,255,0.3)] mt-2 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? "Authenticating..." : (
                <>
                  Login
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
