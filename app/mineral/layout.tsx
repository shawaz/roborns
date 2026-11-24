import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Mineral Supply — Roborns",
  description: "Zero-liquid-discharge minerals recovered from desalination brine, including sodium chloride, magnesium hydroxide, potassium chloride, and bromine.",
  path: "/mineral",
  image: "/images/minerals.webp",
});

export default function MineralLayout({ children }: { children: React.ReactNode }) {
  return children;
}
