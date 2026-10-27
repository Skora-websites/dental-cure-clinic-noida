import { ArrowRight, GraduationCap, HeartPulse, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, DoctorCard, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, dentists, galleryImages } from "@/lib/clinic-data";

const credentials = [
  {
    name: "Dr. Gurpreet Singh",
    role: "Implantologist",
    detail:
      "More than 30 years in dentistry, with more than 1,000 implants and surgeries completed. He leads the implant planning and surgical cases.",
  },
  {
    name: "Dr. Manpreet Kaur",
    role: "Restorative focus",
    detail:
      "Focuses on saving natural teeth where possible, with careful treatment planning, hygiene advice and follow-up until the patient is satisfied.",
  },
];

export default function DentistsPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dentists at Dental Cure Clinic Noida"
        description="Meet Dr. Gurpreet Singh, implantologist with 30+ years of practice, and Dr. Manpreet Kaur, dentist focused on restorative care and patient follow-up."
      />

      <PageHero
        eyebrow="Dentists"
        title="The clinicians who lead your treatment"
        description="Dental Cure Clinic is led by two dentists. You will know which dentist is planning and performing your treatment before you sit in the chair."
        image={galleryImages[1]}
        highlights={[
          { value: "30+", label: "Years of practice" },
          { value: "1,000+", label: "Implants completed" },
          { value: "B.D.S.", label: "Qualified dentists" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call the clinic
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
          <SectionHeading
            eyebrow="Profiles"
            title="Professional experience in plain terms"
            description="No substitutions or hidden handovers during treatment planning. If your treatment needs a different dentist, the clinic tells you why."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {dentists.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-background">
        <div className="page-shell">
          <SectionHeading eyebrow="Credentials" title="What each dentist handles" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {credentials.map((credential) => (
              <article key={credential.name} className="surface-card surface-card-hover h-full p-7">
                <span className="grid size-12 place-items-center rounded-2xl border border-brand-teal/10 bg-accent text-brand-teal">
                  <GraduationCap className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-brand-ink">{credential.name}</h3>
                <p className="mt-2 text-sm font-semibold text-brand-teal">{credential.role}</p>
                <p className="body-text mt-4">{credential.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 ink-panel grid gap-6 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl border border-white/25 bg-white/10 text-brand-mint">
                <HeartPulse className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold text-white">Tell us which tooth is the problem</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">
                Call the clinic and describe the pain, breakage, missing tooth or alignment concern. The team can advise
                whether you need same-day care, an X-ray or a scheduled appointment.
              </p>
            </div>
            <a href={clinic.phoneHref} className="action-primary bg-brand-mint text-brand-deep hover:bg-white">
              <Phone className="size-4" /> Speak to reception
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </PublicLayout>
  );
}
