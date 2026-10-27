import { ArrowRight, MessageSquareQuote } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, PageHero, ReviewCard, SectionHeading } from "@/components/SiteBlocks";
import { clinic, testimonials } from "@/lib/clinic-data";

export default function ReviewsPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Patient Reviews"
        description="Patient feedback published by Dental Cure Clinic in Noida. Names are not included in the source feedback."
      />

      <PageHero
        eyebrow="Reviews"
        title="Patient feedback published by the clinic"
        description="These quotes are taken from the clinic's public feedback. They describe patient experience, not guaranteed treatment outcomes."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              Call the clinic
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Book appointment
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <SectionHeading eyebrow="Feedback" title="What patients say" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((review) => (
              <ReviewCard key={review.quote} review={review} />
            ))}
          </div>
          <div className="surface-card mt-8 flex items-start gap-4 p-6">
            <MessageSquareQuote className="mt-1 size-5 shrink-0 text-brand-teal" aria-hidden="true" />
            <p className="body-text">
              Dental treatment results differ between patients. If you have a specific concern, ask the dentist for the
              options and risks during your examination before treatment begins.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
