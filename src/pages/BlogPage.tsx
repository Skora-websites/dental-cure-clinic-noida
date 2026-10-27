import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, Folder } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, posts, services } from "@/lib/clinic-data";

const imageBySlug: Record<string, string | undefined> = {
  "choosing-a-dental-implant": services.find((service) => service.slug === "dental-implants")?.image,
  "root-canal-treatment-explained": services.find((service) => service.slug === "root-canals")?.image,
  "choosing-between-braces-and-aligners": services.find((service) => service.slug === "orthodontics")?.image,
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental Health Blog"
        description="Dental guidance from Dental Cure Clinic about implants, root canal treatment, X-rays, braces and clear aligners."
      />

      <PageHero
        eyebrow="Blog"
        title="Dental guides written for patients"
        description="These posts explain how the clinic plans treatment and what to expect before, during and after common dental procedures."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              Ask the clinic a question
            </a>
            <ActionLink to="/contact" variant="secondary">
              Contact reception
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <SectionHeading eyebrow="Latest posts" title="Treatment explained" description="Posts are written around the clinic's own treatment process rather than generic dental marketing." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="surface-card surface-card-hover group h-full overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-white">
                  {imageBySlug[post.slug] && (
                    <img src={imageBySlug[post.slug]} alt={post.title} className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 text-brand-teal">
                      <Folder className="size-3.5" aria-hidden="true" />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-brand-ink">{post.title}</h2>
                  <p className="body-text mt-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="action-ghost mt-5 px-0">
                    Read the full guide
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
