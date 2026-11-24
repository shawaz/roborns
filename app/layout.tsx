import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LEGAL_CIN, LEGAL_NAME, LEGAL_OFFICE, SITE_URL } from "@/lib/company";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Roborns — Coastal AI Infrastructure",
    template: "%s",
  },
  description: "Roborns builds coastal AI data centres that turn server heat into fresh water and recover minerals from the brine.",
  openGraph: {
    siteName: "Roborns",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    var mql = window.matchMedia('(prefers-color-scheme: dark)');
                    theme = mql.matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Roborns",
              legalName: LEGAL_NAME,
              url: SITE_URL,
              email: "hello@roborns.com",
              taxID: LEGAL_CIN,
              address: {
                "@type": "PostalAddress",
                streetAddress: "No 23, Tasleem Manzil, Kasaba Bengre",
                addressLocality: "Mangalore",
                addressRegion: "Karnataka",
                postalCode: "575001",
                addressCountry: "IN",
              },
              description: LEGAL_OFFICE,
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
