"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare } from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    // In a real app we'd save to Firestore or an API endpoint.
    // Simulating delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess(true);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col pt-12 animate-fade-in relative">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary/10 blur-[200px] rounded-full -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary-text hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-xl mx-auto px-6 pb-24 relative w-full z-10">
        <div className="mb-12 text-center">
          <MessageSquare className="w-10 h-10 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">Contact Us</h1>
          <p className="text-secondary-text text-lg font-light">
            Have a question about Luna or sleep intelligence? Send us a message and our science team will respond.
          </p>
        </div>

        <div className="bg-card border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          
          {success ? (
            <div className="text-center py-12 animate-fade-in relative z-10">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-medium mb-3">Message Sent</h2>
              <p className="text-secondary-text mb-8">We'll get back to you shortly regarding your inquiry.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-5 py-4 placeholder-white/30 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-light"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-5 py-4 placeholder-white/30 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-light"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white/90">Message</label>
                <textarea
                  placeholder="How can we help?"
                  rows={5}
                  className="w-full bg-[#1A202C] border border-white/10 rounded-xl px-5 py-4 placeholder-white/30 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-light"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-medium py-4 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] mt-4 disabled:opacity-50 text-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
