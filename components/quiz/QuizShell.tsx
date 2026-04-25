"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { questions } from "../../lib/quiz/questions";
import type { AnswerMap } from "../../lib/quiz/types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { LocalIcon } from "../ui/LocalIcon";
import { CurrentSignalsPanel } from "./CurrentSignalsPanel";
import { ProgressBar } from "./ProgressBar";
import { QuizQuestion } from "./QuizQuestion";

const storageKey = "dostoevsky-mirror-answers";

export function QuizShell() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const currentQuestion = questions[currentIndex];
  const selectedOptionId = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isFinalQuestion = currentIndex === questions.length - 1;
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  function selectAnswer(optionId: string) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: optionId
    }));
  }

  function goNext() {
    if (!selectedOptionId) {
      return;
    }

    if (isFinalQuestion) {
      sessionStorage.setItem(storageKey, JSON.stringify(answers));
      router.push("/result");
      return;
    }

    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function resetQuiz() {
    setAnswers({});
    setCurrentIndex(0);
    sessionStorage.removeItem(storageKey);
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#080706] px-5 py-6 text-stone-50 sm:px-8 lg:py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[20rem_1fr]">
        <aside className="space-y-4">
          <Link className="focus-ring flex items-center gap-3 rounded-xl p-2 text-stone-300 transition hover:text-stone-50" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100/20 bg-white/[0.05] text-amber-100">
              <LocalIcon name="book" />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.24em]">Dostoevsky</span>
              <span className="block text-xs text-stone-500">Mirror</span>
            </span>
          </Link>

          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70">The mirror</p>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              {answeredCount} of {questions.length} dilemmas answered. This is not a clinical test.
            </p>
          </Card>

          <CurrentSignalsPanel answers={answers} />
        </aside>

        <motion.section
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <div className="mt-10">
            <QuizQuestion question={currentQuestion} selectedOptionId={selectedOptionId} onSelect={selectAnswer} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Button disabled={currentIndex === 0} onClick={goBack} type="button" variant="secondary">
                Back
              </Button>
              <Button onClick={resetQuiz} type="button" variant="ghost">
                <LocalIcon className="h-4 w-4" name="reset" />
                Reset
              </Button>
            </div>
            <Button disabled={!selectedOptionId} onClick={goNext} type="button">
              {isFinalQuestion ? "Reveal result" : "Continue"}
              <LocalIcon className="h-4 w-4" name="chevron" />
            </Button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export { storageKey as quizStorageKey };

