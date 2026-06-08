"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon, X, Menu } from "lucide-react";
import Image from "next/image";
import lightLogo from '../public/logo.png';
import darkLogo from '../public/logo-dark.png';

const MAIN_LINKS = [
  { href: "/server", label: "Compute" },
  { href: "/water", label: "Water" },
  { href: "/mineral", label: "Mineral" },
];

const FOOTER_LINKS = [
  { href: "/legal", label: "Legal" },
  { href: "/career", label: "Career" },
  { href: "/news", label: "News" },
  { href: "/help", label: "Help" },
];

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = saved || (mql.matches ? "dark" : "light");
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const close = () => setMobileNavOpen(false);

  return (
    <>
      <nav>
        <Link href="/" className="logo">
          <Image
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Roborns Logo"
            priority
            width={40}
            height={40}
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
          <span className="logo-text">ROBORNS</span>
        </Link>

        {/* Desktop nav links — hidden on mobile via CSS */}
        <ul className="nav-links">
          {MAIN_LINKS.map((l) => (
            <li key={l.href} className={pathname === l.href ? "active" : ""}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop right controls */}
        <div className="nav-right">
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="theme-btn">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/infrastructure" className="nav-cta">PROJECT →</Link>
        </div>

        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileNavOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Fullscreen mobile overlay */}
      <div className={`mobile-overlay${mobileNavOpen ? " open" : ""}`}>

        {/* Overlay top bar */}
        <div className="mobile-overlay-top">
          <Link href="/" className="logo" onClick={close}>
            <Image
              src={theme === "dark" ? darkLogo : lightLogo}
              alt="Roborns Logo"
              width={36}
              height={36}
              style={{ width: "36px", height: "36px", objectFit: "contain" }}
            />
            <span className="logo-text">ROBORNS</span>
          </Link>
          <button className="nav-mobile-toggle overlay-close" onClick={close} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Main nav links */}
        <nav className="mobile-nav">
          {MAIN_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mobile-nav-link${pathname === l.href ? " active" : ""}`}
              onClick={close}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="mobile-nav-index">0{i + 1}</span>
              {l.label}
              <span className="mobile-nav-arrow">→</span>
            </Link>
          ))}
        </nav>

        {/* Franchise — separate section */}
        <div className="mobile-franchise">
          <span className="mobile-section-label">Project</span>
          <Link href="/infrastructure" className="mobile-franchise-link" onClick={close}>
            Request Infrastructure →
          </Link>
        </div>

        {/* Footer links */}
        <div className="mobile-footer-links">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="mobile-footer-link" onClick={close}>
              {l.label}
            </Link>
          ))}
        </div>

        <p className="mobile-overlay-copy">© 2026 Roborns. All rights reserved.</p>
      </div>
    </>
  );
}
