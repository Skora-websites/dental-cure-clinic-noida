import { Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, PageHero, SectionIntro, ServiceCard } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, services } from "@/lib/clinic-data";

export default function ServicesPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental Services in Noida"
        description="Dental implants, fillings, root canals, cosmetic dentistry, crowns and bridges, digital X-ray, braces, clear aligners and routine dental exams at Dental Cure Clinic."
      />

      <PageHero
        eyebrow="Our services"
        title="General, restorative and cosmetic dentistry"
        description="Dental Cure Clinic treats the full range of dental problems, from a cavity or an infected tooth to implant surgery, orthodontics and smile planning. Every treatment begins with an examination and, where it is needed, a digital X-ray."
        image={clinicPhotos[1]}
        highlights={[
          { value: "8", label: "Treatments offered" },
          { value: "₹15,000 – ₹21,000", label: "Implant treatment range" },
          { value: "Sector 75 · 76", label: "Two Noida clinics" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call for availability
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
            eyebrow="Treatment areas"
            title="What the clinic treats"
            description="These are the services Dental Cure Clinic currently lists. The final treatment plan and cost are confirmed after examination."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band-tuck band-light">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14">
            <article>
              <SectionIntro eyebrow="What to expect" title="Before any treatment begins" />
              <div className="prose-clinic space-y-5">
                <p>
                  You will have a clinical examination and, when it is needed, a digital X-ray. The dentist then explains
                  the condition and the treatment options in plain language before you decide anything.
                </p>
                <p>
                  For dental implants the clinic reviews your bone structure and recommends a suitable implant rather than
                  treating every patient with one standard restoration. The implant is placed into the jawbone and does not
                  rely on the adjoining teeth for support.
                </p>
                <p>
                  For root canal treatment the dentist examines the pulp, uses imaging to assess the damage, then removes
                  the infected tissue, cleans the canal and seals it to save the natural tooth.
                </p>
                <p>
                  Bring any previous X-rays, treatment notes or dentures if you have them. They help the team understand
                  what has already been done to the tooth.
                </p>
              </div>
            </article>

            <aside className="ink-panel p-7 lg:sticky lg:top-32">
              <span className="sub-title">Treatment costs</span>
              <h2 className="mt-6 text-[1.5rem] leading-tight text-white">Costs are confirmed after examination</h2>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-light">
                Dental implants are listed from ₹15,000 to ₹21,000 depending on the treatment required. Call the clinic
                for the current cost of fillings, root canal treatment, crowns, aligners or hygiene appointments.
              </p>
              <div className="mt-7 grid gap-3">
                <a href={clinic.phoneHref} className="action-primary w-full">
                  <Phone className="size-4" aria-hidden="true" /> Ask about pricing
                </a>
                <ActionLink to="/faqs" variant="secondary" className="w-full">
                  Common questions
                </ActionLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </PublicLayout>
  );
}
