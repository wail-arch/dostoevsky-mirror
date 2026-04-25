import Link from "next/link";
import { motion } from "framer-motion";
import type { ResultModel } from "../../lib/result/types";
import { CharacterHook } from "./CharacterHook";
import { GiftDangerCards } from "./GiftDangerCards";
import { QuotePanel } from "./QuotePanel";
import { ReadingPath } from "./ReadingPath";
import { ResultHero } from "./ResultHero";
import { ShareResultButton } from "./ShareResultButton";
import { TraitBar } from "./TraitBar";
import { TypeConstellation } from "./TypeConstellation";
import { LocalIcon } from "../ui/LocalIcon";

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

export function ResultExperience({
  result,
  eyebrow,
  navAction
}: {
  result: ResultModel;
  eyebrow?: string;
  navAction?: React.ReactNode;
}) {
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
          {navAction ?? (
            <Link className={light ? "text-sm font-semibold text-stone-700 hover:text-stone-950" : "text-sm font-semibold text-stone-300 hover:text-stone-50"} href="/quiz">
              Retake
            </Link>
          )}
        </nav>

        {eyebrow ? <p className={light ? "mx-auto mt-8 max-w-7xl text-xs font-semibold uppercase tracking-[0.22em] text-stone-600" : "mx-auto mt-8 max-w-7xl text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70"}>{eyebrow}</p> : null}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-12 max-w-7xl space-y-10"
        >
          <ResultHero light={light} result={result} />

          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-10">
              <TypeConstellation light={light} result={result} />
              <CharacterHook light={light} result={result} />
              <GiftDangerCards light={light} character={result.primary.character} />
            </div>

            <aside className="space-y-5">
              <section className={light ? "rounded-2xl border border-stone-950/10 bg-white/60 p-6 shadow-2xl shadow-stone-400/20 backdrop-blur-xl" : "rounded-2xl border border-white/10 bg-black/30 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"}>
                <p className={light ? "text-xs font-semibold uppercase tracking-[0.22em] text-amber-700" : "text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/70"}>Top traits</p>
                <div className="mt-5 space-y-4">
                  {result.topTraits.map((trait) => (
                    <TraitBar key={trait.key} light={light} label={trait.label} value={trait.value} />
                  ))}
                </div>
              </section>
              <QuotePanel light={light} quote={result.quote} />
              <ReadingPath light={light} result={result} />
              <ShareResultButton result={result} />
            </aside>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
