import type { ReactNode } from "react";

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-[1080px] px-5 py-16 sm:py-20">
      {kicker ? (
        <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.18em] text-accent">{kicker}</p>
      ) : null}
      {title ? <h2 className="mb-10 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2> : null}
      {children}
    </section>
  );
}
