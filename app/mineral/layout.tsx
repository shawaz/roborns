import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Mineral Supply — Roborns",
  description: "Design-target salts from brine: sodium chloride, magnesium hydroxide, potassium chloride, and bromine. Offtake letters of intent invited for 2027.",
  path: "/mineral",
  image: "/images/minerals.webp",
});

export default function MineralLayout({ children }: { children: React.ReactNode }) {
  return children;
}
