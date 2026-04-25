"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { LocalIcon } from "../ui/LocalIcon";

export function HeroSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
      <Badge>A literary personality engine for dangerous self-knowledge</Badge>
      <h1 className="font-literary mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-stone-50 sm:text-6xl lg:text-7xl">
        Who are you in Dostoevsky&apos;s world?
      </h1>
      <p className="mt-7 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
        Answer a set of psychological dilemmas. The app maps your tensions to figures like Myshkin, Ivan, Raskolnikov,
        Stavrogin, Alyosha, Sonya, Kirillov, or the Underground Man.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-100 px-6 py-3 text-sm font-black text-stone-950 shadow-2xl shadow-amber-950/20 transition hover:bg-amber-200"
          href="/quiz"
        >
          Begin the mirror
          <LocalIcon className="h-4 w-4" name="chevron" />
        </Link>
        <a
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-amber-100/25 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-amber-100 transition hover:bg-white/[0.08]"
          href="#method"
        >
          See the method
        </a>
      </div>
      <p className="mt-5 text-sm text-stone-500">This is not a clinical test.</p>
    </motion.div>
  );
}

