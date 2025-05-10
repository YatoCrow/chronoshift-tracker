import { useState } from "react";
import "./App.css";

function ChronoshiftTracker() {
  const [playerHP, setPlayerHP] = useState([30, 30]);
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ name: "", atk: "", hp: "" });
  const [theme, setTheme] = useState("night");
  const [playerLabels, setPlayerLabels] = useState(["", ""]);
  const [showHelp, setShowHelp] = useState(false);

const rollPhase = () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  if (roll === 6) return; // retain current phase

  const phases = ["night", "fullmoon", "day", "scorch", "dusk"];
  setTheme(phases[roll - 1]);
};
  
  const updateHP = (index, delta) => {
    setPlayerHP((prev) => {
      const copy = [...prev];
      copy[index] += delta;
      return copy;
    });
  };

  const addUnit = () => {
    if (!newUnit.name || !newUnit.atk || !newUnit.hp) return;
    setUnits((prev) => [...prev, { ...newUnit, id: Date.now() }]);
    setNewUnit({ name: "", atk: "", hp: "" });
  };

  const updateUnitStat = (id, stat, delta) => {
    setUnits((prev) =>
      prev.map((unit) =>
        unit.id === id ? { ...unit, [stat]: String(Number(unit[stat]) + delta) } : unit
      )
    );
  };

  const removeUnit = (id) => {
    setUnits((prev) => prev.filter((unit) => unit.id !== id));
  };

  const resetTracker = () => {
  setPlayerHP([30, 30]);
  setPlayerLabels(["Player 1", "Player 2"]);
  setTheme("night"); // Optional: reset to default phase
};

  return (
    <div className={`theme-${theme}`}>
  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
  <button onClick={() => setTheme("night")}>🌑 Night Phase</button>
  <button onClick={() => setTheme("fullmoon")}>🌕 Full Moon Phase</button>
    <button onClick={() => setTheme("day")}>☀️ Day Phase</button>
    <button onClick={() => setTheme("scorch")}>🔥 Scorch Phase</button>
    <button onClick={() => setTheme("dusk")}>🌆 Dusk Phase</button>
    {/* Floating Help Button */}
<button
  onClick={() => setShowHelp(!showHelp)}
  style={{
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    borderRadius: "50%",
    width: "3rem",
    height: "3rem",
    fontSize: "1.5rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    boxShadow: "0 0 10px #00000088",
    zIndex: 1000
  }}
>
  ?
</button>

{/* Help Panel */}
{showHelp && (
  <div
    style={{
      position: "fixed",
      bottom: "5rem",
      right: "1rem",
      width: "300px",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      padding: "1rem",
      borderRadius: "8px",
      boxShadow: "0 0 12px #00000099",
      zIndex: 999
    }}
  >
    <h3 style={{ marginTop: 0 }}>Chronoshift Tracker Help</h3>
    <ul style={{ paddingLeft: "1rem", fontSize: "0.9rem" }}>
      <li>🎯 Track player HP</li>
      <li>✏️ Click labels to rename clans</li>
      <li>🎲 Use “Roll Phase” to shift time</li>
      <li>🌕 Time Phases affect your cards</li>
      <li>🔁 Use Reset to start over anytime</li>
    </ul>
  </div>
)}
</div>
<div style={{ textAlign: "center", marginBottom: "1rem" }}>
  <button onClick={rollPhase}>🎲 Roll Phase</button>
</div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
  <button onClick={resetTracker}>🔁 Reset Tracker</button>
</div>

      
    <h1>Chronoshift Tracker</h1>

      
<div className="player-hp">
  {playerHP.map((hp, idx) => (
    <div key={idx} className="hp-counter">
      <input
  type="text"
  value={playerLabels[idx]}
  placeholder="Click to name this Clan"
  onChange={(e) => {
    const newLabels = [...playerLabels];
    newLabels[idx] = e.target.value;
    setPlayerLabels(newLabels);
  }}
  style={{
    width: "100%",
    marginBottom: "0.5rem",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.1rem",
    backgroundColor: "transparent",
    color: "inherit",
    border: "none",
    borderBottom: "1px solid currentColor",
  }}
/>
      <div className="hp-controls">
        <button onClick={() => updateHP(idx, -1)}>-</button>
        <span>{hp}</span>
        <button onClick={() => updateHP(idx, 1)}>+</button>
      </div>
    </div>
  ))}
</div>

      <div className="unit-form">
        <input
          placeholder="Name"
          value={newUnit.name}
          onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
        />
        <input
          placeholder="ATK"
          type="number"
          value={newUnit.atk}
          onChange={(e) => setNewUnit({ ...newUnit, atk: e.target.value })}
        />
        <input
          placeholder="HP"
          type="number"
          value={newUnit.hp}
          onChange={(e) => setNewUnit({ ...newUnit, hp: e.target.value })}
        />
        <button onClick={addUnit}>Add Unit</button>
      </div>

      <div className="unit-list">
        {units.map((unit) => (
          <div key={unit.id} className="unit-card">
            <span>{unit.name}</span>
            <div>
              ATK:
              <button onClick={() => updateUnitStat(unit.id, "atk", -1)}>-</button>
              {unit.atk}
              <button onClick={() => updateUnitStat(unit.id, "atk", 1)}>+</button>
            </div>
            <div>
              HP:
              <button onClick={() => updateUnitStat(unit.id, "hp", -1)}>-</button>
              {unit.hp}
              <button onClick={() => updateUnitStat(unit.id, "hp", 1)}>+</button>
            </div>
            <button onClick={() => removeUnit(unit.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChronoshiftTracker;
