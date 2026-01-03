import type { NPC } from "../engine/types";

export function drawNPC(
  ctx: CanvasRenderingContext2D,
  npc: NPC,
  cameraX: number,
  cameraY: number
): void {
  if (!npc.active) return;

  const screenX = npc.x - cameraX;
  // Draw NPC so their feet are at npc.y (subtract height to draw upward from feet position)
  const screenY = npc.y - cameraY - npc.height;

  ctx.save();
  ctx.translate(screenX, screenY);

  // Determine medieval character type based on role
  const medievalType = getMedievalType(npc.role);

  if (medievalType === "knight") {
    drawKnight(ctx, npc.role);
  } else if (medievalType === "wizard") {
    drawWizard(ctx, npc.role);
  } else if (medievalType === "centaur") {
    drawCentaur(ctx, npc.role);
  }

  ctx.restore();

  // Name tag above NPC (accounting for the height offset)
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "center";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  const nameY = npc.y - cameraY - npc.height - 10;
  ctx.strokeText(npc.name, screenX + npc.width / 2, nameY);
  ctx.fillStyle = "#FFD700"; // Gold text for medieval theme
  ctx.fillText(npc.name, screenX + npc.width / 2, nameY);
  ctx.textAlign = "left";
}

function getMedievalType(role: string): "knight" | "wizard" | "centaur" {
  // Knights: Engineers, QA, Leaders
  if (role === "engineer" || role === "qa" || role === "leader") {
    return "knight";
  }
  // Wizards: Researchers
  if (role === "researcher") {
    return "wizard";
  }
  // Centaurs: Guides, Healthcare
  return "centaur";
}

function drawKnight(ctx: CanvasRenderingContext2D, role: string): void {
  const colors = getRoleColors(role);

  // HEAD & HELMET
  // Helmet base
  ctx.fillStyle = "#C0C0C0"; // Silver helmet
  ctx.fillRect(10, 0, 18, 18);

  // Helmet detail/shine
  ctx.fillStyle = "#E8E8E8";
  ctx.fillRect(12, 2, 6, 3);

  // Visor
  ctx.fillStyle = "#1A1A1A";
  ctx.fillRect(12, 8, 14, 7);

  // Eyes through visor
  ctx.fillStyle = colors.accent;
  ctx.fillRect(14, 10, 3, 2);
  ctx.fillRect(21, 10, 3, 2);

  // Helmet plume/crest
  ctx.fillStyle = colors.primary;
  ctx.fillRect(17, -4, 4, 8);
  ctx.fillRect(16, -2, 6, 4);

  // TORSO (ARMOR)
  const torsoY = 18;

  // Chainmail
  ctx.fillStyle = "#909090";
  ctx.fillRect(6, torsoY, 24, 28);

  // Chainmail texture
  ctx.fillStyle = "#707070";
  for (let r = 0; r < 28; r += 3) {
    for (let c = 0; c < 24; c += 3) {
      if ((r + c) % 6 === 0) {
        ctx.fillRect(6 + c, torsoY + r, 1, 1);
      }
    }
  }

  // Breastplate
  ctx.fillStyle = colors.primary;
  ctx.fillRect(10, torsoY + 2, 18, 22);

  // Armor trim
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(10, torsoY + 2, 18, 2);
  ctx.fillRect(10, torsoY + 22, 18, 2);

  // Tabard/Surcoat with emblem
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(12, torsoY + 6, 14, 18);

  // Emblem/Symbol
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(17, torsoY + 10, 4, 8);
  ctx.fillRect(15, torsoY + 12, 8, 4);

  // Belt
  ctx.fillStyle = "#654321";
  ctx.fillRect(8, torsoY + 24, 20, 4);
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(16, torsoY + 25, 6, 2);

  // ARMS
  const armY = torsoY + 6;

  // Left arm - armored
  ctx.fillStyle = "#808080";
  ctx.fillRect(2, armY, 6, 20);
  ctx.fillStyle = colors.primary;
  ctx.fillRect(2, armY + 8, 6, 6); // Elbow guard

  // Left gauntlet
  ctx.fillStyle = "#606060";
  ctx.fillRect(2, armY + 16, 6, 8);

  // Right arm - armored
  ctx.fillStyle = "#808080";
  ctx.fillRect(30, armY, 6, 20);
  ctx.fillStyle = colors.primary;
  ctx.fillRect(30, armY + 8, 6, 6); // Elbow guard

  // Right gauntlet
  ctx.fillStyle = "#606060";
  ctx.fillRect(30, armY + 16, 6, 8);

  // SWORD (left side)
  ctx.fillStyle = "#C0C0C0"; // Blade
  ctx.fillRect(1, armY + 24, 3, 18);
  ctx.fillStyle = "#E8E8E8"; // Blade highlight
  ctx.fillRect(2, armY + 24, 1, 18);
  ctx.fillStyle = "#654321"; // Handle
  ctx.fillRect(0, armY + 22, 5, 3);
  ctx.fillStyle = "#FFD700"; // Guard
  ctx.fillRect(-2, armY + 21, 9, 2);

  // SHIELD (right side)
  ctx.fillStyle = "#8B0000"; // Shield body
  ctx.fillRect(33, armY + 4, 12, 16);
  ctx.strokeStyle = "#FFD700"; // Shield border
  ctx.lineWidth = 2;
  ctx.strokeRect(33, armY + 4, 12, 16);
  ctx.fillStyle = "#FFD700"; // Shield emblem
  ctx.fillRect(37, armY + 8, 4, 8);
  ctx.fillRect(35, armY + 10, 8, 4);

  // LEGS
  const legsY = torsoY + 28;

  // Chainmail legs
  ctx.fillStyle = "#808080";
  ctx.fillRect(12, legsY, 7, 18);
  ctx.fillRect(19, legsY, 7, 18);

  // Knee guards
  ctx.fillStyle = colors.primary;
  ctx.fillRect(12, legsY + 8, 7, 5);
  ctx.fillRect(19, legsY + 8, 7, 5);

  // Metal boots
  ctx.fillStyle = "#4A4A4A";
  ctx.fillRect(12, legsY + 16, 7, 6);
  ctx.fillRect(19, legsY + 16, 7, 6);
  ctx.fillStyle = "#6A6A6A"; // Boot highlight
  ctx.fillRect(13, legsY + 17, 3, 2);
  ctx.fillRect(20, legsY + 17, 3, 2);
}

function drawWizard(ctx: CanvasRenderingContext2D, role: string): void {
  const colors = getRoleColors(role);

  // WIZARD HAT
  ctx.fillStyle = colors.primary; // Purple/blue hat
  ctx.beginPath();
  ctx.moveTo(18, 0); // Top point
  ctx.lineTo(12, 14); // Left base
  ctx.lineTo(24, 14); // Right base
  ctx.closePath();
  ctx.fill();

  // Hat brim
  ctx.fillRect(8, 14, 22, 4);

  // Stars on hat
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(17, 6, 2, 2);
  ctx.fillRect(16, 7, 4, 1);
  ctx.fillRect(17, 4, 2, 4);

  ctx.fillRect(21, 10, 2, 2);
  ctx.fillRect(14, 9, 2, 2);

  // HEAD/FACE
  const headY = 18;
  ctx.fillStyle = "#FFE4C4"; // Pale skin
  ctx.fillRect(10, headY, 18, 16);

  // Long beard
  ctx.fillStyle = "#D3D3D3"; // Gray/white beard
  ctx.fillRect(10, headY + 10, 18, 12);
  ctx.fillRect(8, headY + 12, 22, 8);
  // Beard detail
  ctx.fillStyle = "#F0F0F0";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(10 + i * 3, headY + 14, 2, 6);
  }

  // Eyes (wise and old)
  ctx.fillStyle = "#4A90E2"; // Blue eyes
  ctx.fillRect(13, headY + 4, 3, 3);
  ctx.fillRect(22, headY + 4, 3, 3);
  ctx.fillStyle = "#FFF"; // Eye shine
  ctx.fillRect(14, headY + 5, 1, 1);
  ctx.fillRect(23, headY + 5, 1, 1);

  // Bushy eyebrows
  ctx.fillStyle = "#D3D3D3";
  ctx.fillRect(12, headY + 2, 5, 2);
  ctx.fillRect(21, headY + 2, 5, 2);

  // ROBES
  const robeY = headY + 16;

  // Main robe body
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(4, robeY, 30, 32);

  // Robe details/trim
  ctx.fillStyle = colors.primary;
  ctx.fillRect(4, robeY, 30, 3);
  ctx.fillRect(16, robeY + 3, 6, 28);

  // Mystical symbols on robe
  ctx.fillStyle = "#FFD700";
  // Circle
  ctx.beginPath();
  ctx.arc(19, robeY + 12, 3, 0, Math.PI * 2);
  ctx.fill();
  // Runes
  ctx.fillRect(18, robeY + 18, 1, 4);
  ctx.fillRect(20, robeY + 18, 1, 4);
  ctx.fillRect(17, robeY + 20, 5, 1);

  // Belt with pouches
  ctx.fillStyle = "#654321";
  ctx.fillRect(6, robeY + 16, 26, 4);
  // Pouch
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(10, robeY + 18, 6, 8);
  ctx.fillRect(22, robeY + 18, 6, 8);

  // ARMS/SLEEVES
  const armY = robeY + 4;

  // Left arm (holding staff)
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(0, armY, 6, 24);
  // Hand
  ctx.fillStyle = "#FFE4C4";
  ctx.fillRect(0, armY + 20, 6, 6);

  // Right arm
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(32, armY, 6, 24);
  // Hand casting spell
  ctx.fillStyle = "#FFE4C4";
  ctx.fillRect(32, armY + 20, 6, 6);

  // MAGICAL STAFF (left hand)
  ctx.fillStyle = "#8B4513"; // Wood staff
  ctx.fillRect(-2, armY - 10, 4, 50);
  // Staff ornament (crystal)
  ctx.fillStyle = "#9B30FF"; // Purple crystal
  ctx.fillRect(-4, armY - 14, 8, 8);
  // Crystal glow
  ctx.fillStyle = "rgba(155, 48, 255, 0.5)";
  ctx.fillRect(-6, armY - 16, 12, 12);
  // Crystal highlight
  ctx.fillStyle = "#E0B0FF";
  ctx.fillRect(-2, armY - 12, 4, 4);

  // MAGIC PARTICLES (right hand)
  ctx.fillStyle = "#FFD700";
  const particleTime = Date.now() / 100;
  for (let i = 0; i < 5; i++) {
    const angle = (particleTime + i * 1.2) % (Math.PI * 2);
    const radius = 12 + Math.sin(particleTime + i) * 4;
    const px = 35 + Math.cos(angle) * radius;
    const py = armY + 23 + Math.sin(angle) * radius;
    ctx.fillRect(px, py, 2, 2);
  }

  // ROBE BOTTOM (no visible legs for wizard)
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(8, robeY + 28, 22, 8);
}

function drawCentaur(ctx: CanvasRenderingContext2D, role: string): void {
  const colors = getRoleColors(role);

  // HUMAN UPPER BODY
  // Head
  const headY = 0;
  ctx.fillStyle = "#D2B48C"; // Tan skin
  ctx.fillRect(10, headY, 18, 16);

  // Hair
  ctx.fillStyle = colors.hair;
  ctx.fillRect(10, headY, 18, 6);
  ctx.fillRect(8, headY + 2, 2, 8);
  ctx.fillRect(28, headY + 2, 2, 8);

  // Face
  ctx.fillStyle = "#654321";
  ctx.fillRect(14, headY + 8, 3, 2); // Left eye
  ctx.fillRect(21, headY + 8, 3, 2); // Right eye
  // Nose
  ctx.fillRect(17, headY + 11, 4, 3);
  // Mouth
  ctx.fillRect(15, headY + 14, 8, 1);

  // Torso
  const torsoY = headY + 16;
  ctx.fillStyle = colors.primary;
  ctx.fillRect(8, torsoY, 22, 20);

  // Armor vest
  ctx.fillStyle = "#654321";
  ctx.fillRect(10, torsoY, 18, 18);
  // Armor details
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(10, torsoY + 2, 18, 2);
  ctx.fillRect(17, torsoY + 6, 4, 10);

  // Arms
  const armY = torsoY + 4;

  // Left arm
  ctx.fillStyle = "#D2B48C";
  ctx.fillRect(2, armY, 8, 16);
  // Wrist guard
  ctx.fillStyle = "#654321";
  ctx.fillRect(2, armY + 12, 8, 4);

  // Right arm
  ctx.fillStyle = "#D2B48C";
  ctx.fillRect(28, armY, 8, 16);
  // Wrist guard
  ctx.fillStyle = "#654321";
  ctx.fillRect(28, armY + 12, 8, 4);

  // BOW (in left hand)
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, armY + 2);
  ctx.quadraticCurveTo(-6, armY + 12, 0, armY + 22);
  ctx.stroke();
  // Bowstring
  ctx.strokeStyle = "#C0C0C0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, armY + 2);
  ctx.lineTo(0, armY + 22);
  ctx.stroke();

  // QUIVER (on back)
  ctx.fillStyle = "#654321";
  ctx.fillRect(26, torsoY + 2, 8, 16);
  // Arrows in quiver
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(28, torsoY, 1, 8);
  ctx.fillRect(30, torsoY - 2, 1, 8);
  ctx.fillRect(32, torsoY + 1, 1, 8);
  // Arrow feathers
  ctx.fillStyle = colors.accent;
  ctx.fillRect(28, torsoY - 2, 2, 3);
  ctx.fillRect(30, torsoY - 4, 2, 3);
  ctx.fillRect(32, torsoY - 1, 2, 3);

  // HORSE BODY (lower half)
  const horseY = torsoY + 20;

  // Horse torso
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(4, horseY, 30, 16);

  // Horse texture/muscle definition
  ctx.fillStyle = colors.primary;
  ctx.fillRect(6, horseY + 2, 26, 4);
  ctx.fillRect(6, horseY + 10, 26, 4);

  // Saddle area
  ctx.fillStyle = "#654321";
  ctx.fillRect(10, horseY - 2, 18, 6);
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(12, horseY - 1, 2, 4);
  ctx.fillRect(24, horseY - 1, 2, 4);

  // HORSE LEGS (4 legs)
  const legY = horseY + 16;

  // Front left leg
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(8, legY, 6, 16);
  // Hoof
  ctx.fillStyle = "#2F2F2F";
  ctx.fillRect(8, legY + 14, 6, 4);

  // Front right leg
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(16, legY, 6, 16);
  // Hoof
  ctx.fillStyle = "#2F2F2F";
  ctx.fillRect(16, legY + 14, 6, 4);

  // Back left leg
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(20, legY, 6, 16);
  // Hoof
  ctx.fillStyle = "#2F2F2F";
  ctx.fillRect(20, legY + 14, 6, 4);

  // Back right leg
  ctx.fillStyle = colors.secondary;
  ctx.fillRect(26, legY, 6, 16);
  // Hoof
  ctx.fillStyle = "#2F2F2F";
  ctx.fillRect(26, legY + 14, 6, 4);

  // TAIL
  ctx.fillStyle = colors.hair;
  ctx.fillRect(32, horseY + 6, 8, 3);
  ctx.fillRect(38, horseY + 8, 6, 12);
  // Tail detail
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(38 + i, horseY + 12 + i * 2, 2, 6);
  }
}

function getRoleColors(role: string) {
  switch (role) {
    case "engineer":
      return {
        primary: "#4169E1", // Royal blue armor
        secondary: "#1E90FF", // Lighter blue
        hair: "#8B4513",
        accent: "#4A90E2",
      };
    case "researcher":
      return {
        primary: "#9370DB", // Purple robes
        secondary: "#8B008B", // Dark magenta
        hair: "#D3D3D3", // Gray wizard beard
        accent: "#9B30FF",
      };
    case "qa":
      return {
        primary: "#708090", // Slate gray armor
        secondary: "#2F4F4F", // Dark slate
        hair: "#696969",
        accent: "#87CEEB",
      };
    case "leader":
      return {
        primary: "#DC143C", // Crimson armor
        secondary: "#8B0000", // Dark red
        hair: "#2C1810",
        accent: "#FFD700",
      };
    case "healthcare":
      return {
        primary: "#20B2AA", // Light sea green
        secondary: "#48D1CC", // Medium turquoise
        hair: "#8B7355",
        accent: "#00CED1",
      };
    case "guide":
      return {
        primary: "#D2691E", // Chocolate brown
        secondary: "#8B4513", // Saddle brown
        hair: "#654321",
        accent: "#DAA520",
      };
    default:
      return {
        primary: "#228B22", // Forest green
        secondary: "#006400",
        hair: "#556B2F",
        accent: "#32CD32",
      };
  }
}

export function canInteractWithNPC(
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  npc: NPC
): boolean {
  if (!npc.active) return false;

  const distance = Math.sqrt(
    Math.pow(playerX + playerWidth / 2 - (npc.x + npc.width / 2), 2) +
      Math.pow(playerY + playerHeight / 2 - (npc.y + npc.height / 2), 2)
  );

  return distance < (npc.interactionRadius || 60);
}

export function getNextDialog(npc: NPC): string | null {
  if (npc.dialogIndex >= npc.dialog.length) {
    return null;
  }
  const text = npc.dialog[npc.dialogIndex];
  npc.dialogIndex++;
  return text;
}

export function resetDialog(npc: NPC): void {
  npc.dialogIndex = 0;
}
