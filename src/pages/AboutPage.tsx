import { ArrowRight, Building2, MapPin, Phone, ScanLine, ShieldCheck } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, DoctorCard, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, dentists, galleryImages } from "@/lib/clinic-data";

const values = [
  {
    icon: ScanLine,
    title: "See the problem first",
    text: "Digital X-rays are used where needed so treatment decisions are based on the actual condition of the tooth and bone.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the natural tooth when possible",
    text: "Root canal treatment, fillings and crowns are used to repair damage before the clinic considers replacement.",
  },
  {
    icon: Building2,
    title: "Run a clear clinical process",
    text: "Examination, imaging, planning, cost discussion and follow-up are handled in one place instead of across separate providers.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="About Dental Cure Clinic Noida"
        description="Dental Cure Clinic treats patients in Sector 75 and Sector 76, Noida. The team is led by Dr. Gurpreet Singh and Dr. Manpreet Kaur, with more than 30 years of dental practice."
      />

      <PageHero
        eyebrow="About the clinic"
        title="Dental treatment planned from examination, not guesswork"
        description="Dental Cure Clinic is a general and cosmetic dental practice in Noida. It handles implants, root canals, restorations, braces, clear aligners and routine care with the same attention to imaging and follow-up."
        image={galleryImages[0]}
        highlights={[
          { value: "30+", label: "Years of practice" },
          { value: "1,000+", label: "Implants completed" },
          { value: "2", label: "Noida locations" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call the clinic
            </a>
            <ActionLink to="/services" variant="secondary">
              Browse treatments
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
          <div data-reveal="up">
            <p className="section-eyebrow">How the clinic works</p>
            <h2 className="section-title">A small team that keeps you with one dentist</h2>
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                Dental Cure Clinic was set up to handle everyday dental care and advanced treatment in the same clinic.
                Dr. Gurpreet Singh personally guides implant cases and has completed more than 1,000 implants and surgeries.
                Dr. Manpreet Kaur focuses on restorative treatment and the follow-up needed after a procedure.
              </p>
              <p>
                The clinic uses digital X-ray imaging before major treatment. That means the dentist can explain what is
                happening inside the tooth, the bone or the gum before recommending surgery, restoration or orthodontics.
              </p>
              <p>
                Treatment costs are confirmed after examination. In the case of dental implants, the clinic lists a
                treatment range from ₹15,000 to ₹21,000 rather than quoting a single fixed price for every patient.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-reveal="up">
            <div className="surface-card overflow-hidden sm:mt-8">
              <img src={galleryImages[3]} alt="Dental treatment room" className="aspect-[4/5] size-full object-cover" loading="lazy" />
            </div>
            <div className="surface-card overflow-hidden">
              <img src={galleryImages[4]} alt="Dental equipment" className="aspect-[4/5] size-full object-cover" loading="lazy" />
            </div>
            <div className="ink-panel p-6 sm:col-span-2">
              <p className="section-eyebrow text-brand-mint">Clinic location</p>
              <p className="mt-3 flex items-start gap-3 text-sm leading-7 text-white/78">
                <MapPin className="mt-1 size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                {clinic.address}
              </p>
              <p className="mt-3 flex items-start gap-3 text-sm leading-7 text-white/78">
                <MapPin className="mt-1 size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                {clinic.secondaryAddress}
              </p>
              <a href={clinic.maps} target="_blank" rel="noreferrer" className="action-secondary mt-5 border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-background">
        <div className="page-shell">
          <SectionHeading eyebrow="Standards" title="Three promises the clinic can keep" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="surface-card surface-card-hover h-full p-7">
                <span className="grid size-12 place-items-center rounded-2xl border border-brand-teal/10 bg-accent text-brand-teal">
                  <value.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-brand-ink">{value.title}</h3>
                <p className="body-text mt-3">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Dentists"
            title="The people who will treat you"
            action={
              <ActionLink to="/dentists" variant="secondary">
                View profiles
                <ArrowRight className="size-4" />
              </ActionLink>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {dentists.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </PublicLayout>
  );
}
