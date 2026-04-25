import type { Character } from "../../lib/content";
import { Card } from "../ui/Card";
import { LocalIcon } from "../ui/LocalIcon";

export function GiftDangerCards({ character }: { character: Character }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <LocalIcon className="text-amber-100" name="heart" />
        <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-100/70">Gift</h2>
        <p className="mt-3 leading-7 text-stone-200">{character.gift}</p>
      </Card>
      <Card className="p-6">
        <LocalIcon className="text-red-200" name="flame" />
        <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-red-100/70">Danger</h2>
        <p className="mt-3 leading-7 text-stone-200">{character.danger}</p>
      </Card>
    </section>
  );
}

