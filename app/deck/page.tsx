import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deck — Roborns",
  description: "The Roborns deck is not published.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/investors" },
};

export default function DeckPage() {
  return (
    <div className="page" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <section className="contact-hero">
        <div className="hero-tag">Not published</div>
        <h1>This deck is offline.</h1>
        <p className="contact-hero-body">
          Investor materials are available on request to eligible investors. This page is not an offer of securities.
        </p>
        <Link href="/investors" className="btn-primary">Request materials →</Link>
      </section>
    </div>
  );
}
