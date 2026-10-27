import { ArrowRight, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, offers } from "@/lib/clinic-data";

export default function OffersPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Consultations and Examinations"
        description="Dental Cure Clinic consultations and routine examinations in Noida, including implant review, digital X-rays and preventive care planning."
      />

      <PageHero
        eyebrow="Consultations"
        title="Start with an examination"
        description="There is no permanent discount shown on this page. The clinic lists its consultation and examination services so you know what the first appointment covers."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call {clinic.phone}
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Request an appointment
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <SectionHeading eyebrow="Clinic services" title="Consultation options" description="Treatment suitability and final pricing are confirmed after examination." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {offers.map((offer) => (
              <article key={offer.title} className="surface-card surface-card-hover h-full p-7">
                <span className="meta-pill">{offer.badge}</span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-brand-ink">{offer.title}</h2>
                <p className="body-text mt-3">{offer.description}</p>
                <p className="mt-5 text-sm font-semibold text-muted-foreground">{offer.terms}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
