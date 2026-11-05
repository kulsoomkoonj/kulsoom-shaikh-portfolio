"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getSite } from "@/lib/content";

export function SiteHeader() {
  const site = getSite();
  const path = usePathname();

  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg container">
        <Logo />
        <div className="header-tools">
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#siteNav"
            aria-controls="siteNav"
            aria-expanded="false"
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="siteNav">
          <ul className="site-nav navbar-nav">
            {site.nav.map((item) => {
              const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    className={`site-nav-link ${active ? "is-active" : ""}`}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link className="hire-btn" href="/contact">
            Hire me
          </Link>
        </div>
      </nav>
    </header>
  );
}
