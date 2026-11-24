import Link from "next/link";
import { LEGAL_CIN, LEGAL_NAME, LEGAL_OFFICE } from "@/lib/company";
import { LEGAL_SECTIONS, LEGAL_UPDATED, type LegalSection } from "@/lib/legal";

const EMAIL = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

function LinkedText({ text }: { text: string }) {
  const parts = text.split(EMAIL);
  return (
    <>
      {parts.map((part, index) =>
        part.includes("@") ? (
          <Link key={index} href={`mailto:${part}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
            {part}
          </Link>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

export function LegalIdentity() {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--off-white)", lineHeight: 1.8, marginBottom: "0.4rem" }}>
        {LEGAL_NAME}
      </p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
        CIN {LEGAL_CIN}
      </p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.8 }}>
        Registered office: {LEGAL_OFFICE}
      </p>
      <p className="todo-note" style={{ marginTop: "0.6rem" }}>
        TODO: directors and DINs are not published.
      </p>
    </div>
  );
}

export function LegalSections({ ids }: { ids?: string[] }) {
  const sections = ids
    ? LEGAL_SECTIONS.filter((section) => ids.includes(section.id))
    : LEGAL_SECTIONS;

  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <div id={section.id} style={{ marginBottom: "3.5rem" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
        {section.title}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.9, fontWeight: 300, marginBottom: "1rem" }}
        >
          <LinkedText text={paragraph} />
        </p>
      ))}
    </div>
  );
}

export function LegalUpdatedLine() {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", marginBottom: "3rem", letterSpacing: "0.1em" }}>
      LAST UPDATED: {LEGAL_UPDATED} · {LEGAL_NAME.toUpperCase()}
    </div>
  );
}
