"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Cert = { title: string; issuer: string; href: string | null; image?: string };

export function CertGallery({ items }: { items: Cert[] }) {
  const [active, setActive] = useState<Cert | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.classList.add("cert-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("cert-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="row g-3">
        {items.map((cert) => (
          <div className="col-md-6 col-lg-4" key={cert.title}>
            <button type="button" className="cert-card" onClick={() => setActive(cert)}>
              <span className="cert-frame">
                {cert.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cert.image} alt="" className="cert-thumb" />
                ) : null}
              </span>
              <span className="cert-copy">
                <h3 className="h6 mb-1">{cert.title}</h3>
                <p className="small text-secondary mb-0">{cert.issuer}</p>
              </span>
            </button>
          </div>
        ))}
      </div>

      {active
        ? createPortal(
            <div className="cert-lightbox" role="dialog" aria-modal="true" aria-label={active.title}>
              <button type="button" className="cert-lightbox-backdrop" aria-label="Close certificate" onClick={() => setActive(null)} />
              <div className="cert-lightbox-panel">
                <div className="cert-lightbox-head">
                  <div>
                    <p className="kicker mb-1">{active.issuer}</p>
                    <h2 className="h5 mb-0">{active.title}</h2>
                  </div>
                  <button type="button" className="cert-close" aria-label="Close" onClick={() => setActive(null)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
                {active.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={active.image} alt={active.title} className="cert-full" />
                ) : null}
                {active.href ? (
                  <a className="btn btn-primary mt-3" href={active.href} target="_blank" rel="noopener noreferrer">
                    Verify certificate
                  </a>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
