import React, { useCallback } from "react";

interface TouchControlsProps {
  onActionPressed: (action: "left" | "right" | "jump" | "interact" | "pause", pressed: boolean, pointerId?: number) => void;
  showInteract?: boolean;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onActionPressed, showInteract = false }) => {
  const handlePointerDown = useCallback(
    (action: "left" | "right" | "jump" | "interact" | "pause", e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onActionPressed(action, true, e.pointerId);
    },
    [onActionPressed]
  );

  const handlePointerUp = useCallback(
    (action: "left" | "right" | "jump" | "interact" | "pause", e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      onActionPressed(action, false, e.pointerId);
    },
    [onActionPressed]
  );

  const handlePointerLeave = useCallback(
    (action: "left" | "right" | "jump" | "interact" | "pause", e: React.PointerEvent) => {
      e.preventDefault();
      onActionPressed(action, false, e.pointerId);
    },
    [onActionPressed]
  );

  const buttonStyle: React.CSSProperties = {
    background: "rgba(52, 73, 94, 0.7)",
    border: "3px solid #2c3e50",
    borderRadius: "8px",
    color: "#fff",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: "20px",
    touchAction: "none",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div
      className="game-controls"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "180px",
        pointerEvents: "none",
        zIndex: 150,
      }}
    >
      {/* D-Pad */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "20px",
          display: "grid",
          gridTemplateColumns: "60px 60px",
          gridTemplateRows: "60px",
          gap: "10px",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{ ...buttonStyle, width: "60px", height: "60px" }}
          onPointerDown={(e) => handlePointerDown("left", e)}
          onPointerUp={(e) => handlePointerUp("left", e)}
          onPointerCancel={(e) => handlePointerLeave("left", e)}
          onPointerLeave={(e) => handlePointerLeave("left", e)}
        >
          ←
        </div>
        <div
          style={{ ...buttonStyle, width: "60px", height: "60px" }}
          onPointerDown={(e) => handlePointerDown("right", e)}
          onPointerUp={(e) => handlePointerUp("right", e)}
          onPointerCancel={(e) => handlePointerLeave("right", e)}
          onPointerLeave={(e) => handlePointerLeave("right", e)}
        >
          →
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          display: "flex",
          gap: "10px",
          pointerEvents: "auto",
        }}
      >
        {showInteract && (
          <div
            style={{ ...buttonStyle, width: "70px", height: "70px", fontSize: "16px" }}
            onPointerDown={(e) => handlePointerDown("interact", e)}
            onPointerUp={(e) => handlePointerUp("interact", e)}
            onPointerCancel={(e) => handlePointerLeave("interact", e)}
            onPointerLeave={(e) => handlePointerLeave("interact", e)}
          >
            NEXT
          </div>
        )}
        <div
          style={{ ...buttonStyle, width: "70px", height: "70px" }}
          onPointerDown={(e) => handlePointerDown("jump", e)}
          onPointerUp={(e) => handlePointerUp("jump", e)}
          onPointerCancel={(e) => handlePointerLeave("jump", e)}
          onPointerLeave={(e) => handlePointerLeave("jump", e)}
        >
          JUMP
        </div>
      </div>
    </div>
  );
};
