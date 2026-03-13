import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative">
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 blur-[250px] rounded-full -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 text-center relative z-10">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-8 animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-primary/50">
          Restoring Healthy Sleep in a High-Stress World
        </h1>
        
        <div className="text-xl md:text-2xl text-secondary-text leading-relaxed font-light mb-16 max-w-3xl mx-auto space-y-8">
          <p>
            Luna is building tools that help people restore healthy sleep in a high-stress digital world. We believe that cognitive performance and long-term health are impossible without restorative cycles.
          </p>
          <p>
            The modern professional faces unprecedented information overload. This constant connectivity breaks down our natural physiological barriers and circadian health.
          </p>
          <p>
            Our mission is to create scalable, science-driven sleep intelligence that guides your daily routines and behavioral choices, ensuring you wake up ready to tackle your day with unparalleled focus.
          </p>
        </div>

        <Link href="/contact" className="inline-flex items-center text-primary font-medium border-b border-primary/30 hover:border-primary pb-1 transition-colors">
          Get in touch with us
        </Link>
      </div>
      
    </div>
  );
}
