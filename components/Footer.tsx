import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <span className="footer-logo-text">Roborns</span>
      </div>
      <ul className="footer-links">
        <li><Link href="/#offerings">Offerings</Link></li>
        <li><Link href="/#how-it-works">How it works</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <span className="footer-copy">© 2026 Roborns. All rights reserved.</span>
    </footer>
  );
}
