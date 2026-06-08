import Link from "next/link";

export const metadata = { title: "Careers — Roborns" };

const OPENINGS = [
  {
    title: "Thermal Systems Engineer",
    dept: "Engineering",
    location: "Coastal Facility, India",
    type: "Full-time",
    desc: "Design and optimise waste-heat recovery loops for MED-TVC desalination systems. Experience with thermodynamic modelling and heat exchanger design required.",
  },
  {
    title: "Data Centre Infrastructure Specialist",
    dept: "Infrastructure",
    location: "Coastal Facility, India",
    type: "Full-time",
    desc: "Oversee server rack deployment, liquid immersion cooling systems, and power distribution. Strong background in hyperscale facility operations.",
  },
  {
    title: "Hydrogeologist / Brine Analyst",
    dept: "Minerals",
    location: "Coastal Facility, India",
    type: "Full-time",
    desc: "Analyse brine composition, manage mineral extraction yields, and ensure product quality for lithium, magnesium, and salt streams.",
  },
  {
    title: "Business Development Manager",
    dept: "Commercial",
    location: "Remote / Hybrid",
    type: "Full-time",
    desc: "Drive offtake agreements for water, minerals, and server co-location. Experience in infrastructure or commodity trading preferred.",
  },
  {
    title: "Environmental Compliance Officer",
    dept: "Operations",
    location: "Coastal Facility, India",
    type: "Full-time",
    desc: "Ensure all facility operations meet coastal environmental regulations. Manage permitting, impact assessments, and stakeholder reporting.",
  },
];

const VALUES = [
  { icon: "⚡", title: "Zero Waste Culture", desc: "Every resource loop is closed. We don't discard energy, water, or materials — we transform them." },
  { icon: "🌊", title: "Coastal Stewardship", desc: "Our facilities are built in harmony with coastal ecosystems, not at the expense of them." },
  { icon: "🔬", title: "Engineering-First", desc: "Problems are solved from first principles. We build things that have never been built before." },
  { icon: "🌍", title: "Mission-Driven", desc: "We're solving real infrastructure shortages — water, energy, and minerals — at the same time." },
];

export default function CareerPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Careers</div>
        <h1>Build What&apos;s Never<br /><em>Been Built</em></h1>
        <p className="contact-hero-body">
          Roborns is assembling a team of engineers, scientists, and operators to run the world&apos;s first fully circular coastal infrastructure facility.
        </p>
      </section>

      <div style={{ padding: "4rem" }}>
        <div className="section-label">Company Values</div>
        <div className="pillars-grid" style={{ marginBottom: "5rem" }}>
          {VALUES.map((v) => (
            <div key={v.title} className="pillar">
              <div className="pillar-icon">{v.icon}</div>
              <div className="pillar-title">{v.title}</div>
              <p className="pillar-desc">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-label">Open Positions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)" }}>
          {OPENINGS.map((job) => (
            <div key={job.title} className="job-row">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>{job.title}</h3>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.1em" }}>{job.dept}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em" }}>{job.location}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em" }}>{job.type}</span>
                  </div>
                </div>
                <Link href="/infrastructure" className="btn-outline" style={{ fontSize: "0.62rem", padding: "0.5rem 1.2rem" }}>
                  Apply →
                </Link>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8, fontWeight: 300, maxWidth: "640px" }}>{job.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2.5rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Don&apos;t see your role?</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            We&apos;re always open to exceptional people. Send us your background and what problem you want to help solve.
          </p>
          <Link href="/infrastructure" className="btn-primary">Get in Touch →</Link>
        </div>
      </div>
    </div>
  );
}
