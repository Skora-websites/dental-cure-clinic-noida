import { Link, useParams } from "react-router-dom";
import { Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { BlogCard, PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, posts, services } from "@/lib/clinic-data";

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
          description="The link may be out of date. The other dental guides are on the blog index."
          actions={
            <Link to="/blog" className="action-primary">
              Back to all posts
            </Link>
          }
        />
        <section className="band">
          <div className="page-shell">
            <SectionIntro eyebrow="Journal" title="Read the other guides" />
            <Link to="/blog" className="action-secondary">
              Open the blog
            </Link>
          </div>
        </section>
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
        image={post.image}
        highlights={[
          { value: post.readTime.replace(" read", " minutes"), label: "Reading time" },
          { value: post.date, label: "Published" },
          { value: "Sector 75, Noida", label: "Clinic" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Ask the dentist
            </a>
            <Link to="/appointment" className="action-secondary">
              Make Appointment
            </Link>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-14">
            <article className="prose-clinic max-w-[68ch]">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mb-5">
                  {paragraph}
                </p>
              ))}
            </article>

            <aside className="ink-panel p-7 lg:sticky lg:top-32">
              <span className="sub-title">Next step</span>
              <h2 className="mt-6 text-[1.375rem] leading-tight text-white">Bring your X-ray to the appointment</h2>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-light">
                If you already have imaging, bring it with you. The dentist can still take a new digital X-ray if the
                treatment plan needs a current image.
              </p>
              <div className="mt-7 grid gap-3">
                <a href={clinic.phoneHref} className="action-primary w-full">
                  <Phone className="size-4" aria-hidden="true" /> {clinic.phone}
                </a>
                <Link to="/contact" className="action-secondary w-full">
                  Contact the clinic
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="band band-tuck band-light">
        <div className="page-shell">
          <SectionIntro align="center" eyebrow="Keep reading" title="Related guides" className="mb-[70px]" />
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
