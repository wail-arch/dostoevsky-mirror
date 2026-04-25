"use client";

import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { MethodPreview } from "./MethodPreview";
import { SampleResultCard } from "./SampleResultCard";
import { LocalIcon } from "../ui/LocalIcon";

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-stone-50">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[36rem] w-[36rem] rounded-full bg-red-950/40 blur-3xl" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-100/20 bg-white/[0.05] text-amber-100">
            <LocalIcon name="eye" />
          </span>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.34em] text-stone-100">Dostoevsky</p>
            <p className="text-xs text-stone-400">Mirror of the divided soul</p>
          </div>
        </div>
        <p className="hidden text-sm text-stone-400 md:block">20 dilemmas · 12 archetypes · no diagnosis</p>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-16">
        <HeroSection />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[2rem] bg-amber-100/5 blur-3xl" />
          <img
            alt="A dim literary chamber with a book and candlelight"
            className="relative mb-5 aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/50"
            src="/mirror-chamber.svg"
          />
          <SampleResultCard />
        </motion.div>
      </section>

      <MethodPreview />
    </main>
  );
}
