import type { InputState } from "./types";

export class InputManager {
  private keys: Set<string> = new Set();
  private keyMap: Record<string, keyof InputState> = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "jump", // ArrowUp now triggers jump
    ArrowDown: "down",
    KeyA: "left",
    KeyD: "right",
    KeyW: "jump", // W now triggers jump
    KeyS: "down",
    Space: "jump",
    KeyE: "interact",
    KeyF: "interact",
    Escape: "pause",
    KeyP: "pause",
  };

  public state: InputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    interact: false,
    pause: false,
  };

  private previousState: InputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    interact: false,
    pause: false,
  };

  private justPressed: Set<keyof InputState> = new Set();
  private justReleased: Set<keyof InputState> = new Set();

  // Touch/pointer tracking
  private touchActions: Map<number, keyof InputState> = new Map();

  constructor() {
    this.setupListeners();
  }

  private setupListeners(): void {
    // Keyboard input
    window.addEventListener("keydown", (e) => {
      const action = this.keyMap[e.code];
      if (action) {
        e.preventDefault();
        if (!this.keys.has(e.code)) {
          this.justPressed.add(action);
        }
        this.keys.add(e.code);
        this.state[action] = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      const action = this.keyMap[e.code];
      if (action) {
        e.preventDefault();
        this.keys.delete(e.code);
        this.state[action] = false;
      }
    });

    // Prevent browser scrolling
    window.addEventListener(
      "keydown",
      (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    // Prevent touch scrolling on game canvas
    window.addEventListener(
      "touchmove",
      (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "CANVAS" || target.closest(".game-controls")) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  // Called by touch controls to trigger actions
  public setActionPressed(action: keyof InputState, pressed: boolean, pointerId?: number): void {
    const wasPressed = this.state[action];

    if (pointerId !== undefined) {
      if (pressed) {
        this.touchActions.set(pointerId, action);
      } else {
        this.touchActions.delete(pointerId);
      }
    }

    this.state[action] = pressed;

    if (pressed && !wasPressed) {
      this.justPressed.add(action);
    } else if (!pressed && wasPressed) {
      this.justReleased.add(action);
    }
  }

  public isPressed(action: keyof InputState): boolean {
    return this.state[action];
  }

  public isJustPressed(action: keyof InputState): boolean {
    return this.justPressed.has(action);
  }

  public isJustReleased(action: keyof InputState): boolean {
    return this.justReleased.has(action);
  }

  public update(): void {
    // Clear edge-triggered states after they've been consumed
    this.justPressed.clear();
    this.justReleased.clear();

    // Update previous state
    Object.keys(this.state).forEach((key) => {
      this.previousState[key as keyof InputState] = this.state[key as keyof InputState];
    });
  }

  public reset(): void {
    this.keys.clear();
    this.justPressed.clear();
    this.justReleased.clear();
    this.touchActions.clear();
    Object.keys(this.state).forEach((key) => {
      this.state[key as keyof InputState] = false;
      this.previousState[key as keyof InputState] = false;
    });
  }

  // Cleanup touch actions that might be stuck
  public cleanupTouchAction(pointerId: number): void {
    const action = this.touchActions.get(pointerId);
    if (action) {
      this.state[action] = false;
      this.touchActions.delete(pointerId);
    }
  }
}
