import { GraduationCap, HeartPulse, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, DoctorCard, PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, dentists } from "@/lib/clinic-data";

const credentials = [
  {
    name: "Dr. Gurpreet Singh",
    role: "Implantologist · B.D.S (Pb), F.A.G.E.",
    detail:
      "More than 30 years in dentistry, with more than 1,000 implants and surgeries completed. He leads implant planning and the surgical cases, and patients are told which stage of treatment he will carry out.",
  },
  {
    name: "Dr. Manpreet Kaur",
    role: "Dentist · B.D.S., F.A.G.E. (Manipal)",
    detail:
      "Focuses on saving natural teeth where possible, with careful treatment planning, hygiene advice and follow-up until the patient is satisfied with the result.",
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
        eyebrow="Our professional team"
        title="The clinicians who lead your treatment"
        description="Dental Cure Clinic is led by two dentists. You will know which dentist is planning and performing your treatment before you sit in the chair."
        image={clinicPhotos[3]}
        highlights={[
          { value: "30+", label: "Years of practice" },
          { value: "1,000+", label: "Implants completed" },
          { value: "2", label: "B.D.S. dentists" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call the clinic
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
            eyebrow="Profiles"
            title="Professional experience in plain terms"
            description="No substitutions and no hidden handovers during treatment planning. If your treatment needs a different dentist, the clinic tells you why."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {dentists.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band-tuck band-shade">
        <div className="page-shell">
          <SectionIntro eyebrow="Credentials" title="What each dentist handles" />
          <div className="grid gap-6 md:grid-cols-2">
            {credentials.map((credential) => (
              <article key={credential.name} className="surface-card p-7">
                <span className="grid size-14 place-items-center rounded-full bg-shade text-ink">
                  <GraduationCap className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.375rem] leading-tight">{credential.name}</h3>
                <p className="mt-2.5 text-[0.95rem] font-semibold text-teal">{credential.role}</p>
                <p className="body-text mt-4">{credential.detail}</p>
              </article>
            ))}
          </div>

          <div className="ink-panel mt-8 grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14">
            <div>
              <HeartPulse className="size-6 text-teal" aria-hidden="true" />
              <h2 className="mt-6 max-w-[24ch] text-[1.75rem] leading-tight text-white">
                Tell us which tooth is the problem
              </h2>
              <p className="mt-4 max-w-[56ch] text-[1rem] leading-[26px] text-light">
                Call the clinic and describe the pain, breakage, missing tooth or alignment concern. The team can advise
                whether you need same-day care, an X-ray or a scheduled appointment.
              </p>
            </div>
            <a href={clinic.phoneHref} className="action-primary shrink-0">
              <Phone className="size-4" aria-hidden="true" /> Speak to reception
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </PublicLayout>
  );
}
