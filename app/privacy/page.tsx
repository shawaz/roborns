import Link from "next/link";
import { LegalIdentity, LegalSections, LegalUpdatedLine } from "@/components/LegalDocument";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Privacy Policy — Roborns",
  description: "How Codelude Software Private Limited collects and handles personal data for Roborns infrastructure services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Privacy</div>
        <h1>Privacy Policy</h1>
        <p className="contact-hero-body">
          How personal data is collected and used for Roborns infrastructure services.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "860px" }}>
        <LegalUpdatedLine />
        <LegalIdentity />
        <LegalSections ids={["privacy"]} />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
          The full set of terms, the service level agreement, and intellectual property terms are on the{" "}
          <Link href="/legal" style={{ color: "var(--accent)", textDecoration: "none" }}>legal page</Link>
          {" "}and the{" "}
          <Link href="/terms" style={{ color: "var(--accent)", textDecoration: "none" }}>terms page</Link>.
        </p>
      </div>
    </div>
  );
}
