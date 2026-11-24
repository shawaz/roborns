import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";
import { Claim } from "@/components/ClaimBadge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Help — Roborns",
  description: "The product list, location policy, site visits, and how investment works: by private placement only.",
  path: "/help",
});

const FAQS = [
  {
    q: "What does Roborns sell?",
    a: "Three things, and only these. Colocation: you bring the GPUs; the price is in ₹ per kW per month and is on request. GPU-as-a-service is not a public price; it is available on request through a partner. Water: LT-MED fresh water, with indicative rupee ranges or a quote on request. Minerals: sodium chloride, magnesium hydroxide, potassium chloride, and bromine, as design targets.",
  },
  {
    q: "Where is the facility?",
    a: "The exact plot is shared under NDA. The state and district are not published on this site yet.",
  },
  {
    q: "Can I visit?",
    a: "Visits are arranged for prospective customers and eligible investors after you write to us. Use the Contact page. We do not publish an open visiting day.",
  },
  {
    q: "How do I invest?",
    a: "By private placement only, to eligible investors. Investor materials are available on request. Nothing on this website is an offer or solicitation of securities. No ticket size is published.",
  },
  {
    q: "What is the design heat and power story?",
    a: "Design target: 70–85% of IT heat recovered at 60–65°C, and a design PUE below 1.08. A measured PUE would be published after 12 months under ISO/IEC 30134-2. The hall is designed to Tier III standards and is not certified.",
  },
];

export default function HelpPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Help</div>
        <h1>One list of<br /><em>products.</em></h1>
        <p className="contact-hero-body">
          If another page disagrees with this one, this page is the list to follow until the owner corrects it.
        </p>
      </section>

      <div className="help-layout" style={{ padding: "4rem", display: "grid", gridTemplateColumns: "1fr 340px", gap: "5rem", alignItems: "start" }}>
        <div>
          <div className="section-label">Questions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)" }}>
            {FAQS.map((item) => (
              <div key={item.q} style={{ background: "var(--card-bg)", padding: "2rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--off-white)" }}>{item.q}</h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.9, fontWeight: 300 }}>
                  {item.q.startsWith("What is the design") ? <Claim tag="Design target">{item.a}</Claim> : item.a}
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)" }}>
            <Link href="/contact" style={{ color: "var(--accent)" }}>Contact</Link>
            {" · "}
            <Link href="/investors" style={{ color: "var(--accent)" }}>Investor materials</Link>
          </p>
        </div>
        <div>
          <div className="section-label">Email</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)", marginBottom: "2rem" }}>
            {CONTACTS.map((ch) => (
              <div key={ch.email} className="channel-row">
                <span className="channel-name">{ch.label}</span>
                <Link className="channel-val" href={`mailto:${ch.email}`}>{ch.email}</Link>
              </div>
            ))}
          </div>
          <Link href="/contact" className="btn-primary" style={{ display: "block", textAlign: "center" }}>
            Send a Message →
          </Link>
        </div>
      </div>
    </div>
  );
}
