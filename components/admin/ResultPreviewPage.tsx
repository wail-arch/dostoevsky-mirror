"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { characters } from "../../lib/content";
import { buildPreviewResult, isPreviewCharacterId, previewCharacterIds } from "../../lib/result/previewResults";
import { ResultExperience } from "../result/ResultExperience";

function previewUrl(characterId: string) {
  return `/admin/result-preview?character=${characterId}`;
}

export function ResultPreviewPage({ initialCharacterId }: { initialCharacterId?: string }) {
  const [characterId, setCharacterId] = useState(isPreviewCharacterId(initialCharacterId) ? initialCharacterId : previewCharacterIds[0]);
  const result = useMemo(() => buildPreviewResult(characterId), [characterId]);

  return (
    <div>
      <div className="fixed inset-x-0 top-0 z-50 border-b border-amber-100/20 bg-stone-950/92 px-4 py-3 text-stone-100 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-100">Temporary admin preview</p>
            <p className="mt-1 text-xs text-stone-400">UI QA only. Remove before shipping.</p>
          </div>
          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400 sm:min-w-80">
            Character
            <select
              className="focus-ring min-h-11 rounded-xl border border-white/10 bg-stone-900 px-3 text-sm font-semibold normal-case tracking-normal text-stone-50"
              value={characterId}
              onChange={(event) => {
                const nextCharacterId = event.target.value;
                if (isPreviewCharacterId(nextCharacterId)) {
                  setCharacterId(nextCharacterId);
                }
              }}
            >
              {previewCharacterIds.map((id) => {
                const character = characters.find((candidate) => candidate.id === id);

                return (
                  <option key={id} value={id}>
                    {character?.canonicalName ?? id}
                  </option>
                );
              })}
            </select>
          </label>
          <Link className="focus-ring rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-stone-200 hover:bg-white/10" href={previewUrl(characterId)}>
            Copyable URL
          </Link>
        </div>
      </div>
      <div className="pt-24">
        <ResultExperience
          result={result}
          eyebrow={`Previewing ${result.primary.character.canonicalName}`}
          navAction={
            <Link className="text-sm font-semibold text-amber-100 hover:text-amber-50" href="/quiz">
              Real quiz
            </Link>
          }
        />
      </div>
    </div>
  );
}
