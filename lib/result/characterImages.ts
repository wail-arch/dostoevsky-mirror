export type CharacterImage = {
  src: string;
  kind: "portrait" | "symbolic";
  alt: string;
};

export const characterImages: Record<string, CharacterImage> = {
  "underground-man": {
    src: "/images/characters/underground-man/portrait.jpg",
    kind: "portrait",
    alt: "Portrait-style image for the Underground Man"
  },
  raskolnikov: {
    src: "/images/characters/raskolnikov/portrait.jpg",
    kind: "portrait",
    alt: "Illustration of Rodion Raskolnikov"
  },
  "sonya-marmeladova": {
    src: "/images/characters/sonya-marmeladova/portrait.jpg",
    kind: "portrait",
    alt: "Scene image for Sonya Marmeladova"
  },
  svidrigailov: {
    src: "/images/characters/svidrigailov/portrait.jpg",
    kind: "portrait",
    alt: "Portrait-style image for Arkady Svidrigailov"
  },
  "prince-myshkin": {
    src: "/images/characters/prince-myshkin/portrait.jpg",
    kind: "portrait",
    alt: "Illustration of Prince Lev Myshkin"
  },
  "nastasya-filippovna": {
    src: "/images/characters/nastasya-filippovna/portrait.jpg",
    kind: "portrait",
    alt: "Portrait-style image for Nastasya Filippovna"
  },
  rogozhin: {
    src: "/images/characters/rogozhin/symbolic.webp",
    kind: "symbolic",
    alt: "Symbolic Holbein image for Parfyon Rogozhin"
  },
  "ivan-karamazov": {
    src: "/images/characters/ivan-karamazov/portrait.png",
    kind: "portrait",
    alt: "Portrait-style image for Ivan Karamazov"
  },
  "dmitri-karamazov": {
    src: "/images/characters/dmitri-karamazov/portrait.png",
    kind: "portrait",
    alt: "Portrait-style image for Dmitri Karamazov"
  },
  "alyosha-karamazov": {
    src: "/images/characters/alyosha-karamazov/portrait.jpg",
    kind: "portrait",
    alt: "Portrait-style image for Alyosha Karamazov"
  },
  stavrogin: {
    src: "/images/characters/stavrogin/portrait.png",
    kind: "portrait",
    alt: "Portrait-style image for Nikolai Stavrogin"
  },
  kirillov: {
    src: "/images/characters/kirillov/portrait.png",
    kind: "portrait",
    alt: "Portrait-style image for Alexei Kirillov"
  }
};

export function getCharacterImage(characterId: string) {
  return characterImages[characterId] ?? null;
}
