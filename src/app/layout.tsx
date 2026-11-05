import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteAgent } from "@/components/SiteAgent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProfile, getSite } from "@/lib/content";
import "./globals.css";

const profile = getProfile();
const site = getSite();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL((process.env.NEXT_PUBLIC_SITE_URL || "https://example.com")),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: profile.summary,
  icons: {
    icon: [

      { url: "/brand/ks-mark.svg", type: "image/svg+xml" },
    ],

  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.headline,

    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
    sameAs: profile.links.filter((link) => link.label !== "Email").map((link) => link.href),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t="light";document.documentElement.setAttribute("data-theme",t);document.documentElement.setAttribute("data-bs-theme",t);}catch(e){}})();`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Script src="/vendor/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <a href="#content" className="visually-hidden-focusable">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <SiteAgent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
