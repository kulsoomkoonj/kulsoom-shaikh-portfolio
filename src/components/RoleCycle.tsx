"use client";

import { useEffect, useState } from "react";

const ROLES = ["Agentic AI engineer", "MCP builder", "LLM product developer", "Full-stack engineer"];

export function RoleCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROLES.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="role-cycle" aria-live="polite">
      {ROLES[index]}
    </span>
  );
}
