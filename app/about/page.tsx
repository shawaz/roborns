import Link from "next/link";
import { LegalIdentity } from "@/components/LegalDocument";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About — Roborns",
  description: "Roborns is operated by Codelude Software Private Limited. Team biographies and director names are not published yet.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">About</div>
        <h1>About<br /><em>Roborns</em></h1>
        <p className="contact-hero-body">
          Roborns builds coastal AI data centres that turn server heat into fresh water and recover minerals from the brine. The exact plot is shared under NDA. The state of the first site is not published yet.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "860px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Team</h2>
        <p className="todo-note" style={{ marginBottom: "2rem" }}>
          TODO: founders, advisors, photos, and LinkedIn profiles. No names are invented here.
        </p>
        <LegalIdentity />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
          <Link href="/career" style={{ color: "var(--accent)" }}>Careers</Link>
          {" · "}
          <Link href="/contact" style={{ color: "var(--accent)" }}>Contact</Link>
          {" · "}
          <Link href="/status" style={{ color: "var(--accent)" }}>Project status</Link>
        </p>
      </div>
    </div>
  );
}
