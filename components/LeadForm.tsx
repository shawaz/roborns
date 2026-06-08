"use client";
import { useState } from "react";

interface Props {
  interest: string;
  config: string;
  source: string;
  accent?: string;
  label?: string;
}

export function LeadForm({ interest, config, source, accent = "var(--accent)", label }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, interest, config, source }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "rgba(93,202,165,0.06)", border: `1px solid ${accent}`, padding: "1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem", color: accent }}>✓</div>
        <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Enquiry Received</div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--muted)", lineHeight: 1.7 }}>
          We&apos;ll respond to <span style={{ color: "var(--off-white)" }}>{email}</span> within 48 hours.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="btn-primary"
        style={{ width: "100%", textAlign: "center", background: accent === "var(--accent)" ? undefined : accent }}
      >
        {label || `Enquire About ${interest} →`}
      </button>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: accent, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Enquiry — {interest}
        </span>
        <button type="button" onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>✕</button>
      </div>
      {config && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--muted)", background: "var(--card-border)", padding: "0.6rem 0.8rem", lineHeight: 1.5 }}>
          {config}
        </div>
      )}
      <input className="form-input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
      <input className="form-input" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea className="form-textarea" rows={3} placeholder="Additional requirements or questions (optional)" value={message} onChange={e => setMessage(e.target.value)} />
      <button
        type="submit"
        className="btn-primary"
        style={{ padding: "0.9rem", opacity: status === "loading" ? 0.6 : 1 }}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Submit Enquiry →"}
      </button>
      {status === "error" && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.63rem", color: "#ff6b6b", margin: 0 }}>
          Failed to send. Email roborns@codelude.com directly.
        </p>
      )}
    </form>
  );
}
