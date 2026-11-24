import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Compute Colocation — Roborns",
  description: "Colocate your own GPUs, or rent Roborns H100, H200, and B200 hardware by the hour. Both offers use the seawater-cooled immersion hall.",
  path: "/server",
  image: "/images/compute.webp",
});

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
