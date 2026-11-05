import { Children, type CSSProperties, type ReactNode } from "react";

/** Continuous row, same motion as the language reel. The second copy is only for the loop. */
export function CardReel({
  children,
  label,
  seconds = 48,
  wide = false,
}: {
  children: ReactNode;
  label: string;
  seconds?: number;
  wide?: boolean;
}) {
  const items = Children.toArray(children);
  const loop = [...items, ...items];
  const style = { "--reel-time": `${seconds}s` } as CSSProperties;

  return (
    <div className={`card-reel${wide ? " is-wide" : ""}`} aria-label={label} style={style}>
      <div className="card-track">
        {loop.map((child, index) => {
          const copy = index >= items.length;
          return (
            <div className="card-slide" key={index} aria-hidden={copy || undefined} inert={copy ? true : undefined}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
