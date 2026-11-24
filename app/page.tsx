import Link from "next/link";
import Image from "next/image";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Claim, ClaimBadge } from "@/components/ClaimBadge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Roborns — Coastal AI Infrastructure",
  description: "Roborns builds coastal AI data centres that turn server heat into fresh water and recover minerals from the brine.",
  path: "/",
  image: "/images/compute.webp",
});

export default function Home() {
  return (
    <div id="page-home" className="page active">
      <DottedSurface />

      <section className="hero hero-centered">
        <div>
          <div className="hero-tag">Coastal AI Infrastructure</div>
          <h1>
            Liquid.<br />
            <em>Intelligence.</em>
          </h1>
          <p className="hero-body">
            Roborns builds coastal AI data centres that turn server heat into fresh water and recover minerals from the brine. Compute is the business. Water and minerals are the licence to operate.
          </p>
          <div className="hero-actions">
            <Link href="/how-it-works" className="btn-primary">How it works</Link>
            <Link href="/status" className="btn-ghost">Project status →</Link>
          </div>
        </div>
      </section>

      <section className="home-products" id="offerings">
        <div className="section-label">What we offer</div>
        <div className="products-grid">
          <Link href="/server" className="product-card">
            <div className="product-accent accent-server"></div>
            <div className="card-image-wrap">
              <Image src="/images/compute.webp" alt="Immersion-cooled compute" fill sizes="(max-width: 900px) 100vw, 33vw" />
            </div>
            <div className="product-index">01 / COMPUTE</div>
            <div className="product-name">Colocation</div>
            <div className="product-sector">You bring the GPUs</div>
            <p className="product-desc">
              Immersion-cooled hall space, quoted in ₹ per kW per month. Pricing on request. <Claim tag="Design target">Design PUE below 1.08.</Claim>
            </p>
            <span className="product-arrow">↗</span>
          </Link>
          <Link href="/water" className="product-card">
            <div className="product-accent accent-water"></div>
            <div className="card-image-wrap">
              <Image src="/images/water.webp" alt="Seawater" fill sizes="(max-width: 900px) 100vw, 33vw" />
            </div>
            <div className="product-index">02 / WATER</div>
            <div className="product-name">Fresh water</div>
            <div className="product-sector">From server heat</div>
            <p className="product-desc">
              Low-temperature distillation (LT-MED) using heat at 60–65°C. Indicative rupee ranges, or a price on request. Not a dollar tariff.
            </p>
            <span className="product-arrow">↗</span>
          </Link>
          <Link href="/mineral" className="product-card">
            <div className="product-accent accent-minerals"></div>
            <div className="card-image-wrap">
              <Image src="/images/minerals.webp" alt="Salt crystals" fill sizes="(max-width: 900px) 100vw, 33vw" />
            </div>
            <div className="product-index">03 / MINERALS</div>
            <div className="product-name">Salts from brine</div>
            <div className="product-sector">Design targets</div>
            <p className="product-desc">
              Sodium chloride, magnesium hydroxide, potassium chloride, and bromine. Offtake letters of intent are invited for 2027. <ClaimBadge tag="Planned" />
            </p>
            <span className="product-arrow">↗</span>
          </Link>
        </div>
      </section>

      <section id="how-it-works" style={{ padding: "5rem 4rem", borderTop: "1px solid var(--card-border)" }}>
        <div className="section-label">How it works</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", marginBottom: "2rem", alignItems: "end" }}>
          <h2>
            Heat, used<br />
            <em>on purpose.</em>
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.9, fontWeight: 300, maxWidth: 540 }}>
            <Claim tag="Design target">70–85% of IT heat is recovered at 60–65°C.</Claim> That hot water feeds LT-MED. The brine can be crystallised into salts. The full diagram is on the how-it-works page.
          </p>
        </div>
        <Link href="/how-it-works" className="btn-outline">Read the flow →</Link>
      </section>

      <section className="home-cta">
        <div>
          <h2>
            Talk to us<br />
            <em>about a quote.</em>
          </h2>
          <p className="cta-body">
            Colocation, water offtake, or a mineral letter of intent. We reply within 48 hours. Nothing on this site is an offer of securities.
          </p>
          <Link href="/contact" className="btn-primary">Contact →</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)", minWidth: 260 }}>
          <div className="meta-row">
            <span className="meta-key">Team</span>
            <span className="meta-val">TODO — not published</span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Status</span>
            <span className="meta-val"><Link href="/status" style={{ color: "var(--accent)" }}>Dated tracker</Link></span>
          </div>
          <div className="meta-row">
            <span className="meta-key">Investors</span>
            <span className="meta-val">Materials on request</span>
          </div>
        </div>
      </section>
    </div>
  );
}
