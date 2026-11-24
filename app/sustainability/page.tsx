import { Claim } from "@/components/ClaimBadge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Sustainability — Roborns",
  description: "How Roborns will report water, energy, and brine, with the baseline stated next to any carbon figure.",
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">Sustainability</div>
        <h1>What we will<br /><em>measure.</em></h1>
        <p className="contact-hero-body">
          Water, energy, and brine will be reported with a method. This page does not claim a measured result.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "800px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, marginBottom: "1rem" }}>
          <Claim tag="Design target">Heat recovery target: 70–85% of IT heat at 60–65°C.</Claim>
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, marginBottom: "1rem" }}>
          <Claim tag="Design target">Design PUE is below 1.08.</Claim> A measured PUE will be published after 12 months under ISO/IEC 30134-2.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, marginBottom: "1rem" }}>
          Carbon baseline, stated before any saving: seawater reverse osmosis at 3–5 kWh per kilolitre on India&apos;s grid. Against that baseline, the planning estimate is <Claim tag="Design target">about 2.5–3.5 kg of CO₂ avoided per kilolitre</Claim>. It is not a site measurement.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9 }}>
          Brine volume, recovery ratio, and zero-liquid-discharge heat demand will be published with the basis of design. They are not on this page yet.
        </p>
        <p className="todo-note" style={{ marginTop: "1.5rem" }}>TODO: method note and first measured dataset, once the plant runs.</p>
      </div>
    </div>
  );
}
