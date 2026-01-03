import type { SaveData } from "../engine/types";

const SAVE_KEY = "resumeGameSave";

export function saveToDisk(data: SaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function loadFromDisk(): SaveData | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return null;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.error("Failed to clear save:", error);
  }
}

export function encodeStateToURL(data: SaveData): string {
  const params = new URLSearchParams();

  params.set("lvl", data.completedLevels.length.toString());
  params.set("xp", data.totalXP.toString());
  params.set("coins", data.totalCoins.toString());

  if (data.completedLevels.length > 0) {
    params.set("completed", data.completedLevels.join(","));
  }

  if (data.badges.length > 0) {
    params.set("badges", data.badges.join(","));
  }

  if (data.unlockedPowerUps.length > 0) {
    params.set("powers", data.unlockedPowerUps.join(","));
  }

  // Suit color encoding
  params.set("suitPrimary", data.suitColor.primary);
  params.set("suitSecondary", data.suitColor.secondary);
  params.set("suitAccent", data.suitColor.accent);

  if (data.seenIntro) {
    params.set("intro", "1");
  }

  if (data.bossComplete) {
    params.set("boss", "1");
  }

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function decodeStateFromURL(): SaveData | null {
  try {
    const params = new URLSearchParams(window.location.search);

    if (!params.has("lvl")) {
      return null;
    }

    const completedStr = params.get("completed");
    const completedLevels = completedStr
      ? completedStr.split(",").map(Number).filter((n) => !isNaN(n))
      : [];

    const badgesStr = params.get("badges");
    const badges = badgesStr ? badgesStr.split(",") : [];

    const powersStr = params.get("powers");
    const unlockedPowerUps = powersStr ? powersStr.split(",") : [];

    const totalXP = parseInt(params.get("xp") || "0", 10);
    const totalCoins = parseInt(params.get("coins") || "0", 10);

    // Decode suit color
    const suitColor = {
      primary: params.get("suitPrimary") || "#2C3E50",
      secondary: params.get("suitSecondary") || "#34495E",
      accent: params.get("suitAccent") || "#E74C3C",
    };

    return {
      completedLevels,
      unlockedPowerUps,
      badges,
      totalXP: isNaN(totalXP) ? 0 : totalXP,
      totalCoins: isNaN(totalCoins) ? 0 : totalCoins,
      lastPlayed: Date.now(),
      suitColor,
      seenIntro: params.get("intro") === "1",
      bossComplete: params.get("boss") === "1",
    };
  } catch (error) {
    console.error("Failed to decode URL state:", error);
    return null;
  }
}

export function createDefaultSave(): SaveData {
  return {
    completedLevels: [],
    unlockedPowerUps: [],
    badges: [],
    totalXP: 0,
    totalCoins: 0,
    lastPlayed: Date.now(),
    suitColor: {
      primary: "#2C3E50",   // Dark blue-gray suit
      secondary: "#34495E", // Slightly lighter
      accent: "#E74C3C",    // Red tie
    },
    seenIntro: false,
    bossComplete: false,
  };
}

export function copyShareLink(data: SaveData): void {
  const url = encodeStateToURL(data);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Share link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
        promptManualCopy(url);
      });
  } else {
    promptManualCopy(url);
  }
}

function promptManualCopy(url: string): void {
  const input = document.createElement("input");
  input.value = url;
  input.style.position = "fixed";
  input.style.top = "-1000px";
  document.body.appendChild(input);
  input.select();

  try {
    document.execCommand("copy");
    alert("Share link copied to clipboard!");
  } catch (error) {
    alert(`Copy this link:\n\n${url}`);
  }

  document.body.removeChild(input);
}
