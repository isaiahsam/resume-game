import React from "react";

interface DialogProps {
  npcName: string;
  text: string;
  currentIndex: number;
  totalMessages: number;
  onNext: () => void;
  onClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({
  npcName,
  text,
  currentIndex,
  totalMessages,
  onNext,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "120px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "95%",
        maxWidth: "1200px",
        background: "rgba(0, 0, 0, 0.9)",
        border: "6px solid #3498db",
        borderRadius: "16px",
        padding: "40px",
        color: "#fff",
        fontFamily: "monospace",
        zIndex: 200,
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "#3498db",
          marginBottom: "20px",
          fontSize: "32px",
        }}
      >
        {npcName}
      </div>
      <div style={{ marginBottom: "25px", lineHeight: "2", fontSize: "26px" }}>{text}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "20px", color: "#95a5a6" }}>
          {currentIndex + 1} / {totalMessages}
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          {currentIndex < totalMessages - 1 ? (
            <button
              onClick={onNext}
              style={{
                background: "#3498db",
                color: "#fff",
                border: "none",
                padding: "16px 32px",
                borderRadius: "8px",
                fontFamily: "monospace",
                cursor: "pointer",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Next [E]
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                background: "#2ecc71",
                color: "#fff",
                border: "none",
                padding: "16px 32px",
                borderRadius: "8px",
                fontFamily: "monospace",
                cursor: "pointer",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Close [E]
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
