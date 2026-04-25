"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AnswerMap } from "../../lib/quiz/types";
import { getResults } from "../../lib/result/getResults";
import type { ResultModel } from "../../lib/result/types";
import { quizStorageKey } from "../quiz/QuizShell";
import { LocalIcon } from "../ui/LocalIcon";
import { ResultExperience } from "./ResultExperience";

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

  return <ResultExperience result={result} />;
}
