import Link from "next/link";
import { CardReel } from "@/components/CardReel";
import { DeliveryChart } from "@/components/DeliveryChart";
import { DeliveryPipeline } from "@/components/DeliveryPipeline";
import { HeroMark } from "@/components/HeroMark";
import { ProjectCard } from "@/components/ProjectCard";
import { ReviewCard } from "@/components/ReviewCard";
import { RoleCycle } from "@/components/RoleCycle";
import { ServiceCard } from "@/components/ServiceCard";
import { SnapRail } from "@/components/SnapRail";
import { getFeaturedWork, getProfile, getServices, getSite } from "@/lib/content";

export default function HomePage() {
  const profile = getProfile();
  const site = getSite();
  const featured = getFeaturedWork().slice(0, 4);
  const services = getServices();

  return (
    <div className="container py-4 py-lg-5">
      <section className="hero-panel p-4 p-lg-5 rise">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="kicker mb-3">{site.studioLabel}</p>
            <h1 className="display-4 mb-2">{profile.fullName}</h1>
            <p className="studio-lead mb-2">{site.studioLead}</p>
            <p className="fs-3 mb-3">
              <RoleCycle />
            </p>
            <p className="lede mb-2">{profile.summary}</p>
            <p className="text-secondary small mb-0">{site.availabilityLabel}</p>
            <div className="d-flex flex-wrap gap-2 mt-4 hero-actions">
              <Link href="/projects" className="btn btn-primary btn-lg rounded-pill">
                View projects
              </Link>
              <Link href="/contact" className="btn btn-outline-dark btn-lg rounded-pill">
                Contact
              </Link>
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <HeroMark />
          </div>
        </div>
      </section>

      <section className="py-5">
        <p className="kicker">How an order runs</p>
        <h2 className="h-display display-6 mb-2">A delivery pipeline you can watch</h2>
        <p className="lede mb-4">
          Every order goes through the same four stages. Pick one, or let the screen walk through them.
        </p>
        <DeliveryPipeline stages={services.pipeline} />
      </section>

      <section className="py-4">
        <p className="kicker">Services</p>
        <h2 className="h-display display-6 mb-2">Work you can order</h2>
        <p className="lede mb-4">{services.intro}</p>
        <CardReel label="Services" seconds={56}>
          {services.items.map((item) => (
            <ServiceCard item={item} key={item.id} />
          ))}
        </CardReel>
        <Link href="/skills" className="btn btn-link px-0 mt-3">
          Open the skill board
        </Link>
      </section>

      {false && <section className="py-4">
        <p className="kicker">The numbers</p>
        <h2 className="h-display display-6 mb-4">The shape of the work</h2>
        <DeliveryChart title={services.chart.title} caption={services.chart.caption} bars={services.chart.bars} stats={services.stats} />
      </section>}

      <section className="py-4">
        <p className="kicker">Projects</p>
        <h2 className="h-display display-6 mb-4">Example project layouts</h2>
        <p className="text-secondary mb-4">These are starter-template examples, not Kulsoom’s verified work. Replace them with your own projects before sharing the website.</p>
        <SnapRail label="Projects">
          {featured.map((item) => (
            <div className="snap-item" key={item.slug}>
              <ProjectCard item={item} />
            </div>
          ))}
        </SnapRail>
        <Link href="/projects" className="btn btn-outline-primary rounded-pill mt-4">
          All projects
        </Link>
      </section>

      {false && <section className="pt-4 pb-2">
        <p className="kicker">Reviews</p>
        <h2 className="h-display display-6 mb-2">Client feedback</h2>
        <p className="lede mb-4">Written after the work was delivered.</p>
        <CardReel label="Reviews" seconds={40} wide>
          {services.reviews.map((review) => (
            <ReviewCard review={review} key={review.name} />
          ))}
        </CardReel>
      </section>}
    </div>
  );
}
