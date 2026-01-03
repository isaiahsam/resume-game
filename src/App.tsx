import { useState, useEffect } from "react";
import { MainMenu } from "./game/scenes/MainMenu";
import { LevelSelect } from "./game/scenes/LevelSelect";
import { GameLevel } from "./game/scenes/GameLevel";
import { BossFight } from "./game/scenes/BossFight";
import { ResumeSummary } from "./game/scenes/ResumeSummary";
import { Intro } from "./game/scenes/Intro";
import { LEVELS } from "./game/levels/levelData";
import type { SaveData } from "./game/engine/types";
import {
  saveToDisk,
  loadFromDisk,
  createDefaultSave,
  decodeStateFromURL,
} from "./game/utils/saveSystem";

type GameScene =
  | "intro"
  | "menu"
  | "levelSelect"
  | "game"
  | "boss"
  | "summary";

function App() {
  const [currentScene, setCurrentScene] = useState<GameScene>("menu");
  const [saveData, setSaveData] = useState<SaveData>(createDefaultSave());
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [showURLPrompt, setShowURLPrompt] = useState(false);
  const [urlSaveData, setUrlSaveData] = useState<SaveData | null>(null);

  // Initialize save data
  useEffect(() => {
    const urlData = decodeStateFromURL();

    if (urlData) {
      setUrlSaveData(urlData);
      setShowURLPrompt(true);
    } else {
      const diskData = loadFromDisk();
      if (diskData) {
        setSaveData(diskData);
        // Show intro if first time
        if (!diskData.seenIntro) {
          setCurrentScene("intro");
        }
      } else {
        // First time player - show intro
        setCurrentScene("intro");
      }
    }
  }, []);

  const handleLoadURLProgress = (load: boolean) => {
    if (load && urlSaveData) {
      setSaveData(urlSaveData);
      saveToDisk(urlSaveData);
    } else if (!load) {
      const diskData = loadFromDisk();
      if (diskData) {
        setSaveData(diskData);
      }
    }
    setShowURLPrompt(false);
  };

  const handleIntroComplete = () => {
    const updated = { ...saveData, seenIntro: true };
    setSaveData(updated);
    saveToDisk(updated);

    // Start with tutorial (level 0)
    setCurrentLevelId(0);
    setCurrentScene("game");
  };

  const handleNewGame = () => {
    const newSave = createDefaultSave();
    newSave.seenIntro = true; // Skip intro for new game from menu
    setSaveData(newSave);
    saveToDisk(newSave);
    setCurrentLevelId(0); // Start with tutorial
    setCurrentScene("game");
  };

  const handleContinue = () => {
    if (saveData.completedLevels.length === 0) {
      setCurrentLevelId(0);
      setCurrentScene("game");
    } else if (saveData.completedLevels.length < LEVELS.length) {
      // Find next uncompleted level
      let nextLevel = 0;
      for (let i = 0; i < LEVELS.length; i++) {
        if (!saveData.completedLevels.includes(i)) {
          nextLevel = i;
          break;
        }
      }
      setCurrentLevelId(nextLevel);
      setCurrentScene("game");
    } else {
      // All levels completed, go to boss
      setCurrentScene("boss");
    }
  };

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevelId(levelId);
    setCurrentScene("game");
  };

  const handleBossSelect = () => {
    setCurrentScene("boss");
  };

  const handleLevelComplete = (xp: number, coins: number) => {
    if (currentLevelId === null) return;

    const updatedSave: SaveData = {
      ...saveData,
      completedLevels: [...new Set([...saveData.completedLevels, currentLevelId])],
      totalXP: saveData.totalXP + xp,
      totalCoins: saveData.totalCoins + coins,
      lastPlayed: Date.now(),
    };

    setSaveData(updatedSave);
    saveToDisk(updatedSave);

    // Check if all levels are complete
    if (updatedSave.completedLevels.length >= LEVELS.length && !updatedSave.bossComplete) {
      setCurrentScene("boss");
    } else {
      setCurrentScene("levelSelect");
    }
  };

  const handleBossComplete = (badges: string[]) => {
    const updatedSave: SaveData = {
      ...saveData,
      badges: [...new Set([...saveData.badges, ...badges])],
      bossComplete: true,
      lastPlayed: Date.now(),
    };

    setSaveData(updatedSave);
    saveToDisk(updatedSave);

    setCurrentScene("summary");
  };

  const handleBackToMenu = () => {
    setCurrentScene("menu");
    setCurrentLevelId(null);
  };

  const handleGoToLevelSelect = () => {
    setCurrentScene("levelSelect");
  };

  if (showURLPrompt && urlSaveData) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            padding: "40px",
            borderRadius: "12px",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "24px" }}>Load Shared Progress?</h2>
          <p style={{ marginBottom: "30px", fontSize: "16px", opacity: 0.9 }}>
            This link contains saved game progress. Would you like to load it?
          </p>

          <div style={{ marginBottom: "20px", fontSize: "14px", opacity: 0.8 }}>
            <div>Levels: {urlSaveData.completedLevels.length} completed</div>
            <div>XP: {urlSaveData.totalXP}</div>
            <div>Coins: {urlSaveData.totalCoins}</div>
          </div>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button
              onClick={() => handleLoadURLProgress(true)}
              style={{
                background: "#2ecc71",
                color: "#fff",
                border: "none",
                padding: "15px 30px",
                borderRadius: "8px",
                fontSize: "16px",
                fontFamily: "monospace",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Yes, Load It
            </button>
            <button
              onClick={() => handleLoadURLProgress(false)}
              style={{
                background: "#95a5a6",
                color: "#fff",
                border: "none",
                padding: "15px 30px",
                borderRadius: "8px",
                fontSize: "16px",
                fontFamily: "monospace",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              No, Use Local Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {currentScene === "intro" && <Intro onComplete={handleIntroComplete} />}

      {currentScene === "menu" && (
        <MainMenu
          onStart={handleNewGame}
          onContinue={handleContinue}
          onLevelSelect={handleGoToLevelSelect}
          hasSave={saveData.completedLevels.length > 0}
        />
      )}

      {currentScene === "levelSelect" && (
        <LevelSelect
          completedLevels={saveData.completedLevels}
          bossComplete={saveData.bossComplete}
          onSelectLevel={handleLevelSelect}
          onSelectBoss={handleBossSelect}
          onBack={handleBackToMenu}
        />
      )}

      {currentScene === "game" && currentLevelId !== null && (
        <GameLevel
          key={currentLevelId}
          levelConfig={LEVELS[currentLevelId]}
          saveData={saveData}
          onLevelComplete={handleLevelComplete}
          onQuit={handleBackToMenu}
        />
      )}

      {currentScene === "boss" && (
        <BossFight onComplete={handleBossComplete} onQuit={handleBackToMenu} />
      )}

      {currentScene === "summary" && (
        <ResumeSummary saveData={saveData} onMainMenu={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
