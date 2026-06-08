"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import lightLogo from '../public/logo.png';
import darkLogo from '../public/logo-dark.png';

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" || "dark";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <nav>
      <Link href="/" className="logo">
        <div className="relative w-[50px] h-[50px]">
          <Image
            src={darkLogo}
            alt="Company Logo"
            priority
            className="!hidden dark:block object-contain"
          />
          <Image
            src={lightLogo}
            alt="Company Logo"
            className="dark:hidden !block object-contain"
          />
        </div>
        <span className="logo-text">ROBORNS</span>
      </Link>
      <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
        <li className={pathname === "/server" ? "active" : ""}>
          <Link href="/server" onClick={() => setMobileNavOpen(false)}>Server</Link>
        </li>
        <li className={pathname === "/water" ? "active" : ""}>
          <Link href="/water" onClick={() => setMobileNavOpen(false)}>Water</Link>
        </li>
        <li className={pathname === "/mineral" ? "active" : ""}>
          <Link href="/mineral" onClick={() => setMobileNavOpen(false)}>Mineral</Link>
        </li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle Theme"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--off-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
            padding: '0.25rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link href="/infrastructure" className="nav-cta">
          PROJECT →
        </Link>
      </div>
      <button className="nav-mobile-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        ☰
      </button>
    </nav>
  );
}
