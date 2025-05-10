import { useState } from "react";
import "./App.css";

function ChronoshiftTracker() {
  const [playerHP, setPlayerHP] = useState([30, 30]);
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ name: "", atk: "", hp: "" });
  const [theme, setTheme] = useState("night");

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

  return (
    <div className={`theme-${theme}`}>
  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
  <button onClick={() => setTheme("night")}>🌑 Night Phase</button>
  <button onClick={() => setTheme("fullmoon")}>🌕 Full Moon Phase</button>
</div>
    <h1>Chronoshift Tracker</h1>

      
      <div className="player-hp">
  {playerHP.map((hp, idx) => (
    <div key={idx} className="hp-counter">
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
