import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Compute Colocation — Roborns",
  description: "Colocation for customers who bring their own GPUs. Priced in rupees per kilowatt per month, on request.",
  path: "/server",
  image: "/images/compute.webp",
});

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
