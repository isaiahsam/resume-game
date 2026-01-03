import type { Collectible } from "../engine/types";

export function drawCollectible(
  ctx: CanvasRenderingContext2D,
  collectible: Collectible,
  cameraX: number,
  cameraY: number,
  time: number
): void {
  if (collectible.collected) return;

  const screenX = collectible.x - cameraX;
  const screenY = collectible.y - cameraY;

  // Floating animation
  const floatOffset = Math.sin(time / 200 + collectible.x) * 3;

  ctx.save();
  ctx.translate(screenX, screenY + floatOffset);

  // Draw different medieval items based on type
  switch (collectible.type) {
    case "coin":
      drawGoldCoin(ctx);
      break;
    case "credit":
      drawSilverCoin(ctx);
      break;
    case "component":
      drawMagicPotion(ctx, time);
      break;
    case "badge":
      drawShield(ctx);
      break;
    case "token":
      drawSword(ctx);
      break;
    case "crate":
      drawTreasureChest(ctx, time);
      break;
    default:
      // Default gem
      drawGem(ctx);
  }

  ctx.restore();
}

function drawGoldCoin(ctx: CanvasRenderingContext2D): void {
  // Gold coin with shine
  ctx.fillStyle = "#FFD700"; // Gold
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();

  // Coin rim
  ctx.strokeStyle = "#FFA500";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner circle detail
  ctx.strokeStyle = "#DAA520";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(16, 16, 10, 0, Math.PI * 2);
  ctx.stroke();

  // Crown symbol (medieval)
  ctx.fillStyle = "#8B7500";
  ctx.fillRect(12, 14, 8, 2);
  ctx.fillRect(14, 12, 1, 2);
  ctx.fillRect(16, 10, 1, 4);
  ctx.fillRect(18, 12, 1, 2);

  // Shine
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillRect(18, 8, 6, 3);
  ctx.fillRect(20, 11, 3, 2);
}

function drawSilverCoin(ctx: CanvasRenderingContext2D): void {
  // Silver coin
  ctx.fillStyle = "#C0C0C0";
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fill();

  // Coin rim
  ctx.strokeStyle = "#A8A8A8";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner circle
  ctx.strokeStyle = "#909090";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(16, 16, 10, 0, Math.PI * 2);
  ctx.stroke();

  // Star symbol
  ctx.fillStyle = "#707070";
  ctx.fillRect(15, 10, 2, 12);
  ctx.fillRect(10, 15, 12, 2);
  ctx.fillRect(12, 12, 8, 1);
  ctx.fillRect(12, 19, 8, 1);

  // Shine
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillRect(20, 8, 5, 2);
}

function drawMagicPotion(ctx: CanvasRenderingContext2D, time: number): void {
  // Glass bottle outline
  ctx.strokeStyle = "#87CEEB";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(13, 8);
  ctx.lineTo(13, 12);
  ctx.lineTo(10, 14);
  ctx.lineTo(10, 26);
  ctx.lineTo(22, 26);
  ctx.lineTo(22, 14);
  ctx.lineTo(19, 12);
  ctx.lineTo(19, 8);
  ctx.closePath();
  ctx.stroke();

  // Liquid (glowing purple/blue)
  const glowIntensity = Math.sin(time / 150) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(147, 112, 219, ${glowIntensity})`;
  ctx.fillRect(11, 16, 10, 9);

  // Liquid surface (wobble)
  ctx.fillStyle = `rgba(138, 43, 226, ${glowIntensity})`;
  ctx.fillRect(11, 15, 10, 2);

  // Cork/stopper
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(14, 6, 4, 6);
  ctx.fillStyle = "#654321";
  ctx.fillRect(14, 6, 4, 2);

  // Magical sparkles
  ctx.fillStyle = "#FFD700";
  const sparkleTime = time / 100;
  ctx.fillRect(12 + Math.sin(sparkleTime) * 2, 17, 1, 1);
  ctx.fillRect(18 + Math.cos(sparkleTime * 1.5) * 2, 20, 1, 1);
  ctx.fillRect(15 + Math.sin(sparkleTime * 2) * 2, 23, 1, 1);

  // Glass shine
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(18, 16, 2, 6);
}

function drawShield(ctx: CanvasRenderingContext2D): void {
  // Shield body (kite shield shape)
  ctx.fillStyle = "#8B0000"; // Dark red
  ctx.beginPath();
  ctx.moveTo(16, 2); // Top center
  ctx.lineTo(6, 8); // Top left
  ctx.lineTo(6, 20); // Bottom left
  ctx.lineTo(16, 30); // Bottom point
  ctx.lineTo(26, 20); // Bottom right
  ctx.lineTo(26, 8); // Top right
  ctx.closePath();
  ctx.fill();

  // Shield border
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Metal boss (center)
  ctx.fillStyle = "#C0C0C0";
  ctx.beginPath();
  ctx.arc(16, 16, 5, 0, Math.PI * 2);
  ctx.fill();

  // Boss shine
  ctx.fillStyle = "#E8E8E8";
  ctx.fillRect(15, 13, 4, 2);

  // Heraldic cross
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(15, 8, 2, 16);
  ctx.fillRect(10, 15, 12, 2);

  // Rivets
  ctx.fillStyle = "#A0A0A0";
  ctx.fillRect(10, 10, 2, 2);
  ctx.fillRect(20, 10, 2, 2);
  ctx.fillRect(10, 22, 2, 2);
  ctx.fillRect(20, 22, 2, 2);
}

function drawSword(ctx: CanvasRenderingContext2D): void {
  // Sword blade (pointing up)
  ctx.fillStyle = "#C0C0C0"; // Silver blade
  ctx.fillRect(14, 2, 4, 22);

  // Blade point
  ctx.fillStyle = "#C0C0C0";
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(14, 4);
  ctx.lineTo(18, 4);
  ctx.closePath();
  ctx.fill();

  // Blade shine
  ctx.fillStyle = "#E8E8E8";
  ctx.fillRect(15, 4, 1, 18);

  // Guard (crossguard)
  ctx.fillStyle = "#FFD700"; // Gold guard
  ctx.fillRect(8, 22, 16, 3);

  // Guard details
  ctx.fillStyle = "#DAA520";
  ctx.fillRect(8, 23, 16, 1);

  // Handle/Grip
  ctx.fillStyle = "#654321"; // Leather brown
  ctx.fillRect(13, 24, 6, 8);

  // Grip wrap detail
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(13, 25, 6, 1);
  ctx.fillRect(13, 27, 6, 1);
  ctx.fillRect(13, 29, 6, 1);

  // Pommel (bottom)
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(12, 30, 8, 2);
  ctx.fillRect(13, 28, 6, 2);
}

function drawTreasureChest(ctx: CanvasRenderingContext2D, time: number): void {
  // Chest body
  ctx.fillStyle = "#8B4513"; // Brown wood
  ctx.fillRect(4, 14, 24, 14);

  // Chest lid
  ctx.fillStyle = "#654321"; // Darker brown
  ctx.fillRect(4, 8, 24, 8);

  // Lid curve/arch
  ctx.fillRect(6, 6, 20, 2);
  ctx.fillRect(8, 4, 16, 2);

  // Wood planks (horizontal lines)
  ctx.strokeStyle = "#654321";
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(4, 17 + i * 4);
    ctx.lineTo(28, 17 + i * 4);
    ctx.stroke();
  }

  // Metal straps
  ctx.fillStyle = "#4A4A4A";
  ctx.fillRect(14, 6, 4, 22); // Center vertical strap
  ctx.fillRect(4, 18, 24, 2); // Horizontal strap

  // Lock
  ctx.fillStyle = "#FFD700"; // Gold lock
  ctx.fillRect(13, 19, 6, 5);
  ctx.fillStyle = "#DAA520";
  ctx.fillRect(14, 20, 4, 3);

  // Keyhole
  ctx.fillStyle = "#000";
  ctx.fillRect(15, 21, 2, 2);

  // Magical glow from inside
  const glowAlpha = (Math.sin(time / 200) * 0.3 + 0.5);
  ctx.fillStyle = `rgba(255, 215, 0, ${glowAlpha})`;
  ctx.fillRect(6, 10, 20, 4);

  // Corner metal caps
  ctx.fillStyle = "#707070";
  ctx.fillRect(4, 14, 2, 2);
  ctx.fillRect(26, 14, 2, 2);
  ctx.fillRect(4, 26, 2, 2);
  ctx.fillRect(26, 26, 2, 2);
}

function drawGem(ctx: CanvasRenderingContext2D): void {
  // Diamond/gem shape
  ctx.fillStyle = "#00CED1"; // Turquoise gem
  ctx.beginPath();
  ctx.moveTo(16, 4); // Top
  ctx.lineTo(8, 14); // Left
  ctx.lineTo(16, 28); // Bottom
  ctx.lineTo(24, 14); // Right
  ctx.closePath();
  ctx.fill();

  // Gem facets
  ctx.fillStyle = "#48D1CC";
  ctx.beginPath();
  ctx.moveTo(16, 4);
  ctx.lineTo(12, 14);
  ctx.lineTo(16, 16);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(16, 4);
  ctx.lineTo(20, 14);
  ctx.lineTo(16, 16);
  ctx.closePath();
  ctx.fill();

  // Gem shine
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.fillRect(14, 8, 4, 4);
}

export function checkCollectiblePickup(
  playerX: number,
  playerY: number,
  playerWidth: number,
  playerHeight: number,
  collectible: Collectible
): boolean {
  if (collectible.collected) return false;

  return (
    playerX < collectible.x + collectible.width &&
    playerX + playerWidth > collectible.x &&
    playerY < collectible.y + collectible.height &&
    playerY + playerHeight > collectible.y
  );
}
