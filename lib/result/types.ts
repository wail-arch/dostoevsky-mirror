import type { DimensionKey } from "../../content/dimensions";
import type { Archetype, Character, Quote } from "../content";

export type RankedArchetype = {
  archetype: Archetype;
  character: Character;
  score: number;
  matchPercent: number;
};

export type TopTrait = {
  key: DimensionKey;
  label: string;
  value: number;
};

export type ResultModel = {
  primary: RankedArchetype;
  secondary: RankedArchetype;
  shadow: RankedArchetype;
  exit: Character | null;
  topTraits: TopTrait[];
  quote: Quote | null;
};
