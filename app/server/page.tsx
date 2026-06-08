"use client";

import { useState } from "react";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { motion } from "framer-motion";

const GPU_TEMPLATES = [
  { id: "h100", name: "NVIDIA H100 SXM5", memory: "80GB HBM3", rate: 2.20, powerPerGpu: 1.02 },
  { id: "h200", name: "NVIDIA H200 SXM5", memory: "141GB HBM3e", rate: 3.10, powerPerGpu: 1.10 },
  { id: "b200", name: "NVIDIA B200", memory: "192GB HBM3e", rate: 4.50, powerPerGpu: 1.40 },
];

const CONTRACT_TERMS = [
  { months: 3, label: "3 Months", discount: 0 },
  { months: 12, label: "12 Months", discount: 0.10 },
  { months: 36, label: "36 Months", discount: 0.25 },
];

export default function ServerRental() {
  const [selectedGpu, setSelectedGpu] = useState(GPU_TEMPLATES[0]);
  const [gpuCount, setGpuCount] = useState(64);
  const [contractTerm, setContractTerm] = useState(CONTRACT_TERMS[1]);

  const powerKw = parseFloat((selectedGpu.powerPerGpu * gpuCount).toFixed(1));
  const hourlyRate = selectedGpu.rate * gpuCount;
  const baseMonthlyCost = hourlyRate * 730;
  const discountedMonthlyCost = baseMonthlyCost * (1 - contractTerm.discount);
  
  // Seawater flow to dissipate heat: approx 150 liters/hour per kW
  const seawaterFlowLitersHour = Math.round(powerKw * 150);
  
  // Desalinated water byproduct: ~1.2 liters of fresh water per kWh of waste heat captured
  const freshwaterProducedLitersDay = Math.round(powerKw * 24 * 1.2);

  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      {/* Hero Header */}
      <section className="product-hero">
        <div>
          <div className="hero-tag" style={{ color: "#5DCAA5" }}>01 / Compute Colocation</div>
          <h1>
            Immersive<br />
            <em>Cooling.</em>
          </h1>
          <p className="product-hero-body">
            Direct liquid-immersion GPU clusters starting at 2 MW capacities. Seawater-cooled heat exchanges yield zero carbon thermal reject. Optimized for LLM training and high-density inference.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">PUE efficiency</span>
            <span className="meta-val hi">1.028</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Coolant fluid</span>
            <span className="meta-val">Synthetic Dielectric (Zonic)</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Heat recapture</span>
            <span className="meta-val">100% (redirected to desalination)</span>
          </div>
        </div>
      </section>

      {/* Main content body */}
      <div className="product-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem" }}>
        
        {/* Left Side: Technology Info */}
        <div>
          <div className="page-image-wrap">
            <img src="/images/compute.jpeg" alt="Roborns Immersion-Cooled Compute Floor" />
          </div>
          <section className="product-section">
            <h3>Seawater-Cooled Thermal Envelope</h3>
            <p>
              Traditional data centers expend up to 40% of their electricity running chillers and evaporative towers. Roborns immersion tanks submerge server nodes in non-conductive dielectric fluid. This fluid absorbs heat directly and circulates through titanium heat exchangers linked to coastal seawater intakes.
            </p>
            <p>
              By bypassing traditional refrigeration cycles, we operate at a Power Usage Effectiveness (PUE) below 1.03. The thermal reject (leaving the server floor at 65°C) is not dumped into the atmosphere. Instead, it is routed directly to the desalination plant to power multi-effect distillation.
            </p>
          </section>

          {/* Pillars */}
          <div className="pillars-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "3rem" }}>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#5DCAA5" }}>✦</div>
              <div className="pillar-title">Tier III Reliability</div>
              <p className="pillar-desc">Dual active-active power paths, N+2 backup generation, and redundant seawater feed pipelines guarantee continuous operations.</p>
            </div>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#5DCAA5" }}>✦</div>
              <div className="pillar-title">Extreme Density</div>
              <p className="pillar-desc">Support up to 100 kW per rack. Liquid immersion eliminates hot-spots, reducing silicon thermal stress and degradation by 30%.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Calculator */}
        <div>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem", borderRadius: "2px", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Rental Estimator</span>
              <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "#5DCAA5", border: "1px solid #5DCAA5", padding: "0.2rem 0.5rem" }}>LIVE COMPUTE</span>
            </h3>

            {/* Step 1: Select GPU Model */}
            <div style={{ marginBottom: "2rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>1. Select GPU Accelerator</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {GPU_TEMPLATES.map((gpu) => (
                  <button
                    key={gpu.id}
                    onClick={() => setSelectedGpu(gpu)}
                    style={{
                      background: selectedGpu.id === gpu.id ? "rgba(93,202,165,0.08)" : "transparent",
                      border: selectedGpu.id === gpu.id ? "1px solid #5DCAA5" : "1px solid var(--card-border)",
                      color: selectedGpu.id === gpu.id ? "var(--off-white)" : "var(--muted)",
                      padding: "1rem 0.5rem",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>{gpu.name.split(" ")[1] || gpu.name}</div>
                    <div style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)" }}>{gpu.memory}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: GPU Quantity */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label className="form-label">2. GPU Cluster Size</label>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#5DCAA5", fontWeight: 700 }}>{gpuCount} GPUs</span>
              </div>
              <input
                type="range"
                min="8"
                max="512"
                step="8"
                value={gpuCount}
                onChange={(e) => setGpuCount(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#5DCAA5",
                  background: "var(--card-border)",
                  height: "4px",
                  outline: "none"
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.5rem" }}>
                <span>8 GPUs</span>
                <span>256 GPUs</span>
                <span>512 GPUs</span>
              </div>
            </div>

            {/* Step 3: Contract Term */}
            <div style={{ marginBottom: "2.5rem" }}>
              <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>3. Contract Duration</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {CONTRACT_TERMS.map((term) => (
                  <button
                    key={term.months}
                    onClick={() => setContractTerm(term)}
                    style={{
                      background: contractTerm.months === term.months ? "rgba(93,202,165,0.08)" : "transparent",
                      border: contractTerm.months === term.months ? "1px solid #5DCAA5" : "1px solid var(--card-border)",
                      color: contractTerm.months === term.months ? "var(--off-white)" : "var(--muted)",
                      padding: "0.75rem 0.5rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      transition: "all 0.2s"
                    }}
                  >
                    <div>{term.label}</div>
                    {term.discount > 0 && <div style={{ color: "#5DCAA5", fontSize: "0.55rem", marginTop: "0.1rem" }}>-{term.discount * 100}% discount</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Outputs */}
            <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>Estimated Power Draw</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--off-white)" }}>{powerKw} kW</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>Seawater cooling flow</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--off-white)" }}>{seawaterFlowLitersHour.toLocaleString()} L/h</span>
                </div>
              </div>

              {/* Circular loop bonus indicator */}
              <div style={{ background: "rgba(93,202,165,0.03)", border: "1px dashed rgba(93,202,165,0.2)", padding: "1rem", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "#5DCAA5", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>♻️ Resource Recovery Loop</span>
                <p style={{ fontSize: "0.72rem", color: "var(--off-white)", marginTop: "0.25rem", margin: 0, lineHeight: 1.4 }}>
                  This compute cluster generates enough waste heat to desalinate <strong>{freshwaterProducedLitersDay.toLocaleString()} Litres</strong> of fresh water per day.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>Monthly Rental Cost:</span>
                <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--off-white)" }}>
                  ${Math.round(discountedMonthlyCost).toLocaleString()}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--muted)" }}>/mo</span>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                <span>Rate: ~${(selectedGpu.rate * (1 - contractTerm.discount)).toFixed(2)}/gpu/hr</span>
                <span>All infrastructure colocation included</span>
              </div>
            </div>

            {/* Inquire CTA */}
            <LeadForm
              interest="Compute"
              config={`${gpuCount}× ${selectedGpu.name} (${selectedGpu.memory}) · ${contractTerm.label} contract · $${Math.round(discountedMonthlyCost).toLocaleString()}/mo`}
              source="roborns.com/compute"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
