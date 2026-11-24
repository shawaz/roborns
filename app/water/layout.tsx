import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Water Offtake — Roborns",
  description: "Desalinated water produced from waste heat at a Roborns coastal facility, offered for municipal and industrial offtake.",
  path: "/water",
  image: "/images/water.webp",
});

export default function WaterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
