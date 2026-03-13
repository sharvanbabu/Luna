import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";

export default function BetaProgramPage() {
  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none animate-float" />

      <div className="container mx-auto px-6 mb-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-primary/50">
          Join the Luna Early Access Program
        </h1>
        <p className="text-xl text-secondary-text mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          We are inviting a limited group of early users to help shape the future of Luna. Be among the first to experience personalized sleep intelligence before public release.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-20 text-left">
          {[
            { icon: <Zap className="w-8 h-8 text-primary" />, title: "Early App Access", desc: "Experience the Luna app before anyone else and optimize your sleep routines." },
            { icon: <ShieldCheck className="w-8 h-8 text-secondary" />, title: "Influence Development", desc: "Your feedback directly impacts features we prioritize and build next." },
            { icon: <Users className="w-8 h-8 text-primary" />, title: "Exclusive Community", desc: "Join early adopters in a private channel for exclusive updates and sleep science tips." }
          ].map((item, i) => (
            <div key={i} className="bg-card border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors shadow-lg">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-inner">{item.icon}</div>
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-secondary-text text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-card/80 to-background border border-white/10 rounded-[40px] p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden text-left mb-12">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl font-medium mb-6">TestFlight Process</h2>
          <p className="text-secondary-text mb-6">Users who are selected for the beta will receive an email instruction guide on how to install the Luna beta app using Apple TestFlight on your iOS device.</p>
          <ul className="text-secondary-text space-y-3 mb-8">
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> Download TestFlight from the App Store</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> Open the invitation link securely sent to your email</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> Install Luna and start tracking</li>
          </ul>
        </div>

        <Link href="/waitlist" className="inline-flex bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-medium transition-all shadow-[0_0_30px_rgba(123,140,255,0.4)] items-center justify-center gap-2 hover:scale-105 active:scale-95 text-lg">
          Apply for Beta <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
