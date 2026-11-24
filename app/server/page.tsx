"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import {
  COLOCATION,
  CONTRACT_TERMS,
  GPU_RENTAL,
  HOURS_PER_MONTH,
  INR_PER_USD,
  RENTAL_GPU_COUNT,
  discounted,
  formatInr,
  formatUsd,
  inrToUsd,
} from "@/lib/compute-pricing";

type Offer = "colocation" | "rental";
type ColoSize = "kw" | "racks";

export default function ServerRental() {
  const [offer, setOffer] = useState<Offer>("colocation");
  const [sizeMode, setSizeMode] = useState<ColoSize>("kw");
  const [kw, setKw] = useState<number>(COLOCATION.kwDefault);
  const [racks, setRacks] = useState<number>(COLOCATION.rackDefault);
  const [kwPerRack, setKwPerRack] = useState<number>(COLOCATION.maxKwPerRack);
  const [coloRate, setColoRate] = useState<number>(COLOCATION.rateDefaultInrPerKwMonth);
  const [coloTerm, setColoTerm] = useState<(typeof CONTRACT_TERMS)[number]>(CONTRACT_TERMS[0]);
  const [gpu, setGpu] = useState<(typeof GPU_RENTAL)[number]>(GPU_RENTAL[0]);
  const [gpuCount, setGpuCount] = useState<number>(RENTAL_GPU_COUNT.default);
  const [rentalTerm, setRentalTerm] = useState<(typeof CONTRACT_TERMS)[number]>(CONTRACT_TERMS[0]);
  const rentalFrom = Math.min(...GPU_RENTAL.map((item) => item.usdPerGpuHour));

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("offer");
    if (requested === "rental" || requested === "colocation") setOffer(requested);
  }, []);

  const totalKw = sizeMode === "kw" ? kw : racks * kwPerRack;
  const coloMonthlyInr = discounted(totalKw * coloRate, coloTerm.discount);
  const coloRateAfterTerm = discounted(coloRate, coloTerm.discount);

  const rentalHourly = discounted(gpu.usdPerGpuHour, rentalTerm.discount);
  const rentalMonthly = gpuCount * rentalHourly * HOURS_PER_MONTH;

  const seawaterFlowLitersHour = Math.round(totalKw * 150);
  const freshwaterProducedLitersDay = Math.round(totalKw * 24 * 1.2);

  const leadInterest = offer === "colocation" ? "Compute colocation" : "GPU rental";
  const leadConfig = offer === "colocation"
    ? `Colocation · ${totalKw.toLocaleString("en-IN")} kW · ${formatInr(coloRate)}/kW/mo list · ${coloTerm.label} · ${formatInr(coloMonthlyInr)}/mo (${formatUsd(inrToUsd(coloMonthlyInr))}/mo)`
    : `GPU rental · ${gpuCount}× ${gpu.name} · ${formatUsd(gpu.usdPerGpuHour, 2)}/GPU-hr list · ${rentalTerm.label} · ${formatUsd(rentalMonthly)}/mo at ${HOURS_PER_MONTH} h`;

  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      <section className="product-hero">
        <div>
          <div className="hero-tag" style={{ color: "#5DCAA5" }}>01 / Compute</div>
          <h1>
            Immersive<br />
            <em>Cooling.</em>
          </h1>
          <p className="product-hero-body">
            Two ways onto the same seawater-cooled floor. Colocate racks you already own, or rent Roborns GPUs by the hour. Waste heat from the hall is routed into desalination. Colocation shells start at 2 MW.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">Colocation</span>
            <span className="meta-val hi">{formatInr(COLOCATION.rateMinInrPerKwMonth)}–{formatInr(COLOCATION.rateMaxInrPerKwMonth)}/kW/mo</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">GPU rental, on demand</span>
            <span className="meta-val hi">from {formatUsd(rentalFrom, 2)}/GPU-hr</span>
          </div>
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

      <div className="product-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem" }}>
        <div>
          <div className="page-image-wrap">
            <Image src="/images/compute.webp" alt="Roborns Immersion-Cooled Compute Floor" fill sizes="(max-width: 900px) 100vw, 60vw" />
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

          <div className="pillars-grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "3rem" }}>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#5DCAA5" }}>✦</div>
              <div className="pillar-title">Tier III Reliability</div>
              <p className="pillar-desc">Dual active-active power paths, N+2 backup generation, and redundant seawater feed pipelines guarantee continuous operations.</p>
            </div>
            <div className="pillar">
              <div className="pillar-icon" style={{ color: "#5DCAA5" }}>✦</div>
              <div className="pillar-title">Extreme Density</div>
              <p className="pillar-desc">Support up to {COLOCATION.maxKwPerRack} kW per rack. Liquid immersion eliminates hot-spots, reducing silicon thermal stress and degradation by 30%.</p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem", borderRadius: "2px", position: "sticky", top: "100px" }}>
            <div role="tablist" aria-label="Compute offer" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.75rem" }}>
              <OfferTab
                active={offer === "colocation"}
                onClick={() => setOffer("colocation")}
                title="Colocation"
                detail="You bring the GPUs"
              />
              <OfferTab
                active={offer === "rental"}
                onClick={() => setOffer("rental")}
                title="GPU rental"
                detail="Hardware included"
              />
            </div>

            {offer === "colocation" ? (
              <div role="tabpanel">
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>Colocation price list</h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  {formatInr(COLOCATION.rateMinInrPerKwMonth)}–{formatInr(COLOCATION.rateMaxInrPerKwMonth)} per kW per month. Default quote {formatInr(COLOCATION.rateDefaultInrPerKwMonth)}/kW/mo, about {formatUsd(inrToUsd(COLOCATION.rateDefaultInrPerKwMonth))}/kW/mo at ₹{INR_PER_USD}/USD.
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--off-white)", lineHeight: 1.7, marginBottom: "0.4rem" }}>
                  Included: {COLOCATION.included.join(", ")}.
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  {COLOCATION.powerPassthrough}
                </p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>1. Size</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <TermButton active={sizeMode === "kw"} onClick={() => setSizeMode("kw")} label="By kW" />
                    <TermButton active={sizeMode === "racks"} onClick={() => setSizeMode("racks")} label={`By racks · up to ${COLOCATION.maxKwPerRack} kW`} />
                  </div>
                  {sizeMode === "kw" ? (
                    <Slider
                      label="IT load"
                      valueLabel={`${kw.toLocaleString("en-IN")} kW`}
                      min={COLOCATION.kwMin}
                      max={COLOCATION.kwMax}
                      step={COLOCATION.kwStep}
                      value={kw}
                      onChange={setKw}
                      ticks={[`${COLOCATION.kwMin} kW`, `${(COLOCATION.kwMax / 1000).toLocaleString("en-IN")} MW`]}
                    />
                  ) : (
                    <>
                      <Slider
                        label="Racks"
                        valueLabel={`${racks} racks`}
                        min={COLOCATION.rackMin}
                        max={COLOCATION.rackMax}
                        step={1}
                        value={racks}
                        onChange={setRacks}
                        ticks={[`${COLOCATION.rackMin} rack`, `${COLOCATION.rackMax} racks`]}
                      />
                      <Slider
                        label="kW per rack"
                        valueLabel={`${kwPerRack} kW`}
                        min={COLOCATION.kwPerRackMin}
                        max={COLOCATION.maxKwPerRack}
                        step={COLOCATION.kwPerRackStep}
                        value={kwPerRack}
                        onChange={setKwPerRack}
                        ticks={["10 kW", `${COLOCATION.maxKwPerRack} kW`]}
                      />
                    </>
                  )}
                </div>

                <Slider
                  label="2. Colocation rate"
                  valueLabel={`${formatInr(coloRate)}/kW/mo`}
                  min={COLOCATION.rateMinInrPerKwMonth}
                  max={COLOCATION.rateMaxInrPerKwMonth}
                  step={COLOCATION.rateStepInr}
                  value={coloRate}
                  onChange={setColoRate}
                  ticks={[`${formatInr(COLOCATION.rateMinInrPerKwMonth)}`, `${formatInr(COLOCATION.rateMaxInrPerKwMonth)}`]}
                />

                <TermPicker terms={CONTRACT_TERMS} selected={coloTerm} onSelect={setColoTerm} />

                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <Stat label="IT load" value={`${totalKw.toLocaleString("en-IN")} kW`} />
                    <Stat label="Seawater cooling flow" value={`${seawaterFlowLitersHour.toLocaleString("en-IN")} L/h`} />
                  </div>
                  <div style={{ background: "rgba(93,202,165,0.03)", border: "1px dashed rgba(93,202,165,0.2)", padding: "1rem", marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "#5DCAA5", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>Resource recovery loop</span>
                    <p style={{ fontSize: "0.72rem", color: "var(--off-white)", margin: "0.25rem 0 0", lineHeight: 1.4 }}>
                      This load can desalinate about <strong>{freshwaterProducedLitersDay.toLocaleString("en-IN")} litres</strong> of fresh water per day from waste heat. Power for the IT load is billed separately.
                    </p>
                  </div>
                  <PriceLine label="Monthly colocation" value={`${formatInr(coloMonthlyInr)}/mo`} />
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", margin: "0.35rem 0 0.75rem" }}>
                    About {formatUsd(inrToUsd(coloMonthlyInr))}/mo at ₹{INR_PER_USD} per USD. Term rate {formatInr(coloRateAfterTerm)}/kW/mo ({formatUsd(inrToUsd(coloRateAfterTerm))}/kW/mo). {totalKw.toLocaleString("en-IN")} kW × {formatInr(coloRate)} × {coloTerm.discount === 0 ? "list" : `${coloTerm.discount * 100}% off`}.
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", margin: 0 }}>
                    Space, immersion cooling, and network are in this figure. Power is not.
                  </p>
                </div>
              </div>
            ) : (
              <div role="tabpanel">
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem" }}>GPU rental price list</h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  On-demand hourly list prices. Hardware is included. A month in the estimator is {HOURS_PER_MONTH} hours. 12-month terms are 10% off the list rate; 36-month terms are 25% off.
                </p>
                <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {GPU_RENTAL.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGpu(item)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                        textAlign: "left",
                        background: gpu.id === item.id ? "rgba(93,202,165,0.08)" : "transparent",
                        border: gpu.id === item.id ? "1px solid #5DCAA5" : "1px solid var(--card-border)",
                        color: "var(--off-white)",
                        padding: "0.85rem 1rem",
                        cursor: "pointer",
                      }}
                    >
                      <span>
                        <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 700 }}>{item.name}</span>
                        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--muted)" }}>{item.memory}</span>
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#5DCAA5", whiteSpace: "nowrap" }}>
                        {formatUsd(item.usdPerGpuHour, 2)}/GPU-hr
                      </span>
                    </button>
                  ))}
                </div>

                <Slider
                  label="1. GPU count"
                  valueLabel={`${gpuCount} GPUs`}
                  min={RENTAL_GPU_COUNT.min}
                  max={RENTAL_GPU_COUNT.max}
                  step={RENTAL_GPU_COUNT.step}
                  value={gpuCount}
                  onChange={setGpuCount}
                  ticks={[`${RENTAL_GPU_COUNT.min} GPUs`, `${RENTAL_GPU_COUNT.max} GPUs`]}
                />

                <TermPicker terms={CONTRACT_TERMS} selected={rentalTerm} onSelect={setRentalTerm} />

                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
                  <PriceLine label="On-demand list" value={`${formatUsd(gpu.usdPerGpuHour, 2)}/GPU-hr`} />
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", margin: "0.35rem 0 0.9rem" }}>
                    {rentalTerm.discount === 0
                      ? "3-month term uses the on-demand list rate."
                      : `Term rate ${formatUsd(rentalHourly, 2)}/GPU-hr after ${rentalTerm.discount * 100}% off.`}
                  </p>
                  <PriceLine label="Monthly rental" value={`${formatUsd(rentalMonthly)}/mo`} />
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", margin: "0.35rem 0 0" }}>
                    {gpuCount} × {formatUsd(rentalHourly, 2)} × {HOURS_PER_MONTH} h. Hardware is included in the hourly rate.
                  </p>
                </div>
              </div>
            )}

            <LeadForm
              interest={leadInterest}
              config={leadConfig}
              source="roborns.com/server"
              label={offer === "colocation" ? "Enquire about colocation →" : "Enquire about GPU rental →"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function OfferTab({ active, onClick, title, detail }: { active: boolean; onClick: () => void; title: string; detail: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        background: active ? "rgba(93,202,165,0.08)" : "transparent",
        border: active ? "1px solid #5DCAA5" : "1px solid var(--card-border)",
        color: active ? "var(--off-white)" : "var(--muted)",
        padding: "0.85rem 0.6rem",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700 }}>{title}</span>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.55rem", marginTop: "0.2rem" }}>{detail}</span>
    </button>
  );
}

function TermButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: active ? "rgba(93,202,165,0.08)" : "transparent",
        border: active ? "1px solid #5DCAA5" : "1px solid var(--card-border)",
        color: active ? "var(--off-white)" : "var(--muted)",
        padding: "0.75rem 0.5rem",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
      }}
    >
      {label}
    </button>
  );
}

function TermPicker<T extends (typeof CONTRACT_TERMS)[number]>({
  terms,
  selected,
  onSelect,
}: {
  terms: typeof CONTRACT_TERMS;
  selected: T;
  onSelect: (term: T) => void;
}) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <label className="form-label" style={{ marginBottom: "0.75rem", display: "block" }}>Contract duration</label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
        {terms.map((term) => (
          <button
            key={term.months}
            type="button"
            onClick={() => onSelect(term as T)}
            style={{
              background: selected.months === term.months ? "rgba(93,202,165,0.08)" : "transparent",
              border: selected.months === term.months ? "1px solid #5DCAA5" : "1px solid var(--card-border)",
              color: selected.months === term.months ? "var(--off-white)" : "var(--muted)",
              padding: "0.75rem 0.5rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
            }}
          >
            <div>{term.label}</div>
            {term.discount > 0 && <div style={{ color: "#5DCAA5", fontSize: "0.55rem", marginTop: "0.1rem" }}>-{term.discount * 100}%</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  ticks,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  ticks: string[];
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem" }}>
        <label className="form-label">{label}</label>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#5DCAA5", fontWeight: 700 }}>{valueLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
        style={{ width: "100%", accentColor: "#5DCAA5", background: "var(--card-border)", height: "4px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.5rem" }}>
        {ticks.map((tick) => <span key={tick}>{tick}</span>)}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", display: "block", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--off-white)" }}>{value}</span>
    </div>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{label}</span>
      <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--off-white)", textAlign: "right" }}>{value}</span>
    </div>
  );
}
