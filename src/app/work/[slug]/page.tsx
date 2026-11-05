import { redirect } from "next/navigation";

export default async function WorkSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/projects/${slug}`);
}
