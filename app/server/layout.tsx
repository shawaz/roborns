import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Compute Colocation — Roborns",
  description: "Bring your own GPU racks into seawater-cooled immersion colocation. Waste heat from the compute floor is routed into desalination.",
  path: "/server",
  image: "/images/compute.webp",
});

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
