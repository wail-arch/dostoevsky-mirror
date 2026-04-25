import type { QuizQuestion } from "./types";

export const questions: QuizQuestion[] = [
  {
    id: "q01",
    prompt: "When someone humiliates you, what is your most honest inner reaction?",
    options: [
      {
        id: "a",
        text: "I withdraw and replay it internally for days.",
        weights: { hyperconsciousness: 8, resentment: 7, selfSabotage: 7, detachment: 4 }
      },
      {
        id: "b",
        text: "I try to forgive them, but the wound stays alive.",
        weights: { compassion: 7, guilt: 5, resentment: 4, faith: 4 }
      },
      {
        id: "c",
        text: "I want to prove I am above them.",
        weights: { moralPride: 9, socialDefense: 6, resentment: 5, revolt: 3 }
      },
      {
        id: "d",
        text: "I go cold and detach from them completely.",
        weights: { detachment: 9, socialDefense: 7, innocence: 0, resentment: 3 }
      }
    ]
  },
  {
    id: "q02",
    prompt: "What kind of truth attracts you most?",
    options: [
      {
        id: "a",
        text: "The truth that exposes hypocrisy.",
        weights: { hyperconsciousness: 8, resentment: 5, moralPride: 4, socialDefense: 4 }
      },
      {
        id: "b",
        text: "The truth that redeems suffering.",
        weights: { faith: 9, compassion: 8, guilt: 4, innocence: 4 }
      },
      {
        id: "c",
        text: "The truth that proves I was right all along.",
        weights: { moralPride: 9, resentment: 6, socialDefense: 4, selfSabotage: 3 }
      },
      {
        id: "d",
        text: "The truth that destroys comforting illusions.",
        weights: { revolt: 9, hyperconsciousness: 7, detachment: 5, faith: 1 }
      }
    ]
  },
  {
    id: "q03",
    prompt: "In love or deep attachment, what is your greatest risk?",
    options: [
      {
        id: "a",
        text: "Needing too much, then despising myself for needing.",
        weights: { passion: 7, guilt: 6, selfSabotage: 7, resentment: 5 }
      },
      {
        id: "b",
        text: "Trying to save someone who may not want to be saved.",
        weights: { compassion: 9, faith: 5, innocence: 5, socialDefense: 1 }
      },
      {
        id: "c",
        text: "Turning passion into chaos.",
        weights: { passion: 10, selfSabotage: 7, guilt: 5, resentment: 4 }
      },
      {
        id: "d",
        text: "Remaining untouchable even when someone gets close.",
        weights: { detachment: 9, socialDefense: 7, moralPride: 4, innocence: 0 }
      }
    ]
  },
  {
    id: "q04",
    prompt: "When you see innocent suffering, what rises first?",
    options: [
      {
        id: "a",
        text: "A revolt against the structure of the world.",
        weights: { revolt: 10, compassion: 5, hyperconsciousness: 5, faith: 0 }
      },
      {
        id: "b",
        text: "A wish to comfort the person in front of me.",
        weights: { compassion: 10, faith: 6, innocence: 5, guilt: 3 }
      },
      {
        id: "c",
        text: "A dark suspicion that suffering is unavoidable.",
        weights: { detachment: 7, revolt: 6, faith: 0, hyperconsciousness: 5 }
      },
      {
        id: "d",
        text: "A sense of guilt, even when I caused nothing.",
        weights: { guilt: 9, compassion: 5, selfSabotage: 5, innocence: 3 }
      }
    ]
  },
  {
    id: "q05",
    prompt: "Which statement feels most dangerously close to you?",
    options: [
      {
        id: "a",
        text: "I might ruin something just to prove I am free.",
        weights: { selfSabotage: 10, revolt: 7, moralPride: 5, passion: 5 }
      },
      {
        id: "b",
        text: "I might forgive too much because I cannot stop seeing pain.",
        weights: { compassion: 10, faith: 5, innocence: 5, socialDefense: 0 }
      },
      {
        id: "c",
        text: "I might justify anything if the theory is beautiful enough.",
        weights: { moralPride: 10, hyperconsciousness: 7, detachment: 5, guilt: 3 }
      },
      {
        id: "d",
        text: "I might disappear emotionally before anyone can claim me.",
        weights: { detachment: 10, socialDefense: 7, selfSabotage: 5, compassion: 0 }
      }
    ]
  },
  {
    id: "q06",
    prompt: "What usually blocks action?",
    options: [
      {
        id: "a",
        text: "I analyze the act until the moment dies.",
        weights: { hyperconsciousness: 10, selfSabotage: 8, detachment: 5, resentment: 3 }
      },
      {
        id: "b",
        text: "I fear hurting someone or betraying something good.",
        weights: { compassion: 8, guilt: 7, faith: 5, innocence: 4 }
      },
      {
        id: "c",
        text: "I wait for a grand enough reason.",
        weights: { moralPride: 7, revolt: 5, passion: 4, selfSabotage: 5 }
      },
      {
        id: "d",
        text: "Nothing blocks me for long. I move first, regret later.",
        weights: { passion: 10, guilt: 5, selfSabotage: 5, innocence: 2 }
      }
    ]
  },
  {
    id: "q07",
    prompt: "How do you experience ordinary social life?",
    options: [
      {
        id: "a",
        text: "As a theater of small humiliations and hidden rankings.",
        weights: { resentment: 8, hyperconsciousness: 8, socialDefense: 6, selfSabotage: 4 }
      },
      {
        id: "b",
        text: "As fragile people trying to endure each other.",
        weights: { compassion: 8, faith: 5, guilt: 4, innocence: 5 }
      },
      {
        id: "c",
        text: "As a game that rewards masks and performance.",
        weights: { detachment: 7, socialDefense: 8, resentment: 4, moralPride: 3 }
      },
      {
        id: "d",
        text: "As noise, unless a real question breaks through.",
        weights: { detachment: 7, revolt: 6, hyperconsciousness: 5, faith: 1 }
      }
    ]
  },
  {
    id: "q08",
    prompt: "What is your relation to guilt?",
    options: [
      {
        id: "a",
        text: "It follows me even when I cannot name the crime.",
        weights: { guilt: 10, hyperconsciousness: 5, selfSabotage: 5, innocence: 3 }
      },
      {
        id: "b",
        text: "I resist guilt if I suspect it was imposed by others.",
        weights: { resentment: 7, moralPride: 6, socialDefense: 5, revolt: 4 }
      },
      {
        id: "c",
        text: "I can feel guilty, but passion often arrives first.",
        weights: { passion: 9, guilt: 7, selfSabotage: 5, innocence: 2 }
      },
      {
        id: "d",
        text: "I often feel more empty than guilty.",
        weights: { detachment: 10, faith: 0, innocence: 0, socialDefense: 5 }
      }
    ]
  },
  {
    id: "q09",
    prompt: "What is your instinct toward meaning?",
    options: [
      {
        id: "a",
        text: "I want meaning, but I interrogate it until it bleeds.",
        weights: { hyperconsciousness: 8, revolt: 8, moralPride: 4, faith: 2 }
      },
      {
        id: "b",
        text: "I suspect meaning exists through love, not argument.",
        weights: { faith: 9, compassion: 8, innocence: 4, guilt: 3 }
      },
      {
        id: "c",
        text: "Meaning must be conquered, not received.",
        weights: { moralPride: 8, passion: 6, revolt: 5, socialDefense: 3 }
      },
      {
        id: "d",
        text: "Meaning feels like a word people use to avoid the void.",
        weights: { detachment: 9, revolt: 7, faith: 0, hyperconsciousness: 5 }
      }
    ]
  },
  {
    id: "q10",
    prompt: "Imagine you have done something wrong. What is most likely?",
    options: [
      {
        id: "a",
        text: "I hide, then secretly want to be discovered.",
        weights: { guilt: 9, selfSabotage: 7, hyperconsciousness: 5, socialDefense: 3 }
      },
      {
        id: "b",
        text: "I confess too quickly because secrecy feels poisonous.",
        weights: { guilt: 8, compassion: 6, faith: 5, innocence: 3 }
      },
      {
        id: "c",
        text: "I defend myself intellectually before admitting the wound.",
        weights: { moralPride: 8, hyperconsciousness: 7, socialDefense: 5, guilt: 4 }
      },
      {
        id: "d",
        text: "I detach from it, as if it happened to another person.",
        weights: { detachment: 10, guilt: 2, socialDefense: 5, innocence: 0 }
      }
    ]
  },
  {
    id: "q11",
    prompt: "What do you do with your deepest wound?",
    options: [
      {
        id: "a",
        text: "I turn it into analysis.",
        weights: { hyperconsciousness: 10, detachment: 5, selfSabotage: 5, resentment: 4 }
      },
      {
        id: "b",
        text: "I try to make it useful to others.",
        weights: { compassion: 9, faith: 6, guilt: 4, innocence: 4 }
      },
      {
        id: "c",
        text: "I turn it into pride.",
        weights: { moralPride: 9, resentment: 7, socialDefense: 5, passion: 3 }
      },
      {
        id: "d",
        text: "I turn it against myself before anyone else can.",
        weights: { selfSabotage: 10, guilt: 7, resentment: 5, innocence: 2 }
      }
    ]
  },
  {
    id: "q12",
    prompt: "How do people often misread you?",
    options: [
      {
        id: "a",
        text: "As negative, when I am actually precise.",
        weights: { hyperconsciousness: 8, resentment: 5, socialDefense: 5, moralPride: 3 }
      },
      {
        id: "b",
        text: "As naive, when I am actually choosing mercy.",
        weights: { compassion: 9, innocence: 7, faith: 6, guilt: 3 }
      },
      {
        id: "c",
        text: "As arrogant, when I am trying not to collapse.",
        weights: { moralPride: 7, guilt: 5, socialDefense: 5, selfSabotage: 4 }
      },
      {
        id: "d",
        text: "As cold, when I simply refuse to be possessed.",
        weights: { detachment: 9, socialDefense: 7, moralPride: 4, compassion: 0 }
      }
    ]
  },
  {
    id: "q13",
    prompt: "What kind of consolation irritates you most?",
    options: [
      {
        id: "a",
        text: "The kind that explains suffering too quickly.",
        weights: { revolt: 9, hyperconsciousness: 6, compassion: 4, moralPride: 3 }
      },
      {
        id: "b",
        text: "The kind that asks me to be grateful for being rescued.",
        weights: { resentment: 8, moralPride: 7, selfSabotage: 5, passion: 3 }
      },
      {
        id: "c",
        text: "The kind that turns discipline into a little moral performance.",
        weights: { detachment: 7, socialDefense: 6, resentment: 4, hyperconsciousness: 3 }
      },
      {
        id: "d",
        text: "The kind that forgets mercy has to become action.",
        weights: { compassion: 8, faith: 7, innocence: 4, guilt: 3 }
      }
    ]
  },
  {
    id: "q14",
    prompt: "What would make you distrust a beautiful act?",
    options: [
      {
        id: "a",
        text: "If it needed applause to remain beautiful.",
        weights: { hyperconsciousness: 7, resentment: 5, moralPride: 5, socialDefense: 3 }
      },
      {
        id: "b",
        text: "If it rescued someone while secretly owning them.",
        weights: { compassion: 7, resentment: 7, moralPride: 5, revolt: 2 }
      },
      {
        id: "c",
        text: "If it tried to make suffering look meaningful too soon.",
        weights: { revolt: 8, compassion: 6, hyperconsciousness: 4, faith: 1 }
      },
      {
        id: "d",
        text: "If it was too pure to survive a real room.",
        weights: { detachment: 7, guilt: 4, socialDefense: 5, innocence: 2 }
      }
    ]
  },
  {
    id: "q15",
    prompt: "Which room would expose you fastest?",
    options: [
      {
        id: "a",
        text: "A room where everyone expects confession.",
        weights: { guilt: 8, hyperconsciousness: 6, socialDefense: 5, selfSabotage: 4 }
      },
      {
        id: "b",
        text: "A room where someone wounded asks for tenderness.",
        weights: { compassion: 8, guilt: 5, faith: 4, innocence: 3 }
      },
      {
        id: "c",
        text: "A room where a beloved person is free to leave.",
        weights: { passion: 9, resentment: 5, selfSabotage: 6, socialDefense: 4 }
      },
      {
        id: "d",
        text: "A room where silence no longer gives me power.",
        weights: { detachment: 8, moralPride: 5, socialDefense: 8, guilt: 2 }
      }
    ]
  },
  {
    id: "q16",
    prompt: "Which sentence feels most like a temptation?",
    options: [
      {
        id: "a",
        text: "If I can explain it, I am already above it.",
        weights: { hyperconsciousness: 9, moralPride: 8, detachment: 5, guilt: 2 }
      },
      {
        id: "b",
        text: "If I suffer for it, it must be sincere.",
        weights: { passion: 7, guilt: 7, selfSabotage: 8, innocence: 3 }
      },
      {
        id: "c",
        text: "If I love enough, the boundary will become unnecessary.",
        weights: { compassion: 9, faith: 6, innocence: 5, socialDefense: 1 }
      },
      {
        id: "d",
        text: "If meaning fails, appetite is at least honest.",
        weights: { detachment: 8, passion: 7, faith: 0, revolt: 5 }
      }
    ]
  },
  {
    id: "q17",
    prompt: "What happens when you cannot find a clean answer?",
    options: [
      {
        id: "a",
        text: "I keep the question open, even if it isolates me.",
        weights: { revolt: 8, hyperconsciousness: 7, detachment: 5, moralPride: 3 }
      },
      {
        id: "b",
        text: "I choose the next faithful act and stop demanding purity.",
        weights: { faith: 9, compassion: 8, innocence: 4, guilt: 3 }
      },
      {
        id: "c",
        text: "I force a decision with heat, then pay for it later.",
        weights: { passion: 9, guilt: 6, selfSabotage: 6, resentment: 3 }
      },
      {
        id: "d",
        text: "I make the impossibility itself into my proof.",
        weights: { hyperconsciousness: 8, selfSabotage: 8, detachment: 6, revolt: 5 }
      }
    ]
  },
  {
    id: "q18",
    prompt: "What form of freedom attracts you most?",
    options: [
      {
        id: "a",
        text: "Freedom from cheap explanations.",
        weights: { revolt: 8, hyperconsciousness: 6, moralPride: 4, faith: 1 }
      },
      {
        id: "b",
        text: "Freedom to love without owning.",
        weights: { compassion: 8, passion: 5, faith: 5, innocence: 3 }
      },
      {
        id: "c",
        text: "Freedom so complete it needs no witness.",
        weights: { detachment: 8, revolt: 8, moralPride: 6, selfSabotage: 6 }
      },
      {
        id: "d",
        text: "Freedom from the shame other people assigned to me.",
        weights: { resentment: 8, selfSabotage: 5, socialDefense: 5, passion: 4 }
      }
    ]
  },
  {
    id: "q19",
    prompt: "What would redemption have to avoid becoming?",
    options: [
      {
        id: "a",
        text: "An excuse to forget what was done.",
        weights: { guilt: 8, moralPride: 5, compassion: 5, revolt: 3 }
      },
      {
        id: "b",
        text: "A sentimental story that makes innocent suffering useful.",
        weights: { revolt: 9, compassion: 6, hyperconsciousness: 5, faith: 1 }
      },
      {
        id: "c",
        text: "A polite costume for ownership.",
        weights: { resentment: 8, passion: 5, socialDefense: 4, selfSabotage: 4 }
      },
      {
        id: "d",
        text: "A demand that mercy become weakness.",
        weights: { compassion: 8, faith: 6, socialDefense: 3, innocence: 4 }
      }
    ]
  },
  {
    id: "q20",
    prompt: "At your worst, what do your strengths become?",
    options: [
      {
        id: "a",
        text: "Clarity becomes a weapon against action.",
        weights: { hyperconsciousness: 10, selfSabotage: 8, resentment: 5, detachment: 5 }
      },
      {
        id: "b",
        text: "Mercy becomes permission for others to devour me.",
        weights: { compassion: 10, guilt: 6, faith: 5, socialDefense: 0 }
      },
      {
        id: "c",
        text: "Passion becomes a proof that I am alive.",
        weights: { passion: 10, selfSabotage: 6, guilt: 5, innocence: 2 }
      },
      {
        id: "d",
        text: "Freedom becomes obedience to one severe idea.",
        weights: { revolt: 9, detachment: 7, moralPride: 7, selfSabotage: 7 }
      }
    ]
  }
];
