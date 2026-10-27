import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic } from "@/lib/clinic-data";

export default function TermsPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Website Terms"
        description="Terms that apply to the Dental Cure Clinic website, including treatment information, appointment requests and third-party links."
      />

      <PageHero
        eyebrow="Website terms"
        title="What applies when you use this site"
        description="These terms cover the website only. They do not replace consent or treatment agreements given at the clinic."
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article className="surface-card p-6 sm:p-10">
            <SectionHeading eyebrow="Medical information" title="No remote diagnosis" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                The content on this website explains treatments and the clinic process. It is general information, not a
                diagnosis or a treatment plan. Treatment decisions require an examination and, where needed, an X-ray.
              </p>
              <p>
                If you have uncontrolled bleeding, severe swelling, facial trauma, difficulty breathing or swallowing,
                urgent pain or a knocked-out tooth, contact a dentist or emergency service immediately.
              </p>
            </div>

            <SectionHeading eyebrow="Appointments" title="Requests and confirmations" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                Submitting an appointment request through this website does not confirm a booking. The clinic confirms
                appointments by phone or WhatsApp before treatment.
              </p>
              <p>
                Prices listed on the website, including the dental implant range from ₹15,000 to ₹21,000, are indicative.
                The clinic confirms the final price only after examination.
              </p>
            </div>

            <SectionHeading eyebrow="Content" title="Accuracy and rights" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                Clinic information, service names and images on this site are taken from public material published by
                Dental Cure Clinic. Treatment details can change, so call the clinic to confirm current availability.
              </p>
              <p>
                All text, layout, graphics and code on this site are protected by copyright. Do not copy the design or
                textual content without written permission.
              </p>
            </div>

            <SectionHeading eyebrow="Links" title="External services" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                Links to Google Maps, WhatsApp and the clinic's published site open in a new tab. Those services have
                their own terms and privacy notices, and Dental Cure Clinic does not control them.
              </p>
              <p>
                If any part of these terms is unenforceable, the remaining terms still apply.
              </p>
            </div>
          </article>

          <aside className="ink-panel p-6 sm:p-7">
            <p className="section-eyebrow text-brand-mint">Clinic details</p>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-white/78">
              <p>Name: Dental Cure Clinic</p>
              <p>Clinic address: {clinic.address}</p>
              <p>Second location: {clinic.secondaryAddress}</p>
              <p>Phone: {clinic.phone}</p>
              <p>Alternate phone: {clinic.secondaryPhone}</p>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
