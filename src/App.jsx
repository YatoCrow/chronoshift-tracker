import React, { useState } from 'react';
import './index.css';

import iconNight from './assets/night-phase_20.webp';
import iconFullMoon from './assets/fullmoon-phase_20.webp';
import iconDay from './assets/day-phase_20.webp';
import iconScorch from './assets/scorch-phase_20.webp';
import iconDusk from './assets/dusk-phase_20.webp';

const phaseIcons = {
  "Night": iconNight,
  "Full Moon": iconFullMoon,
  "Day": iconDay,
  "Scorch": iconScorch,
  "Dusk": iconDusk
};

const phases = ["Night", "Full Moon", "Day", "Scorch", "Dusk"];

function App() {
  const [hp1, setHp1] = useState(30);
  const [hp2, setHp2] = useState(30);
  const [phase, setPhase] = useState("Dusk");
  const [retainMode, setRetainMode] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const adjustHP = (player, amount) => {
    player === 1 ? setHp1(hp1 + amount) : setHp2(hp2 + amount);
  };

  const rollPhase = () => {
    setIsRolling(true);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      if (roll === 6) {
        setRetainMode(true);
      } else {
        setPhase(phases[roll - 1]);
        setRetainMode(false);
      }
      setIsRolling(false);
    }, 500);
  };

  const timecharge = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll <= 2) {
      alert("Timecharge failed.");
    } else if (roll <= 5) {
      rollPhase();
    } else {
      const input = prompt("Choose a Time Phase (Night, Full Moon, Day, Scorch, Dusk):");
      if (input && phases.includes(input)) {
        setPhase(input);
        setRetainMode(false);
      }
    }
  };

  const getPhaseLabel = () => retainMode ? `RETAIN: ${phase.toUpperCase()}` : phase.toUpperCase();
  const getPhaseIcon = () => phaseIcons[phase];

  return (
    <div className="tracker">
      <div className="player top">
        <div className="label">Player 1</div>
        <div className="hp">{hp1}</div>
        <div className="controls">
          <button onClick={() => adjustHP(1, -1)}>-</button>
          <button onClick={() => adjustHP(1, 1)}>+</button>
        </div>
      </div>

      <div className="time-phase">
        <div className={`phase-label ${isRolling ? 'rolling' : ''}`}>
          <img
            src={getPhaseIcon()}
            alt={`${phase} icon`}
            className="phase-label-icon"
          />
          {getPhaseLabel()}
        </div>
        <button onClick={rollPhase}>Roll Phase</button>
        <button onClick={timecharge}>Timecharge</button>
      </div>

      <div className="player bottom">
        <div className="label">Player 2</div>
        <div className="hp">{hp2}</div>
        <div className="controls">
          <button onClick={() => adjustHP(2, -1)}>-</button>
          <button onClick={() => adjustHP(2, 1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
