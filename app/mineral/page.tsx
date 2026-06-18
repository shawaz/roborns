"use client";

import { useState } from "react";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

const MINERAL_TEMPLATES = [
  { id: "nacl", name: "Sodium Chloride (NaCl)", formula: "NaCl", desc: "Ultra-pure salt suitable for chemical processes, electrolysis, and food preservation.", rate: 280 },
  { id: "mgoh2", name: "Magnesium Hydroxide", formula: "Mg(OH)₂", desc: "Eco-friendly wastewater treatment, flame retardants, and industrial acid neutralization.", rate: 950 },
  { id: "kcl", name: "Potassium Chloride", formula: "KCl", desc: "Agricultural fertilizer grade, essential plant nutrient additive.", rate: 720 },
  { id: "bromine", name: "Liquid Bromine", formula: "Br₂", desc: "High-density element used in water treatment, flame retardants, and pharmaceutical synthesis.", rate: 6500 },
];

const PURITY_GRADES = [
  { id: "industrial", label: "Industrial (98%)", multiplier: 1.00 },
  { id: "food", label: "Food Grade (99.5%)", multiplier: 1.15 },
  { id: "pharma", label: "Pharma/Reagent (99.9%)", multiplier: 1.35 },
];

export default function MineralSupply() {
  const [selectedMineral, setSelectedMineral] = useState(MINERAL_TEMPLATES[0]);
  const [purityGrade, setPurityGrade] = useState(PURITY_GRADES[0]);
  const [quantityTons, setQuantityTons] = useState(50);

  const baseRate = selectedMineral.rate * purityGrade.multiplier;
  const totalCost = quantityTons * baseRate;

  // Brine processed: roughly 18 cubic meters of raw seawater brine are processed per ton of crystallized salt/mineral output
  const brineProcessedM3 = Math.round(quantityTons * 18);

  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      {/* Hero Header */}
      <section className="product-hero">
        <div>
          <div className="hero-tag tag-mineral">03 / Mineral Crystallization</div>
          <h1>
            Solid.<br />
            <em>Recovered.</em>
          </h1>
          <p className="product-hero-body">
            Desalination discharge is normally a high-density, destructive marine pollutant. Roborns runs a Zero-Liquid-Discharge (ZLD) crystallization plant. We isolate commercial-grade salts, magnesium compounds, and potassium directly from brine.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">Discharge profile</span>
            <span className="meta-val hi">Absolute Zero Liquid Discharge</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Main outputs</span>
            <span className="meta-val">NaCl · Mg(OH)₂ · KCl · Bromine</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Extraction method</span>
            <span className="meta-val">Ion Exchange & Evaporative Crystallization</span>
          </div>
        </div>
      </section>

      {/* Main content body */}
      <div className="product-body product-body-grid">
        
        {/* Left Side: Technology Info */}
        <div>
          <div className="page-image-wrap">
            <img src="/images/minerals.jpg" alt="Roborns Mineral Recovery Crystallization" />
          </div>
          <section className="product-section">
            <h3>Zero-Liquid-Discharge Brine Processing</h3>
            <p>
              Standard coastal desalination plants return concentrated, chemical-heavy brine directly back into the sea. This creates high-salinity dead zones along shorelines. Our facility approaches the problem from a zero-waste chemical perspective. 
            </p>
            <p>
              By utilizing fractional crystallization and nanofiltration, we partition the brine loop. Solutes are precipitated out step-by-step: first, high-purity sodium chloride; next, magnesium hydroxide; then agricultural potassium. The remaining solution yields liquid bromine. Every element is refined, bagged, or drummed, and sold — leaving zero effluent returned to the ocean.
            </p>
          </section>

          {/* Pillars */}
          <div className="pillars-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "3rem" }}>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#c8b4f8" }}>🧂</div>
              <div className="pillar-title">Industrial NaCl & Minerals</div>
              <p className="pillar-desc">Over 99% pure sodium chloride and calcium compounds, ready for bulk shipping globally.</p>
            </div>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#c8b4f8" }}>🧪</div>
              <div className="pillar-title">Magnesium & Potassium</div>
              <p className="pillar-desc">Magnesium hydroxide and potassium salts isolated using carbon-free thermal reject energy.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Calculator */}
        <div>
          <div className="calc-card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Mineral Supply Configurator</span>
              <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#c8b4f8", border: "1px solid #c8b4f8", padding: "0.2rem 0.5rem" }}>ZLD LOOP</span>
            </h3>

            {/* Step 1: Select Mineral */}
            <div style={{ marginBottom: "2rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>1. Select Mineral Extract</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {MINERAL_TEMPLATES.map((min) => (
                  <button
                    key={min.id}
                    onClick={() => setSelectedMineral(min)}
                    style={{
                      background: selectedMineral.id === min.id ? "rgba(200,180,248,0.08)" : "transparent",
                      border: selectedMineral.id === min.id ? "1px solid #c8b4f8" : "1px solid var(--card-border)",
                      color: selectedMineral.id === min.id ? "var(--off-white)" : "var(--muted)",
                      padding: "1rem 0.5rem",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>{min.name.split(" ")[0]}</div>
                    <div style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)" }}>{min.formula}</div>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.5rem", fontStyle: "italic", lineHeight: 1.4 }}>
                {selectedMineral.desc}
              </div>
            </div>

            {/* Step 2: Select Purity */}
            <div style={{ marginBottom: "2rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>2. Refinement Purity</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {PURITY_GRADES.map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setPurityGrade(grade)}
                    style={{
                      background: purityGrade.id === grade.id ? "rgba(200,180,248,0.08)" : "transparent",
                      border: purityGrade.id === grade.id ? "1px solid #c8b4f8" : "1px solid var(--card-border)",
                      color: purityGrade.id === grade.id ? "var(--off-white)" : "var(--muted)",
                      padding: "0.75rem 0.25rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      transition: "all 0.2s"
                    }}
                  >
                    <div>{grade.label}</div>
                    {grade.multiplier > 1 && <div style={{ color: "#c8b4f8", fontSize: "0.5rem", marginTop: "0.1rem" }}>+{Math.round((grade.multiplier - 1) * 100)}% surcharge</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label className="form-label">3. Supply Quantity</label>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#c8b4f8", fontWeight: 700 }}>{quantityTons} Metric Tons</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={quantityTons}
                onChange={(e) => setQuantityTons(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#c8b4f8",
                  background: "var(--card-border)",
                  height: "4px",
                  outline: "none"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.5rem" }}>
                <span>5 Tons</span>
                <span>250 Tons</span>
                <span>500 Tons</span>
              </div>
            </div>

            {/* Summary Outputs */}
            <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>Brine Processed</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--off-white)" }}>{brineProcessedM3.toLocaleString()} m³</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>Ocean Discharge Prevented</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "#5DCAA5" }}>100% Guaranteed</span>
                </div>
              </div>

              {/* Loop integration */}
              <div style={{ background: "rgba(200,180,248,0.03)", border: "1px dashed rgba(200,180,248,0.2)", padding: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "#c8b4f8", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>🌎 Ecological Stewardship</span>
                <p style={{ fontSize: "0.72rem", color: "var(--off-white)", marginTop: "0.25rem", margin: 0, lineHeight: 1.4 }}>
                  This order prevents the release of <strong>{brineProcessedM3.toLocaleString()} m³</strong> of hypersaline water, actively protecting seagrass beds and marine environments from industrial thermal pollution.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>Estimated Supply Quote:</span>
                <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--off-white)" }}>
                  ${Math.round(totalCost).toLocaleString()}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--muted)" }}> USD</span>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                <span>Unit Rate: ${Math.round(baseRate)}/Ton (FOB facility gate)</span>
                <span>Lead Time: Approx 4–6 weeks</span>
              </div>
            </div>

            {/* Inquire CTA */}
            <LeadForm
              interest="Mineral"
              config={`${quantityTons}t/mo ${selectedMineral.name} (${purityGrade.label}) · $${Math.round(totalCost).toLocaleString()} USD`}
              source="roborns.com/mineral"
              accent="#c8b4f8"
              label="Request Supply Contract →"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
