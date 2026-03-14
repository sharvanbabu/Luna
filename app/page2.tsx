"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  ArrowRight, Moon, Star, ShieldCheck, CheckCircle2, 
  Linkedin, Twitter, Instagram, Sparkles, Brain, Clock, Activity, Target, ChevronDown, ChevronUp
} from "lucide-react";

type WaitlistFormData = {
  fullName: string;
  email: string;
  profession: string;
  ageRange: string;
  sleepChallenge: string;
};

export default function LandingPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset } = useForm<WaitlistFormData>();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setErrorMsg("");
      await new Promise(resolve => setTimeout(resolve, 500));
      await addDoc(collection(db, "waitlist"), {
        name: data.fullName,
        email: data.email,
        profession: data.profession,
        age_range: data.ageRange,
        sleep_challenge: selectedChallenge || data.sleepChallenge,
        created_at: serverTimestamp(),
      });
      setSuccess(true);
      reset();
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to join waitlist. Try again.");
    }
  };

  const handleChallengeClick = (challenge: string) => {
    setSelectedChallenge(challenge);
    setValue("sleepChallenge", challenge);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const challenges = [
    { id: "Falling asleep", icon: "🌙", label: "Falling asleep faster", desc: "My mind won't shut off", color: "bg-blue-100" },
    { id: "Stress", icon: "🧠", label: "Managing daily stress", desc: "Anxiety keeps me awake", color: "bg-purple-100" },
    { id: "Quality", icon: "⚡", label: "Waking up energized", desc: "I always feel groggy", color: "bg-yellow-100" },
    { id: "Irregular Schedule", icon: "⏰", label: "Fixing my schedule", desc: "Irregular sleep patterns", color: "bg-orange-100" }
  ];

  const tabs = [
    { title: "Insights", icon: <Brain className="w-5 h-5"/>, color: "text-blue-600", content: "Understand exactly how your daily habits and focus levels correlate with your deep sleep cycles. No more guessing." },
    { title: "Routines", icon: <Activity className="w-5 h-5"/>, color: "text-purple-600", content: "Follow personalized wind-down and wake-up routines perfectly aligned to your natural circadian chronotype." },
    { title: "Stress", icon: <Target className="w-5 h-5"/>, color: "text-orange-600", content: "Identify psychological stressors that disrupt your REM sleep and learn actionable techniques to clear your mind." }
  ];

  const faqs = [
    { q: "What is Luna?", a: "Luna is an AI-powered sleep intelligence platform designed specifically for professionals looking to optimize their deep sleep and daily energy." },
    { q: "How does the Apple TestFlight beta work?", a: "Once you sign up for the waitlist, you'll be in line for our private beta. We'll send you an email with a secure Apple TestFlight link to install the app on your iOS device." },
    { q: "Is my sleep data secure?", a: "Yes. Your privacy is our top priority. All health and intelligence data is encrypted and never sold to third parties." },
    { q: "Why is it invite-only right now?", a: "We want to ensure a high-quality experience for early adopters. By limiting spots, we can work closely with our first 500 users to perfect the intelligence algorithms." }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background selection:bg-accent selection:text-white text-primary-text">
      
      {/* Promo Bar */}
      <div className="bg-primary text-white text-sm font-medium py-3 text-center px-4 shadow-sm relative z-50 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        Beta program is now open for early adopters! Claim your spot today.
      </div>

      {/* Navbar */}
      <header className="w-full z-40 bg-white/80 backdrop-blur-lg sticky top-0 border-b border-gray-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-blue-500" />
            LUNA
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-secondary-text">
            <button onClick={() => formRef.current?.scrollIntoView({behavior: "smooth"})} className="hover:text-primary transition-colors">How it Works</button>
            <button onClick={() => formRef.current?.scrollIntoView({behavior: "smooth"})} className="hover:text-primary transition-colors">Science</button>
            <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
          </nav>
          <button onClick={() => formRef.current?.scrollIntoView({behavior: "smooth"})} className="text-sm font-bold bg-accent text-primary-text px-6 py-2.5 rounded-full hover:bg-accent-hover transition-colors shadow-soft">
            Join Beta
          </button>
        </div>
      </header>

      {/* HERO SECTION - Deep contrast background for stopping power */}
      <section className="bg-primary pt-20 pb-28 px-6 relative overflow-hidden rounded-b-[40px] shadow-soft text-white">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-400/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto text-center max-w-4xl relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
            <Moon className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">The sleep intelligence app for professionals</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Sleep better.<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Live brighter.</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mb-10 font-normal leading-relaxed mx-auto">
            Luna uses proven sleep science and AI intelligence to help you reduce stress, build routines, and wake up ready to conquer the day.
          </p>
          
          <button onClick={() => formRef.current?.scrollIntoView({behavior: "smooth"})} className="bg-accent hover:bg-accent-hover hover:scale-105 active:scale-95 text-primary-text px-10 py-5 rounded-full font-bold transition-all shadow-float flex items-center justify-center gap-3 text-lg z-10">
            Join the Exclusive Beta <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* INTERACTIVE SELF-SELECTION (The Micro-Commitment) */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">What kind of sleep improvement are you looking for?</h2>
          <p className="text-secondary-text text-lg">Select a challenge below to customize your early access application.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {challenges.map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleChallengeClick(item.id)}
              className="bg-card border-2 border-transparent hover:border-primary/20 p-8 rounded-[32px] shadow-soft flex flex-col items-center text-center transition-all hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-text">{item.label}</h3>
              <p className="text-secondary-text font-medium text-sm">{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* TABBED VALUE PROP (Chunking Information) */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-100 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The sleep app for every kind of night.</h2>
          </div>

          <div className="bg-card rounded-[40px] shadow-soft overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[400px]">
            {/* Tabs sidebar */}
            <div className="md:w-1/3 bg-slate-50 p-6 flex flex-col justify-center gap-2 border-r border-slate-100 bg-white">
              {tabs.map((tab, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left px-6 py-5 rounded-2xl flex items-center gap-4 transition-all font-bold text-lg ${activeTab === idx ? "bg-white shadow-soft text-primary border border-slate-100 scale-105 z-10" : "text-secondary-text hover:bg-slate-50"}`}
                >
                  <div className={`p-2 rounded-full ${activeTab === idx ? 'bg-primary/10' : 'bg-slate-100'}`}>
                    {tab.icon}
                  </div>
                  {tab.title}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            <div className="md:w-2/3 p-12 flex flex-col justify-center bg-white relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="active-tab-content animate-fade-in relative z-10">
                <div className={`w-16 h-16 rounded-full mb-8 flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm ${tabs[activeTab].color}`}>
                  {tabs[activeTab].icon}
                </div>
                <h3 className="text-3xl font-bold mb-4">{tabs[activeTab].title} Intelligence</h3>
                <p className="text-xl text-secondary-text leading-relaxed font-medium">
                  {tabs[activeTab].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYERED SOCIAL PROOF */}
      <section className="py-24 px-6 container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">Members are enjoying happier and healthier mornings.</h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {[
            { text: "Since using Luna, my HRV has gone up by 20% and I actually wake up before my alarm.", author: "Sarah J.", role: "Product Manager" },
            { text: "The personalized wind-down routines broke my habit of doomscrolling in bed. Highly recommend.", author: "Mark T.", role: "Software Engineer" },
            { text: "I never realized how much my inconsistent schedule was hurting my deep sleep until Luna showed me.", author: "Elena R.", role: "Startup Founder" }
          ].map((review, i) => (
            <div key={i} className="bg-card p-8 rounded-3xl shadow-soft border border-slate-100 text-left relative">
              <div className="flex text-accent mb-4">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-accent border-none" />)}
              </div>
              <p className="text-primary-text font-medium text-lg mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200" />
                <div>
                  <div className="font-bold text-sm">{review.author}</div>
                  <div className="text-xs text-secondary-text">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Proof */}
        <div className="bg-blue-600 rounded-[40px] p-12 max-w-5xl mx-auto text-white shadow-float relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="md:w-1/2 text-left relative z-10">
            <h3 className="text-3xl font-bold mb-4">Trusted by professionals across top organizations.</h3>
            <p className="text-blue-100 font-medium text-lg">Join leaders from tech, startups, and healthcare who prioritize their mental recovery.</p>
          </div>
          <div className="md:w-1/2 flex flex-wrap gap-8 justify-center relative z-10 font-bold text-2xl opacity-80 decoration-white">
            <span>Linear</span>
            <span>Notion</span>
            <span>Calm</span>
            <span>Apple</span>
          </div>
        </div>
      </section>

      {/* WAITLIST FORM */}
      <section ref={formRef} className="py-24 px-6 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-xl mx-auto text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm mb-6 border border-slate-100 text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Join the Luna Beta</h2>
          <p className="text-secondary-text text-lg font-medium">Reserve your spot in the early access program. Only 500 spots total available.</p>
        </div>

        <div className="w-full max-w-lg mx-auto bg-card border border-slate-100 rounded-[32px] p-8 md:p-10 shadow-soft relative z-10">
          {success ? (
            <div className="text-center py-10 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-3">You're on the list.</h2>
              <p className="text-secondary-text font-medium mb-8">We'll send your TestFlight invitation soon.</p>
              <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 text-primary-text">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 placeholder-slate-400 text-primary-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium shadow-sm"
                  {...register("fullName", { required: "Name is required" })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-primary-text">Email Address</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 placeholder-slate-400 text-primary-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium shadow-sm"
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-primary-text">Profession</label>
                  <input
                    type="text"
                    placeholder="Designer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 placeholder-slate-400 text-primary-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium shadow-sm"
                    {...register("profession", { required: "Required" })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-primary-text">Age Range</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-primary-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none font-medium shadow-sm"
                    {...register("ageRange", { required: "Required" })}
                  >
                    <option value="">Select range</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55+">55+</option>
                  </select>
                </div>
              </div>

              {/* Hidden field for selected challenge if they clicked a card, but visible if they didn't */}
              <div className={selectedChallenge ? "hidden" : "block"}>
                  <label className="block text-sm font-bold mb-2 text-primary-text">Main Sleep Challenge</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-primary-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none font-medium shadow-sm"
                    {...register("sleepChallenge")}
                  >
                    <option value="">Select challenge</option>
                    <option value="Falling Asleep">Falling Asleep</option>
                    <option value="Stress">Stress / Mind Racing</option>
                    <option value="Quality">Low Energy / Quality</option>
                    <option value="Irregular Schedule">Irregular Schedule</option>
                  </select>
              </div>

              {selectedChallenge && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between text-sm">
                  <span className="font-bold text-indigo-900">Focus: {selectedChallenge}</span>
                  <button type="button" onClick={() => setSelectedChallenge("")} className="text-indigo-500 hover:text-indigo-700 font-bold text-xs">Change</button>
                </div>
              )}

              {Object.keys(errors).length > 0 && <p className="text-red-500 text-sm font-bold mt-2">Please fill out all required fields.</p>}
              {errorMsg && <p className="text-red-500 text-sm font-bold mt-2">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-float mt-6 disabled:opacity-50 text-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? "Securing your spot..." : "Join the Waitlist"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-xs text-secondary-text font-medium">
             Selected users will receive a TestFlight installation link via email.
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION (Objection Handling) */}
      <section className="py-24 px-6 container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 font-bold text-lg flex items-center justify-between"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-secondary-text" /> : <ChevronDown className="w-5 h-5 text-secondary-text" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-secondary-text font-medium leading-relaxed animate-fade-in border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASSIVE FINAL CTA */}
      <section className="bg-accent py-24 px-6 text-center shadow-[inset_0_20px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full shadow-soft flex items-center justify-center mb-8 animate-float-reverse">
            <span className="text-5xl">🌞</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-primary-text leading-tight">
            Ready for a better morning?
          </h2>
          <p className="text-xl text-primary-text/80 mb-10 font-bold max-w-xl mx-auto">
            Get your exclusive invite to the Luna platform today.
          </p>
          <button onClick={() => formRef.current?.scrollIntoView({behavior: "smooth"})} className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-float text-xl">
            Reserve Early Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
             <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-blue-500 shadow-sm" />
             LUNA
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-secondary-text">
            <button onClick={() => window.scrollTo(0,0)} className="hover:text-primary transition-colors">Home</button>
            <button className="hover:text-primary transition-colors">How it Works</button>
            <button className="hover:text-primary transition-colors">Research</button>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all bg-slate-50"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all bg-slate-50"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all bg-slate-50"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 text-center text-sm font-bold text-slate-300">
          © {new Date().getFullYear()} Luna. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
