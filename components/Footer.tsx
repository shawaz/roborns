import Link from "next/link";
import { COPYRIGHT, LEGAL_CIN, LEGAL_OFFICE } from "@/lib/company";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/career", label: "Career" },
  { href: "/news", label: "News" },
  { href: "/help", label: "Help" },
  { href: "/legal", label: "Legal" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer>
      <ul className="footer-links">
        {LINKS.map((link) => (
          <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
        ))}
      </ul>
      <span className="footer-copy">
        {COPYRIGHT}
        <span>CIN {LEGAL_CIN}</span>
        <span>Registered office: {LEGAL_OFFICE}</span>
      </span>
    </footer>
  );
}
