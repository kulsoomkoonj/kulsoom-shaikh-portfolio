import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { ConnectLinks } from "@/components/ConnectLinks";
import { getProfile, getServiceById, getSite } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Kulsoom Shaikh about remote roles, MCP systems, and selected freelance.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const profile = getProfile();
  const site = getSite();
  const { service: serviceId } = await searchParams;
  const service = getServiceById(serviceId);
  const ordering = service?.title ?? (serviceId ? "a custom job" : "");
  const orderHeading = service?.title ?? (serviceId ? "Custom job" : "");

  return (
    <div className="container py-4 py-lg-5">
      <BackLink href="/" label="Back to Home" />
      <div className="contact-layout">
        <section className="contact-intro">
          <p className="kicker">{ordering ? "Order" : "Contact"}</p>
          <h1 className="h-display display-6 mb-2">{orderHeading ? `Order: ${orderHeading}` : "Start a conversation"}</h1>
          <p className="text-secondary mb-3">
            {ordering
              ? "Describe the job. Kulsoom replies with scope and a timeline."
              : `${site.studioLead}. Remote roles, service orders, and selected freelance.`}
          </p>
          <p className="kicker mb-2">{site.studioLabel}</p>
          <p className="footer-availability mb-2">{site.availabilityLabel}</p>
          <p className="footer-reply mb-4">{site.replyLabel}</p>
          <ConnectLinks />
          <p className="small text-secondary mt-3 mb-0">{profile.location}</p>
        </section>
        <section className="contact-card">
          <p className="kicker mb-2">Email</p>
          <h2 className="h4 h-display mb-1">Write a note</h2>
          <p className="text-secondary mb-4">Once an email address is configured, this opens a prepared email in your mail app.</p>
          <ContactForm serviceTitle={ordering} />
        </section>
      </div>
    </div>
  );
}
