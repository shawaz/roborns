import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Infrastructure Projects — Roborns",
  description: "Request a Roborns coastal infrastructure project. Choose a region, mark a site boundary, and send a configuration to the team.",
  path: "/infrastructure",
  image: "/images/facility.webp",
});

export default function InfrastructureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
