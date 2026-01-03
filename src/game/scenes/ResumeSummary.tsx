import React from "react";
import {
  PERSONAL_INFO,
  EDUCATION,
  THESIS,
  WORK_EXPERIENCE,
  LEADERSHIP_EXPERIENCE,
  PROJECT_EXPERIENCE,
  SKILLS,
} from "../../data/resume";
import type { SaveData } from "../engine/types";
import { copyShareLink } from "../utils/saveSystem";

interface ResumeSummaryProps {
  saveData: SaveData;
  onMainMenu: () => void;
}

export const ResumeSummary: React.FC<ResumeSummaryProps> = ({ saveData, onMainMenu }) => {
  const handleDownloadResume = () => {
    // Link to the actual Resume.pdf
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Isaiah_Sam_Pascual_Resume.pdf";
    link.click();
  };

  const handleCopyShareLink = () => {
    copyShareLink(saveData);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        fontFamily: "monospace",
        padding: "40px 20px",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
            CONGRATULATIONS!
          </h1>
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
            {PERSONAL_INFO.name}
          </h2>
          <div style={{ fontSize: "16px", opacity: 0.9 }}>
            {PERSONAL_INFO.email} • {PERSONAL_INFO.phone}
          </div>
          <div style={{ fontSize: "14px", opacity: 0.8, marginTop: "5px" }}>
            {PERSONAL_INFO.location}
          </div>
        </div>

        {/* Game Stats */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>Your Achievement</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>{saveData.completedLevels.length}</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Levels Completed</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>{saveData.totalXP}</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Total XP</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>{saveData.totalCoins}</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Coins Collected</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>{saveData.badges.length}</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Badges Earned</div>
            </div>
          </div>

          {saveData.badges.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>Badges:</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {saveData.badges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      padding: "8px 15px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Resume Content */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
            EDUCATION
          </h3>
          <div style={{ marginBottom: "15px" }}>
            <div style={{ fontWeight: "bold" }}>{EDUCATION.university}</div>
            <div>{EDUCATION.degree}</div>
            <div>{EDUCATION.gpa} • {EDUCATION.dates}</div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <div style={{ fontWeight: "bold" }}>Thesis: {THESIS.title}</div>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>{THESIS.fullTitle}</div>
            <ul style={{ marginLeft: "20px", marginTop: "8px" }}>
              {THESIS.achievements.map((achievement, i) => (
                <li key={i} style={{ marginBottom: "5px", fontSize: "14px" }}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
            WORK EXPERIENCE
          </h3>
          {WORK_EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold" }}>{exp.company}</div>
              <div>{exp.role} • {exp.dates}</div>
              <ul style={{ marginLeft: "20px", marginTop: "8px" }}>
                {exp.achievements.map((achievement, j) => (
                  <li key={j} style={{ marginBottom: "5px", fontSize: "14px" }}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
            LEADERSHIP & PROJECTS
          </h3>
          {LEADERSHIP_EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold" }}>{exp.organization}</div>
              <div>{exp.role} • {exp.dates}</div>
              <ul style={{ marginLeft: "20px", marginTop: "8px" }}>
                {exp.achievements.map((achievement, j) => (
                  <li key={j} style={{ marginBottom: "5px", fontSize: "14px" }}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
          {PROJECT_EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <div style={{ fontWeight: "bold" }}>{exp.project}</div>
              <div>{exp.role} • {exp.dates}</div>
              <ul style={{ marginLeft: "20px", marginTop: "8px" }}>
                {exp.achievements.map((achievement, j) => (
                  <li key={j} style={{ marginBottom: "5px", fontSize: "14px" }}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
            TECHNICAL SKILLS
          </h3>
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} style={{ marginBottom: "15px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{category}</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>{skills.join(", ")}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", marginBottom: "40px" }}>
          <button
            onClick={handleDownloadResume}
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
            Download PDF Resume
          </button>

          <button
            onClick={handleCopyShareLink}
            style={{
              background: "#3498db",
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
            Copy Share Link
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            style={{
              background: "#e67e22",
              color: "#fff",
              border: "none",
              padding: "15px 30px",
              borderRadius: "8px",
              fontSize: "16px",
              fontFamily: "monospace",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Email Me
          </a>

          <button
            onClick={onMainMenu}
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
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
