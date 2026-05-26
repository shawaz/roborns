import Link from "next/link";

export default function Footer() {
  return (
    <footer>

      <ul className="footer-links">
        <li><Link href="/legal">Legal</Link></li>
        <li><Link href="/career">Career</Link></li>
        <li><Link href="/news">News</Link></li>
        <li><Link href="/help">Help</Link></li>
      </ul>
      <span className="footer-copy">© 2026 Roborns Infrastructure Pvt Ltd. All rights reserved.</span>
    </footer>
  );
}
