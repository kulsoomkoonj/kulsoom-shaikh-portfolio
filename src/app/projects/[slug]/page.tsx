import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { getWork, getWorkBySlug } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getWork().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return { title: "Project" };
  return { title: item.name, description: item.tagline };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();
  const items = getWork();
  const index = items.findIndex((entry) => entry.slug === item.slug);
  const previous = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return <CaseStudy item={item} previous={previous} next={next} />;
}
