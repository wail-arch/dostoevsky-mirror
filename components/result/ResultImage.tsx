import Image from "next/image";
import type { CharacterImage } from "../../lib/result/characterImages";
import { cn } from "../../lib/utils/cn";

export function ResultImage({ image, light }: { image: CharacterImage | null; light: boolean }) {
  if (!image) {
    return null;
  }

  return (
    <figure
      className={cn(
        "relative min-h-[360px] overflow-hidden rounded-[2rem] border shadow-2xl sm:min-h-[460px] lg:min-h-[620px]",
        light ? "border-stone-950/10 bg-stone-950/10 shadow-stone-400/20" : "border-white/10 bg-black/30 shadow-black/40"
      )}
    >
      <Image
        fill
        priority
        sizes="(min-width: 1024px) 36vw, 100vw"
        src={image.src}
        alt={image.alt}
        className={cn("object-cover", image.kind === "symbolic" ? "object-center" : "object-top")}
      />
      <div className={cn("absolute inset-0", light ? "bg-gradient-to-t from-white/50 via-transparent to-transparent" : "bg-gradient-to-t from-black/75 via-black/10 to-transparent")} />
      <figcaption
        className={cn(
          "absolute bottom-5 left-5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-xl",
          light ? "border-stone-950/10 bg-white/50 text-stone-800" : "border-white/10 bg-black/40 text-stone-200"
        )}
      >
        {image.kind === "symbolic" ? "Symbolic image" : "Character image"}
      </figcaption>
    </figure>
  );
}
