import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Investors — Roborns",
  description: "Investor materials are available on request to eligible investors. This page is not an offer of securities.",
  path: "/investors",
});

export default function InvestorsPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">Investors</div>
        <h1>Materials on<br /><em>request.</em></h1>
        <p className="contact-hero-body">
          Investor materials are available on request to eligible investors. Nothing on this website is an offer or solicitation of securities. No ticket size and no security type are published here.
        </p>
      </section>
      <div className="contact-body">
        <div>
          <LeadForm
            interest="Investor materials"
            config="Request for investor materials. Eligible investors only. Not a public offer."
            source="roborns.com/investors"
            initialOpen
            label="Request materials →"
          />
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.8 }}>
            Participation, if any, is by private placement only. Email <Link href="mailto:investors@roborns.com" style={{ color: "var(--accent)" }}>investors@roborns.com</Link>.
          </p>
          <p className="todo-note" style={{ marginTop: "1rem" }}>
            TODO: eligibility check and NDA before any data room. This form only records a request.
          </p>
        </div>
      </div>
    </div>
  );
}
