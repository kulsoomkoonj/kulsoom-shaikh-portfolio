import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-5">
      <h1 className="h-display">Page not found</h1>
      <Link href="/" className="btn btn-primary rounded-pill mt-3">
        Home
      </Link>
    </div>
  );
}
