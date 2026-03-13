import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Luna — Sleep Intelligence Platform",
  description: "Luna helps professionals improve sleep and reduce stress with personalized sleep insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-background font-sans text-primary-text min-h-screen relative`}>
        {/* Subtle background glow effect over the entire layout */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1117] via-[#10141f] to-[#0D1117] -z-10" />
        <main className="relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
