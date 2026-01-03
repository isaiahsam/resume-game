import type { Rectangle, Entity, Platform } from "./types";

export function checkCollision(a: Rectangle, b: Rectangle): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function checkPointInRect(x: number, y: number, rect: Rectangle): boolean {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

export function resolveCollision(entity: Entity, platforms: Platform[]): void {
  entity.grounded = false;

  for (const platform of platforms) {
    if (checkCollision(entity, platform)) {
      // Calculate overlap on each axis
      const overlapX = Math.min(
        entity.x + entity.width - platform.x,
        platform.x + platform.width - entity.x
      );
      const overlapY = Math.min(
        entity.y + entity.height - platform.y,
        platform.y + platform.height - entity.y
      );

      // Resolve on the axis with smallest overlap
      if (overlapX < overlapY) {
        // Horizontal collision
        if (entity.x < platform.x) {
          entity.x = platform.x - entity.width;
        } else {
          entity.x = platform.x + platform.width;
        }
        entity.velocity.x = 0;
      } else {
        // Vertical collision
        if (entity.y < platform.y) {
          // Landing on top of platform
          entity.y = platform.y - entity.height;
          entity.velocity.y = 0;
          entity.grounded = true;
        } else {
          // Hitting platform from below
          entity.y = platform.y + platform.height;
          entity.velocity.y = 0;
        }
      }
    }
  }
}

export function getCollisionSide(
  entity: Rectangle,
  platform: Rectangle
): "top" | "bottom" | "left" | "right" | null {
  if (!checkCollision(entity, platform)) return null;

  const overlapX = Math.min(
    entity.x + entity.width - platform.x,
    platform.x + platform.width - entity.x
  );
  const overlapY = Math.min(
    entity.y + entity.height - platform.y,
    platform.y + platform.height - entity.y
  );

  if (overlapX < overlapY) {
    return entity.x < platform.x ? "right" : "left";
  } else {
    return entity.y < platform.y ? "bottom" : "top";
  }
}
