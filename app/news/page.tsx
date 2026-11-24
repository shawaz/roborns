import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "News — Roborns",
  description: "Roborns will publish announcements only when each item can be tagged Verified or Contracted.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <section className="contact-hero">
        <div className="hero-tag">News</div>
        <h1>No items<br /><em>published.</em></h1>
        <p className="contact-hero-body">
          Earlier posts claimed a groundbreaking, a municipal water contract, a pilot uptime result, a funding close, and a brine-metals paper. Those posts did not carry evidence on this site, so they have been taken down. A new item will appear here only when it can be tagged Verified or Contracted.
        </p>
      </section>
      <div style={{ padding: "4rem", maxWidth: "760px" }}>
        <p className="todo-note">
          TODO: owner to confirm whether any withdrawn item should return, and to attach the permit, photo, contract, or filing.
        </p>
      </div>
    </div>
  );
}
