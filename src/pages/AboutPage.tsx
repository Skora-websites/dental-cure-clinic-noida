import { Building2, MapPin, Phone, ScanLine, ShieldCheck } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, DoctorCard, PageHero, SectionIntro, StatRow } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, dentists, galleryImages } from "@/lib/clinic-data";

const standards = [
  {
    icon: ScanLine,
    title: "See the problem first",
    text: "Digital X-rays are used where they are needed, so treatment decisions rest on the actual condition of the tooth and bone rather than an assumption.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the natural tooth where possible",
    text: "Root canal treatment, fillings and crowns are used to repair damage before the question of replacement comes up.",
  },
  {
    icon: Building2,
    title: "Run one clear clinical process",
    text: "Examination, imaging, planning, cost discussion and follow-up happen in one place instead of being split across providers.",
  },
];

const stats = [
  { value: "30+", label: "Years in practice", note: "Implant and general dentistry in Noida since the 1990s." },
  { value: "1,000+", label: "Implants placed", note: "Cases planned from a digital X-ray and reviewed with the patient." },
  { value: "2", label: "Clinics in Noida", note: "Sector 75 and Sector 76, both run by the same team." },
  { value: "8", label: "Treatments offered", note: "From emergency root canal care to implants and aligners." },
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
        description="Dental Cure Clinic is a general and cosmetic dental practice in Noida. Implants, root canals, restorations, braces, clear aligners and routine care are all handled with the same attention to imaging and follow-up."
        image={clinicPhotos[4]}
        highlights={[
          { value: "30+", label: "Years of practice" },
          { value: "1,000+", label: "Implants completed" },
          { value: "Sector 75 · 76", label: "Two Noida clinics" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call the clinic
            </a>
            <ActionLink to="/services" variant="secondary">
              Browse treatments
            </ActionLink>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
            <div>
              <SectionIntro eyebrow="How the clinic works" title="A small team that keeps you with one dentist" />
              <div className="prose-clinic space-y-5">
                <p>
                  Dental Cure Clinic was set up to handle everyday dental care and advanced treatment in the same clinic.
                  Dr. Gurpreet Singh personally guides implant cases and has completed more than 1,000 implants and
                  surgeries. Dr. Manpreet Kaur focuses on restorative treatment and the follow-up needed after a
                  procedure.
                </p>
                <p>
                  The clinic uses digital X-ray imaging before major treatment, so the dentist can explain what is
                  happening inside the tooth, the bone or the gum before recommending surgery, restoration or
                  orthodontics.
                </p>
                <p>
                  Treatment costs are confirmed after examination. For dental implants the clinic lists a range from
                  ₹15,000 to ₹21,000 rather than quoting one fixed price for every patient.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-panel">
                <img
                  src={galleryImages[3]}
                  alt="Dental treatment illustration published by the clinic"
                  className="aspect-[4/5] size-full object-cover"
                  loading="lazy"
                  width={400}
                  height={500}
                />
              </figure>
              <figure className="overflow-hidden rounded-panel sm:mt-10">
                <img
                  src={galleryImages[1]}
                  alt="Dr. Gurpreet Singh, implantologist"
                  className="aspect-[4/5] size-full object-cover object-top"
                  loading="lazy"
                  width={400}
                  height={500}
                />
              </figure>
              <div className="ink-panel p-7 sm:col-span-2">
                <span className="sub-title">Clinic locations</span>
                <div className="mt-6 space-y-4">
                  <p className="flex items-start gap-3 text-[0.98rem] leading-[1.6] text-light">
                    <MapPin className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
                    {clinic.address}
                  </p>
                  <p className="flex items-start gap-3 text-[0.98rem] leading-[1.6] text-light">
                    <MapPin className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
                    {clinic.secondaryAddress}
                  </p>
                </div>
                <a href={clinic.maps} target="_blank" rel="noreferrer" className="action-secondary mt-7">
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-tuck band-shade">
        <div className="page-shell">
          <SectionIntro eyebrow="What the clinic promises" title="Three standards that hold in every case" className="mb-[60px]" />
          <StatRow stats={stats} />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {standards.map((standard) => (
              <article key={standard.title} className="surface-card p-7">
                <span className="grid size-14 place-items-center rounded-full bg-shade text-ink">
                  <standard.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.25rem] leading-snug">{standard.title}</h3>
                <p className="body-text mt-3">{standard.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <SectionIntro
            eyebrow="The dentists"
            title="The people who will treat you"
            action={
              <ActionLink to="/dentists" variant="secondary">
                Full profiles
              </ActionLink>
            }
          />
          <div className="grid gap-6 md:grid-cols-2">
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
