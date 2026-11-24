import Link from "next/link";
import { LegalIdentity } from "@/components/LegalDocument";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About — Roborns",
  description: "Roborns is a coastal infrastructure project operated by Codelude Software Private Limited. Team biographies are not published on this site.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>About</div>
        <h1>About<br /><em>Roborns</em></h1>
        <p className="contact-hero-body">
          One coastal facility. GPU compute cooled by seawater. Waste heat drives desalination. Brine yields commercial minerals. The offering can be rented, bought, or licensed for other coastal sites.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "860px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, marginBottom: "1.5rem" }}>
          The inaugural facility is on the Indian coastline. Exact location details are shared under NDA with prospective partners and clients.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
          Individual team biographies are not published on this site. Open roles are listed on the{" "}
          <Link href="/career" style={{ color: "var(--accent)", textDecoration: "none" }}>careers page</Link>.
        </p>
        <LegalIdentity />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
          <Link href="/contact" style={{ color: "var(--accent)", textDecoration: "none" }}>Contact</Link>
          {" · "}
          <Link href="/help" style={{ color: "var(--accent)", textDecoration: "none" }}>Help</Link>
          {" · "}
          <Link href="/legal" style={{ color: "var(--accent)", textDecoration: "none" }}>Legal</Link>
        </p>
      </div>
    </div>
  );
}
