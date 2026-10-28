import { MessageSquareQuote } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, ReviewCard, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, testimonials } from "@/lib/clinic-data";

export default function ReviewsPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Patient Reviews"
        description="Patient feedback published by Dental Cure Clinic in Noida. Names are not included in the source feedback."
      />

      <PageHero
        eyebrow="Patient feedback"
        title="What patients say after treatment"
        description="These quotes are taken from the clinic's public feedback. They describe patient experience, not guaranteed treatment outcomes."
        image={clinicPhotos[3]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              Call the clinic
            </a>
          </>
        }
      />

      <section className="band band-tuck band-dark">
        <div className="page-shell">
          <SectionIntro
            align="center"
            tone="light"
            eyebrow="In their words"
            title="Feedback published by the clinic"
            className="mb-[70px]"
          />
          <div className="grid gap-14 md:grid-cols-3 md:gap-10">
            {testimonials.map((review) => (
              <ReviewCard key={review.quote} review={review} align="left" />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <div className="flex items-start gap-5 rounded-panel bg-light p-7 sm:p-9">
            <MessageSquareQuote className="mt-1 size-6 shrink-0 text-teal" aria-hidden="true" />
            <p className="body-text max-w-[70ch]">
              Dental treatment results differ between patients. If you have a specific concern, ask the dentist for the
              options and the risks during your examination, before any treatment begins.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
