import React from "react";
import type { Player } from "../engine/types";

interface HUDProps {
  player: Player;
  levelName: string;
  onPause: () => void;
  onMenu: () => void;
}

export const HUD: React.FC<HUDProps> = ({ player, levelName, onPause, onMenu }) => {
  const buttonStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.2)",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "6px",
    color: "#fff",
    padding: "6px 12px",
    fontSize: "14px",
    fontFamily: "monospace",
    fontWeight: "bold",
    cursor: "pointer",
    touchAction: "none",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "10px 20px",
        background: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 200,
        pointerEvents: "auto",
      }}
    >
      <div>
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{levelName}</div>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <span>Coins: {player.coins}</span>
          <span>XP: {player.xp}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {player.powerUps.length > 0 && (
          <div style={{ textAlign: "right", marginRight: "10px", fontSize: "12px", color: "#9b59b6" }}>
            Powers: {player.powerUps.slice(0, 2).join(", ")}
            {player.powerUps.length > 2 && "..."}
          </div>
        )}

        <button
          onClick={onMenu}
          style={buttonStyle}
          onPointerDown={(e) => e.stopPropagation()}
        >
          MENU
        </button>

        <button
          onClick={onPause}
          style={buttonStyle}
          onPointerDown={(e) => e.stopPropagation()}
        >
          PAUSE
        </button>
      </div>
    </div>
  );
};
