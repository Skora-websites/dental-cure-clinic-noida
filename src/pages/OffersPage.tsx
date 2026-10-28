import { Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, offers } from "@/lib/clinic-data";

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
        description="The clinic does not run a permanent discount. It lists its consultation and examination services so you know what the first appointment covers before you book."
        image={clinicPhotos[4]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call {clinic.phone}
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Make Appointment
            </ActionLink>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <SectionIntro
            eyebrow="Clinic services"
            title="Consultation options"
            description="Treatment suitability and final pricing are confirmed after examination."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {offers.map((offer) => (
              <article key={offer.title} className="surface-card flex h-full flex-col p-7 sm:p-9">
                <span className="meta-pill self-start">{offer.badge}</span>
                <h2 className="mt-6 text-[1.75rem] leading-tight">{offer.title}</h2>
                <p className="body-text mt-4">{offer.description}</p>
                <p className="mt-auto border-t border-hairline pt-6 text-[0.92rem] leading-[1.7] text-body">
                  {offer.terms}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Book the first visit"
        title="An examination is the only way to plan treatment"
        text="Call the clinic to arrange an examination and, where it is needed, a digital X-ray. Nothing is decided before the dentist has seen your teeth."
      />
    </PublicLayout>
  );
}
