import React, { useState } from "react";
import {
  COSMETICS,
  getCosmeticsByType,
  isCosmeticUnlocked,
  getCosmeticPrice,
  type Cosmetic,
  type CosmeticLoadout,
} from "../../data/cosmetics";

interface CosmeticsProps {
  loadout: CosmeticLoadout;
  ownedCosmetics: string[];
  totalCoins: number;
  completedLevels: number[];
  bossComplete: boolean;
  onPurchase: (cosmeticId: string, cost: number) => void;
  onEquip: (type: "skin" | "hat" | "trail", cosmeticId: string) => void;
  onBack: () => void;
}

export const Cosmetics: React.FC<CosmeticsProps> = ({
  loadout,
  ownedCosmetics,
  totalCoins,
  completedLevels,
  bossComplete,
  onPurchase,
  onEquip,
  onBack,
}) => {
  const [selectedTab, setSelectedTab] = useState<"skin" | "hat" | "trail">("skin");

  const cosmetics = getCosmeticsByType(selectedTab);

  const handleEquipOrPurchase = (cosmetic: Cosmetic) => {
    const owned = ownedCosmetics.includes(cosmetic.id);
    const unlocked = isCosmeticUnlocked(cosmetic, completedLevels, bossComplete, totalCoins);

    if (!unlocked) {
      alert("Complete the required challenge to unlock this item!");
      return;
    }

    if (owned) {
      // Equip
      onEquip(cosmetic.type as "skin" | "hat" | "trail", cosmetic.id);
    } else {
      // Purchase
      const price = getCosmeticPrice(cosmetic, owned);
      if (totalCoins >= price) {
        onPurchase(cosmetic.id, price);
        onEquip(cosmetic.type as "skin" | "hat" | "trail", cosmetic.id);
      } else {
        alert(`Not enough coins! Need ${price}, have ${totalCoins}`);
      }
    }
  };

  const handleRandomize = () => {
    const randomSkin = getCosmeticsByType("skin")[Math.floor(Math.random() * getCosmeticsByType("skin").length)];
    const randomHat = getCosmeticsByType("hat")[Math.floor(Math.random() * getCosmeticsByType("hat").length)];
    const randomTrail = getCosmeticsByType("trail")[Math.floor(Math.random() * getCosmeticsByType("trail").length)];

    onEquip("skin", randomSkin.id);
    onEquip("hat", randomHat.id);
    onEquip("trail", randomTrail.id);
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    background: active ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: active ? "2px solid #fff" : "2px solid transparent",
    padding: "12px 24px",
    borderRadius: "8px 8px 0 0",
    fontSize: "16px",
    fontFamily: "monospace",
    cursor: "pointer",
    fontWeight: "bold",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        fontFamily: "monospace",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px" }}>COSMETICS SHOP</h1>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            💰 {totalCoins} Coins
          </div>
        </div>

        {/* Character Preview */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Your Character</h2>
          {/* Simple character preview */}
          <div style={{ display: "inline-block", position: "relative", width: "100px", height: "120px" }}>
            {/* Body - using equipped skin */}
            <div
              style={{
                width: "48px",
                height: "64px",
                background: COSMETICS.find((c) => c.id === loadout.skin)?.colors?.primary || "#3498db",
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "4px",
              }}
            >
              {/* Head */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: COSMETICS.find((c) => c.id === loadout.skin)?.colors?.secondary || "#f39c12",
                  position: "absolute",
                  top: "-36px",
                  left: "8px",
                  borderRadius: "4px",
                }}
              />
              {/* Hat indicator */}
              {loadout.hat !== "hat-none" && (
                <div
                  style={{
                    width: "36px",
                    height: "12px",
                    background: COSMETICS.find((c) => c.id === loadout.hat)?.color || "#e74c3c",
                    position: "absolute",
                    top: "-48px",
                    left: "6px",
                    borderRadius: "6px 6px 0 0",
                  }}
                />
              )}
            </div>
          </div>

          <div style={{ marginTop: "20px", fontSize: "14px", opacity: 0.8 }}>
            <div>Skin: {COSMETICS.find((c) => c.id === loadout.skin)?.name}</div>
            <div>Hat: {COSMETICS.find((c) => c.id === loadout.hat)?.name}</div>
            <div>Trail: {COSMETICS.find((c) => c.id === loadout.trail)?.name}</div>
          </div>

          <button
            onClick={handleRandomize}
            style={{
              marginTop: "15px",
              background: "#9b59b6",
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
            🎲 Randomize Look
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "5px", marginBottom: "20px" }}>
          <button onClick={() => setSelectedTab("skin")} style={tabStyle(selectedTab === "skin")}>
            Skins
          </button>
          <button onClick={() => setSelectedTab("hat")} style={tabStyle(selectedTab === "hat")}>
            Hats
          </button>
          <button onClick={() => setSelectedTab("trail")} style={tabStyle(selectedTab === "trail")}>
            Trails
          </button>
        </div>

        {/* Cosmetics Grid */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "0 12px 12px 12px",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {cosmetics.map((cosmetic) => {
              const owned = ownedCosmetics.includes(cosmetic.id);
              const unlocked = isCosmeticUnlocked(cosmetic, completedLevels, bossComplete, totalCoins);
              const equipped =
                loadout[cosmetic.type as keyof CosmeticLoadout] === cosmetic.id;
              const price = getCosmeticPrice(cosmetic, owned);

              return (
                <div
                  key={cosmetic.id}
                  style={{
                    background: equipped ? "rgba(46, 204, 113, 0.3)" : "rgba(255, 255, 255, 0.1)",
                    border: equipped ? "2px solid #2ecc71" : "2px solid transparent",
                    borderRadius: "8px",
                    padding: "15px",
                    cursor: unlocked ? "pointer" : "not-allowed",
                    opacity: unlocked ? 1 : 0.5,
                  }}
                  onClick={() => unlocked && handleEquipOrPurchase(cosmetic)}
                >
                  {/* Color preview */}
                  <div
                    style={{
                      width: "100%",
                      height: "60px",
                      background: cosmetic.colors
                        ? `linear-gradient(135deg, ${cosmetic.colors.primary}, ${cosmetic.colors.secondary})`
                        : cosmetic.color || "#95a5a6",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  />

                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{cosmetic.name}</div>
                  <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "10px" }}>
                    {cosmetic.description}
                  </div>

                  {equipped && <div style={{ color: "#2ecc71", fontSize: "12px", fontWeight: "bold" }}>EQUIPPED</div>}
                  {!equipped && owned && <div style={{ color: "#3498db", fontSize: "12px" }}>Owned</div>}
                  {!equipped && !owned && unlocked && (
                    <div style={{ color: "#f1c40f", fontSize: "12px", fontWeight: "bold" }}>
                      {price > 0 ? `${price} coins` : "FREE"}
                    </div>
                  )}
                  {!unlocked && (
                    <div style={{ color: "#e74c3c", fontSize: "12px" }}>
                      🔒 Locked
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onBack}
          style={{
            background: "#95a5a6",
            color: "#fff",
            border: "none",
            padding: "15px 40px",
            borderRadius: "8px",
            fontSize: "18px",
            fontFamily: "monospace",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};
