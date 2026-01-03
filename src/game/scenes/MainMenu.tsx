import React, { useState } from "react";
import { PERSONAL_INFO } from "../../data/resume";

interface MainMenuProps {
  onStart: () => void;
  onContinue: () => void;
  onLevelSelect: () => void;
  hasSave: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStart,
  onContinue,
  onLevelSelect,
  hasSave,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = [
    { label: "New Game", action: onStart, enabled: true },
    { label: "Continue", action: onContinue, enabled: hasSave },
    { label: "Level Select", action: onLevelSelect, enabled: true },
  ];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        setSelectedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Enter" || e.key === " ") {
        if (options[selectedIndex].enabled) {
          options[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            rgba(255, 255, 255, 0.1) 50px,
            rgba(255, 255, 255, 0.1) 51px
          )`,
          animation: "scroll 2s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      <div style={{ textAlign: "center", marginBottom: "60px", animation: "float 3s ease-in-out infinite" }}>
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          RESUME QUEST
        </h1>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "normal",
            marginBottom: "5px",
          }}
        >
          {PERSONAL_INFO.name}
        </h2>
        <div style={{ fontSize: "14px", opacity: 0.8 }}>
          Interactive Resume Adventure
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "320px",
        }}
      >
        {options.map((option, index) => (
          <button
            key={option.label}
            onClick={option.action}
            disabled={!option.enabled}
            onMouseEnter={() => setSelectedIndex(index)}
            style={{
              background:
                selectedIndex === index
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(255, 255, 255, 0.1)",
              color: option.enabled ? "#fff" : "#666",
              border: selectedIndex === index ? "3px solid #fff" : "3px solid transparent",
              padding: "20px 40px",
              borderRadius: "8px",
              fontSize: "20px",
              fontFamily: "monospace",
              cursor: option.enabled ? "pointer" : "not-allowed",
              fontWeight: "bold",
              transition: "all 0.2s",
              transform: selectedIndex === index ? "scale(1.05)" : "scale(1)",
            }}
          >
            {selectedIndex === index && "▶ "}
            {option.label}
          </button>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "12px",
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        <div>Use Arrow Keys or WASD to navigate</div>
        <div>Press ENTER or SPACE to select</div>
        <div style={{ marginTop: "10px" }}>
          {PERSONAL_INFO.email} • {PERSONAL_INFO.phone}
        </div>
      </div>
    </div>
  );
};
