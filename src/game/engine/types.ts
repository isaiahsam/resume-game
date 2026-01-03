// Core game engine types

export interface Vector2 {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Entity extends Rectangle {
  velocity: Vector2;
  grounded: boolean;
  active: boolean;
}

export type AnimationState = "idle" | "walk" | "jump" | "fall" | "land";

export interface Player extends Entity {
  health: number;
  maxHealth: number;
  lives: number;
  maxLives: number;
  coins: number;
  xp: number;
  badges: string[];
  powerUps: string[];
  facing: "left" | "right";
  jumpCount: number;
  maxJumps: number;
  animationState: AnimationState;
  animationFrame: number;
  invulnerable: boolean;
  invulnerableTimer: number;
  respawnPoint: { x: number; y: number };
  suitColor: { primary: string; secondary: string; accent: string };
}

export type NPCRole = "engineer" | "researcher" | "qa" | "leader" | "healthcare" | "guide";

export interface NPC {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  role: NPCRole;
  dialog: string[];
  dialogIndex: number;
  active: boolean;
  interactionRadius: number;
}

export interface Collectible {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  value: number;
  collected: boolean;
}

export interface Platform extends Rectangle {
  type: "ground" | "floating" | "moving";
  color: string;
}

export interface Checkpoint {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  activated: boolean;
  label?: string;
}

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  player: Player;
  score: number;
  time: number;
  paused: boolean;
  dialogActive: boolean;
  currentDialog?: {
    npc: string;
    text: string;
    index: number;
    total: number;
  };
}

export interface LevelConfig {
  id: number;
  name: string;
  width: number;
  height: number;
  platforms: Platform[];
  collectibles: Collectible[];
  npcs: NPC[];
  checkpoints: Checkpoint[];
  startX: number;
  startY: number;
  exitX: number;
  exitY: number;
  backgroundColor: string;
  theme: string;
}

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  interact: boolean;
  pause: boolean;
}

export interface SaveData {
  completedLevels: number[];
  unlockedPowerUps: string[];
  badges: string[];
  totalXP: number;
  totalCoins: number;
  lastPlayed: number;
  suitColor: {
    primary: string;
    secondary: string;
    accent: string;
  };
  seenIntro: boolean;
  bossComplete: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}
