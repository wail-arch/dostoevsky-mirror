import type { Character } from "../../lib/content";
import { cn } from "../../lib/utils/cn";
import { Card } from "../ui/Card";
import { LocalIcon } from "../ui/LocalIcon";

export function GiftDangerCards({ character, light }: { character: Character; light: boolean }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card className={cn("p-6", light && "border-stone-950/10 bg-white/55 shadow-stone-400/20")}>
        <LocalIcon className={light ? "text-amber-700" : "text-amber-100"} name="heart" />
        <h2 className={cn("mt-4 text-sm font-semibold uppercase tracking-[0.22em]", light ? "text-amber-700" : "text-amber-100/70")}>Gift</h2>
        <p className={cn("mt-3 leading-7", light ? "text-stone-800" : "text-stone-200")}>{character.gift}</p>
      </Card>
      <Card className={cn("p-6", light && "border-stone-950/10 bg-white/55 shadow-stone-400/20")}>
        <LocalIcon className={light ? "text-red-700" : "text-red-200"} name="flame" />
        <h2 className={cn("mt-4 text-sm font-semibold uppercase tracking-[0.22em]", light ? "text-red-700" : "text-red-100/70")}>Danger</h2>
        <p className={cn("mt-3 leading-7", light ? "text-stone-800" : "text-stone-200")}>{character.danger}</p>
      </Card>
    </section>
  );
}
