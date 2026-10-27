import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic } from "@/lib/clinic-data";

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
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article className="surface-card p-6 sm:p-10">
            <SectionHeading eyebrow="Information" title="What forms collect" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                The appointment form collects your name, mobile number, email address, treatment selection, preferred date,
                preferred time and an optional note. The enquiry form collects your name, phone or email address, your
                message and your acknowledgement of this notice.
              </p>
              <p>
                Both forms are validated in your browser. Details are saved in this browser's local storage for
                demonstration purposes. No server account, email inbox or shared clinic inbox is connected to this
                version of the website.
              </p>
              <p>
                Please do not send diagnoses, medical history, prescription details or sensitive personal information
                through the forms. Call the clinic when information needs to be shared securely.
              </p>
            </div>

            <SectionHeading eyebrow="Use" title="How details are used" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                The clinic uses submitted details only to respond to the treatment or enquiry request. The clinic does not
                sell personal information and does not use this information for automated decision-making.
              </p>
              <p>
                You can ask the clinic to correct or remove a submitted detail. Use the contact details on this page,
                or call the clinic directly.
              </p>
            </div>

            <SectionHeading eyebrow="Storage" title="Local storage and controls" />
            <div className="prose-clinic mt-6 space-y-5">
              <p>
                Request records are stored under local browser keys. Clearing browser data removes them. Do not use a
                shared device for requests you want to keep private.
              </p>
              <p>
                Google Analytics, Meta Pixel, tracking cookies and advertising pixels are not installed on this site.
                Third-party images and Google Maps links are loaded from their own services and may apply their own
                privacy terms.
              </p>
            </div>
          </article>

          <aside className="ink-panel p-6 sm:p-7" data-reveal="up">
            <p className="section-eyebrow text-brand-mint">Clinic contact</p>
            <h2 className="font-display text-2xl font-semibold text-white">Ask the clinic about your details</h2>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-white/78">
              <p>Phone: {clinic.phone}</p>
              <p>Alternate phone: {clinic.secondaryPhone}</p>
              <p className="break-all">Email: {clinic.email}</p>
              <p className="break-all">Alternate email: {clinic.secondaryEmail}</p>
              <p>Address: {clinic.address}</p>
              <p>Second location: {clinic.secondaryAddress}</p>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
