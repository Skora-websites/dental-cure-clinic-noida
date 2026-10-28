import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, BlogCard, CtaBand, PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, posts, services } from "@/lib/clinic-data";

export default function BlogPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental Health Blog"
        description="Dental guidance from Dental Cure Clinic about implants, root canal treatment, X-rays, braces and clear aligners."
      />

      <PageHero
        eyebrow="News and blog"
        title="Dental guides written for patients"
        description="These posts explain how the clinic plans treatment and what to expect before, during and after common dental procedures."
        image={clinicPhotos[0]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              Ask the clinic a question
            </a>
            <ActionLink to="/contact" variant="secondary">
              Contact reception
            </ActionLink>
          </>
        }
      />

      <section className="band band-tuck band-light">
        <div className="page-shell">
          <SectionIntro
            align="center"
            eyebrow="Latest posts"
            title="Insights from our blog."
            className="mb-[70px]"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ask the dentist"
        title="Bring your question to the appointment"
        text="If a guide on this site raises something specific about your teeth, call the clinic so the dentist can answer it against your own examination."
      />
    </PublicLayout>
  );
}
