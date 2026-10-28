import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos } from "@/lib/clinic-data";

const sections = [
  {
    heading: "What the forms collect",
    body: [
      "The appointment form collects your name, mobile number, email address, treatment selection, preferred date, preferred time and an optional note. The enquiry form collects your name, a phone number or email address, your message and your acknowledgement of this notice.",
      "Both forms are validated in your browser. Details are saved in this browser's local storage. No server account, email inbox or shared clinic inbox is connected to this version of the website.",
      "Please do not send diagnoses, medical history, prescription details or other sensitive personal information through the forms. Call the clinic when information needs to be shared securely.",
    ],
  },
  {
    heading: "How details are used",
    body: [
      "The clinic uses submitted details only to answer the treatment or enquiry request. It does not sell personal information and does not use it for automated decision-making.",
      "You can ask the clinic to correct or remove a submitted detail. Use the contact details on this page, or call the clinic directly.",
    ],
  },
  {
    heading: "Local storage and controls",
    body: [
      "Request records are stored under local browser keys. Clearing browser data removes them. Do not use a shared device for a request you want to keep private.",
      "Google Analytics, Meta Pixel, tracking cookies and advertising pixels are not installed on this site. Third-party images and Google Maps links are loaded from their own services and may apply their own privacy terms.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Privacy Notice"
        description="How Dental Cure Clinic handles the information submitted through the appointment and enquiry forms on this website."
      />

      <PageHero
        eyebrow="Privacy notice"
        title="How your submitted details are handled"
        description="This notice applies to the appointment request and enquiry forms on this website. It also explains what the site does not do."
        image={clinicPhotos[1]}
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-14">
            <div className="max-w-[68ch]">
              {sections.map((section, index) => (
                <div key={section.heading} className="border-t border-hairline py-9 first:border-t-0 first:pt-0">
                  {index === 0 ? (
                    <SectionIntro eyebrow="What applies" title={section.heading} className="mb-4" />
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
              <span className="sub-title">Clinic contact</span>
              <h2 className="mt-6 text-[1.375rem] leading-tight text-white">Ask about your details</h2>
              <dl className="mt-7 space-y-4 text-[0.95rem] leading-[1.7] text-light">
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Phone</dt>
                  <dd className="mt-1 text-white">{clinic.phone}</dd>
                </div>
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Alternate phone</dt>
                  <dd className="mt-1 text-white">{clinic.secondaryPhone}</dd>
                </div>
                <div className="border-b border-white/20 pb-3">
                  <dt className="text-[0.85rem] text-light/80">Email</dt>
                  <dd className="mt-1 break-all text-white">{clinic.email}</dd>
                </div>
                <div>
                  <dt className="text-[0.85rem] text-light/80">Address</dt>
                  <dd className="mt-1 text-white">{clinic.address}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
