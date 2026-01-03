import React, { useState } from "react";
import { LEVEL_DATA } from "../../data/resume";

interface LevelSelectProps {
  completedLevels: number[];
  bossComplete?: boolean;
  onSelectLevel: (levelId: number) => void;
  onSelectBoss?: () => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  completedLevels,
  bossComplete = false,
  onSelectLevel,
  onSelectBoss,
  onBack,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  };

  const isBossUnlocked = completedLevels.length >= LEVEL_DATA.length;

  React.useEffect(() => {
    const maxIndex = isBossUnlocked ? LEVEL_DATA.length + 1 : LEVEL_DATA.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      } else if (e.key === "Enter" || e.key === " ") {
        if (selectedIndex === maxIndex) {
          onBack();
        } else if (selectedIndex === LEVEL_DATA.length && isBossUnlocked && onSelectBoss) {
          onSelectBoss();
        } else if (selectedIndex < LEVEL_DATA.length && isLevelUnlocked(LEVEL_DATA[selectedIndex].id)) {
          onSelectLevel(LEVEL_DATA[selectedIndex].id);
        }
      } else if (e.key === "Escape") {
        onBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, isBossUnlocked]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "monospace",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h1 style={{ marginBottom: "30px", fontSize: "36px" }}>LEVEL SELECT</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {LEVEL_DATA.map((level, index) => {
          const unlocked = isLevelUnlocked(level.id);
          const completed = completedLevels.includes(level.id);
          const selected = selectedIndex === index;

          return (
            <div
              key={level.id}
              onClick={() => unlocked && onSelectLevel(level.id)}
              onMouseEnter={() => setSelectedIndex(index)}
              style={{
                background: selected
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.1)",
                border: selected ? "3px solid #fff" : "3px solid transparent",
                borderRadius: "12px",
                padding: "20px",
                cursor: unlocked ? "pointer" : "not-allowed",
                opacity: unlocked ? 1 : 0.4,
                transition: "all 0.2s",
                transform: selected ? "scale(1.05)" : "scale(1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Level {level.id}</span>
                <span>
                  {completed && "✓ "}
                  {!unlocked && "🔒"}
                </span>
              </div>
              <div style={{ fontSize: "18px", marginBottom: "8px" }}>{level.name}</div>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>
                Collectible: {level.collectible}
              </div>
            </div>
          );
        })}

        {isBossUnlocked && (
          <div
            onClick={() => onSelectBoss && onSelectBoss()}
            onMouseEnter={() => setSelectedIndex(LEVEL_DATA.length)}
            style={{
              background: selectedIndex === LEVEL_DATA.length
                ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
                : "linear-gradient(135deg, #c0392b 0%, #922b21 100%)",
              border: selectedIndex === LEVEL_DATA.length ? "3px solid #FFD700" : "3px solid #e74c3c",
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.2s",
              transform: selectedIndex === LEVEL_DATA.length ? "scale(1.05)" : "scale(1)",
              boxShadow: selectedIndex === LEVEL_DATA.length ? "0 0 20px rgba(255, 215, 0, 0.5)" : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontWeight: "bold" }}>BOSS FIGHT</span>
              <span style={{ fontSize: "20px" }}>
                {bossComplete ? "✓" : "🐉"}
              </span>
            </div>
            <div style={{ fontSize: "18px", marginBottom: "8px" }}>The Final Interview</div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Prove your worth!
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        onMouseEnter={() => setSelectedIndex(isBossUnlocked ? LEVEL_DATA.length + 1 : LEVEL_DATA.length)}
        style={{
          background:
            selectedIndex === (isBossUnlocked ? LEVEL_DATA.length + 1 : LEVEL_DATA.length)
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(255, 255, 255, 0.1)",
          color: "#fff",
          border:
            selectedIndex === (isBossUnlocked ? LEVEL_DATA.length + 1 : LEVEL_DATA.length) ? "3px solid #fff" : "3px solid transparent",
          padding: "15px 40px",
          borderRadius: "8px",
          fontSize: "18px",
          fontFamily: "monospace",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Back to Menu
      </button>

      <div
        style={{
          marginTop: "30px",
          fontSize: "12px",
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        <div>Progress: {completedLevels.length} / {LEVEL_DATA.length} levels completed</div>
      </div>
    </div>
  );
};
