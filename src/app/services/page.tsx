import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { CardReel } from "@/components/CardReel";
import { DeliveryChart } from "@/components/DeliveryChart";
import { DeliveryPipeline } from "@/components/DeliveryPipeline";
import { ReviewCard } from "@/components/ReviewCard";
import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Order an AI agent, WhatsApp bot, document assistant, or full-stack app from Kulsoom Shaikh.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="container py-4 py-lg-5">
      <BackLink href="/" label="Back to Home" />
      <p className="kicker">Services</p>
      <h1 className="h-display display-6 mb-2">Work you can order</h1>
      <p className="lede mb-4">{services.intro}</p>

      <section className="mb-5">
        <h2 className="h-display h3 mb-4">How an order runs</h2>
        <DeliveryPipeline stages={services.pipeline} />
      </section>

      <section className="mb-5">
        <CardReel label="Services" seconds={56}>
          {services.items.map((item) => (
            <ServiceCard item={item} key={item.id} />
          ))}
        </CardReel>
      </section>

      <section className="mb-5">
        <p className="kicker">The numbers</p>
        <h2 className="h-display display-6 mb-4">The shape of the work</h2>
        <DeliveryChart title={services.chart.title} caption={services.chart.caption} bars={services.chart.bars} stats={services.stats} />
      </section>

      <section className="mb-5">
        <p className="kicker">Reviews</p>
        <h2 className="h-display display-6 mb-2">Client feedback</h2>
        <p className="lede mb-4">Written after the work was delivered.</p>
        <CardReel label="Reviews" seconds={40} wide>
          {services.reviews.map((review) => (
            <ReviewCard review={review} key={review.name} />
          ))}
        </CardReel>
      </section>

      <section className="hero-panel p-4 p-lg-5">
        <p className="kicker mb-2">Start an order</p>
        <h2 className="h-display h3">Not sure which one?</h2>
        <p className="text-secondary mb-3">Describe the job in a note. Fast reply available 24/7.</p>
        <Link href="/contact?service=custom" className="btn btn-primary rounded-pill">
          Send the job
        </Link>
      </section>
    </div>
  );
}
