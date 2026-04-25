import type { QuizQuestion as QuizQuestionType } from "../../lib/quiz/types";
import { AnswerOption } from "./AnswerOption";

type QuizQuestionProps = {
  question: QuizQuestionType;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
};

const letters = ["A", "B", "C", "D"];

export function QuizQuestion({ question, selectedOptionId, onSelect }: QuizQuestionProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-100/80">Choose the truest answer, not the prettiest</p>
      <h1 className="font-literary mt-5 text-3xl font-black leading-tight text-stone-50 sm:text-5xl">{question.prompt}</h1>
      <div className="mt-8 grid gap-3">
        {question.options.map((option, index) => (
          <AnswerOption
            key={option.id}
            letter={letters[index] ?? "?"}
            onSelect={() => onSelect(option.id)}
            selected={selectedOptionId === option.id}
            text={option.text}
          />
        ))}
      </div>
    </div>
  );
}

