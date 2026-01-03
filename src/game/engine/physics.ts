import type { Entity, Vector2 } from "./types";

export const GRAVITY = 0.5; // Reduced for easier gameplay
export const MAX_FALL_SPEED = 15;
export const PLAYER_SPEED = 4;
export const JUMP_FORCE = -16; // Increased for easier/higher jumps
export const DOUBLE_JUMP_FORCE = -14; // Increased for easier double jumps
export const FRICTION = 0.8;

export function applyGravity(entity: Entity): void {
  if (!entity.grounded) {
    entity.velocity.y += GRAVITY;
    if (entity.velocity.y > MAX_FALL_SPEED) {
      entity.velocity.y = MAX_FALL_SPEED;
    }
  }
}

export function applyFriction(entity: Entity): void {
  if (entity.grounded) {
    entity.velocity.x *= FRICTION;
    if (Math.abs(entity.velocity.x) < 0.1) {
      entity.velocity.x = 0;
    }
  }
}

export function moveEntity(entity: Entity): void {
  entity.x += entity.velocity.x;
  entity.y += entity.velocity.y;
}

export function clampVelocity(velocity: Vector2, max: number): void {
  if (Math.abs(velocity.x) > max) {
    velocity.x = Math.sign(velocity.x) * max;
  }
  if (Math.abs(velocity.y) > max) {
    velocity.y = Math.sign(velocity.y) * max;
  }
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
