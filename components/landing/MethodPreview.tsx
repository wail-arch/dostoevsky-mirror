import Link from "next/link";
import { Card } from "../ui/Card";
import { LocalIcon } from "../ui/LocalIcon";

const steps = [
  {
    icon: "brain" as const,
    title: "Dilemmas, not trivia",
    body: "The quiz asks how you move under moral pressure, not which plot points you remember."
  },
  {
    icon: "eye" as const,
    title: "A scored literary mirror",
    body: "Answers become trait signals, then match against the curated archetype profiles in the content layer."
  },
  {
    icon: "shield" as const,
    title: "No diagnosis",
    body: "Results are literary portraits: primary drama, distorted shadow, and possible exit."
  }
];

export function MethodPreview() {
  return (
    <section id="method" className="relative z-10 border-t border-white/10 bg-black/20 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100">Method</p>
          <h2 className="font-literary mt-4 text-4xl font-black text-stone-50 sm:text-5xl">A mirror, not a label.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="p-6">
              <LocalIcon className="text-amber-100" name={step.icon} />
              <h3 className="mt-5 text-lg font-bold text-stone-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-400">{step.body}</p>
            </Card>
          ))}
        </div>
        <Link
          className="focus-ring mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-100 px-6 py-3 text-sm font-black text-stone-950 transition hover:bg-amber-200"
          href="/quiz"
        >
          Begin the mirror
          <LocalIcon className="h-4 w-4" name="chevron" />
        </Link>
      </div>
    </section>
  );
}

