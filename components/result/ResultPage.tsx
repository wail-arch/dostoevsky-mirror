"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { AnswerMap } from "../../lib/quiz/types";
import { getResults } from "../../lib/result/getResults";
import type { ResultModel } from "../../lib/result/types";
import { quizStorageKey } from "../quiz/QuizShell";
import { Button } from "../ui/Button";
import { LocalIcon } from "../ui/LocalIcon";
import { CharacterHook } from "./CharacterHook";
import { GiftDangerCards } from "./GiftDangerCards";
import { QuotePanel } from "./QuotePanel";
import { ReadingPath } from "./ReadingPath";
import { ResultHero } from "./ResultHero";
import { ShareResultButton } from "./ShareResultButton";
import { TraitBar } from "./TraitBar";
import { TypeConstellation } from "./TypeConstellation";

const lightResults = new Set(["prince-myshkin", "alyosha-karamazov", "sonya-marmeladova"]);

const gradients: Record<string, string> = {
  "underground-man": "from-zinc-950 via-stone-950 to-red-950",
  raskolnikov: "from-slate-950 via-red-950 to-stone-950",
  "ivan-karamazov": "from-indigo-950 via-slate-950 to-zinc-900",
  "dmitri-karamazov": "from-red-950 via-orange-950 to-stone-950",
  "prince-myshkin": "from-amber-100 via-stone-100 to-sky-100",
  "alyosha-karamazov": "from-stone-100 via-emerald-50 to-amber-100",
  stavrogin: "from-black via-zinc-950 to-violet-950",
  "nastasya-filippovna": "from-rose-950 via-stone-950 to-amber-950",
  "sonya-marmeladova": "from-stone-100 via-amber-50 to-rose-100",
  kirillov: "from-slate-950 via-indigo-950 to-black",
  rogozhin: "from-red-950 via-black to-stone-950",
  svidrigailov: "from-zinc-950 via-neutral-900 to-amber-950"
};

export function ResultPage() {
  const [result, setResult] = useState<ResultModel | null>(null);
  const [missingResult, setMissingResult] = useState(false);

  useEffect(() => {
    const rawAnswers = sessionStorage.getItem(quizStorageKey);
    if (!rawAnswers) {
      setMissingResult(true);
      return;
    }

    try {
      const answers = JSON.parse(rawAnswers) as AnswerMap;
      setResult(getResults(answers));
    } catch {
      setMissingResult(true);
    }
  }, []);

  if (missingResult) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080706] px-5 text-stone-50">
        <section className="max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <LocalIcon className="mx-auto h-10 w-10 text-amber-100" name="eye" />
          <h1 className="font-literary mt-5 text-4xl font-black">The mirror is empty.</h1>
          <p className="mt-4 leading-7 text-stone-400">Take the quiz first so the result has something real to read.</p>
          <Link className="focus-ring mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-100 px-6 py-3 text-sm font-black text-stone-950" href="/quiz">
            Begin the mirror
          </Link>
        </section>
      </main>
    );
  }

  if (!result) {
    return <main className="min-h-screen bg-[#080706]" />;
  }

  const characterId = result.primary.character.id;
  const light = lightResults.has(characterId);
  const gradient = gradients[characterId] ?? "from-zinc-950 via-stone-950 to-red-950";

  return (
    <main className={`min-h-screen bg-gradient-to-br ${gradient} ${light ? "text-stone-950" : "text-stone-50"}`}>
      <div className={light ? "min-h-screen bg-white/10 px-5 py-6 sm:px-8 lg:py-10" : "min-h-screen bg-black/10 px-5 py-6 sm:px-8 lg:py-10"}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link className={light ? "focus-ring flex items-center gap-2 rounded-xl p-2 text-stone-800" : "focus-ring flex items-center gap-2 rounded-xl p-2 text-stone-300"} href="/">
            <LocalIcon className="text-amber-200" name="book" />
            <span className="text-sm font-black uppercase tracking-[0.24em]">Dostoevsky</span>
          </Link>
          <Link className={light ? "text-sm font-semibold text-stone-700 hover:text-stone-950" : "text-sm font-semibold text-stone-300 hover:text-stone-50"} href="/quiz">
            Retake
          </Link>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr]"
        >
          <div className="space-y-10">
            <ResultHero light={light} result={result} />
            <TypeConstellation result={result} />
            <CharacterHook result={result} />
            <GiftDangerCards character={result.primary.character} />
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">Top traits</p>
              <div className="mt-5 space-y-4">
                {result.topTraits.map((trait) => (
                  <TraitBar key={trait.key} label={trait.label} value={trait.value} />
                ))}
              </div>
            </section>
            <QuotePanel quote={result.quote} />
            <ReadingPath result={result} />
            <ShareResultButton result={result} />
          </aside>
        </motion.div>
      </div>
    </main>
  );
}
