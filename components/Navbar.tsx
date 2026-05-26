"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav>
      <Link href="/" className="logo">
        <span className="logo-text">ROBORNS</span>
      </Link>
      <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
        <li><Link href="/#offerings">Offerings</Link></li>
        <li><Link href="/#how-it-works">How it works</Link></li>
      </ul>
      <Link href="/contact" className="nav-cta">
        Get access →
      </Link>
      <button className="nav-mobile-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        ☰
      </button>
    </nav>
  );
}
