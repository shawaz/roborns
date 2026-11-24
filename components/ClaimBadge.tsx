export type ClaimTag = "Verified" | "Contracted" | "Design target" | "Planned";

const TAG_CLASS: Record<ClaimTag, string> = {
  Verified: "verified",
  Contracted: "contracted",
  "Design target": "design-target",
  Planned: "planned",
};

export function ClaimBadge({ tag }: { tag: ClaimTag }) {
  return (
    <span className={`claim-badge claim-${TAG_CLASS[tag]}`} data-tag={TAG_CLASS[tag]}>
      {tag}
    </span>
  );
}

export function Claim({ tag, children }: { tag: ClaimTag; children: React.ReactNode }) {
  return (
    <span className="claim">
      {children} <ClaimBadge tag={tag} />
    </span>
  );
}
