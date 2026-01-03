import React, { useRef, useEffect, useState } from "react";
import type { Player as PlayerType, LevelConfig, NPC, Collectible } from "../engine/types";
import { InputManager } from "../engine/input";
import { Camera } from "../engine/camera";
import { audioManager } from "../engine/audio";
import { applyGravity, applyFriction, moveEntity } from "../engine/physics";
import { resolveCollision, checkCollision } from "../engine/collision";
import { createPlayer, drawPlayer, movePlayer, jumpPlayer, resetJumpCount, updatePlayerAnimation, updateRespawnPoint } from "../entities/Player";
import { drawPlatform, drawBackground } from "../entities/Platform";
import { drawNPC, canInteractWithNPC, getNextDialog } from "../entities/NPC";
import { drawCollectible, checkCollectiblePickup } from "../entities/Collectible";
import { HUD } from "../components/HUD";
import { Dialog } from "../components/Dialog";
import { TouchControls } from "../components/TouchControls";
import { PauseMenu } from "../components/PauseMenu";
import { copyShareLink } from "../utils/saveSystem";
import type { SaveData } from "../engine/types";

interface GameLevelProps {
  levelConfig: LevelConfig;
  saveData: SaveData;
  onLevelComplete: (xp: number, coins: number) => void;
  onQuit: () => void;
}

export const GameLevel: React.FC<GameLevelProps> = ({
  levelConfig,
  saveData,
  onLevelComplete,
  onQuit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<{
    npc: NPC;
    index: number;
  } | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  const playerRef = useRef<PlayerType>(
    createPlayer(levelConfig.startX, levelConfig.startY, saveData.suitColor)
  );
  const inputRef = useRef<InputManager>(new InputManager());
  const cameraRef = useRef<Camera | null>(null);
  const animationRef = useRef<number | null>(null);
  const collectiblesRef = useRef<Collectible[]>([...levelConfig.collectibles]);
  const npcsRef = useRef<NPC[]>([...levelConfig.npcs]);
  const checkpointsRef = useRef([...levelConfig.checkpoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (!cameraRef.current) {
        cameraRef.current = new Camera(
          canvas.width,
          canvas.height,
          levelConfig.width,
          levelConfig.height
        );
      } else {
        cameraRef.current.resize(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Game loop
    const gameLoop = () => {
      if (!ctx || !cameraRef.current) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const player = playerRef.current;
      const input = inputRef.current;
      const camera = cameraRef.current;

      // Calculate delta time
      const currentTime = Date.now();
      const deltaTime = Math.min(currentTime - lastTimeRef.current, 100);
      lastTimeRef.current = currentTime;

      // Handle pause input (check even when paused to unpause)
      if (input.isJustPressed("pause")) {
        setPaused((prev) => !prev);
      }

      // If paused, freeze gameplay but keep rendering
      if (paused) {
        // Update input manager at end of frame
        input.update();
        // Still render the scene
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(ctx, canvas.width, canvas.height, camera.x, camera.y, levelConfig.theme);

        levelConfig.platforms.forEach((platform) => {
          drawPlatform(ctx, platform, camera.x, camera.y);
        });

        collectiblesRef.current.forEach((collectible) => {
          drawCollectible(ctx, collectible, camera.x, camera.y, Date.now());
        });

        checkpointsRef.current.forEach((checkpoint) => {
          const screenPos = camera.worldToScreen(checkpoint.x, checkpoint.y);
          ctx.fillStyle = checkpoint.activated ? "#2ecc71" : "#f39c12";
          ctx.fillRect(screenPos.x, screenPos.y, checkpoint.width, checkpoint.height);
        });

        npcsRef.current.forEach((npc) => {
          drawNPC(ctx, npc, camera.x, camera.y);
        });

        drawPlayer(ctx, player, camera.x, camera.y);

        const exitScreen = camera.worldToScreen(levelConfig.exitX, levelConfig.exitY);
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(exitScreen.x, exitScreen.y, 40, 80);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px monospace";
        ctx.fillText("EXIT", exitScreen.x + 2, exitScreen.y + 50);

        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      drawBackground(ctx, canvas.width, canvas.height, camera.x, camera.y, levelConfig.theme);

      // Player movement (only if no dialog)
      if (!currentDialog) {
        const moveLeft = input.isPressed("left");
        const moveRight = input.isPressed("right");

        if (moveLeft || moveRight) {
          movePlayer(player, moveLeft, moveRight);
        }

        // Jump with edge detection
        if (input.isJustPressed("jump")) {
          if (jumpPlayer(player)) {
            audioManager.jump();
          }
        }
      }

      // Apply physics
      applyGravity(player);
      applyFriction(player);
      moveEntity(player);

      // Collision with platforms
      resolveCollision(player, levelConfig.platforms);
      resetJumpCount(player);

      // Update player animation
      updatePlayerAnimation(player, deltaTime);

      // Check if player fell off the map - respawn at last checkpoint
      if (player.y > levelConfig.height + 100) {
        // Respawn at last activated checkpoint or start position
        player.x = player.respawnPoint.x;
        player.y = player.respawnPoint.y;
        player.velocity.x = 0;
        player.velocity.y = 0;
        audioManager.collect(); // Play respawn sound
      }

      // Check collectibles
      collectiblesRef.current.forEach((collectible) => {
        if (
          !collectible.collected &&
          checkCollectiblePickup(player.x, player.y, player.width, player.height, collectible)
        ) {
          collectible.collected = true;
          player.coins += collectible.value;
          player.xp += collectible.value;
          audioManager.collect();
        }
      });

      // Check checkpoints
      checkpointsRef.current.forEach((checkpoint) => {
        if (
          !checkpoint.activated &&
          checkCollision(player, checkpoint)
        ) {
          checkpoint.activated = true;
          updateRespawnPoint(player, checkpoint.x, checkpoint.y);
          audioManager.checkpoint();
        }
      });

      // Check NPCs for auto-dialogue on proximity
      if (!currentDialog) {
        npcsRef.current.forEach((npc) => {
          if (canInteractWithNPC(player.x, player.y, player.width, player.height, npc)) {
            // Auto-start dialogue when in range
            if (npc.dialogIndex === 0) {
              const firstDialog = getNextDialog(npc);
              if (firstDialog) {
                setCurrentDialog({ npc, index: 0 });
              }
            }
          }
        });
      }

      // Manual interaction to advance dialogue
      if (input.isJustPressed("interact") && currentDialog) {
        handleDialogNext();
      }

      // Check level exit
      if (
        player.x + player.width > levelConfig.exitX &&
        player.y + player.height > levelConfig.exitY &&
        player.y < levelConfig.exitY + 100
      ) {
        audioManager.levelComplete();
        onLevelComplete(player.xp, player.coins);
        return;
      }

      // Update camera
      camera.follow(player);

      // Draw platforms
      levelConfig.platforms.forEach((platform) => {
        drawPlatform(ctx, platform, camera.x, camera.y);
      });

      // Draw collectibles
      collectiblesRef.current.forEach((collectible) => {
        drawCollectible(ctx, collectible, camera.x, camera.y, Date.now());
      });

      // Draw checkpoints
      checkpointsRef.current.forEach((checkpoint) => {
        const screenPos = camera.worldToScreen(checkpoint.x, checkpoint.y);
        ctx.fillStyle = checkpoint.activated ? "#2ecc71" : "#f39c12";
        ctx.fillRect(screenPos.x, screenPos.y, checkpoint.width, checkpoint.height);

        if (checkpoint.label) {
          ctx.fillStyle = "#fff";
          ctx.font = "10px monospace";
          ctx.fillText(checkpoint.label, screenPos.x, screenPos.y - 5);
        }
      });

      // Draw NPCs
      npcsRef.current.forEach((npc) => {
        drawNPC(ctx, npc, camera.x, camera.y);
      });

      // Draw player
      drawPlayer(ctx, player, camera.x, camera.y);

      // Draw exit
      const exitScreen = camera.worldToScreen(levelConfig.exitX, levelConfig.exitY);
      ctx.fillStyle = "#2ecc71";
      ctx.fillRect(exitScreen.x, exitScreen.y, 40, 80);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px monospace";
      ctx.fillText("EXIT", exitScreen.x + 2, exitScreen.y + 50);

      // Update input manager at end of frame (after all input checks)
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
  }, [levelConfig, paused, currentDialog]);

  const handleDialogNext = () => {
    if (!currentDialog) return;

    const nextText = getNextDialog(currentDialog.npc);
    if (nextText) {
      setCurrentDialog({ npc: currentDialog.npc, index: currentDialog.npc.dialogIndex - 1 });
    } else {
      setCurrentDialog(null);
    }
  };

  const handleDialogClose = () => {
    setCurrentDialog(null);
  };

  const handleCopyShareLink = () => {
    copyShareLink(saveData);
  };

  const handleTouchAction = (
    action: "left" | "right" | "jump" | "interact" | "pause",
    pressed: boolean,
    pointerId?: number
  ) => {
    const input = inputRef.current;

    // Special handling for jump - trigger jump action immediately
    if (action === "jump" && pressed) {
      if (jumpPlayer(playerRef.current)) {
        audioManager.jump();
      }
    } else if (action === "pause" && pressed) {
      setPaused((prev) => !prev);
    } else if (action === "interact" && pressed) {
      // Trigger interact
      input.setActionPressed("interact", true, pointerId);
      // Immediately release it
      setTimeout(() => input.setActionPressed("interact", false, pointerId), 50);
    } else {
      // For movement buttons
      input.setActionPressed(action, pressed, pointerId);
    }
  };

  const handleMenuClick = () => {
    if (confirm("Return to main menu? Unsaved progress in this level will be lost.")) {
      onQuit();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          pointerEvents: "none", // Let UI elements handle pointer events
        }}
      />

      <HUD
        player={playerRef.current}
        levelName={levelConfig.name}
        onPause={() => setPaused((prev) => !prev)}
        onMenu={handleMenuClick}
      />

      {currentDialog && (
        <Dialog
          npcName={currentDialog.npc.name}
          text={currentDialog.npc.dialog[currentDialog.index]}
          currentIndex={currentDialog.index}
          totalMessages={currentDialog.npc.dialog.length}
          onNext={handleDialogNext}
          onClose={handleDialogClose}
        />
      )}

      {paused && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onMainMenu={handleMenuClick}
          onCopyShareLink={handleCopyShareLink}
          soundEnabled={audioManager.isEnabled()}
          onToggleSound={() => audioManager.setEnabled(!audioManager.isEnabled())}
        />
      )}

      <TouchControls onActionPressed={handleTouchAction} showInteract={currentDialog !== null} />
    </div>
  );
};
