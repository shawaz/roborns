import Link from "next/link";
import { COPYRIGHT, LEGAL_CIN, LEGAL_OFFICE } from "@/lib/company";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/status", label: "Status" },
  { href: "/partners", label: "Partners" },
  { href: "/investors", label: "Investors" },
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
      <div className="footer-copy">
        <span>{COPYRIGHT}</span>
        <span>CIN {LEGAL_CIN}</span>
        <span>Registered office: {LEGAL_OFFICE}</span>
        <span>Directors: TODO — names and DINs not published.</span>
        <span>Governing law: India.</span>
        <span>
          <a href="mailto:hello@roborns.com">hello@roborns.com</a>
        </span>
        <p className="site-disclaimer">
          Forward-looking figures are design targets and may change. Nothing on this site is an offer of securities. Investor materials are available on request to eligible investors, by private placement only.
        </p>
      </div>
    </footer>
  );
}
