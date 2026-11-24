import Link from "next/link";
import { LegalIdentity, LegalSections, LegalUpdatedLine } from "@/components/LegalDocument";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Terms of Service — Roborns",
  description: "Terms of service, service level agreement, and intellectual property terms for Roborns infrastructure services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Terms</div>
        <h1>Terms of Service</h1>
        <p className="contact-hero-body">
          Contract terms, the service level agreement, and intellectual property for Roborns services.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "860px" }}>
        <LegalUpdatedLine />
        <LegalIdentity />
        <LegalSections ids={["terms", "sla", "ip"]} />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
          Data handling is described in the{" "}
          <Link href="/privacy" style={{ color: "var(--accent)", textDecoration: "none" }}>privacy policy</Link>.
          {" "}All four sections are also collected on the{" "}
          <Link href="/legal" style={{ color: "var(--accent)", textDecoration: "none" }}>legal page</Link>.
        </p>
      </div>
    </div>
  );
}
