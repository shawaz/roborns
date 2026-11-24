import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { Claim, ClaimBadge } from "@/components/ClaimBadge";

const PRODUCTS = [
  { name: "Sodium chloride", formula: "NaCl", output: "about 3,600–4,800 t a year" },
  { name: "Magnesium hydroxide", formula: "Mg(OH)₂", output: "about 400–540 t a year" },
  { name: "Potassium chloride", formula: "KCl", output: "about 100–130 t a year" },
  { name: "Bromine", formula: "Br₂", output: "about 8–11 t a year" },
];

export default function MineralPage() {
  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      <section className="product-hero">
        <div>
          <div className="hero-tag" style={{ color: "#c8b4f8" }}>03 / Minerals</div>
          <h1>
            Salts from<br />
            <em>the brine.</em>
          </h1>
          <p className="product-hero-body">
            At a design case of 150 cubic metres a day of fresh water, the seawater feed carries a limited set of commercial salts. These are design targets, not a catalogue with a price or a delivery date. The product list is the four salts below.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">Status</span>
            <span className="meta-val hi">Design targets <ClaimBadge tag="Design target" /></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Commercial step</span>
            <span className="meta-val">Offtake letters of intent invited for 2027 <ClaimBadge tag="Planned" /></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Price</span>
            <span className="meta-val">Not published</span>
          </div>
        </div>
      </section>

      <div className="product-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem" }}>
        <div>
          <div className="page-image-wrap">
            <Image src="/images/minerals.webp" alt="Salt crystals" fill sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
          <section className="product-section">
            <h3>Design-target outputs</h3>
            <p>
              Yearly figures below assume <Claim tag="Design target">150 m³/day of product water</Claim>. Recovery ratio, daily brine volume, and the extra heat a zero-liquid-discharge crystalliser would need are not published yet. Zero liquid discharge is a design intention, not a completed plant.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)" }}>
              {PRODUCTS.map((product) => (
                <div key={product.formula} style={{ background: "var(--card-bg)", padding: "1.2rem 1.4rem", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{product.name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)" }}>{product.formula}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--off-white)" }}>
                    <Claim tag="Design target">{product.output}</Claim>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Offtake letters of intent</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              <Claim tag="Planned">Letters of intent are invited for 2027.</Claim> There is no public price per tonne and no stated lead time.
            </p>
            <LeadForm
              interest="Mineral offtake"
              config="Mineral offtake LOI enquiry for 2027. No public $/t price."
              source="roborns.com/mineral"
              initialOpen
              label="Discuss an offtake →"
            />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", marginTop: "1rem" }}>
              Or email <Link href="mailto:minerals@roborns.com" style={{ color: "var(--accent)" }}>minerals@roborns.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
