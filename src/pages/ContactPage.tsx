import { Clock3, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionHeading } from "@/components/SiteBlocks";
import EnquiryForm from "@/components/EnquiryForm";
import { clinic } from "@/lib/clinic-data";

const locations = [
  {
    title: "Sector 75 clinic",
    address: clinic.address,
    note: "Main office at Futec Gateway Market.",
    maps: clinic.maps,
  },
  {
    title: "Sector 76 clinic",
    address: clinic.secondaryAddress,
    note: "Second Noida location at Skytech Metrott.",
    maps: "https://maps.google.com/?q=Skytech+Metrott+Sector+76+Noida",
  },
];

export default function ContactPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Contact Dental Cure Clinic"
        description="Call Dental Cure Clinic on 9810773530 or 9810912131. Visit the Sector 75 or Sector 76 clinic in Noida, or send an enquiry using the contact form."
      />

      <PageHero
        eyebrow="Contact"
        title="Get in touch with the clinic"
        description="Call for appointment availability, email for documents, or send an enquiry below. Both clinic addresses are in Noida and listed on the clinic site."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call {clinic.phone}
            </a>
            <a href={clinic.secondaryPhoneHref} className="action-secondary">
              <Phone className="size-4" /> Call {clinic.secondaryPhone}
            </a>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="grid gap-5" data-reveal="up">
            <SectionHeading eyebrow="Clinic locations" title="Where to find us" description="Two Noida addresses are published by the clinic. Call before travelling to confirm current access." />
            {locations.map((location) => (
              <article key={location.title} className="surface-card p-6">
                <h3 className="font-display text-2xl font-semibold text-brand-ink">{location.title}</h3>
                <p className="body-text mt-3 flex items-start gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  {location.address}
                </p>
                <p className="mt-3 text-sm font-semibold text-muted-foreground">{location.note}</p>
                <a href={location.maps} target="_blank" rel="noreferrer" className="action-secondary mt-5">
                  <Navigation className="size-4" /> Open directions
                </a>
              </article>
            ))}
          </div>

          <div className="grid gap-5" data-reveal="up">
            <div className="surface-card p-6">
              <SectionHeading eyebrow="Reception" title="Phone, email and messaging" />
              <div className="mt-6 grid gap-3 text-sm">
                <p className="flex items-start gap-3 text-brand-deep">
                  <Phone className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  <a href={clinic.phoneHref} className="hover:text-brand-teal">{clinic.phone}</a>
                </p>
                <p className="flex items-start gap-3 text-brand-deep">
                  <Phone className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  <a href={clinic.secondaryPhoneHref} className="hover:text-brand-teal">{clinic.secondaryPhone}</a>
                </p>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  <a href={`mailto:${clinic.email}`} className="break-all hover:text-brand-teal">{clinic.email}</a>
                </p>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  <a href={`mailto:${clinic.secondaryEmail}`} className="break-all hover:text-brand-teal">{clinic.secondaryEmail}</a>
                </p>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Clock3 className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  Call to confirm current hours
                </p>
              </div>
              <a
                href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to contact Dental Cure Clinic.")}`}
                className="action-primary mt-6 w-full"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" /> Start a WhatsApp chat
              </a>
            </div>
            <SectionHeading eyebrow="Enquiry" title="Send a question" description="Use this form for treatment questions, documents or general information." />
            <EnquiryForm />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
