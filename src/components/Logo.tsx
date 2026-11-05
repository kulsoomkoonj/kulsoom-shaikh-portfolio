import Link from "next/link";
import { getSite } from "@/lib/content";

/** KS mark only. The name and studio line sit beside it in the header. */
export function Logo({ compact = false }: { compact?: boolean }) {
  const site = getSite();

  return (
    <Link href="/" className="logo-link d-flex align-items-center gap-2 text-decoration-none">
      <img
        src="/brand/ks-mark.svg"
        alt={compact ? "KS" : ""}
        width={640}
        height={640}
        className={compact ? "brand-logo brand-logo-full" : "brand-logo"}
      />
      {compact ? null : (
        <span className="d-flex flex-column lh-1">
          <span className="brand-name">{site.name}</span>
          <span className="brand-role">{site.studioLabel}</span>
        </span>
      )}
    </Link>
  );
}
