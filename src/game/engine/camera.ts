import type { Player } from "./types";
import { lerp } from "./physics";

export class Camera {
  public x = 0;
  public y = 0;
  public width: number;
  public height: number;
  private levelWidth: number;
  private levelHeight: number;
  private smoothing = 0.1;

  constructor(width: number, height: number, levelWidth: number, levelHeight: number) {
    this.width = width;
    this.height = height;
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
  }

  public follow(player: Player): void {
    // Target camera position (centered on player)
    const targetX = player.x + player.width / 2 - this.width / 2;
    const targetY = player.y + player.height / 2 - this.height / 2;

    // Smooth camera movement
    this.x = lerp(this.x, targetX, this.smoothing);
    this.y = lerp(this.y, targetY, this.smoothing);

    // Clamp camera to level bounds
    this.x = Math.max(0, Math.min(this.x, this.levelWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, this.levelHeight - this.height));
  }

  public setLevelSize(width: number, height: number): void {
    this.levelWidth = width;
    this.levelHeight = height;
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public worldToScreen(x: number, y: number): { x: number; y: number } {
    return {
      x: x - this.x,
      y: y - this.y,
    };
  }

  public screenToWorld(x: number, y: number): { x: number; y: number } {
    return {
      x: x + this.x,
      y: y + this.y,
    };
  }
}
