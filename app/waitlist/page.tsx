"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type FormData = {
  fullName: string;
  email: string;
  profession: string;
  ageRange: string;
  sleepChallenge: string;
};

export default function WaitlistPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMsg("");
      await addDoc(collection(db, "waitlist"), {
        name: data.fullName,
        email: data.email,
        profession: data.profession,
        age_range: data.ageRange,
        sleep_challenge: data.sleepChallenge,
        created_at: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to join waitlist. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-12">
      <div className="container mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md bg-card border border-white/10 rounded-3xl p-8 relative animate-fade-in shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full -z-10" />
          
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-center">Join the Waitlist</h1>
          <p className="text-secondary-text text-sm text-center mb-8">
            Reserve your spot for early access to Luna.
          </p>

          {success ? (
            <div className="text-center py-10 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">You're on the list.</h2>
              <p className="text-secondary-text mb-8">We'll send your TestFlight invite soon.</p>
              <Link href="/" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg inline-block">
                Return Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/90">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  {...register("fullName", { required: "Name is required" })}
                />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/90">Email</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/90">Profession</label>
                <input
                  type="text"
                  placeholder="Software Engineer"
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  {...register("profession", { required: "Profession is required" })}
                />
                {errors.profession && <p className="text-red-400 text-xs mt-1">{errors.profession.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/90">Age Range</label>
                <select
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
                  {...register("ageRange", { required: "Age range is required" })}
                >
                  <option value="">Select age range</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
                {errors.ageRange && <p className="text-red-400 text-xs mt-1">{errors.ageRange.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-white/90">Sleep Challenge</label>
                <select
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none"
                  {...register("sleepChallenge", { required: "Please select a challenge" })}
                >
                  <option value="">Select your main challenge</option>
                  <option value="Difficulty falling asleep">Difficulty falling asleep</option>
                  <option value="Stress related sleep issues">Stress related sleep issues</option>
                  <option value="Irregular sleep schedule">Irregular sleep schedule</option>
                  <option value="Poor sleep quality">Poor sleep quality</option>
                  <option value="General sleep improvement">General sleep improvement</option>
                </select>
                {errors.sleepChallenge && <p className="text-red-400 text-xs mt-1">{errors.sleepChallenge.message}</p>}
              </div>

              {errorMsg && <p className="text-red-400 text-sm mt-2">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] mt-4 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
