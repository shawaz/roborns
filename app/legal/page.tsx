import Link from "next/link";

export const metadata = { title: "Legal — Roborns" };

const SECTIONS = [
  {
    title: "Terms of Service",
    content: [
      "By accessing or using Roborns infrastructure services, you agree to be bound by these terms. Our services encompass server co-location, desalinated water supply, and mineral extraction offtake contracts.",
      "All service agreements are subject to a minimum contract period as specified in individual offtake agreements. Early termination may incur fees as outlined in your service contract.",
      "Roborns reserves the right to modify service parameters with 30 days written notice. Clients may terminate agreements without penalty if modifications materially affect agreed service levels.",
    ]
  },
  {
    title: "Privacy Policy",
    content: [
      "Roborns collects only the information necessary to provide infrastructure services and maintain regulatory compliance. This includes contact details, usage metrics, and billing information.",
      "We do not sell, rent, or share personal data with third parties except as required by law or as necessary to deliver contracted services. All data is stored in accordance with applicable data protection regulations.",
      "Clients may request access to, correction of, or deletion of their personal data by contacting our data protection officer at legal@roborns.com.",
    ]
  },
  {
    title: "Service Level Agreement",
    content: [
      "Roborns guarantees 99.9% uptime for server infrastructure and continuous water supply as per contracted volumes. Scheduled maintenance windows will be communicated with a minimum of 72 hours notice.",
      "In the event of service disruption, Roborns will issue service credits proportional to the downtime experienced, calculated as a percentage of the monthly service fee.",
      "Force majeure events including natural disasters, government actions, or grid-level failures are excluded from SLA calculations. Roborns will make commercially reasonable efforts to restore services in all circumstances.",
    ]
  },
  {
    title: "Intellectual Property",
    content: [
      "All technology, processes, and systems developed by Roborns remain the exclusive intellectual property of Roborns Infrastructure Pvt Ltd. Client use of these systems is limited to the scope defined in service agreements.",
      "Clients retain full ownership of their data and workloads hosted within Roborns facilities. Roborns will not access, analyze, or share client data except for the purpose of delivering contracted services.",
    ]
  }
];

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
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", marginBottom: "3rem", letterSpacing: "0.1em" }}>
          LAST UPDATED: JANUARY 2026 · ROBORNS INFRASTRUCTURE PVT LTD
        </div>
        {SECTIONS.map((section) => (
          <div key={section.title} style={{ marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
              {section.title}
            </h2>
            {section.content.map((para, i) => (
              <p key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1rem" }}>
                {para}
              </p>
            ))}
          </div>
        ))}
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
