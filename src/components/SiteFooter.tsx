import Link from "next/link";
import { ConnectLinks } from "@/components/ConnectLinks";
import { Logo } from "@/components/Logo";
import { getProfile, getSite } from "@/lib/content";

export function SiteFooter() {
  const profile = getProfile();
  const site = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <Logo />
          <nav className="footer-nav" aria-label="Footer">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ConnectLinks iconsOnly />
        </div>
        <div className="footer-base">
          <p className="mb-0">
            © {year} {site.name}
            <span className="footer-dot" aria-hidden="true">
              ·
            </span>
            {site.studioLabel}
            <span className="footer-dot" aria-hidden="true">
              ·
            </span>
            {profile.location}
          </p>
          <p className="footer-reply mb-0">{site.replyLabel}</p>
        </div>
      </div>
    </footer>
  );
}
