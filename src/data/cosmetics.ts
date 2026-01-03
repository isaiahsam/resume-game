// Cosmetics system - skins, hats, trails, emotes

export interface Cosmetic {
  id: string;
  name: string;
  type: "skin" | "hat" | "trail" | "emote";
  cost: number;
  unlockRequirement?: {
    type: "level" | "boss" | "coins" | "achievement";
    value: number | string;
  };
  color?: string;
  colors?: { primary: string; secondary: string };
  description: string;
}

export const COSMETICS: Cosmetic[] = [
  // SKINS (Color Palettes)
  {
    id: "skin-default",
    name: "Default Blue",
    type: "skin",
    cost: 0,
    colors: { primary: "#3498db", secondary: "#f39c12" },
    description: "Classic look",
  },
  {
    id: "skin-red",
    name: "Crimson Fire",
    type: "skin",
    cost: 50,
    colors: { primary: "#e74c3c", secondary: "#c0392b" },
    description: "Bold and powerful",
  },
  {
    id: "skin-green",
    name: "Forest Guardian",
    type: "skin",
    cost: 50,
    colors: { primary: "#2ecc71", secondary: "#27ae60" },
    description: "Natural vibes",
  },
  {
    id: "skin-purple",
    name: "Royal Violet",
    type: "skin",
    cost: 75,
    colors: { primary: "#9b59b6", secondary: "#8e44ad" },
    description: "Regal appearance",
  },
  {
    id: "skin-cyber",
    name: "Cyber Neon",
    type: "skin",
    cost: 100,
    colors: { primary: "#00ffff", secondary: "#ff00ff" },
    description: "Futuristic glow",
  },
  {
    id: "skin-gold",
    name: "Golden Champion",
    type: "skin",
    cost: 0,
    unlockRequirement: { type: "boss", value: "complete" },
    colors: { primary: "#f1c40f", secondary: "#f39c12" },
    description: "Beat the Interview Dragon to unlock",
  },

  // HATS
  {
    id: "hat-none",
    name: "No Hat",
    type: "hat",
    cost: 0,
    description: "Go bare",
  },
  {
    id: "hat-cap",
    name: "Baseball Cap",
    type: "hat",
    cost: 25,
    color: "#e74c3c",
    description: "Casual style",
  },
  {
    id: "hat-beanie",
    name: "Winter Beanie",
    type: "hat",
    cost: 30,
    color: "#3498db",
    description: "Stay warm",
  },
  {
    id: "hat-goggles",
    name: "Lab Goggles",
    type: "hat",
    cost: 0,
    unlockRequirement: { type: "level", value: 2 },
    color: "#95a5a6",
    description: "Complete Thesis Lab to unlock",
  },
  {
    id: "hat-visor",
    name: "Scanner Visor",
    type: "hat",
    cost: 0,
    unlockRequirement: { type: "level", value: 3 },
    color: "#e67e22",
    description: "Complete Shopee City to unlock",
  },
  {
    id: "hat-cape",
    name: "QA Cape",
    type: "hat",
    cost: 0,
    unlockRequirement: { type: "level", value: 4 },
    color: "#9b59b6",
    description: "Complete Asurion QA Towers to unlock",
  },
  {
    id: "hat-crown",
    name: "Leadership Crown",
    type: "hat",
    cost: 0,
    unlockRequirement: { type: "level", value: 5 },
    color: "#f1c40f",
    description: "Complete Leadership Castle to unlock",
  },
  {
    id: "hat-stethoscope",
    name: "Stethoscope Charm",
    type: "hat",
    cost: 0,
    unlockRequirement: { type: "level", value: 6 },
    color: "#1abc9c",
    description: "Complete NurseLink to unlock",
  },

  // TRAILS
  {
    id: "trail-none",
    name: "No Trail",
    type: "trail",
    cost: 0,
    description: "Clean movement",
  },
  {
    id: "trail-sparkle",
    name: "Sparkle Trail",
    type: "trail",
    cost: 40,
    color: "#f1c40f",
    description: "Leave sparkles behind",
  },
  {
    id: "trail-fire",
    name: "Fire Trail",
    type: "trail",
    cost: 60,
    color: "#e74c3c",
    description: "Blazing path",
  },
  {
    id: "trail-ice",
    name: "Ice Trail",
    type: "trail",
    cost: 60,
    color: "#3498db",
    description: "Frozen footsteps",
  },
  {
    id: "trail-code",
    name: "Code Trail",
    type: "trail",
    cost: 80,
    color: "#2ecc71",
    description: "Binary numbers follow you",
  },

  // EMOTES
  {
    id: "emote-wave",
    name: "Wave",
    type: "emote",
    cost: 20,
    description: "Friendly greeting",
  },
  {
    id: "emote-jump",
    name: "Victory Jump",
    type: "emote",
    cost: 25,
    description: "Celebrate success",
  },
  {
    id: "emote-think",
    name: "Thinking Pose",
    type: "emote",
    cost: 25,
    description: "Ponder deeply",
  },
  {
    id: "emote-dance",
    name: "Victory Dance",
    type: "emote",
    cost: 50,
    description: "Show off your moves",
  },
  {
    id: "emote-spin",
    name: "Power Spin",
    type: "emote",
    cost: 40,
    description: "360 degree spin",
  },
  {
    id: "emote-flex",
    name: "Flex",
    type: "emote",
    cost: 35,
    description: "Show your strength",
  },
];

export interface CosmeticLoadout {
  skin: string;
  hat: string;
  trail: string;
}

export const DEFAULT_LOADOUT: CosmeticLoadout = {
  skin: "skin-default",
  hat: "hat-none",
  trail: "trail-none",
};

export function getCosmeticById(id: string): Cosmetic | undefined {
  return COSMETICS.find((c) => c.id === id);
}

export function getCosmeticsByType(type: Cosmetic["type"]): Cosmetic[] {
  return COSMETICS.filter((c) => c.type === type);
}

export function isCosmeticUnlocked(
  cosmetic: Cosmetic,
  completedLevels: number[],
  bossComplete: boolean,
  totalCoins: number
): boolean {
  if (!cosmetic.unlockRequirement) return true;

  const { type, value } = cosmetic.unlockRequirement;

  switch (type) {
    case "level":
      return completedLevels.includes(value as number);
    case "boss":
      return bossComplete;
    case "coins":
      return totalCoins >= (value as number);
    default:
      return true;
  }
}

export function getCosmeticPrice(cosmetic: Cosmetic, owned: boolean): number {
  if (owned) return 0;
  if (cosmetic.unlockRequirement) {
    // Unlock requirement items are free once unlocked
    return 0;
  }
  return cosmetic.cost;
}
