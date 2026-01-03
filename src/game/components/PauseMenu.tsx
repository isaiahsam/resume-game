import React from "react";

interface PauseMenuProps {
  onResume: () => void;
  onMainMenu: () => void;
  onCopyShareLink: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onMainMenu,
  onCopyShareLink,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 300,
        color: "#fff",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ marginBottom: "30px", fontSize: "36px" }}>PAUSED</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "300px",
        }}
      >
        <button
          onClick={onResume}
          style={{
            background: "#3498db",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontFamily: "monospace",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Resume [ESC]
        </button>

        <button
          onClick={onCopyShareLink}
          style={{
            background: "#2ecc71",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontFamily: "monospace",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Copy Share Link
        </button>

        <button
          onClick={onToggleSound}
          style={{
            background: soundEnabled ? "#e67e22" : "#95a5a6",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontFamily: "monospace",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sound: {soundEnabled ? "ON" : "OFF"}
        </button>

        <button
          onClick={onMainMenu}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "18px",
            fontFamily: "monospace",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Main Menu
        </button>
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontSize: "14px",
          color: "#95a5a6",
        }}
      >
        <div>Controls:</div>
        <div>Arrow Keys / WASD - Move</div>
        <div>Space - Jump</div>
        <div>E / F - Interact</div>
        <div>ESC / P - Pause</div>
      </div>
    </div>
  );
};
