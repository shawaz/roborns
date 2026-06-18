import Link from "next/link";
import { DottedSurface } from "@/components/ui/dotted-surface";

export default function Home() {
  return (
    <div id="page-home" className="page active">
      <DottedSurface />

      {/* ── HERO ── */}
      <section className="hero hero-centered">
        <div>
          <div className="hero-tag">Coastal AI Infrastructure</div>
          <h1>
            Liquid.<br />
            <em>Intelligence.</em>
          </h1>
          <p className="hero-body">
            One coastal facility. GPU compute cooled by seawater. Waste heat drives
            desalination. Brine yields commercial minerals. Everything is available
            to rent, buy, or license — to all coastal areas.
          </p>
          <div className="hero-actions">
            <Link href="#offerings" className="btn-primary">
              View offerings
            </Link>
            <Link href="#how-it-works" className="btn-ghost">
              How it works →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOUR OFFERINGS ── */}
      <section className="home-products" id="offerings">
        <div className="section-label">Our offerings</div>
        <div className="products-grid">
          <Link href="/server" className="product-card">
            <div className="product-accent accent-server"></div>
            <div className="card-image-wrap">
              <img src="/images/compute.jpeg" alt="Liquid immersion cooled GPU rack" />
            </div>
            <div className="product-index">01 / SERVER RENTAL</div>
            <div className="product-name">Rent a Server</div>
            <div className="product-sector">GPU Compute Colocation</div>
            <p className="product-desc">
              Immersion-cooled GPU racks from 2 MW to 10 MW. PUE below 1.03 —
              the most efficient thermal profile in the industry. Available for
              inference, training, and long-term colocation contracts.
            </p>
            <span className="product-arrow">↗</span>
          </Link>
          <Link href="/water" className="product-card">
            <div className="product-accent accent-water"></div>
            <div className="card-image-wrap">
              <img src="/images/water.jpg" alt="Desalinated water output valve" />
            </div>
            <div className="product-index">02 / WATER OFFTAKE</div>
            <div className="product-name">Buy Water</div>
            <div className="product-sector">Desalinated Fresh Water</div>
            <p className="product-desc">
              50,000 litres per day of potable and industrial-grade fresh water,
              produced by waste heat from our compute floor. Available for
              municipal supply contracts and commercial buyers.
            </p>
            <span className="product-arrow">↗</span>
          </Link>
          <Link href="/mineral" className="product-card">
            <div className="product-accent accent-minerals"></div>
            <div className="card-image-wrap">
              <img src="/images/minerals.jpg" alt="Mineral salts extracted from brine" />
            </div>
            <div className="product-index">03 / MINERAL SUPPLY</div>
            <div className="product-name">Buy Minerals</div>
            <div className="product-sector">Zero-Liquid-Discharge Outputs</div>
            <p className="product-desc">
              Brine from the desalination plant is processed through ion-exchange
              and crystallization. Outputs: NaCl, Mg(OH)₂, KCl, and Bromine.
              Nothing discharged. Everything sold.
            </p>
            <span className="product-arrow">↗</span>
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="home-section">
        <div className="section-label">How it works</div>
        <div className="how-grid">
          <h2>
            Physics at work.<br />
            <em>Nothing wasted.</em>
          </h2>
          <p className="lede">
            Every megawatt of AI compute produces ~700 kW of waste heat at
            60–70°C. Most facilities expend additional energy to reject it.
            Roborns captures it — feeding desalination, then mineral recovery.
            One input. Three revenue streams. Zero discharge.
          </p>
        </div>

        <div className="pillars-grid" style={{ marginTop: "2rem" }}>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "#5DCAA5" }}>⬡</div>
            <div className="pillar-title">AI Data Center</div>
            <p className="pillar-desc">
              GPU racks immersion-cooled in dielectric fluid. Coolant exits at
              60–70°C and flows directly into the desalination plant — making
              waste heat the most valuable resource on site.
            </p>
          </div>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "#85B7EB" }}>◎</div>
            <div className="pillar-title">Seawater Desalination</div>
            <p className="pillar-desc">
              Warm feedwater from Building A powers a VA Tech Wabag MED-TVC
              skid, cutting energy use by 20%. Output scales from 50K to
              150K litres per day.
            </p>
          </div>
          <div className="pillar">
            <div className="pillar-icon" style={{ color: "#c8b4f8" }}>◈</div>
            <div className="pillar-title">Mineral Recovery</div>
            <p className="pillar-desc">
              Concentrated brine is crystallized into NaCl, Mg(OH)₂, KCl,
              and Bromine. Zero-Liquid-Discharge — nothing returns to the
              ocean.
            </p>
          </div>
        </div>

        <div className="roadmap" style={{ marginTop: "3rem" }}>
          <div className="roadmap-item current">
            <span className="roadmap-phase">Step 1 — Intake</span>
            <span className="roadmap-text">Seawater drawn to the facility edge via coastal intake infrastructure.</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-phase">Step 2 — Compute</span>
            <span className="roadmap-text">GPUs cooled by direct liquid immersion. Coolant exits at 60–70°C.</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-phase">Step 3 — Thermal transfer</span>
            <span className="roadmap-text">Hot coolant transfers heat to MED-TVC feedwater — 20% energy saving vs. cold intake.</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-phase">Step 4 — Fresh water</span>
            <span className="roadmap-text">Potable and industrial water produced. Available for offtake contracts.</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-phase">Step 5 — Minerals</span>
            <span className="roadmap-text">Brine concentrated and crystallized. NaCl, Mg(OH)₂, KCl, Bromine sold commercially.</span>
          </div>
          <div className="roadmap-item">
            <span className="roadmap-phase">Step 6 — Zero discharge</span>
            <span className="roadmap-text">No brine returned to sea. No effluent. Every molecule is accounted for and sold.</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta">
        <div>
          <h2>
            Ready to access the<br />
            <em>infrastructure?</em>
          </h2>
          <p className="cta-body">
            Whether you need compute capacity, a water offtake contract, a
            mineral supply agreement, or want to license the model for your own
            coastal site — we respond within 48 hours.
          </p>
          <Link href="/infrastructure" className="btn-primary">
            Get in touch →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)", minWidth: 260 }}>
          {[
            ["Compute", "2 MW → 10 MW"],
            ["Water", "50,000 L/day"],
            ["Minerals", "NaCl · Mg(OH)₂ · KCl"],
            ["Projects", "All coastal areas"],
            ["PUE", "<1.03"],
            ["Discharge", "Zero"],
          ].map(([k, v]) => (
            <div key={k} className="meta-row">
              <span className="meta-key">{k}</span>
              <span className="meta-val hi">{v}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
