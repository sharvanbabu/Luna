import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Activity, BrainCircuit } from "lucide-react";

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24 relative z-10 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-4">The Science Behind Luna</h1>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto font-light">
            Our platform is built on modern sleep science. Understand how behavioral sleep optimization maps directly to your cognitive performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Clock className="w-8 h-8 text-primary" />,
              title: "Circadian Rhythm Science",
              desc: "The circadian rhythm is an internal clock that regulates the sleep-wake cycle and repeats roughly every 24 hours. Luna maps your natural chronotype to give you exactly the right time to sleep, wake up, and perform high-focus tasks.",
              tags: ["Chronotypes", "Melatonin", "Light Exposure"]
            },
            {
              icon: <BrainCircuit className="w-8 h-8 text-secondary" />,
              title: "Sleep and Cognitive Performance",
              desc: "Research shows that sleep deprivation directly impairs executive functions, working memory, and decision-making. Luna continuously correlates your sleep scores with daily performance feedback.",
              tags: ["Neuroplasticity", "Focus", "Memory"]
            },
            {
              icon: <Activity className="w-8 h-8 text-primary" />,
              title: "Stress and Recovery Cycles",
              desc: "Chronic stress disrupts the architecture of sleep, particularly deep and REM sleep stages. By managing psychological stress and building a wind-down routine, Luna helps you achieve restorative recovery.",
              tags: ["HRV", "Cortisol", "REM Sleep"]
            },
            {
              icon: <BookOpen className="w-8 h-8 text-secondary" />,
              title: "Behavioral Sleep Optimization",
              desc: "Cognitive Behavioral Therapy for Insomnia (CBT-I) forms the basis of our behavioral interventions. Luna guides you through habit formation, sleep restriction, and stimulus control to retrain your brain for healthy sleep.",
              tags: ["CBT-I", "Habits", "Sleep Hygiene"]
            }
          ].map((item, i) => (
            <div key={i} className="bg-card border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-colors shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/[0.02] rounded-full group-hover:bg-primary/5 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner relative z-10">
                {item.icon}
              </div>
              <h3 className="text-2xl font-medium mb-4 relative z-10">{item.title}</h3>
              <p className="text-secondary-text text-sm leading-relaxed mb-6 relative z-10">{item.desc}</p>
              <div className="flex gap-2 flex-wrap relative z-10">
                {item.tags.map(tag => (
                  <span key={tag} className="text-xs bg-[#1A202C] border border-white/10 text-white/70 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
