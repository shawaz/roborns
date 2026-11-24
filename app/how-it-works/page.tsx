import Link from "next/link";
import { Claim } from "@/components/ClaimBadge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "How It Works — Roborns",
  description: "From seawater intake to immersion compute, LT-MED, brine, and minerals. Figures are design targets.",
  path: "/how-it-works",
});

const STEPS = [
  {
    n: "01",
    title: "Seawater intake",
    text: "Seawater is drawn to the site. The exact intake, recovery ratio, and outfall are part of the basis of design, which is not signed yet.",
  },
  {
    n: "02",
    title: "Compute",
    text: "Customers’ GPUs sit in immersion coolant. Design allowance is 1.3 kW per GPU for H100-class and H200-class systems, and 1.8 kW for B200-class systems, all-in.",
    tag: "Design target" as const,
  },
  {
    n: "03",
    title: "Heat recovery",
    text: "70–85% of IT heat is recovered as water at 60–65°C. This is hot water, not motive steam.",
    tag: "Design target" as const,
  },
  {
    n: "04",
    title: "LT-MED",
    text: "That heat drives low-temperature multi-effect distillation. A 150,000 L/day train is sized to about the first 1.5 MW of IT load. Further heat is rejected to the sea until the plant grows. Pumps and vacuum still use about 1.5–2.5 kWh of electricity per cubic metre.",
    tag: "Design target" as const,
  },
  {
    n: "05",
    title: "Brine and minerals",
    text: "Concentrated brine can yield sodium chloride, magnesium hydroxide, potassium chloride, and bromine. Zero-liquid-discharge crystallisation would take more of the same heat.",
    tag: "Design target" as const,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">Process</div>
        <h1>How it<br /><em>works.</em></h1>
        <p className="contact-hero-body">
          One line of equipment: intake, compute, heat, LT-MED, brine. Every figure on this page is a design target, not a measurement.
        </p>
      </section>
      <div style={{ padding: "4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)", maxWidth: "860px" }}>
          {STEPS.map((step) => (
            <div key={step.n} className="flow-step">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--accent)", marginBottom: "0.8rem" }}>{step.n}</div>
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.8rem" }}>{step.title}</h2>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.7 }}>
                {step.tag ? <Claim tag={step.tag}>{step.text}</Claim> : step.text}
              </p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "2rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)" }}>
          <Link href="/server" style={{ color: "var(--accent)" }}>Colocation</Link>
          {" · "}
          <Link href="/water" style={{ color: "var(--accent)" }}>Water</Link>
          {" · "}
          <Link href="/mineral" style={{ color: "var(--accent)" }}>Minerals</Link>
        </p>
      </div>
    </div>
  );
}
