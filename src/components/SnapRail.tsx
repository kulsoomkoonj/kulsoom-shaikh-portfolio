"use client";

import { useRef, type ReactNode } from "react";

export function SnapRail({ label, children }: { label: string; children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  function move(direction: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(el.clientWidth * 0.75, 280), behavior: "smooth" });
  }

  return (
    <div className="snap-wrap">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <p className="text-secondary small mb-0">Use the arrows to browse.</p>
        <div className="d-flex gap-2">
          <button type="button" className="snap-arrow" aria-label={`Previous ${label}`} onClick={() => move(-1)}>
            ‹
          </button>
          <button type="button" className="snap-arrow" aria-label={`Next ${label}`} onClick={() => move(1)}>
            ›
          </button>
        </div>
      </div>
      <div
        className="snap-rail"
        ref={scroller}
        tabIndex={0}
        aria-label={label}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("a, button")) return;
          const el = scroller.current;
          if (!el) return;
          drag.current = { on: true, x: event.clientX, left: el.scrollLeft, moved: false };
          el.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const el = scroller.current;
          if (!el || !drag.current.on) return;
          const delta = event.clientX - drag.current.x;
          if (Math.abs(delta) > 6) drag.current.moved = true;
          el.scrollLeft = drag.current.left - delta;
        }}
        onPointerUp={() => {
          drag.current.on = false;
        }}
        onClickCapture={(event) => {
          if (!drag.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          drag.current.moved = false;
        }}
      >
        {children}
      </div>
    </div>
  );
}
