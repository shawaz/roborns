import Link from "next/link";

export const metadata = { title: "News — Roborns" };

const ARTICLES = [
  {
    date: "May 2026",
    tag: "Milestone",
    title: "Roborns Breaks Ground on First Coastal Facility",
    excerpt: "Construction has commenced on our inaugural facility on the Indian coastline. The 12-hectare site will house 8 MW of liquid-immersion GPU servers, a 150,000 L/day desalination plant, and a brine mineral extraction wing.",
    accent: "var(--accent)",
  },
  {
    date: "April 2026",
    tag: "Partnership",
    title: "Water Offtake Agreement Signed with Municipal Authority",
    excerpt: "Roborns has entered a 5-year potable water supply agreement covering 80,000 litres per day for a coastal municipality. The contract marks the first commercial water sale from a waste-heat-powered desalination plant in the region.",
    accent: "#85B7EB",
  },
  {
    date: "March 2026",
    tag: "Technology",
    title: "MED-TVC System Achieves 99.2% Uptime in Pilot Phase",
    excerpt: "Our Multi-Effect Distillation pilot completed a 90-day continuous run with zero unplanned shutdowns. Thermal efficiency exceeded design targets by 12%, reducing per-litre energy cost to below $0.004.",
    accent: "#c8b4f8",
  },
  {
    date: "February 2026",
    tag: "Funding",
    title: "Roborns Closes Pre-Seed Round to Fund Facility Build-Out",
    excerpt: "We have secured pre-seed funding to finance Phase 1 construction. Capital will be deployed across civil works, server infrastructure procurement, and regulatory permitting for the full operational facility.",
    accent: "#F0997B",
  },
  {
    date: "January 2026",
    tag: "Research",
    title: "Published: Lithium Extraction from Coastal Brine Concentrates",
    excerpt: "Our engineering team has published findings from a 6-month brine analysis study demonstrating commercially viable lithium carbonate yields from Indian Ocean brine concentrate. Full paper available on request.",
    accent: "var(--accent)",
  },
];

export default function NewsPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>News</div>
        <h1>Latest from<br /><em>Roborns</em></h1>
        <p className="contact-hero-body">
          Milestones, partnerships, technology breakthroughs, and announcements from our coastal infrastructure build-out.
        </p>
      </section>

      <div style={{ padding: "4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)" }}>
          {ARTICLES.map((article) => (
            <div
              key={article.title}
              className="news-row"
              style={{ borderLeft: `3px solid ${article.accent}` }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: article.accent, border: `1px solid ${article.accent}`, padding: "0.15rem 0.5rem", letterSpacing: "0.1em" }}>
                  {article.tag.toUpperCase()}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
                  {article.date}
                </span>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>{article.title}</h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.73rem", color: "var(--muted)", lineHeight: 1.9, fontWeight: 300, maxWidth: "700px" }}>
                {article.excerpt}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--muted)", lineHeight: 1.8 }}>
          For press enquiries and media requests, contact{" "}
          <Link href="mailto:press@codelude.com" style={{ color: "var(--accent)", textDecoration: "none" }}>press@codelude.com</Link>.
        </div>
      </div>
    </div>
  );
}
