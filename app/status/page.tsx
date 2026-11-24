import { ClaimBadge } from "@/components/ClaimBadge";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Project Status — Roborns",
  description: "A dated tracker of permits, land, power, EPC, and offtake letters. Entries are placeholders until the owner fills them.",
  path: "/status",
});

const ROWS = [
  "Coastal Regulation Zone (CRZ) clearance",
  "State Pollution Control Board consent to establish",
  "Power connection",
  "Land",
  "EPC",
  "Offtake letters of intent",
];

export default function StatusPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">Status</div>
        <h1>Project<br /><em>status.</em></h1>
        <p className="contact-hero-body">
          Tracker as of 24 November 2026. Nothing below is marked Verified or Contracted. Each line is a placeholder for the owner to date and evidence.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "860px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)" }}>
          {ROWS.map((row) => (
            <div key={row} style={{ background: "var(--card-bg)", padding: "1.4rem 1.6rem", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{row}</div>
                <p className="todo-note" style={{ marginTop: "0.35rem" }}>TODO: status, date, and evidence link.</p>
              </div>
              <ClaimBadge tag="Planned" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
