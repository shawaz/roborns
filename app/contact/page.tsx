import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { CONTACTS } from "@/lib/contacts";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Contact — Roborns",
  description: "Send a message to Roborns about compute, water, minerals, infrastructure projects, careers, or press.",
  path: "/contact",
});

const INTERESTS = [
  "General enquiry",
  "Compute colocation",
  "Water offtake",
  "Mineral supply",
  "Infrastructure project",
  "Careers",
  "Press",
];

export default function ContactPage() {
  return (
    <div className="page active">
      <section className="contact-hero">
        <div className="hero-tag">Contact</div>
        <h1>
          Send a<br />
          <em>message.</em>
        </h1>
        <p className="contact-hero-body">
          Compute, water, minerals, a coastal project, careers, or press — write to us here. We respond to qualified enquiries within 48 hours.
        </p>
      </section>

      <div className="contact-body">
        <div>
          <div className="section-label" style={{ marginBottom: "2rem" }}>
            Enquiry
          </div>
          <LeadForm
            interest="General enquiry"
            interests={INTERESTS}
            config=""
            source="roborns.com/contact"
            initialOpen
            label="Send a message →"
          />
        </div>
        <div className="contact-info">
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            Direct channels
          </div>
          <div className="contact-channels">
            {CONTACTS.map((channel) => (
              <div key={channel.email} className="channel-row">
                <span className="channel-name">{channel.label}</span>
                <Link className="channel-val" href={`mailto:${channel.email}`}>
                  {channel.email}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
