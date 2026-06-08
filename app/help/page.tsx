import Link from "next/link";

export const metadata = { title: "Help — Roborns" };

const FAQS = [
  {
    q: "How do I start a water offtake agreement?",
    a: "Visit our Water page to use the offtake calculator. Once you have a volume and contract term in mind, submit an enquiry via the Contact page or email supply@codelude.com. Our commercial team will respond within 2 business days.",
  },
  {
    q: "What server co-location options are available?",
    a: "We offer rack-level and cage-level co-location with liquid immersion cooling. Capacity ranges from 10 kW racks to dedicated 500 kW halls. Visit the Server page to explore configurations and start an enquiry.",
  },
  {
    q: "What minerals does Roborns extract and sell?",
    a: "Our brine extraction wing produces sodium chloride (NaCl), magnesium sulphate, potassium chloride, and lithium carbonate concentrate. Product availability and volumes vary by facility phase. Contact minerals@codelude.com for current availability.",
  },
  {
    q: "How is waste heat from servers used?",
    a: "Server racks are cooled via liquid immersion. The heated coolant (65°C+) is routed directly into our Multi-Effect Distillation desalination system, which uses this heat to flash-evaporate and distill seawater. No additional energy source is required for desalination.",
  },
  {
    q: "Where is the Roborns facility located?",
    a: "Our inaugural facility is on the Indian coastline. Exact location details are shared under NDA with prospective partners and clients. Contact us to arrange a facility visit.",
  },
  {
    q: "Can I visit the facility?",
    a: "Yes — we welcome site visits from prospective partners, investors, and offtake clients. Use the Contact page to request a visit and we will arrange access with our operations team.",
  },
  {
    q: "What are the minimum contract terms?",
    a: "Water offtake agreements start at 1-year terms with volume flexibility. Server co-location requires a minimum 12-month commitment. Mineral supply contracts are negotiated on a per-product basis.",
  },
];

const CHANNELS = [
  { label: "General Enquiries", val: "roborns@codelude.com" },
  { label: "Water Supply", val: "supply@codelude.com" },
  { label: "Server & Infrastructure", val: "infra@codelude.com" },
  { label: "Minerals", val: "minerals@codelude.com" },
  { label: "Careers", val: "careers@codelude.com" },
  { label: "Press & Media", val: "press@codelude.com" },
  { label: "Legal", val: "legal@codelude.com" },
];

export default function HelpPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag" style={{ color: "var(--accent)", marginBottom: "1rem" }}>Help</div>
        <h1>How Can We<br /><em>Help?</em></h1>
        <p className="contact-hero-body">
          Answers to common questions about our services, infrastructure, and how to get started.
        </p>
      </section>

      <div className="help-layout" style={{ padding: "4rem", display: "grid", gridTemplateColumns: "1fr 340px", gap: "5rem", alignItems: "start" }}>
        <div>
          <div className="section-label">Frequently Asked Questions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)" }}>
            {FAQS.map((item) => (
              <div key={item.q} style={{ background: "var(--card-bg)", padding: "2rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--off-white)" }}>{item.q}</h3>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.9, fontWeight: 300 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="help-sidebar" style={{ position: "sticky", top: "100px" }}>
          <div className="section-label">Contact Channels</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--card-border)", border: "1px solid var(--card-border)", marginBottom: "2rem" }}>
            {CHANNELS.map((ch) => (
              <div key={ch.label} className="channel-row">
                <span className="channel-name">{ch.label}</span>
                <span className="channel-val">{ch.val}</span>
              </div>
            ))}
          </div>
          <Link href="/infrastructure" className="btn-primary" style={{ display: "block", textAlign: "center" }}>
            Send a Message →
          </Link>
        </div>
      </div>
    </div>
  );
}
