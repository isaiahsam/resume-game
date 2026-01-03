import type { Player as PlayerType } from "../engine/types";
import { PLAYER_SPEED, JUMP_FORCE, DOUBLE_JUMP_FORCE } from "../engine/physics";

export function createPlayer(x: number, y: number, suitColor?: { primary: string; secondary: string; accent: string }): PlayerType {
  return {
    x,
    y,
    width: 40,
    height: 80,
    velocity: { x: 0, y: 0 },
    grounded: false,
    active: true,
    health: 3,
    maxHealth: 3,
    lives: 3,
    maxLives: 3,
    coins: 0,
    xp: 0,
    badges: [],
    powerUps: [],
    facing: "right",
    jumpCount: 0,
    maxJumps: 1,
    animationState: "idle",
    animationFrame: 0,
    invulnerable: false,
    invulnerableTimer: 0,
    respawnPoint: { x, y },
    suitColor: suitColor || {
      primary: "#8B4513",   // Medieval brown armor
      secondary: "#A0522D", // Leather accents
      accent: "#FFD700",    // Gold trim
    },
  };
}

export function updatePlayerAnimation(player: PlayerType, deltaTime: number = 16): void {
  // Update animation frame
  player.animationFrame += deltaTime / 100;

  // Determine animation state
  if (!player.grounded) {
    if (player.velocity.y < 0) {
      player.animationState = "jump";
    } else if (player.velocity.y > 2) {
      player.animationState = "fall";
    }
  } else {
    if (Math.abs(player.velocity.x) > 0.5) {
      player.animationState = "walk";
    } else {
      player.animationState = "idle";
    }
  }
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  player: PlayerType,
  cameraX: number,
  cameraY: number
): void {
  const screenX = player.x - cameraX;
  const screenY = player.y - cameraY;

  ctx.save();

  // Flip horizontally if facing left
  if (player.facing === "left") {
    ctx.translate(screenX + player.width, screenY);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(screenX, screenY);
  }

  // Calculate squash/stretch
  let scaleX = 1;
  let scaleY = 1;
  let offsetY = 0;

  if (player.animationState === "jump") {
    scaleY = 1.1;
    scaleX = 0.9;
  } else if (player.animationState === "fall") {
    scaleY = 1.05;
    scaleX = 0.95;
  } else if (player.animationState === "land") {
    scaleY = 0.8;
    scaleX = 1.2;
    offsetY = 8;
  }

  // Apply squash/stretch
  ctx.save();
  ctx.translate(player.width / 2, player.height);
  ctx.scale(scaleX, scaleY);
  ctx.translate(-player.width / 2, -player.height);

  // MEDIEVAL KNIGHT PROPORTIONS - Detailed pixel art
  const headSize = 16;
  const torsoHeight = 32;
  const legHeight = 28;
  const armLength = 24;

  // === HEAD & HELMET ===
  const headY = 0 + offsetY;

  // Helmet (shiny metal)
  ctx.fillStyle = "#C0C0C0"; // Silver helmet
  ctx.fillRect(11, headY, 18, 18);

  // Helmet shine
  ctx.fillStyle = "#E8E8E8";
  ctx.fillRect(13, headY + 2, 6, 3);

  // Face opening (visor slit)
  ctx.fillStyle = "#2C1810";
  ctx.fillRect(13, headY + 8, 14, 6);

  // Eyes through visor
  ctx.fillStyle = "#4A90E2";
  ctx.fillRect(15, headY + 10, 3, 2);
  ctx.fillRect(22, headY + 10, 3, 2);

  // Helmet crest/plume
  ctx.fillStyle = player.suitColor.accent; // Gold crest
  ctx.fillRect(18, headY - 4, 4, 6);
  ctx.fillRect(17, headY - 2, 6, 3);

  // === TORSO (ARMOR) ===
  const torsoY = headY + headSize;

  // Chainmail base
  ctx.fillStyle = "#808080";
  ctx.fillRect(8, torsoY, 24, torsoHeight);

  // Chainmail pattern
  ctx.fillStyle = "#606060";
  for (let r = 0; r < torsoHeight; r += 4) {
    for (let c = 0; c < 24; c += 4) {
      if ((r + c) % 8 === 0) {
        ctx.fillRect(8 + c, torsoY + r, 2, 2);
      }
    }
  }

  // Breastplate (center armor)
  ctx.fillStyle = player.suitColor.primary; // Brown/bronze armor
  ctx.fillRect(12, torsoY + 2, 16, 24);

  // Armor plates detail
  ctx.fillStyle = player.suitColor.secondary;
  ctx.fillRect(12, torsoY + 2, 16, 4);
  ctx.fillRect(12, torsoY + 12, 16, 4);
  ctx.fillRect(12, torsoY + 22, 16, 4);

  // Belt with buckle
  ctx.fillStyle = "#654321";
  ctx.fillRect(10, torsoY + 26, 20, 6);
  ctx.fillStyle = player.suitColor.accent; // Gold buckle
  ctx.fillRect(17, torsoY + 27, 6, 4);

  // Shoulder pauldrons
  ctx.fillStyle = "#A0522D";
  ctx.fillRect(6, torsoY, 8, 10);
  ctx.fillRect(26, torsoY, 8, 10);
  ctx.fillStyle = player.suitColor.accent;
  ctx.fillRect(7, torsoY + 2, 2, 2);
  ctx.fillRect(29, torsoY + 2, 2, 2);

  // === ARMS ===
  const armY = torsoY + 6;
  const armSwing = player.animationState === "walk"
    ? Math.sin(player.animationFrame * 8) * 4
    : 0;

  // Left arm (SWORD ARM)
  ctx.fillStyle = "#808080"; // Chainmail sleeves
  ctx.fillRect(3, armY + armSwing, 7, armLength);
  // Gauntlet
  ctx.fillStyle = "#654321"; // Leather gauntlet
  ctx.fillRect(3, armY + armLength + armSwing - 6, 7, 12);
  ctx.fillStyle = player.suitColor.accent;
  ctx.fillRect(4, armY + armLength + armSwing - 4, 2, 2);

  // SWORD (in left hand when walking/idle)
  if (player.animationState !== "jump") {
    // Sword blade
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(5, armY + armLength + armSwing + 6, 3, 16);
    ctx.fillStyle = "#E8E8E8";
    ctx.fillRect(6, armY + armLength + armSwing + 6, 1, 16);
    // Sword hilt
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(3, armY + armLength + armSwing + 4, 7, 3);
    // Sword guard
    ctx.fillStyle = player.suitColor.accent;
    ctx.fillRect(1, armY + armLength + armSwing + 3, 11, 2);
    // Sword pommel
    ctx.fillRect(5, armY + armLength + armSwing + 22, 3, 3);
  }

  // Right arm (SHIELD ARM)
  ctx.fillStyle = "#808080"; // Chainmail sleeves
  ctx.fillRect(30, armY - armSwing, 7, armLength);
  // Gauntlet
  ctx.fillStyle = "#654321";
  ctx.fillRect(30, armY + armLength - armSwing - 6, 7, 12);
  ctx.fillStyle = player.suitColor.accent;
  ctx.fillRect(32, armY + armLength - armSwing - 4, 2, 2);

  // SHIELD (on right arm)
  // Shield body
  ctx.fillStyle = "#8B0000"; // Dark red shield
  ctx.fillRect(34, armY - armSwing + 4, 10, 14);
  // Shield border
  ctx.strokeStyle = player.suitColor.accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(34, armY - armSwing + 4, 10, 14);
  // Shield emblem (cross)
  ctx.fillStyle = player.suitColor.accent;
  ctx.fillRect(37, armY - armSwing + 7, 4, 8);
  ctx.fillRect(35, armY - armSwing + 9, 8, 4);

  // === LEGS ===
  const legsY = torsoY + torsoHeight;
  const legWalk = player.animationState === "walk"
    ? Math.sin(player.animationFrame * 8) * 6
    : 0;

  // Leg armor / Chainmail leggings
  ctx.fillStyle = "#707070";

  // Left leg
  ctx.fillRect(12, legsY, 8, legHeight + legWalk);
  // Left knee guard
  ctx.fillStyle = player.suitColor.secondary;
  ctx.fillRect(12, legsY + 14, 8, 6);

  // Right leg
  ctx.fillStyle = "#707070";
  ctx.fillRect(20, legsY, 8, legHeight - legWalk);
  // Right knee guard
  ctx.fillStyle = player.suitColor.secondary;
  ctx.fillRect(20, legsY + 14, 8, 6);

  // Metal boots
  ctx.fillStyle = "#4A4A4A"; // Dark metal boots
  ctx.fillRect(12, legsY + legHeight + legWalk, 8, 5);
  ctx.fillRect(20, legsY + legHeight - legWalk, 8, 5);
  // Boot shine
  ctx.fillStyle = "#6A6A6A";
  ctx.fillRect(13, legsY + legHeight + legWalk + 1, 3, 2);
  ctx.fillRect(21, legsY + legHeight - legWalk + 1, 3, 2);

  ctx.restore();
  ctx.restore();
}

export function movePlayer(player: PlayerType, left: boolean, right: boolean): void {
  if (left) {
    player.velocity.x = -PLAYER_SPEED;
    player.facing = "left";
  } else if (right) {
    player.velocity.x = PLAYER_SPEED;
    player.facing = "right";
  }
}

export function jumpPlayer(player: PlayerType): boolean {
  const hasDoubleJump = player.powerUps.includes("TypeScript");
  const maxJumps = hasDoubleJump ? 2 : 1;

  if (player.grounded) {
    player.velocity.y = JUMP_FORCE;
    player.jumpCount = 1;
    player.animationState = "jump";
    return true;
  } else if (player.jumpCount < maxJumps) {
    player.velocity.y = DOUBLE_JUMP_FORCE;
    player.jumpCount++;
    player.animationState = "jump";
    return true;
  }

  return false;
}

export function resetJumpCount(player: PlayerType): void {
  if (player.grounded) {
    player.jumpCount = 0;
    // Landing animation
    if (player.animationState === "fall") {
      player.animationState = "land";
      setTimeout(() => {
        if (player.grounded) {
          player.animationState = "idle";
        }
      }, 100);
    }
  }
}

export function killPlayer(player: PlayerType): boolean {
  if (player.invulnerable) return false;

  player.lives--;

  if (player.lives <= 0) {
    return true; // Game over
  }

  // Respawn
  player.x = player.respawnPoint.x;
  player.y = player.respawnPoint.y;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.invulnerable = true;
  player.invulnerableTimer = 2000; // 2 seconds of invulnerability

  return false; // Not game over
}

export function updateRespawnPoint(player: PlayerType, x: number, y: number): void {
  player.respawnPoint = { x, y };
}
