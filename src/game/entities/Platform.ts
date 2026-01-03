import type { Platform } from "../engine/types";

export function drawPlatform(
  ctx: CanvasRenderingContext2D,
  platform: Platform,
  cameraX: number,
  cameraY: number
): void {
  const screenX = platform.x - cameraX;
  const screenY = platform.y - cameraY;

  // Main platform
  ctx.fillStyle = platform.color;
  ctx.fillRect(screenX, screenY, platform.width, platform.height);

  // Platform edge/highlight
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(screenX, screenY, platform.width, 2);

  // Platform pattern (simple grid for texture)
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
  ctx.lineWidth = 1;
  const gridSize = 16;

  for (let x = 0; x < platform.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(screenX + x, screenY);
    ctx.lineTo(screenX + x, screenY + platform.height);
    ctx.stroke();
  }

  for (let y = 0; y < platform.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(screenX, screenY + y);
    ctx.lineTo(screenX + platform.width, screenY + y);
    ctx.stroke();
  }
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number,
  theme: string
): void {
  switch (theme) {
    case "university":
      drawUniversityBackground(ctx, width, height, cameraX, cameraY);
      break;
    case "research":
      drawResearchBackground(ctx, width, height, cameraX, cameraY);
      break;
    case "fraud-detection":
      drawFraudDetectionBackground(ctx, width, height, cameraX, cameraY);
      break;
    case "testing":
      drawTestingTowersBackground(ctx, width, height, cameraX, cameraY);
      break;
    case "leadership":
      drawLeadershipBackground(ctx, width, height, cameraX, cameraY);
      break;
    case "fullstack":
      drawFullstackDocksBackground(ctx, width, height, cameraX, cameraY);
      break;
    default:
      // Default sky
      ctx.fillStyle = "#87CEEB";
      ctx.fillRect(0, 0, width, height);
  }
}

function drawUniversityBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number
): void {
  // Sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#87CEEB");
  gradient.addColorStop(1, "#B0D4F1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Clouds - extend to cover full map
  const cloudOffset = (cameraX * 0.05) % 200;
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  const cloudStartIndex = Math.floor((cameraX * 0.05) / 200) - 1;
  const cloudEndIndex = cloudStartIndex + Math.ceil(width / 200) + 3;
  for (let i = cloudStartIndex; i < cloudEndIndex; i++) {
    const x = i * 200 - cloudOffset;
    const y = 50 + (Math.abs(i) % 3) * 40;
    if (x > -100 && x < width + 100) {
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.arc(x + 25, y, 35, 0, Math.PI * 2);
      ctx.arc(x + 50, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Distant campus buildings - extend to cover full map
  ctx.fillStyle = "#D4A574";
  const buildingSpacing = 150;
  const numBuildings = Math.ceil(width / buildingSpacing) + 4;
  for (let i = 0; i < numBuildings; i++) {
    const worldX = (i * buildingSpacing) + (cameraX % buildingSpacing) - buildingSpacing * 2;
    const screenX = worldX - (cameraX * 0.15);
    const buildingHeight = 120 + (i % 4) * 30;
    if (screenX > -150 && screenX < width + 150) {
      ctx.fillRect(screenX, height - buildingHeight, 100, buildingHeight);

      // Windows (simplified)
      ctx.fillStyle = "rgba(100, 100, 150, 0.4)";
      const rows = Math.floor(buildingHeight / 20);
      for (let row = 0; row < rows; row += 2) {
        for (let col = 0; col < 4; col++) {
          ctx.fillRect(screenX + 15 + col * 20, height - buildingHeight + 10 + row * 20, 12, 12);
        }
      }
      ctx.fillStyle = "#D4A574";
    }
  }

  // Trees - extend to cover full map, anchored to bottom
  ctx.fillStyle = "#8B4513";
  const treeSpacing = 100;
  const numTrees = Math.ceil(width / treeSpacing) + 4;
  for (let i = 0; i < numTrees; i++) {
    const worldX = (i * treeSpacing) + (cameraX % treeSpacing) - treeSpacing * 2;
    const screenX = worldX - (cameraX * 0.3);
    if (screenX > -100 && screenX < width + 100) {
      const treeY = height - 60;

      // Trunk
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(screenX + 35, treeY, 10, 40);

      // Leaves
      ctx.fillStyle = "#228B22";
      ctx.beginPath();
      ctx.arc(screenX + 40, treeY - 10, 25, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawResearchBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number
): void {
  // Dark lab background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#1a1a2e");
  gradient.addColorStop(1, "#2C3E50");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Grid overlay for tech feel
  ctx.strokeStyle = "rgba(52, 152, 219, 0.1)";
  ctx.lineWidth = 1;
  const gridSize = 50;
  for (let x = -(cameraX % gridSize); x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = -(cameraY % gridSize); y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Lab equipment silhouettes - span full map
  ctx.fillStyle = "#34495E";
  const equipSpacing = 200;
  const numEquip = Math.ceil(width / equipSpacing) + 4;
  for (let i = 0; i < numEquip; i++) {
    const worldX = (i * equipSpacing) + (cameraX % equipSpacing) - equipSpacing * 2;
    const x = worldX - (cameraX * 0.2);
    if (x > -200 && x < width + 200) {
      const equipY = height - 100;

      // Beaker/flask shapes
      ctx.beginPath();
      ctx.moveTo(x + 30, equipY);
      ctx.lineTo(x + 20, equipY + 60);
      ctx.lineTo(x + 60, equipY + 60);
      ctx.lineTo(x + 50, equipY);
      ctx.closePath();
      ctx.fill();

      // Test tube rack
      ctx.fillRect(x + 100, equipY + 20, 80, 40);
      for (let t = 0; t < 4; t++) {
        ctx.fillRect(x + 110 + t * 18, equipY, 8, 30);
      }
    }
  }

  // Floating data particles (reduced)
  ctx.fillStyle = "rgba(52, 152, 219, 0.5)";
  const particleOffset = (cameraX * 0.4) % 60;
  for (let i = 0; i < 15; i++) {
    const x = (i * 60 - particleOffset + width * 2) % width;
    const y = (i * 37) % height;
    ctx.fillRect(x, y, 3, 3);
  }
}

function drawFraudDetectionBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number
): void {
  // Dark cyber city sky
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#0f0f1e");
  gradient.addColorStop(1, "#1A1A2E");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // City skyline with varied buildings - span full map
  const citySpacing = 120;
  const numCityBuildings = Math.ceil(width / citySpacing) + 4;
  for (let i = 0; i < numCityBuildings; i++) {
    const worldX = (i * citySpacing) + (cameraX % citySpacing) - citySpacing * 2;
    const x = worldX - (cameraX * 0.1);
    if (x > -120 && x < width + 120) {
      const buildingHeight = 150 + (i % 5) * 60;

      // Building
      ctx.fillStyle = "#16213E";
      ctx.fillRect(x, height - buildingHeight, 90, buildingHeight);

      // Lit windows (simplified pattern)
      const rows = Math.floor(buildingHeight / 25);
      for (let row = 0; row < rows; row += 2) {
        for (let col = 0; col < 3; col++) {
          if ((i + row + col) % 3 === 0) {
            ctx.fillStyle = (i + row) % 2 === 0 ? "#FFD700" : "#4A90E2";
            ctx.fillRect(x + 15 + col * 25, height - buildingHeight + 10 + row * 25, 18, 18);
          }
        }
      }
    }
  }

  // Digital security grid
  ctx.strokeStyle = "rgba(52, 152, 219, 0.2)";
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = -(cameraX * 0.5 % gridSize); x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Data streams
  ctx.strokeStyle = "rgba(46, 204, 113, 0.4)";
  ctx.lineWidth = 2;
  const streamOffset = (cameraX * 0.6) % 100;
  for (let i = 0; i < 8; i++) {
    const x = i * 100 - streamOffset;
    if (x > -100 && x < width + 100) {
      const startY = (i * 73) % (height - 200);
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x + 20, startY + 80);
      ctx.lineTo(x + 10, startY + 160);
      ctx.stroke();
    }
  }
}

function drawTestingTowersBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number
): void {
  // Sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#B8C6DB");
  gradient.addColorStop(1, "#ECF0F1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Clouds
  const cloudOffset = (cameraX * 0.08) % 180;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  for (let i = 0; i < 6; i++) {
    const x = i * 180 - cloudOffset;
    if (x > -100 && x < width + 100) {
      const y = 60 + (i % 4) * 50;
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.arc(x + 30, y, 40, 0, Math.PI * 2);
      ctx.arc(x + 60, y, 35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // MASSIVE TOWERS - The key feature! Span full map
  const towerColors = ["#95A5A6", "#7F8C8D", "#ABB7B7", "#85929E"];
  const towerSpacing = 200;
  const numTowers = Math.ceil(width / towerSpacing) + 4;

  for (let i = 0; i < numTowers; i++) {
    const worldX = (i * towerSpacing) + (cameraX % towerSpacing) - towerSpacing * 2;
    const x = worldX - (cameraX * 0.12);
    if (x > -200 && x < width + 200) {
      const towerHeight = 250 + (i % 3) * 120; // Very tall towers!
      const towerWidth = 70 + (i % 2) * 20;

      // Main tower body
      ctx.fillStyle = towerColors[i % towerColors.length];
      ctx.fillRect(x, height - towerHeight, towerWidth, towerHeight);

      // Tower windows (optimized - every other floor)
      ctx.fillStyle = "rgba(100, 150, 200, 0.6)";
      const floors = Math.floor(towerHeight / 20);
      for (let floor = 0; floor < floors; floor += 2) {
        for (let window = 0; window < 3; window++) {
          const windowX = x + 10 + window * 20;
          const windowY = height - towerHeight + 8 + floor * 20;
          ctx.fillRect(windowX, windowY, 12, 14);
        }
      }

      // Tower top/crown
      ctx.fillStyle = "#BDC3C7";
      ctx.fillRect(x - 5, height - towerHeight, towerWidth + 10, 8);

      // Antenna on some towers
      if (i % 2 === 0) {
        ctx.strokeStyle = "#E74C3C";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + towerWidth / 2, height - towerHeight);
        ctx.lineTo(x + towerWidth / 2, height - towerHeight - 40);
        ctx.stroke();

        // Blinking light on antenna
        ctx.fillStyle = "#E74C3C";
        ctx.beginPath();
        ctx.arc(x + towerWidth / 2, height - towerHeight - 40, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Foreground QA elements - checklist icons
  const checkOffset = (cameraX * 0.25) % 150;
  ctx.strokeStyle = "rgba(46, 204, 113, 0.3)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i++) {
    const x = i * 150 - checkOffset;
    if (x > -150 && x < width + 150) {
      const y = height - 80 - (i % 3) * 30;

      // Checkbox
      ctx.strokeRect(x, y, 20, 20);

      // Checkmark
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 10);
      ctx.lineTo(x + 8, y + 16);
      ctx.lineTo(x + 16, y + 4);
      ctx.stroke();
    }
  }
}

function drawLeadershipBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number
): void {
  // Purple/royal sky
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#8E44AD");
  gradient.addColorStop(1, "#9B59B6");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Castle walls and towers - span full map
  const castleSpacing = 180;
  const numCastleParts = Math.ceil(width / castleSpacing) + 4;

  for (let i = 0; i < numCastleParts; i++) {
    const worldX = (i * castleSpacing) + (cameraX % castleSpacing) - castleSpacing * 2;
    const x = worldX - (cameraX * 0.15);
    if (x > -180 && x < width + 180) {
      const isTower = i % 2 === 0;

      if (isTower) {
        // Tower
        const towerHeight = 180;
        ctx.fillStyle = "#5D3A7A";
        ctx.fillRect(x, height - towerHeight, 60, towerHeight);

        // Battlements
        ctx.fillStyle = "#6C3E8F";
        for (let b = 0; b < 4; b++) {
          ctx.fillRect(x + b * 15, height - towerHeight, 12, 15);
        }

        // Windows (every other one)
        ctx.fillStyle = "#FFD700";
        for (let w = 0; w < 3; w++) {
          ctx.beginPath();
          ctx.arc(x + 30, height - towerHeight + 30 + w * 50, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Flag on top
        ctx.strokeStyle = "#2C3E50";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 30, height - towerHeight - 30);
        ctx.lineTo(x + 30, height - towerHeight);
        ctx.stroke();

        ctx.fillStyle = "#E74C3C";
        ctx.beginPath();
        ctx.moveTo(x + 30, height - towerHeight - 30);
        ctx.lineTo(x + 55, height - towerHeight - 20);
        ctx.lineTo(x + 30, height - towerHeight - 10);
        ctx.fill();
      } else {
        // Wall segment
        const wallHeight = 120;
        ctx.fillStyle = "#6C3E8F";
        ctx.fillRect(x, height - wallHeight, 60, wallHeight);

        // Battlements on wall
        for (let b = 0; b < 5; b++) {
          ctx.fillRect(x + b * 12, height - wallHeight, 10, 12);
        }
      }
    }
  }

  // Royal banners in foreground
  const bannerOffset = (cameraX * 0.3) % 120;
  for (let i = 0; i < 10; i++) {
    const x = i * 120 - bannerOffset;
    if (x > -120 && x < width + 120) {
      const y = height - 100;

      // Pole
      ctx.strokeStyle = "#2C3E50";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 60);
      ctx.stroke();

      // Banner
      ctx.fillStyle = i % 2 === 0 ? "#E74C3C" : "#F39C12";
      ctx.beginPath();
      ctx.moveTo(x, y - 60);
      ctx.lineTo(x + 25, y - 50);
      ctx.lineTo(x, y - 40);
      ctx.fill();
    }
  }
}

function drawFullstackDocksBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number,
  cameraY: number
): void {
  // Ocean/sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#5DADE2");
  gradient.addColorStop(0.6, "#48C9B0");
  gradient.addColorStop(1, "#16A085");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Waves in the water
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 2;
  const waveOffset = (cameraX * 0.3) % 60;
  for (let i = 0; i < 18; i++) {
    const x = i * 60 - waveOffset;
    if (x > -60 && x < width + 60) {
      const y = height - 200 + (i % 3) * 20;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 15, y - 10, x + 30, y);
      ctx.quadraticCurveTo(x + 45, y + 10, x + 60, y);
      ctx.stroke();
    }
  }

  // Dock structures - span full map
  const dockSpacing = 150;
  const numDocks = Math.ceil(width / dockSpacing) + 4;
  ctx.fillStyle = "#8B4513";
  for (let i = 0; i < numDocks; i++) {
    const worldX = (i * dockSpacing) + (cameraX % dockSpacing) - dockSpacing * 2;
    const x = worldX - (cameraX * 0.2);
    if (x > -150 && x < width + 150) {
      // Dock posts
      for (let p = 0; p < 5; p++) {
        ctx.fillRect(x + p * 30, height - 180, 12, 180);
      }

      // Dock platform
      ctx.fillStyle = "#A0522D";
      ctx.fillRect(x, height - 200, 140, 20);
      ctx.fillStyle = "#8B4513";
    }
  }

  // Boats/ships
  const boatOffset = (cameraX * 0.18) % 200;
  for (let i = 0; i < 5; i++) {
    const x = i * 200 - boatOffset;
    if (x > -200 && x < width + 200) {
      const y = height - 160;

      // Boat hull
      ctx.fillStyle = "#E8F8F5";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 30, y + 40);
      ctx.lineTo(x + 70, y + 40);
      ctx.lineTo(x + 50, y);
      ctx.closePath();
      ctx.fill();

      // Mast
      ctx.strokeStyle = "#34495E";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x + 25, y - 60);
      ctx.lineTo(x + 25, y + 20);
      ctx.stroke();

      // Sail with healthcare cross
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      ctx.moveTo(x + 25, y - 60);
      ctx.lineTo(x + 60, y - 30);
      ctx.lineTo(x + 25, y);
      ctx.fill();

      // Healthcare cross on sail
      ctx.fillStyle = "#E74C3C";
      ctx.fillRect(x + 35, y - 45, 8, 24);
      ctx.fillRect(x + 27, y - 37, 24, 8);
    }
  }

  // Seagulls
  const birdOffset = (cameraX * 0.4) % 100;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i++) {
    const x = i * 100 - birdOffset;
    if (x > -100 && x < width + 100) {
      const y = 80 + (i % 4) * 40;

      // Simple bird shape
      ctx.beginPath();
      ctx.moveTo(x - 10, y);
      ctx.quadraticCurveTo(x, y - 5, x + 10, y);
      ctx.stroke();
    }
  }
}
