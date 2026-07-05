"use client";

import { useEffect, useState } from "react";
import { CoolingScene, STATION_LABELS } from "./CoolingScene";
import {
  computeSimulation,
  SEAWATER_FLOW_L_PER_H_PER_KW,
  WASTE_HEAT_RATIO,
  FRESHWATER_L_PER_KWH_WASTE_HEAT,
  PLANT_CAPACITY_L_PER_DAY_MAX,
  PLANT_CAPACITY_L_PER_DAY_Y1,
  CO2_SAVED_KG_PER_L,
  PUE,
} from "./engine";

const fmt = (n: number, digits = 0) =>
  n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });

export function CoolingSimulationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loadMw, setLoadMw] = useState(1.0);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const sim = computeSimulation(loadMw);

  return (
    <>
      <button className="btn-outline" onClick={() => setIsOpen(true)}>
        ▶ Watch the cooling loop
      </button>

      {isOpen && (
        <div className="cooling-modal-overlay">
          <div className="cooling-modal-header">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
              How the cooling &amp; desalination loop works
            </span>
            <button className="btn-ghost" onClick={() => setIsOpen(false)} aria-label="Close">
              ✕ Close
            </button>
          </div>

          <div className="cooling-modal-body">
            <div className="cooling-scene-container">
              <CoolingScene loadMw={loadMw} />
              {STATION_LABELS.map((label) => (
                <div
                  key={label.id}
                  className="cooling-station-label"
                  style={{ left: label.left, top: label.top, borderColor: label.color }}
                >
                  {label.title}
                </div>
              ))}
            </div>

            <div className="cooling-modal-panel">
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                Compute Load
              </h3>

              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <label className="form-label">Facility IT load</label>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700 }}>
                    {loadMw.toFixed(2)} MW
                  </span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="2.0"
                  step="0.05"
                  value={loadMw}
                  onChange={(e) => setLoadMw(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent)", background: "var(--card-border)", height: "4px", outline: "none" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.5rem" }}>
                  <span>0.25 MW</span>
                  <span>Phase 1 max: 2.0 MW</span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.25rem", display: "grid", gap: "0.85rem" }}>
                <Readout label="Facility draw (PUE 1.028)" value={`${fmt(sim.facilityDrawKw)} kW`} />
                <Readout label="Seawater cooling flow" value={`${fmt(sim.seawaterFlowLPerH)} L/h`} />
                <Readout label="Coolant exit temperature" value={`${sim.coolantExitTempC}°C`} />
                <Readout label="Waste heat captured" value={`${fmt(sim.wasteHeatKw)} kW`} />
                <Readout
                  label="Freshwater output"
                  value={`${fmt(sim.freshwaterLPerDay)} L/day${sim.freshwaterCapped ? " (plant capacity)" : ""}`}
                />
                <Readout label="CO₂ avoided" value={`${fmt(sim.co2AvoidedKgPerDay)} kg/day`} />
                <Readout label="Thermal energy absorbed" value={`${fmt(sim.thermalAbsorbedMwhPerMonth, 1)} MWh/mo`} />
              </div>

              <div style={{ borderTop: "1px solid var(--card-border)", marginTop: "1.25rem", paddingTop: "1.25rem" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                  Mineral Recovery (scaled from Y3 reference)
                </div>
                <div style={{ display: "grid", gap: "0.85rem" }}>
                  <Readout label="NaCl" value={`${fmt(sim.mineralYieldsKgPerDay.nacl)} kg/day`} />
                  <Readout label="Mg(OH)₂" value={`${fmt(sim.mineralYieldsKgPerDay.mgOh2)} kg/day`} />
                  <Readout label="Bromine" value={`${fmt(sim.mineralYieldsKgPerDay.bromine, 1)} kg/day`} />
                  <Readout label="Brine processed" value={`${fmt(sim.brineProcessedM3PerDay, 1)} m³/day`} />
                </div>
              </div>

              <details style={{ marginTop: "1.5rem", borderTop: "1px solid var(--card-border)", paddingTop: "1.25rem" }}>
                <summary style={{ cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Assumptions &amp; formulas
                </summary>
                <ul style={{ fontSize: "0.7rem", color: "var(--muted)", lineHeight: 1.7, marginTop: "0.85rem", paddingLeft: "1.1rem" }}>
                  <li>Seawater cooling flow = load × {SEAWATER_FLOW_L_PER_H_PER_KW} L/h per kW (per roborns.com/server)</li>
                  <li>Facility draw = load × PUE ({PUE})</li>
                  <li>Waste heat = load × {WASTE_HEAT_RATIO} (financial-model ratio; the homepage currently states 0.70 — see Cooling_Desalination_Process_Technical.md §7.1 for the reconciliation)</li>
                  <li>Freshwater output = waste heat × 24h × {FRESHWATER_L_PER_KWH_WASTE_HEAT} L/kWh, capped at {fmt(PLANT_CAPACITY_L_PER_DAY_MAX)} L/day (Y1 target: {fmt(PLANT_CAPACITY_L_PER_DAY_Y1)} L/day)</li>
                  <li>CO₂ avoided = freshwater output × {CO2_SAVED_KG_PER_L} kg/L</li>
                  <li>Mineral yields scale linearly from the Y3 reference point (150,000 L/day → NaCl 8t/d, Mg(OH)₂ 1.2t/d, Bromine 120kg/d) — a simplification pending a full brine mass-balance, see §7.4</li>
                </ul>
              </details>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{label}</span>
      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--off-white)", fontFamily: "var(--font-mono)" }}>{value}</span>
    </div>
  );
}
