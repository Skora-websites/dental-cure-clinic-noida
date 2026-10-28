import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos } from "@/lib/clinic-data";

const sections = [
  {
    heading: "No remote diagnosis",
    body: [
      "The content on this website explains treatments and the clinic process. It is general information, not a diagnosis or a treatment plan. Treatment decisions require an examination and, where needed, an X-ray.",
      "If you have uncontrolled bleeding, severe swelling, facial trauma, difficulty breathing or swallowing, urgent pain or a knocked-out tooth, contact a dentist or an emergency service immediately.",
    ],
  },
  {
    heading: "Requests and confirmations",
    body: [
      "Sending an appointment request through this website does not confirm a booking. Requests are saved in this browser until a shared clinic inbox is connected, so call or WhatsApp the clinic directly.",
      "Prices shown on the website, including the dental implant range from ₹15,000 to ₹21,000, are indicative. The clinic confirms the final price only after examination.",
    ],
  },
  {
    heading: "Accuracy and rights",
    body: [
      "Clinic information, service names and images on this site are taken from material published by Dental Cure Clinic. Treatment details can change, so call the clinic to confirm current availability.",
      "All text, layout, graphics and code on this site are protected by copyright. Do not copy the design or the textual content without written permission.",
    ],
  },
  {
    heading: "External services",
    body: [
      "Links to Google Maps, WhatsApp and the clinic's published site open in a new tab. Those services have their own terms and privacy notices, and Dental Cure Clinic does not control them.",
      "If any part of these terms is unenforceable, the remaining terms still apply.",
    ],
  },
];

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
        description="These terms cover the website only. They do not replace consent or a treatment agreement given at the clinic."
        image={clinicPhotos[2]}
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-14">
            <div className="max-w-[68ch]">
              {sections.map((section, index) => (
                <div key={section.heading} className="border-t border-hairline py-9 first:border-t-0 first:pt-0">
                  {index === 0 ? (
                    <SectionIntro eyebrow="Website terms" title={section.heading} className="mb-4" />
                  ) : (
                    <h2 className="text-[1.5rem] leading-tight">{section.heading}</h2>
                  )}
                  <div className="prose-clinic mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <aside className="ink-panel p-7 lg:sticky lg:top-32">
              <span className="sub-title">Clinic details</span>
              <dl className="mt-7 space-y-4 text-[0.95rem] leading-[1.7] text-light">
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Clinic</dt>
                  <dd className="mt-1 text-white">Dental Cure Clinic</dd>
                </div>
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Address</dt>
                  <dd className="mt-1 text-white">{clinic.address}</dd>
                </div>
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Second location</dt>
                  <dd className="mt-1 text-white">{clinic.secondaryAddress}</dd>
                </div>
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Phone</dt>
                  <dd className="mt-1 text-white">
                    {clinic.phone} · {clinic.secondaryPhone}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.85rem] text-light/80">Email</dt>
                  <dd className="mt-1 break-all text-white">{clinic.email}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
