import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Water Offtake — Roborns",
  description: "LT-MED fresh water from server heat. Indicative rupee ranges or a quote on request. Not a public dollar price.",
  path: "/water",
  image: "/images/water.webp",
});

export default function WaterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
