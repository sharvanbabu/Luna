"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ArrowRight, Activity, Moon, Clock, BrainCircuit, BookOpen,
  CheckCircle2, XCircle, Linkedin, Twitter, Instagram, ChevronRight
} from "lucide-react";

type WaitlistFormData = {
  fullName: string;
  email: string;
  profession: string;
  ageRange: string;
  sleepChallenge: string;
};

export default function LandingPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<WaitlistFormData>();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setErrorMsg("");
      // Simulating a minor delay for user experience
      await new Promise(resolve => setTimeout(resolve, 500));
      await addDoc(collection(db, "waitlist"), {
        name: data.fullName,
        email: data.email,
        profession: data.profession,
        age_range: data.ageRange,
        sleep_challenge: data.sleepChallenge,
        created_at: serverTimestamp(),
      });
      setSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to join waitlist. Try again.");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 selection:text-white relative overflow-hidden">
      {/* Background ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-float pointer-events-none" />

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            LUNA
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-secondary-text">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary-text transition-colors">How it Works</button>
            <button onClick={() => scrollToSection('science')} className="hover:text-primary-text transition-colors">Science</button>
            <button onClick={() => scrollToSection('early-access')} className="hover:text-primary-text transition-colors">Early Access</button>
            <Link href="/login" className="hover:text-primary-text transition-colors">Login</Link>
          </nav>
          <button onClick={() => scrollToSection('early-access')} className="text-sm font-medium bg-white text-background px-5 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Join Beta
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 container mx-auto flex flex-col items-center text-center relative z-10">
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="w-20 h-20 rounded-full border border-white/10 mb-8 flex items-center justify-center bg-card/50 backdrop-blur-sm relative shadow-[0_0_30px_rgba(124,140,255,0.3)]">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-white max-w-4xl">
          Your mind works better when your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">sleep works better.</span>
        </h1>
        <p className="text-xl text-secondary-text max-w-2xl mb-10 font-light leading-relaxed">
          Luna helps professionals improve sleep quality and reduce stress using personalized sleep intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
          <button onClick={() => scrollToSection('early-access')} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(124,140,255,0.4)] flex items-center justify-center gap-2">
            Join the Beta <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-white bg-card border border-white/5 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            See How It Works
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-primary/20" />
              </div>
            ))}
          </div>
          <p className="text-sm text-secondary-text">Trusted by early users from tech, startups, and healthcare.</p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-white/5 bg-background/50 backdrop-blur-sm relative z-10 w-full overflow-hidden flex flex-col items-center px-6">
        <p className="text-sm font-medium text-secondary-text uppercase tracking-widest mb-8">Early users improving their sleep with Luna</p>
        <div className="flex gap-12 md:gap-24 opacity-60 flex-wrap justify-center grayscale hover:grayscale-0 transition-all duration-700">
          <div className="text-xl font-bold tracking-tighter">Linear</div>
          <div className="text-xl font-bold tracking-tighter">Notion</div>
          <div className="text-xl font-bold tracking-tighter">Calm</div>
          <div className="text-xl font-bold tracking-tighter">Apple</div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">Modern work has broken our sleep.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: <Activity className="w-6 h-6 text-primary" />, desc: "Stress from work keeps the brain active at night, delaying restorative rest." },
            { icon: <Clock className="w-6 h-6 text-secondary" />, desc: "Irregular schedules disrupt natural circadian rhythms." },
            { icon: <Moon className="w-6 h-6 text-primary" />, desc: "Poor sleep permanently reduces daily focus and professional productivity." }
          ].map((item, i) => (
            <div key={i} className="bg-card border border-white/5 p-8 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">{item.icon}</div>
              <p className="text-secondary-text text-lg leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-24 px-6 container mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">What better sleep changes</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Before */}
          <div className="bg-card border border-red-500/10 p-10 rounded-[32px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <h3 className="text-xl font-medium text-white/90">Before Luna</h3>
            </div>
            <ul className="space-y-6">
              {[
                "Difficulty falling asleep",
                "Morning fatigue and grogginess",
                "Low focus at work"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-secondary-text">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* After */}
          <div className="bg-gradient-to-br from-primary/10 to-card border border-primary/20 p-10 rounded-[32px] relative overflow-hidden shadow-[0_0_40px_rgba(124,140,255,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <h3 className="text-xl font-medium text-white">After Luna</h3>
            </div>
            <ul className="space-y-6">
              {[
                "Consistent sleep routine",
                "Better energy in the morning",
                "Improved focus and productivity"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-white">
                  {/* <CheckCircle className="w-5 h-5 text-primary shrink-0" /> */}
                  <span className="text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How Luna Works */}
      <section id="how-it-works" className="py-24 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-16 text-center">How Luna works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Join waitlist", desc: "Join the early access waitlist to reserve your beta spot." },
              { step: "02", title: "Invitation", desc: "Receive a specialized TestFlight invitation to your inbox." },
              { step: "03", title: "Install app", desc: "Install the Luna beta app natively on your iPhone securely." },
              { step: "04", title: "Sleep better", desc: "Start improving your sleep with personalized intelligence." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-white/5 p-6 rounded-3xl relative text-center md:text-left flex flex-col items-center md:items-start group hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-primary mb-4">{item.step}</div>
                <h3 className="font-medium mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-secondary-text">{item.desc}</p>
                {i < 3 && <ChevronRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-card border border-white/5 p-10 rounded-[32px] row-span-2 group">
            <h3 className="text-2xl font-medium mb-3 group-hover:text-primary transition-colors">Sleep Insights</h3>
            <p className="text-secondary-text text-lg">Understand your sleep patterns implicitly, mapped intuitively with advanced metrics.</p>
            <div className="mt-8 h-40 bg-gradient-to-t from-background to-background/50 rounded-xl border border-white/5 flex items-end p-4">
              <div className="w-full flex justify-between items-end gap-2">
                {[40, 60, 45, 80, 50, 90, 75].map((h, i) => (
                  <div key={i} className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-all" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-card border border-white/5 p-10 rounded-[32px] group">
            <h3 className="text-xl font-medium mb-2 group-hover:text-secondary transition-colors">Personalized Sleep Routine</h3>
            <p className="text-secondary-text">Daily guidance crafted meticulously for healthier sleep habits.</p>
          </div>
          <div className="bg-card border border-white/5 p-10 rounded-[32px] group">
            <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">Stress Awareness</h3>
            <p className="text-secondary-text">Identify psychological patterns affecting deep recovery.</p>
          </div>
          <div className="bg-card border border-white/5 p-10 rounded-[32px] md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div>
              <h3 className="text-2xl font-medium mb-3 group-hover:text-secondary transition-colors">Circadian Rhythm Guidance</h3>
              <p className="text-secondary-text text-lg">Align your biological body clock naturally with modern demands.</p>
            </div>
            <div className="w-24 h-24 rounded-full border-[6px] border-secondary/20 border-t-secondary animate-[spin_10s_linear_infinite]" />
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="py-24 px-6 container mx-auto border-y border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Built on sleep science.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            // { title: "Circadian rhythm research", icon: <Sun className="w-5 h-5 text-primary" /> },
            { title: "Sleep & cognitive performance", icon: <BrainCircuit className="w-5 h-5 text-secondary" /> },
            { title: "Stress & sleep recovery", icon: <Activity className="w-5 h-5 text-primary" /> },
            { title: "Behavioral sleep improvement", icon: <BookOpen className="w-5 h-5 text-secondary" /> }
          ].map((item, i) => (
            <div key={i} className="bg-card/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="font-medium text-white/90">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access / Waitlist Form Section */}
      <section id="early-access" className="py-32 px-6 container mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Join the Luna Beta</h2>
          <p className="text-secondary-text text-lg mb-6">
            We are opening a limited early access program for professionals who want to improve sleep and productivity.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Only 500 beta spots available.
          </div>
        </div>

        <div className="w-full max-w-md mx-auto bg-card border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {success ? (
            <div className="text-center py-10 animate-fade-in relative z-10">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2 text-white">You're on the list.</h2>
              <p className="text-secondary-text mb-8">We'll send your TestFlight invitation soon.</p>
              <button onClick={() => setSuccess(false)} className="text-primary text-sm hover:underline">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-text">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl px-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                  {...register("fullName", { required: "Name is required" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-text">Email address</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl px-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-secondary-text">Profession</label>
                <input
                  type="text"
                  placeholder="Product Manager"
                  className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl px-4 py-3 placeholder-white/20 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                  {...register("profession", { required: "Profession is required" })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary-text">Age Range</label>
                  <select
                    className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none shadow-inner"
                    {...register("ageRange", { required: "Required" })}
                  >
                    <option value="" className="bg-card">Select</option>
                    <option value="18-24" className="bg-card">18-24</option>
                    <option value="25-34" className="bg-card">25-34</option>
                    <option value="35-44" className="bg-card">35-44</option>
                    <option value="45-54" className="bg-card">45-54</option>
                    <option value="55+" className="bg-card">55+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary-text">Sleep Challenge</label>
                  <select
                    className="w-full bg-[#1A2333]/50 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none shadow-inner"
                    {...register("sleepChallenge", { required: "Required" })}
                  >
                    <option value="" className="bg-card">Select</option>
                    <option value="Stress" className="bg-card">Stress</option>
                    <option value="Falling Asleep" className="bg-card">Falling asleep</option>
                    <option value="Irregular Schedule" className="bg-card">Schedule</option>
                    <option value="Quality" className="bg-card">Low Quality</option>
                  </select>
                </div>
              </div>

              {/* {Object.keys(errors).length > 0 && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Please fill out all required fields.</p>} */}
              {errorMsg && <p className="text-red-400 text-sm mt-2">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(124,140,255,0.3)] mt-6 disabled:opacity-50 text-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
            </form>
          )}

          {/* TestFlight Explanation inside form context */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-secondary-text leading-relaxed">
              Selected users will receive an email with instructions to install the Luna beta app through Apple TestFlight.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl tracking-tight text-white mb-6 font-medium">About Luna</h2>
          <p className="text-xl md:text-2xl text-secondary-text font-light leading-relaxed">
            Luna is building the future of sleep intelligence to help professionals restore healthy sleep in a high stress digital world.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 container mx-auto text-center border-t border-white/5">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 text-white">Better sleep starts tonight.</h2>
        <p className="text-xl text-secondary-text mb-10 max-w-xl mx-auto font-light">
          Join the Luna beta and take control of your sleep.
        </p>
        <button onClick={() => scrollToSection('early-access')} className="bg-white text-background px-10 py-5 rounded-full font-medium hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] text-lg">
          Join the Waitlist
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            LUNA
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-secondary-text">
            <button onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How it Works</button>
            <button onClick={() => scrollToSection('science')} className="hover:text-white transition-colors">Research</button>
            <button onClick={() => scrollToSection('early-access')} className="hover:text-white transition-colors">Beta Program</button>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:border-white/20 transition-all."><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:border-white/20 transition-all."><Twitter className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:border-white/20 transition-all."><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 text-center text-sm text-secondary-text/50">
          © {new Date().getFullYear()} Luna. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
