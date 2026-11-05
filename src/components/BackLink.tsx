import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="btn btn-outline-dark rounded-pill mb-3">
      ← {label}
    </Link>
  );
}
