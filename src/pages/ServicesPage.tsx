import { ArrowRight, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, PageHero, SectionHeading, ServiceCard } from "@/components/SiteBlocks";
import { clinic, services } from "@/lib/clinic-data";

export default function ServicesPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental Services in Noida"
        description="Dental implants, fillings, root canals, cosmetic dentistry, crowns and bridges, digital X-ray, braces, clear aligners and routine dental exams at Dental Cure Clinic."
      />

      <PageHero
        eyebrow="Services"
        title="General, restorative and cosmetic dentistry"
        description="Dental Cure Clinic treats the full range of dental problems, from a cavity or infected tooth to implant surgery, orthodontics and smile planning. Each treatment starts with an examination and, where needed, a digital X-ray."
        highlights={[
          { value: "8", label: "Treatment areas" },
          { value: "₹15k+", label: "Implant range starts" },
          { value: "Noida", label: "Two locations" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call for availability
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Book an appointment
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Treatment areas"
            title="What the clinic treats"
            description="These are the services Dental Cure Clinic currently lists. The final treatment plan and cost are confirmed after examination."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-background">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="surface-card p-7 sm:p-9">
            <p className="section-eyebrow">What to expect</p>
            <h2 className="section-title">Before any treatment</h2>
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                You will have a clinical examination and, when it is needed, a digital X-ray. The dentist then explains the
                condition and the treatment options in plain language.
              </p>
              <p>
                For dental implants, the clinic reviews your bone structure and recommends a suitable implant rather than
                treating every patient with one standard restoration. The implant is placed into the jawbone and does not
                rely on the adjoining teeth for support.
              </p>
              <p>
                For root canal treatment, the dentist examines the pulp, uses imaging to assess the damage and then removes
                the infected tissue, cleans the canal and seals it to save the natural tooth.
              </p>
              <p>
                Bring any previous X-rays, treatment notes or dentures if you have them. They help the team understand what
                has already been done to the tooth.
              </p>
            </div>
          </div>
          <aside className="ink-panel p-7">
            <p className="section-eyebrow text-brand-mint">Treatment costs</p>
            <h2 className="font-display text-2xl font-semibold text-white">Costs are confirmed after examination</h2>
            <p className="mt-4 text-sm leading-7 text-white/78">
              Dental implants are listed from ₹15,000 to ₹21,000 depending on the treatment required. Call the clinic for
              the current cost of fillings, root canal treatment, crowns, aligners or hygiene appointments.
            </p>
            <a href={clinic.phoneHref} className="action-primary mt-6 w-full bg-brand-mint text-brand-deep hover:bg-white">
              <Phone className="size-4" /> Ask about pricing
            </a>
            <ActionLink to="/faqs" variant="secondary" >
              Read common questions
            </ActionLink>
          </aside>
        </div>
      </section>

      <CtaBand />
    </PublicLayout>
  );
}
