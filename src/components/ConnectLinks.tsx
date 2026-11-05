import { getProfile } from "@/lib/content";

function ConnectIcon({ label }: { label: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (label === "GitHub") {
    return (
      <svg {...common}>
        <path d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.9a3.1 3.1 0 0 0-.9-2.4c3 0 6-1.8 6-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.2 3 6 6 6a3.1 3.1 0 0 0-.9 2.4V22" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7.5h.01M12 17v-4.2a2 2 0 0 1 4 0V17" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ConnectLinks({ iconsOnly = false }: { iconsOnly?: boolean }) {
  const links = getProfile().links;

  return (
    <div className={iconsOnly ? "d-flex gap-2" : "d-flex flex-column gap-2"}>
      {links.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <a
            key={link.label}
            href={link.href}
            className={iconsOnly ? "footer-connect footer-connect-icon" : "footer-connect"}
            {...(iconsOnly ? { "aria-label": link.label } : {})}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className={iconsOnly ? undefined : "icon-bubble icon-bubble-sm"}>
              <ConnectIcon label={link.label} />
            </span>
            {iconsOnly ? null : (
              <span className="d-flex flex-column lh-sm">
                <span className="fw-semibold">{link.label}</span>
                <span className="small text-secondary">
                  {"handle" in link && link.handle ? link.handle : "Contact details pending"}
                </span>
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
