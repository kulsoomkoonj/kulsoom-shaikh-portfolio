import Link from "next/link";
import { Glyph } from "@/components/Glyph";

export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  proof: string;
  proofHref: string;
  icon: string;
};

export function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="card h-100 border-0 shadow-sm lift">
      <div className="card-body p-4 d-flex flex-column">
        <span className="icon-bubble mb-3">
          <Glyph name={item.icon} />
        </span>
        <h3 className="h5 mt-2">{item.title}</h3>
        <p className="text-secondary">{item.summary}</p>
        <ul className="text-secondary small ps-3 mb-3">
          {item.includes.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="small mb-3">
          <Link href={item.proofHref}>See {item.proof}</Link>
        </p>
        <Link href={`/contact?service=${item.id}`} className="btn btn-primary rounded-pill mt-auto align-self-start">
          Order this
        </Link>
      </div>
    </article>
  );
}
