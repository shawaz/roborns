import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { Claim } from "@/components/ClaimBadge";

export default function ServerPage() {
  return (
    <div className="page active" style={{ minHeight: "100vh" }}>
      <section className="product-hero">
        <div>
          <div className="hero-tag" style={{ color: "#5DCAA5" }}>01 / Compute</div>
          <h1>
            Colocation,<br />
            <em>first.</em>
          </h1>
          <p className="product-hero-body">
            Customers bring their own GPUs. Roborns quotes colocation in rupees per kilowatt per month. Pricing is on request. GPU-as-a-service is available on request through a partner, and is not priced on this site.
          </p>
        </div>
        <div className="product-hero-right">
          <div className="meta-row">
            <span className="meta-key">Colocation price</span>
            <span className="meta-val hi">Pricing on request</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Design PUE</span>
            <span className="meta-val">Below 1.08 <Claim tag="Design target"> </Claim></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Heat recovery</span>
            <span className="meta-val">70–85% of IT heat at 60–65°C <Claim tag="Design target"> </Claim></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Standards</span>
            <span className="meta-val">Designed to Tier III standards <Claim tag="Planned"> </Claim></span>
          </div>
        </div>
      </section>

      <div className="product-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "5rem" }}>
        <div>
          <div className="page-image-wrap">
            <Image src="/images/compute.webp" alt="Immersion-cooled compute hall" fill sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
          <section className="product-section">
            <h3>What the colocation rate is for</h3>
            <p>
              The offer is space in an immersion-cooled hall, with network, for IT load the customer brings. The quote is in ₹ per kW per month. The number is not published here.
            </p>
            <p>
              <Claim tag="Design target">Design PUE is below 1.08.</Claim> The measured value will be published after 12 months of operation under ISO/IEC 30134-2.
            </p>
            <p>
              <Claim tag="Design target">The design recovers 70–85% of IT heat at 60–65°C</Claim> and sends that heat to low-temperature multi-effect distillation (LT-MED). Heat that the desalination plant cannot use is rejected to the sea until the plant is expanded.
            </p>
            <p>
              The hall is <Claim tag="Planned">designed to Tier III standards</Claim>. It is not certified. Power source, contracted demand, and any renewable open-access plan are not ready to publish.
            </p>
            <p className="todo-note">
              TODO: power source — grid connection, contracted MVA, and renewable open-access plan.
            </p>
            <p className="todo-note">
              TODO: date the pilot hall is available.
            </p>
            <p>
              Where a GPU count is turned into kilowatts, the design allowance is <Claim tag="Design target">1.3 kW per GPU for H100-class and H200-class systems, and 1.8 kW per GPU for B200-class systems</Claim>, all-in. This page does not sell those GPUs and does not quote a price per GPU-hour.
            </p>
          </section>
        </div>
        <div>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Request a colocation quote</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Tell us the IT load you want to place. We reply with a ₹/kW/month discussion, not a public rate card. For GPU-as-a-service, say so in the message; that path is only through a partner.
            </p>
            <LeadForm
              interest="Compute colocation"
              config="Colocation quote requested. Pricing on request. No public ₹/kW or $/GPU-hour rate."
              source="roborns.com/server"
              initialOpen
              label="Request a quote →"
            />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", marginTop: "1rem" }}>
              Or email <Link href="mailto:compute@roborns.com" style={{ color: "var(--accent)" }}>compute@roborns.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
