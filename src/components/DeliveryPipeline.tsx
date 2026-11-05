"use client";

import { useEffect, useState } from "react";

type Line = { kind: string; text: string };
type Stage = { title: string; copy: string; lines: Line[] };

const mark: Record<string, string> = { run: "$", step: "▸", ok: "✓" };

export function DeliveryPipeline({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(stages[active]?.lines.length ?? 1);
      return;
    }
    setShown(1);
    const timers = stages[active].lines.map((_, index) => {
      if (index === 0) return 0;
      return window.setTimeout(() => setShown(index + 1), index * 650);
    });
    return () => timers.forEach((timer) => timer && window.clearTimeout(timer));
  }, [active, stages]);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % stages.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [paused, stages.length]);

  const stage = stages[active];
  if (!stage) return null;

  return (
    <div className="row g-4 align-items-stretch">
      <div className="col-lg-6">
        <ol className="pipeline-list list-unstyled mb-0">
          {stages.map((item, index) => {
            const on = index === active;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  className={on ? "pipeline-stage is-active" : "pipeline-stage"}
                  aria-pressed={on}
                  onClick={() => {
                    setPaused(true);
                    setActive(index);
                  }}
                >
                  <span className="pipeline-index">0{index + 1}</span>
                  <span>
                    <span className="pipeline-title">{item.title}</span>
                    <span className="pipeline-copy">{item.copy}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="col-lg-6">
        <div className="term" aria-live="polite">
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term-title">kulsoom — {stage.title.toLowerCase()}</span>
          </div>
          <div className="term-body">
            {stage.lines.slice(0, shown).map((line) => (
              <p key={line.text} className={`term-line term-${line.kind}`}>
                <span aria-hidden="true">{mark[line.kind]}</span>
                {line.text}
              </p>
            ))}
            <p className="term-caret" aria-hidden="true">
              ▍
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
