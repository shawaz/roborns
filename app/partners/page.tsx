import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Partners — Roborns",
  description: "Roborns names a partner only after that organisation has agreed in writing.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">Partners</div>
        <h1>Partners.</h1>
        <p className="contact-hero-body">
          Coming soon. A name appears here only after written consent. No equipment vendor, utility, or offtaker is listed yet.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "720px" }}>
        <p className="todo-note">TODO: publish partners only when each has agreed in writing to be named.</p>
      </div>
    </div>
  );
}
