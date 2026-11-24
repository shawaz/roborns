import Link from "next/link";
import { LegalIdentity, LegalSections, LegalUpdatedLine } from "@/components/LegalDocument";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Legal — Roborns",
  description: "Terms of service, privacy policy, service level agreement, and intellectual property terms for Roborns.",
  path: "/legal",
});

export default function LegalPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Legal</div>
        <h1>Terms &amp; Policies</h1>
        <p className="contact-hero-body">
          Governing documents for all Roborns infrastructure services, data handling, and contractual obligations.
        </p>
      </section>

      <div style={{ padding: "4rem", maxWidth: "860px" }}>
        <LegalUpdatedLine />
        <LegalIdentity />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          <Link href="/terms" style={{ color: "var(--accent)", textDecoration: "none" }}>Terms of service</Link>
          {" · "}
          <Link href="/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>Privacy policy</Link>
          {" · "}
          <a href="#sla" style={{ color: "var(--accent)", textDecoration: "none" }}>Service level agreement</a>
          {" · "}
          <a href="#ip" style={{ color: "var(--accent)", textDecoration: "none" }}>Intellectual property</a>
        </p>
        <LegalSections />
        <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "2rem", marginTop: "2rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
            For legal enquiries, contract disputes, or compliance questions, contact us at{" "}
            <Link href="mailto:legal@codelude.com" style={{ color: "var(--accent)", textDecoration: "none" }}>legal@codelude.com</Link>{" "}
            or visit our <Link href="/help" style={{ color: "var(--accent)", textDecoration: "none" }}>help page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
