import { Link, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, Folder, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, posts, services } from "@/lib/clinic-data";

const imageBySlug: Record<string, string | undefined> = {
  "choosing-a-dental-implant": services.find((service) => service.slug === "dental-implants")?.image,
  "root-canal-treatment-explained": services.find((service) => service.slug === "root-canals")?.image,
  "choosing-between-braces-and-aligners": services.find((service) => service.slug === "orthodontics")?.image,
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <PublicLayout>
        <PageMeta title="Post not found" description="The requested blog post was not found." />
        <PageHero
          eyebrow="Post not found"
          title="That article is not available"
          description="The link may be out of date. Read the other dental guides on the blog index."
          actions={<Link to="/blog" className="action-primary">Back to all posts</Link>}
        />
      </PublicLayout>
    );
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <PublicLayout>
      <PageMeta title={post.title} description={post.excerpt} />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={imageBySlug[post.slug]}
        highlights={[
          { value: post.readTime.replace(" read", ""), label: "Minutes to read" },
          { value: post.date.split(" ")[0], label: "Published day" },
          { value: "Noida", label: "Clinic location" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Ask the dentist
            </a>
            <Link to="/appointment" className="action-secondary">
              Book an appointment
              <ArrowRight className="size-4" />
            </Link>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
          <article className="surface-card p-6 sm:p-10" data-reveal="up">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
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
            <div className="prose-clinic mt-8">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mb-5">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="ink-panel p-6 sm:p-7" data-reveal="up">
            <p className="section-eyebrow text-brand-mint">Next step</p>
            <h2 className="font-display text-2xl font-semibold text-white">Bring your X-ray to the appointment</h2>
            <p className="mt-4 text-sm leading-7 text-white/78">
              If you already have imaging, bring it with you. The dentist can still take a new digital X-ray if the
              treatment plan needs a current image.
            </p>
            <a href={clinic.phoneHref} className="action-primary mt-6 w-full bg-brand-mint text-brand-deep hover:bg-white">
              <Phone className="size-4" /> {clinic.phone}
            </a>
            <Link to="/contact" className="action-secondary mt-3 w-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
              Contact the clinic
            </Link>
          </aside>
        </div>
      </section>

      <section className="page-section bg-background">
        <div className="page-shell">
          <SectionHeading eyebrow="Keep reading" title="Related guides" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <article key={item.slug} className="surface-card surface-card-hover p-6 sm:p-7">
                <p className="section-eyebrow">{item.category}</p>
                <h3 className="font-display text-2xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="body-text mt-3">{item.excerpt}</p>
                <Link to={`/blog/${item.slug}`} className="action-ghost mt-5 px-0">
                  Read this guide
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
