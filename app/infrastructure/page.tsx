"use client";

import { useState } from "react";
import Link from "next/link";

const LOCATIONS = [
  { id: "india-west", name: "West Coast, India", desc: "Arabian Sea coastline. High municipal water demand, strong solar grid, growing AI infrastructure appetite.", lat: "15.0° N", fiber: "SEACOM / SMW5" },
  { id: "india-east", name: "East Coast, India", desc: "Bay of Bengal. Dense population centers, access to Chennai and Vizag fiber landing stations.", lat: "13.0° N", fiber: "Chennai LZ" },
  { id: "uae", name: "UAE / Persian Gulf", desc: "Extreme freshwater scarcity. High-value mineral brine, strong government infrastructure investment.", lat: "24.5° N", fiber: "FLAG / SMW5" },
  { id: "saudi", name: "Red Sea, Saudi Arabia", desc: "NEOM corridor. Largest desalination market in the world with zero-discharge mandates.", lat: "26.0° N", fiber: "Transcontinental" },
  { id: "indonesia", name: "Java Sea, Indonesia", desc: "10,000+ km coastline. Rapidly growing data center market, industrial water demand.", lat: "6.5° S", fiber: "SEA-ME-WE 3" },
  { id: "philippines", name: "Philippines", desc: "7,000 islands, critical undersea cable hub. Strong desalination demand across island provinces.", lat: "12.0° N", fiber: "PLCN / AAG" },
  { id: "malaysia", name: "Straits of Malacca, Malaysia", desc: "One of the world's busiest shipping straits. Excellent fiber connectivity and industrial water demand.", lat: "3.5° N", fiber: "AAG / SEAX" },
  { id: "vietnam", name: "South China Sea, Vietnam", desc: "Fast-growing coastal economy. Government-backed data infrastructure expansion.", lat: "14.0° N", fiber: "AAG / SMW3" },
  { id: "sri-lanka", name: "Sri Lanka", desc: "Indian Ocean island. Strategic position between East Africa and Southeast Asia submarine cables.", lat: "8.0° N", fiber: "SEA-ME-WE 3" },
  { id: "bangladesh", name: "Bay of Bengal, Bangladesh", desc: "Coastal delta region. Acute freshwater salinity crisis — highest potential for desalination impact.", lat: "22.0° N", fiber: "SEA-ME-WE 4" },
  { id: "australia-west", name: "Western Australia", desc: "Vast coastline, world-class mineral resources. Near-zero freshwater in inland zones.", lat: "25.0° S", fiber: "APX West" },
  { id: "australia-east", name: "Queensland, Australia", desc: "Pacific coast. Consistent renewable energy from solar and offshore wind.", lat: "20.0° S", fiber: "Southern Cross" },
  { id: "south-africa", name: "Cape Coast, South Africa", desc: "At the junction of Atlantic and Indian Oceans. Severe freshwater stress, growing industrial demand.", lat: "33.0° S", fiber: "SEACOM / SAT3" },
  { id: "kenya", name: "Mombasa, Kenya", desc: "East African fiber hub. Growing water scarcity crisis, proximity to SEACOM submarine cable.", lat: "4.0° S", fiber: "SEACOM / EASSy" },
  { id: "morocco", name: "Atlantic Coast, Morocco", desc: "Gateway between Europe and Africa. Water stress is a national emergency, strong EU investment.", lat: "32.0° N", fiber: "Atlas Offshore" },
  { id: "egypt", name: "Red Sea / Suez, Egypt", desc: "Strategic Suez corridor. One of the most water-stressed nations — desalination is state priority.", lat: "27.0° N", fiber: "SEACOM / FLAG" },
  { id: "spain", name: "Mediterranean, Spain", desc: "High desalination market, advanced EU environmental compliance framework, strong fiber backbone.", lat: "39.5° N", fiber: "MAREA / ACE" },
  { id: "greece", name: "Aegean Sea, Greece", desc: "5,000+ km coastline. Island grid independence drives demand for decentralized water production.", lat: "38.0° N", fiber: "MedNautilus" },
  { id: "turkey", name: "Turkish Riviera, Turkey", desc: "Meeting point of Mediterranean and Black Sea. High tourism and industrial freshwater demand.", lat: "37.0° N", fiber: "Med Nautilus" },
  { id: "uk", name: "North Sea, UK", desc: "Abundant offshore wind energy. Cold deep-sea water optimizes cooling. Strong fiber landing network.", lat: "56.0° N", fiber: "Transatlantic" },
  { id: "usa-west", name: "Oregon / California, USA", desc: "Premium Pacific fiber landing zones. Direct hydro and renewable grid connections.", lat: "44.5° N", fiber: "FASTER / JUPITER" },
  { id: "usa-east", name: "Atlantic Coast, USA", desc: "Dense metro corridors from Miami to Boston. World's largest data center demand zone.", lat: "35.0° N", fiber: "MAREA / AEC" },
  { id: "brazil", name: "Northeast Brazil", desc: "Atlantic coastline with extreme freshwater scarcity inland. Fast-growing cloud market.", lat: "5.0° S", fiber: "ELLALINK / Monet" },
  { id: "chile", name: "Pacific Coast, Chile", desc: "World's driest coastal desert. Mining industry demands industrial water at scale.", lat: "25.0° S", fiber: "PCCS" },
  { id: "mexico", name: "Baja California, Mexico", desc: "Pacific and Gulf of California coast. Severe freshwater stress in border industrial zones.", lat: "26.0° N", fiber: "Pacific Light" },
  { id: "nigeria", name: "Gulf of Guinea, Nigeria", desc: "West Africa's largest economy. Critical data infrastructure gap and coastal water access needs.", lat: "4.5° N", fiber: "WACS / ACE" },
];


const BUDGET_TIERS = [
  { id: "pilot", label: "$10M – $50M", scale: "Pilot Infrastructure", details: "Up to 2 MW compute capacity, 15,000 L/day desalination, basic NaCl crystallization." },
  { id: "standard", label: "$50M – $200M", scale: "Standard Regional Hub", details: "Up to 10 MW compute capacity, 75,000 L/day desalination, advanced NaCl & Mg(OH)₂ recovery." },
  { id: "utility", label: "$200M – $500M", scale: "Utility Scale Hub", details: "Up to 50 MW compute capacity, 350,000 L/day desalination, full mineral crystallization suite." },
  { id: "giga", label: "$500M+", scale: "Industrial Gigawatt Facility", details: "Fully custom scale. Multi-facility clusters, customized sea-intakes, and grid co-generation." },
];

export default function InfrastructureRequest() {
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
  const [locOpen, setLocOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_TIERS[1]);
  const [computeScaleMw, setComputeScaleMw] = useState(10);
  const [waterScaleKld, setWaterScaleKld] = useState(75);
  const [mineralsScaleTpm, setMineralsScaleTpm] = useState(150);

  // Form states
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const config = `${selectedLoc.name} · ${selectedBudget.label} (${selectedBudget.scale}) · ${computeScaleMw} MW compute · ${waterScaleKld} kL/day water · ${mineralsScaleTpm} t/mo minerals`;
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          interest: "Franchise",
          config,
          message: `Company: ${company}${notes ? "\n\nNotes: " + notes : ""}`,
          source: "roborns.com/franchise",
        }),
      });
    } catch { /* show success anyway */ }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="page active" style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--accent)", padding: "3rem", maxWidth: "600px", width: "100%", borderRadius: "2px", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚙️</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Request Received</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem", color: "var(--off-white)" }}>Infrastructure Request Submitted</h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Your infrastructure request has been received. Our team will review your configuration and respond to <strong>{email}</strong> within 48 hours.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button onClick={() => setSubmitted(false)} className="btn-outline">
              Configure Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)" }}>System Configurator</div>
        <h1>
          Request new<br />
          <em>infrastructure.</em>
        </h1>
        <p className="contact-hero-body" style={{ maxWidth: "600px" }}>
          Select your target coastal location, budget scale, and resource loop configurations to initialize a new Roborns co-developed infrastructure project. Available to all coastal areas.
        </p>
      </section>

      {/* Main Grid */}
      <form onSubmit={handleSubmit} className="contact-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem" }}>
        
        {/* Left Side: Configuration Controls */}
        <div>
          <div className="page-image-wrap">
            <img src="/images/facility.png" alt="Roborns Coastal Circular Facility Design Model" />
          </div>
          {/* Step 1: Location */}
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>1. Select Coastal Region</div>

            <div style={{ position: "relative" }}>
              <div
                onClick={() => setLocOpen((o) => !o)}
                style={{
                  background: "var(--card-bg)",
                  border: locOpen ? "1px solid var(--accent)" : "1px solid var(--card-border)",
                  padding: "1.1rem 1.5rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--off-white)" }}>{selectedLoc.name}</span>
                  <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{selectedLoc.lat}</span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)", transform: locOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
              </div>

              {locOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.4rem)",
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                    maxHeight: "320px",
                    overflowY: "auto"
                  }}
                >
                  {LOCATIONS.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => { setSelectedLoc(loc); setLocOpen(false); }}
                      style={{
                        padding: "1rem 1.5rem",
                        cursor: "pointer",
                        background: selectedLoc.id === loc.id ? "rgba(93,202,165,0.04)" : "transparent",
                        borderBottom: "1px solid var(--card-border)"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(93,202,165,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = selectedLoc.id === loc.id ? "rgba(93,202,165,0.04)" : "transparent")}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: selectedLoc.id === loc.id ? "var(--off-white)" : "var(--muted)" }}>{loc.name}</span>
                        <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{loc.lat}</span>
                      </div>
                      <p style={{ fontSize: "0.66rem", fontFamily: "var(--font-mono)", color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                        {loc.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected location detail */}
            <div
              style={{
                marginTop: "1rem",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                padding: "1.5rem"
              }}
            >
              <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 1rem" }}>
                {selectedLoc.desc}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.58rem", fontFamily: "var(--font-mono)", color: "var(--muted)", borderTop: "1px solid var(--card-border)", paddingTop: "0.75rem" }}>
                <span>Fiber landing: {selectedLoc.fiber}</span>
              </div>
            </div>
          </div>

          {/* Step 2: Budget */}
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>2. Budget Capacity Tier</div>
            <div className="infra-budget-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {BUDGET_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => {
                    setSelectedBudget(tier);
                    // Autofill suggested configurations based on tier
                    if (tier.id === "pilot") {
                      setComputeScaleMw(2);
                      setWaterScaleKld(15);
                      setMineralsScaleTpm(30);
                    } else if (tier.id === "standard") {
                      setComputeScaleMw(10);
                      setWaterScaleKld(75);
                      setMineralsScaleTpm(150);
                    } else if (tier.id === "utility") {
                      setComputeScaleMw(50);
                      setWaterScaleKld(350);
                      setMineralsScaleTpm(700);
                    } else if (tier.id === "giga") {
                      setComputeScaleMw(100);
                      setWaterScaleKld(750);
                      setMineralsScaleTpm(1500);
                    }
                  }}
                  style={{
                    background: selectedBudget.id === tier.id ? "rgba(93,202,165,0.04)" : "var(--card-bg)",
                    border: selectedBudget.id === tier.id ? "1px solid var(--accent)" : "1px solid var(--card-border)",
                    padding: "1.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--off-white)" }}>{tier.label}</span>
                    <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{tier.scale}</span>
                  </div>
                  <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                    {tier.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Loop Customization */}
          <div>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>3. Resource Loop Sizing</div>
            
            {/* GPU slider */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase" }}>GPU Compute Floor Scale</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700 }}>{computeScaleMw} MW</span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                value={computeScaleMw}
                onChange={(e) => setComputeScaleMw(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent)", background: "var(--card-border)", height: "4px", outline: "none" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.4rem" }}>
                <span>1 MW (Pilot)</span>
                <span>100 MW (Grid Scale)</span>
                <span>200 MW (Super cluster)</span>
              </div>
            </div>

            {/* Desalination slider */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase" }}>Desalination capacity</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#85B7EB", fontWeight: 700 }}>{waterScaleKld} kL / Day</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={waterScaleKld}
                onChange={(e) => setWaterScaleKld(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "#85B7EB", background: "var(--card-border)", height: "4px", outline: "none" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.4rem" }}>
                <span>10 kL/day</span>
                <span>500 kL/day</span>
                <span>1,000 kL/day</span>
              </div>
            </div>

            {/* Minerals slider */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase" }}>Mineral crystallization output</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#c8b4f8", fontWeight: 700 }}>{mineralsScaleTpm} Tons / Month</span>
              </div>
              <input
                type="range"
                min="10"
                max="3000"
                step="10"
                value={mineralsScaleTpm}
                onChange={(e) => setMineralsScaleTpm(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: "#c8b4f8", background: "var(--card-border)", height: "4px", outline: "none" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginTop: "0.4rem" }}>
                <span>10 Tons/mo</span>
                <span>1,500 Tons/mo</span>
                <span>3,000 Tons/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Request Details Form */}
        <div>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem", borderRadius: "2px", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "1rem" }}>
              Project Request Details
            </h3>

            <div className="form-group" style={{ marginBottom: "1.2rem" }}>
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
            </div>

            <div className="form-group" style={{ marginBottom: "1.2rem" }}>
              <label className="form-label">Organization</label>
              <input className="form-input" type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company or Entity" required />
            </div>

            <div className="form-group" style={{ marginBottom: "1.2rem" }}>
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@organization.com" required />
            </div>

            <div className="form-group" style={{ marginBottom: "2rem" }}>
              <label className="form-label">Special Site Requirements or Comments</label>
              <textarea className="form-textarea" rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="E.g., power grid limitations, unique environmental factors, municipal offtake agreements..." />
            </div>

            {/* Brief Configuration Preview */}
            <div style={{ background: "var(--card-border)", padding: "1.2rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Config Summary</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem 1.5rem", fontSize: "0.7rem", fontFamily: "var(--font-mono)" }}>
                <div>Location: <span style={{ color: "var(--off-white)" }}>{selectedLoc.name.split(",")[0]}</span></div>
                <div>Budget: <span style={{ color: "var(--off-white)" }}>{selectedBudget.label}</span></div>
                <div>GPUs: <span style={{ color: "var(--accent)" }}>{computeScaleMw} MW</span></div>
                <div>Water: <span style={{ color: "#85B7EB" }}>{waterScaleKld} kL/d</span></div>
              </div>
            </div>

            <button className="btn-primary" type="submit" style={{ width: "100%", padding: "1rem" }}>
              Initialize Infrastructure Project →
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
