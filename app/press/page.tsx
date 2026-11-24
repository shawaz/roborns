import Link from "next/link";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Press — Roborns",
  description: "Press contact and a short description of Roborns. Founder biographies are not published.",
  path: "/press",
});

export default function PressPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">Press</div>
        <h1>Press kit.</h1>
        <p className="contact-hero-body">
          Roborns builds coastal AI data centres that turn server heat into fresh water and recover minerals from the brine. The first site&apos;s state is not published yet. The exact plot stays under NDA.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "760px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
          Logo: <Link href="/logo.png" style={{ color: "var(--accent)" }}>/logo.png</Link>
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "1rem" }}>
          Press contact: <Link href="mailto:press@roborns.com" style={{ color: "var(--accent)" }}>press@roborns.com</Link>
        </p>
        <p className="todo-note">TODO: founder biographies, approved photos, and a one-page fact sheet once the owner supplies them. Do not draft people.</p>
      </div>
    </div>
  );
}
