"use client";

import { useState } from "react";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

const WATER_GRADES = [
  { id: "potable", name: "Fresh Potable Water", desc: "Municipal & domestic consumption grade, mineral-balanced for health.", rate: 0 },
  { id: "industrial", name: "High-Purity Industrial", desc: "Deionized ultra-pure water for manufacturing, electronics, & laboratories.", rate: 0.0001 },
  { id: "mineralized", name: "Remineralized Mineral Water", desc: "Infused with calcium and magnesium ions harvested directly from brine.", rate: 0.0002 },
];

const OFF_TAKE_CONTRACTS = [
  { years: 1, label: "1 Year", discount: 0 },
  { years: 3, label: "3 Years", discount: 0.08 },
  { years: 5, label: "5 Years", discount: 0.18 },
];

export default function WaterOfftake() {
  const [selectedGrade, setSelectedGrade] = useState(WATER_GRADES[0]);
  const [dailyVolume, setDailyVolume] = useState(25000);
  const [contractYears, setContractYears] = useState(OFF_TAKE_CONTRACTS[0]);

  const baseRate = selectedGrade.rate;
  const discountedRate = baseRate * (1 - contractYears.discount);
  const monthlyCost = dailyVolume * discountedRate * 30.4;
  
  // Eco savings: standard grid reverse osmosis generates approx 0.035 kg CO2 per Litre of water. 
  // By reusing waste thermal energy, we save 0.028 kg CO2 per Litre.
  const co2SavedKgMonthly = Math.round(dailyVolume * 30.4 * 0.028);

  // Compute thermal reject absorbed: approx 0.022 kWh of thermal energy absorbed per Litre in MED-TVC
  const thermalEnergyAbsorbedMwh = parseFloat(((dailyVolume * 30.4 * 0.022) / 1000).toFixed(2));

  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      {/* Hero Header */}
      <section className="product-hero">
        <div>
          <div className="hero-tag tag-water">02 / Seawater Desalination</div>
          <h1>
            Pure.<br />
            <em>Circular.</em>
          </h1>
          <p className="product-hero-body">
            Harnessing 65°C waste heat from high-density server racks, our Multi-Effect Distillation (MED-TVC) plants desalinate coastal seawater with zero carbon emissions. Offering municipal-grade potable water and ultra-pure industrial water.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">Desalination plant capacity</span>
            <span className="meta-val hi">150,000 Litres/Day</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Process technology</span>
            <span className="meta-val">Multi-Effect Distillation (MED)</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Carbon footprint</span>
            <span className="meta-val">Net Zero (Waste Heat Reuse)</span>
          </div>
        </div>
      </section>

      {/* Main content body */}
      <div className="product-body product-body-grid">
        
        {/* Left Side: Technology Info */}
        <div>
          <div className="page-image-wrap">
            <img src="/images/water.jpg" alt="Roborns Waste-Heat Desalination System" />
          </div>
          <section className="product-section">
            <h3>Waste-Heat Driven Multi-Effect Distillation</h3>
            <p>
              Conventional desalination depends on energy-intensive Reverse Osmosis (RO) membranes or burning fossil fuels to boil water. Roborns utilizes a thermodynamics-driven circular loop. Seawater is drawn to condense and absorb heat from our liquid-immersion GPU server floor. 
            </p>
            <p>
              This warm seawater then enters a vacuum chamber setup. The high-temperature fluid (65°C) flashes into vapor across sequential low-pressure cells. Because the energy is sourced entirely from the servers&apos; thermal reject, the system achieves a 100% reduction in direct carbon emissions compared to conventional thermal desalination.
            </p>
          </section>

          {/* Pillars */}
          <div className="pillars-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "3rem" }}>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#85B7EB" }}>💧</div>
              <div className="pillar-title">Fresh Potable Water</div>
              <p className="pillar-desc">Remineralized with trace elements to meet strict WHO guidelines, serving municipal and agricultural pipelines directly.</p>
            </div>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#85B7EB" }}>🧪</div>
              <div className="pillar-title">Mineral Water Products</div>
              <p className="pillar-desc">A premium natural mineral profile (salt, magnesium, potassium) extracted straight from local brine concentrates.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Calculator */}
        <div>
          <div className="calc-card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Water Offtake Builder</span>
              <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#85B7EB", border: "1px solid #85B7EB", padding: "0.2rem 0.5rem" }}>SUPPLY LOOP</span>
            </h3>

            {/* Step 1: Select Grade */}
            <div style={{ marginBottom: "2rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>1. Select Water Grade</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {WATER_GRADES.map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedGrade(grade)}
                    style={{
                      background: selectedGrade.id === grade.id ? "rgba(133,183,235,0.08)" : "transparent",
                      border: selectedGrade.id === grade.id ? "1px solid #85B7EB" : "1px solid var(--card-border)",
                      color: selectedGrade.id === grade.id ? "var(--off-white)" : "var(--muted)",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>{grade.name}</span>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#85B7EB" }}>{grade.rate === 0 ? "Free" : `$${grade.rate}/L`}</span>
                    </div>
                    <div style={{ fontSize: "0.6rem", lineHeight: 1.4 }}>{grade.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Daily Volume */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label className="form-label">2. Daily Offtake Volume</label>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#85B7EB", fontWeight: 700 }}>{dailyVolume.toLocaleString()} Litres/day</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={dailyVolume}
                onChange={(e) => setDailyVolume(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#85B7EB",
                  background: "var(--card-border)",
                  height: "4px",
                  outline: "none"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.5rem" }}>
                <span>5,000 L</span>
                <span>75,000 L</span>
                <span>150,000 L</span>
              </div>
            </div>

            {/* Step 3: Contract Term */}
            <div style={{ marginBottom: "2.5rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>3. Contract Duration</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {OFF_TAKE_CONTRACTS.map((term) => (
                  <button
                    key={term.years}
                    onClick={() => setContractYears(term)}
                    style={{
                      background: contractYears.years === term.years ? "rgba(133,183,235,0.08)" : "transparent",
                      border: contractYears.years === term.years ? "1px solid #85B7EB" : "1px solid var(--card-border)",
                      color: contractYears.years === term.years ? "var(--off-white)" : "var(--muted)",
                      padding: "0.75rem 0.5rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      transition: "all 0.2s"
                    }}
                  >
                    <div>{term.label}</div>
                    {term.discount > 0 && <div style={{ color: "#85B7EB", fontSize: "0.55rem", marginTop: "0.1rem" }}>-{term.discount * 100}% discount</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Outputs */}
            <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>CO2 Emissions Avoided</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--off-white)" }}>{co2SavedKgMonthly.toLocaleString()} kg/mo</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>Server Heat Absorbed</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--off-white)" }}>{thermalEnergyAbsorbedMwh} MWh/mo</span>
                </div>
              </div>

              {/* Loop integration */}
              <div style={{ background: "rgba(133,183,235,0.03)", border: "1px dashed rgba(133,183,235,0.2)", padding: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "#85B7EB", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>⚡ Energy Offload</span>
                <p style={{ fontSize: "0.72rem", color: "var(--off-white)", marginTop: "0.25rem", margin: 0, lineHeight: 1.4 }}>
                  This capacity directly cools equivalent high-intensity servers, bypassing standard mechanical chiller loads and saving regional grids millions of megawatt hours.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>Estimated Monthly Billing:</span>
                <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--off-white)" }}>
                  {baseRate === 0 ? "Free" : (
                    <>${Math.round(monthlyCost).toLocaleString()}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--muted)" }}>/mo</span></>
                  )}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                <span>Rate: {baseRate === 0 ? "Free" : `$${discountedRate.toFixed(4)} per Litre`}</span>
                <span>FOB facility edge pipe connection</span>
              </div>
            </div>

            {/* Inquire CTA */}
            <LeadForm
              interest="Water"
              config={`${dailyVolume.toLocaleString()} L/day ${selectedGrade.name} · ${contractYears.label} contract · ${baseRate === 0 ? "Free" : `$${Math.round(monthlyCost).toLocaleString()}/mo`}`}
              source="roborns.com/water"
              accent="#85B7EB"
              label="Enquire About Water Offtake →"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
