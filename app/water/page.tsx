import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { Claim } from "@/components/ClaimBadge";

export default function WaterPage() {
  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      <section className="product-hero">
        <div>
          <div className="hero-tag" style={{ color: "#85B7EB" }}>02 / Water</div>
          <h1>
            Heat into<br />
            <em>fresh water.</em>
          </h1>
          <p className="product-hero-body">
            Server heat at 60–65°C is hot water, not steam. It can drive low-temperature multi-effect distillation (LT-MED): several effects in series, using that heat to evaporate seawater under vacuum. It is not a thermal-vapour-compression plant, and it is not net zero by itself.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">Process</span>
            <span className="meta-val hi">LT-MED <Claim tag="Design target"> </Claim></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Phase 1 heat</span>
            <span className="meta-val">First 1.5 MW of IT load <Claim tag="Design target"> </Claim></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Price</span>
            <span className="meta-val">Indicative ₹ ranges, or on request</span>
          </div>
        </div>
      </section>

      <div className="product-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem" }}>
        <div>
          <div className="page-image-wrap">
            <Image src="/images/water.webp" alt="Seawater" fill sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
          <section className="product-section">
            <h3>Phase 1, as a design target</h3>
            <p>
              <Claim tag="Design target">A 150,000 litre-per-day LT-MED train is sized to the heat from about the first 1.5 MW of IT load.</Claim> Heat from any larger compute hall is rejected to the sea until the water plant is expanded. Pumps and vacuum still use about <Claim tag="Design target">1.5–2.5 kWh of electricity per cubic metre</Claim>. The plant does not run on heat alone.
            </p>
            <p>
              Indicative planning ranges, not a tariff and not a contract: <Claim tag="Design target">potable bulk water ₹40–60 per kilolitre</Claim>; <Claim tag="Design target">high-purity industrial water ₹80–200 per kilolitre</Claim>, depending on specification. Remineralised water is quoted only after a signed letter of intent.
            </p>
            <p>
              Carbon, as a planning comparison only: against seawater reverse osmosis at 3–5 kWh per kilolitre on India&apos;s grid, the estimated saving is <Claim tag="Design target">about 2.5–3.5 kg of CO₂ per kilolitre</Claim>. That is not a measured site result.
            </p>
            <p>
              The date the pilot hall and the water train are available is not set.
            </p>
            <p className="todo-note">TODO: pilot hall availability date, and the water-plant date tied to it.</p>
          </section>
        </div>
        <div>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Request an offtake discussion</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Volume, grade, and price are agreed in a contract. This form does not calculate a dollar or rupee invoice.
            </p>
            <LeadForm
              interest="Water offtake"
              config="Water offtake enquiry. No public price calculator."
              source="roborns.com/water"
              initialOpen
              label="Request a discussion →"
            />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", marginTop: "1rem" }}>
              Or email <Link href="mailto:water@roborns.com" style={{ color: "var(--accent)" }}>water@roborns.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
