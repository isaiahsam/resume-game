import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../../data/resume";

interface IntroProps {
  onComplete: () => void;
}

const DIALOG_SEQUENCE = [
  {
    speaker: "Guide",
    text: `Welcome, traveler! I am your guide through Career Kingdom.`,
  },
  {
    speaker: "Guide",
    text: `You are ${PERSONAL_INFO.name.split(" ")[0]}'s avatar, on a quest to collect proof-of-skill badges and experience points.`,
  },
  {
    speaker: "Guide",
    text: "Throughout this journey, you'll explore 6 unique realms, each representing a chapter of professional growth.",
  },
  {
    speaker: "Guide",
    text: "Talk to NPCs, collect coins, and complete challenges to unlock your full resume!",
  },
  {
    speaker: "Guide",
    text: "But first, let's teach you the ropes. Ready for your tutorial?",
  },
];

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "e" || e.key === "E") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < DIALOG_SEQUENCE.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentDialog = DIALOG_SEQUENCE[currentIndex];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "monospace",
        padding: "20px",
      }}
    >
      {/* Character illustration */}
      <div
        style={{
          width: "120px",
          height: "150px",
          marginBottom: "40px",
          position: "relative",
        }}
      >
        {/* Simple pixel art character */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* Body */}
          <div
            style={{
              width: "48px",
              height: "64px",
              background: "#3498db",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            {/* Head */}
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#f39c12",
                borderRadius: "4px",
                position: "absolute",
                top: "-36px",
                left: "8px",
              }}
            >
              {/* Eyes */}
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#000",
                  position: "absolute",
                  top: "12px",
                  left: "8px",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#000",
                  position: "absolute",
                  top: "12px",
                  right: "8px",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dialog box */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          border: "3px solid #3498db",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#3498db",
            marginBottom: "15px",
          }}
        >
          {currentDialog.speaker}
        </div>
        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "25px",
            minHeight: "60px",
          }}
        >
          {currentDialog.text}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            {currentIndex + 1} / {DIALOG_SEQUENCE.length}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSkip}
              style={{
                background: "rgba(149, 165, 166, 0.3)",
                color: "#fff",
                border: "2px solid #95a5a6",
                padding: "10px 20px",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "monospace",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Skip Intro
            </button>
            <button
              onClick={handleNext}
              style={{
                background: "#3498db",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "monospace",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {currentIndex < DIALOG_SEQUENCE.length - 1 ? "Next [E/Space]" : "Start Tutorial!"}
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          fontSize: "12px",
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        Press E, Space, or Enter to continue
      </div>
    </div>
  );
};
