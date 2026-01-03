import React, { useRef, useEffect, useState } from "react";
import type { Player as PlayerType } from "../engine/types";
import { InputManager } from "../engine/input";
import { Camera } from "../engine/camera";
import { audioManager } from "../engine/audio";
import { applyGravity, applyFriction, moveEntity } from "../engine/physics";
import { resolveCollision, checkCollision } from "../engine/collision";
import { createPlayer, drawPlayer, movePlayer, jumpPlayer, resetJumpCount, updatePlayerAnimation } from "../entities/Player";
import { drawPlatform, drawBackground } from "../entities/Platform";
import { HUD } from "../components/HUD";
import { TouchControls } from "../components/TouchControls";

// Function to draw volcano background
function drawVolcanoBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number
) {
  ctx.save();

  // Dark red/orange sky
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#1a0a0a");
  gradient.addColorStop(0.5, "#4a1a1a");
  gradient.addColorStop(1, "#8a2a2a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Parallax offset for volcano
  const volcanoOffset = (cameraX * 0.02);

  // Multiple volcanoes in background
  const volcanoes = [
    { x: width * 0.2 - volcanoOffset * 0.5, baseWidth: 400, height: height * 0.6 },
    { x: width * 0.6 - volcanoOffset * 0.7, baseWidth: 500, height: height * 0.7 },
    { x: width * 1.2 - volcanoOffset * 0.3, baseWidth: 350, height: height * 0.5 },
  ];

  volcanoes.forEach((volcano, index) => {
    const baseY = height - 100;
    const plateauWidth = volcano.baseWidth * 0.3;
    const craterDepth = 30;

    // Volcano body with plateau (dark mountain)
    ctx.fillStyle = index === 1 ? "#2a1515" : "#1a0a0a";
    ctx.beginPath();
    ctx.moveTo(volcano.x - volcano.baseWidth / 2, baseY);
    ctx.lineTo(volcano.x - plateauWidth / 2, baseY - volcano.height);
    ctx.lineTo(volcano.x + plateauWidth / 2, baseY - volcano.height);
    ctx.lineTo(volcano.x + volcano.baseWidth / 2, baseY);
    ctx.closePath();
    ctx.fill();

    // Crater rim and inside (brightest on center volcano)
    if (index === 1) {
      const craterGlow = Math.sin(Date.now() / 300) * 0.2 + 0.8;
      const craterY = baseY - volcano.height;

      // Inner crater walls (darker)
      ctx.fillStyle = "#1a0505";
      ctx.beginPath();
      ctx.ellipse(volcano.x, craterY + craterDepth / 2, plateauWidth * 0.45, craterDepth * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lava pool in crater with glow
      ctx.shadowBlur = 50;
      ctx.shadowColor = `rgba(255, 100, 0, ${craterGlow})`;

      ctx.fillStyle = `rgba(255, 100, 0, ${craterGlow * 0.9})`;
      ctx.beginPath();
      ctx.ellipse(volcano.x, craterY + craterDepth * 0.7, plateauWidth * 0.4, craterDepth * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bright molten center
      ctx.fillStyle = `rgba(255, 200, 0, ${craterGlow})`;
      ctx.beginPath();
      ctx.ellipse(volcano.x, craterY + craterDepth * 0.7, plateauWidth * 0.25, craterDepth * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    }

    // Lava streams down the volcano from the crater
    if (index === 1) {
      const time = Date.now() / 1000;
      const craterY = baseY - volcano.height;

      ctx.strokeStyle = "#ff4500";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";

      for (let i = 0; i < 4; i++) {
        const offset = Math.sin(time + i) * 20;
        const startX = volcano.x + (i - 1.5) * 60;
        const startY = craterY + craterDepth;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(
          startX + offset, startY + volcano.height * 0.3,
          startX - offset * 0.5, startY + volcano.height * 0.6
        );
        ctx.lineTo(startX - offset * 0.5, baseY);
        ctx.stroke();

        // Bright core of lava
        ctx.strokeStyle = "#ffa500";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Glowing center
        ctx.strokeStyle = "#ffeb3b";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.strokeStyle = "#ff4500";
        ctx.lineWidth = 10;
      }
    }
  });

  ctx.restore();
}

// Function to draw extensive fire effects across the map
function drawFireEffects(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cameraX: number
) {
  const time = Date.now();
  const numFires = 20; // More fire sources

  for (let i = 0; i < numFires; i++) {
    const fireX = (i * 200 + cameraX * 0.15) % (width + 400) - 200;
    const fireBaseY = height - 150;
    const fireY = fireBaseY - Math.sin(time / 500 + i) * 30;

    // Animated fire intensity
    const intensity = Math.sin(time / 200 + i * 0.5) * 0.3 + 0.7;

    // Large fire base
    ctx.globalAlpha = intensity * 0.9;

    // Bottom glow
    const glowGradient = ctx.createRadialGradient(fireX + 50, fireY + 100, 0, fireX + 50, fireY + 100, 100);
    glowGradient.addColorStop(0, "rgba(255, 150, 0, 0.8)");
    glowGradient.addColorStop(0.5, "rgba(255, 69, 0, 0.5)");
    glowGradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    ctx.fillStyle = glowGradient;
    ctx.fillRect(fireX - 50, fireY, 200, 150);

    // Fire base
    ctx.fillStyle = "#FF4500";
    ctx.fillRect(fireX, fireY, 100, 120);

    // Large flames
    ctx.fillStyle = "#FFA500";
    for (let j = 0; j < 5; j++) {
      const flameOffset = Math.sin(time / 150 + i + j) * 30;
      const flameY = fireY - 30 - j * 35 + flameOffset;
      const flameWidth = 50 - j * 8;
      const flameHeight = 60 - j * 5;
      ctx.fillRect(fireX + 25 + j * 5, flameY, flameWidth, flameHeight);
    }

    // Bright core
    ctx.fillStyle = "#FFD700";
    for (let j = 0; j < 4; j++) {
      const coreOffset = Math.sin(time / 100 + i + j) * 20;
      const coreY = fireY - 20 - j * 30 + coreOffset;
      ctx.fillRect(fireX + 30 + j * 8, coreY, 40 - j * 5, 45 - j * 5);
    }

    // White hot center
    ctx.fillStyle = "#FFFFFF";
    const whiteHotOffset = Math.sin(time / 80 + i) * 15;
    ctx.fillRect(fireX + 40, fireY - 10 + whiteHotOffset, 20, 30);

    // Many sparks
    ctx.fillStyle = "#FF6347";
    for (let s = 0; s < 15; s++) {
      const sparkX = fireX + 30 + Math.sin(time / 100 + s + i) * 60;
      const sparkY = fireY - 100 - (time / 8 + s * 40) % 150;
      const sparkSize = Math.random() * 4 + 2;
      ctx.fillRect(sparkX, sparkY, sparkSize, sparkSize);
    }

    // Ember particles
    ctx.fillStyle = "#FFD700";
    for (let e = 0; e < 10; e++) {
      const emberX = fireX + 20 + Math.cos(time / 150 + e + i) * 80;
      const emberY = fireY - 50 - (time / 12 + e * 30) % 120;
      ctx.beginPath();
      ctx.arc(emberX, emberY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Lava pools at the bottom
  ctx.globalAlpha = 1;
  const lavaY = height - 50;
  const lavaGlow = Math.sin(time / 400) * 0.3 + 0.7;

  for (let i = 0; i < 5; i++) {
    const poolX = (i * 600 + cameraX * 0.1) % (width + 600) - 300;

    ctx.fillStyle = `rgba(255, 69, 0, ${lavaGlow})`;
    ctx.fillRect(poolX, lavaY, 400, 60);

    ctx.fillStyle = `rgba(255, 140, 0, ${lavaGlow * 1.2})`;
    ctx.fillRect(poolX + 50, lavaY + 10, 300, 40);

    ctx.fillStyle = `rgba(255, 200, 0, ${lavaGlow})`;
    ctx.fillRect(poolX + 100, lavaY + 20, 200, 20);

    // Bubbles in lava
    for (let b = 0; b < 3; b++) {
      const bubbleX = poolX + 100 + b * 100 + Math.sin(time / 300 + b + i) * 50;
      const bubbleSize = 10 + Math.sin(time / 200 + b) * 5;
      ctx.fillStyle = `rgba(255, 100, 0, ${lavaGlow * 0.8})`;
      ctx.beginPath();
      ctx.arc(bubbleX, lavaY + 30, bubbleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1.0;
}

interface BossFightProps {
  onComplete: (badges: string[]) => void;
  onQuit: () => void;
}

// Boss Fight is a challenging platforming level with 4 badges to collect
export const BossFight: React.FC<BossFightProps> = ({ onComplete, onQuit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [collectedBadges, setCollectedBadges] = useState<string[]>([]);
  const [showVictory, setShowVictory] = useState(false);

  const playerRef = useRef<PlayerType>(createPlayer(100, 850, {
    primary: "#2C3E50",
    secondary: "#34495E",
    accent: "#E74C3C",
  }));

  const inputRef = useRef<InputManager>(new InputManager());
  const cameraRef = useRef<Camera | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  // Badge collectibles
  const badgesRef = useRef([
    { x: 500, y: 700, width: 30, height: 30, id: "Impact", label: "IMPACT", collected: false, color: "#e74c3c" },
    { x: 1200, y: 500, width: 30, height: 30, id: "Scale", label: "SCALE", collected: false, color: "#3498db" },
    { x: 1800, y: 300, width: 30, height: 30, id: "Reliability", label: "QUALITY", collected: false, color: "#2ecc71" },
    { x: 2400, y: 150, width: 30, height: 30, id: "Leadership", label: "LEADER", collected: false, color: "#f39c12" },
  ]);

  // Challenging platforms
  const platforms = [
    { x: 0, y: 900, width: 400, height: 100, type: "ground" as const, color: "#34495E" },
    { x: 450, y: 800, width: 150, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 650, y: 700, width: 120, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 850, y: 650, width: 100, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 1000, y: 600, width: 300, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 1350, y: 500, width: 80, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 1500, y: 450, width: 80, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 1650, y: 400, width: 200, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 1900, y: 350, width: 100, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 2100, y: 300, width: 80, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 2250, y: 250, width: 300, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 2600, y: 200, width: 200, height: 20, type: "floating" as const, color: "#7f8c8d" },
    { x: 2850, y: 500, width: 250, height: 400, type: "ground" as const, color: "#34495E" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (!cameraRef.current) {
        cameraRef.current = new Camera(canvas.width, canvas.height, 3200, 1000);
      } else {
        cameraRef.current.resize(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gameLoop = () => {
      if (!ctx || !cameraRef.current) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const player = playerRef.current;
      const input = inputRef.current;
      const camera = cameraRef.current;

      const currentTime = Date.now();
      const deltaTime = Math.min(currentTime - lastTimeRef.current, 100);
      lastTimeRef.current = currentTime;

      if (showVictory) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(ctx, canvas.width, canvas.height, camera.x, camera.y, "boss");

        // Draw volcano background
        drawVolcanoBackground(ctx, canvas.width, canvas.height, camera.x);

        // Draw extensive fire effects
        drawFireEffects(ctx, canvas.width, canvas.height, camera.x);

        platforms.forEach((platform) => {
          drawPlatform(ctx, platform, camera.x, camera.y);
        });

        drawPlayer(ctx, player, camera.x, camera.y);

        // Update input at end of frame
        input.update();

        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Player movement
      const moveLeft = input.isPressed("left");
      const moveRight = input.isPressed("right");

      if (moveLeft || moveRight) {
        movePlayer(player, moveLeft, moveRight);
      }

      if (input.isJustPressed("jump")) {
        if (jumpPlayer(player)) {
          audioManager.jump();
        }
      }

      // Physics
      applyGravity(player);
      applyFriction(player);
      moveEntity(player);

      resolveCollision(player, platforms);
      resetJumpCount(player);
      updatePlayerAnimation(player, deltaTime);

      // Check if player fell off
      if (player.y > 1100) {
        player.x = 100;
        player.y = 850;
        player.velocity.x = 0;
        player.velocity.y = 0;
      }

      // Check badge collection
      badgesRef.current.forEach((badge) => {
        if (!badge.collected && checkCollision(player, badge)) {
          badge.collected = true;
          const newBadges = [...collectedBadges, badge.id];
          setCollectedBadges(newBadges);
          audioManager.checkpoint();

          if (newBadges.length === 4) {
            setTimeout(() => {
              setShowVictory(true);
              setTimeout(() => {
                onComplete(newBadges);
              }, 2000);
            }, 500);
          }
        }
      });

      // Update camera
      camera.follow(player);

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas.width, canvas.height, camera.x, camera.y, "boss");

      // Draw volcano background
      drawVolcanoBackground(ctx, canvas.width, canvas.height, camera.x);

      // Draw extensive fire effects across the stage
      drawFireEffects(ctx, canvas.width, canvas.height, camera.x);

      // Draw platforms
      platforms.forEach((platform) => {
        drawPlatform(ctx, platform, camera.x, camera.y);
      });

      // Draw badges
      badgesRef.current.forEach((badge) => {
        if (!badge.collected) {
          const screenX = badge.x - camera.x;
          const screenY = badge.y - camera.y;

          // Floating animation
          const float = Math.sin(Date.now() / 300) * 5;

          ctx.fillStyle = badge.color;
          ctx.fillRect(screenX, screenY + float, badge.width, badge.height);

          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.strokeRect(screenX, screenY + float, badge.width, badge.height);

          ctx.fillStyle = "#fff";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText(badge.label, screenX + badge.width / 2, screenY + float - 5);
        }
      });

      // Draw player
      drawPlayer(ctx, player, camera.x, camera.y);

      // Update input at end of frame
      input.update();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [collectedBadges, showVictory, onComplete]);

  const handleTouchAction = (
    action: "left" | "right" | "jump" | "interact" | "pause",
    pressed: boolean,
    pointerId?: number
  ) => {
    const input = inputRef.current;

    if (action === "jump" && pressed) {
      if (jumpPlayer(playerRef.current)) {
        audioManager.jump();
      }
    } else {
      input.setActionPressed(action, pressed, pointerId);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          pointerEvents: "none",
        }}
      />

      <HUD
        player={playerRef.current}
        levelName="The Final Challenge"
        onPause={() => {}}
        onMenu={() => {
          if (confirm("Return to main menu? Progress will be lost.")) {
            onQuit();
          }
        }}
      />

      {/* Badge counter */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "15px 30px",
          borderRadius: "8px",
          color: "#fff",
          fontFamily: "monospace",
          fontSize: "18px",
          zIndex: 200,
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "5px", fontWeight: "bold" }}>Achievement Badges</div>
        <div style={{ fontSize: "24px" }}>{collectedBadges.length} / 4</div>
        <div style={{ fontSize: "12px", marginTop: "5px", opacity: 0.8 }}>
          Collect all badges to complete Isaiah's story!
        </div>
      </div>

      {showVictory && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            color: "#fff",
            fontFamily: "monospace",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "20px", color: "#2ecc71" }}>CHALLENGE COMPLETE!</h1>
          <p style={{ fontSize: "20px", marginBottom: "20px" }}>
            You've collected all achievement badges!
          </p>
          <div style={{ fontSize: "16px", opacity: 0.8 }}>
            <div>✓ Impact - Delivered business value</div>
            <div>✓ Scale - Operated at production scale</div>
            <div>✓ Quality - Built reliable systems</div>
            <div>✓ Leadership - Led teams and projects</div>
          </div>
          <p style={{ fontSize: "18px", marginTop: "30px" }}>
            Proceeding to Isaiah's complete professional summary...
          </p>
        </div>
      )}

      <TouchControls onActionPressed={handleTouchAction} showInteract={false} />
    </div>
  );
};
