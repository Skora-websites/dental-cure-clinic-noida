import type { LucideIcon } from "lucide-react";
import { Clock3, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionIntro } from "@/components/SiteBlocks";
import EnquiryForm from "@/components/EnquiryForm";
import { clinic, clinicPhotos } from "@/lib/clinic-data";

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

const receptionRows: { icon: LucideIcon; value: string; href?: string }[] = [
  { icon: Phone, value: clinic.phone, href: clinic.phoneHref },
  { icon: Phone, value: clinic.secondaryPhone, href: clinic.secondaryPhoneHref },
  { icon: Mail, value: clinic.email, href: `mailto:${clinic.email}` },
  { icon: Mail, value: clinic.secondaryEmail, href: `mailto:${clinic.secondaryEmail}` },
  { icon: Clock3, value: "Call to confirm current hours" },
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
        description="Call for appointment availability, email for documents, or send an enquiry below. Both clinic addresses are in Noida."
        image={clinicPhotos[2]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call {clinic.phone}
            </a>
            <a href={clinic.secondaryPhoneHref} className="action-secondary">
              <Phone className="size-4" aria-hidden="true" /> {clinic.secondaryPhone}
            </a>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
            <div>
              <SectionIntro
                eyebrow="Where to find us"
                title="Two clinics in Noida"
                description="Call before travelling to confirm current access and availability."
              />
              <div className="grid gap-6 sm:grid-cols-2">
                {locations.map((location) => (
                  <article key={location.title} className="surface-card flex h-full flex-col p-7">
                    <h3 className="text-[1.375rem] leading-tight">{location.title}</h3>
                    <p className="mt-4 flex items-start gap-3 text-[0.98rem] leading-[1.6] text-body">
                      <MapPin className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
                      {location.address}
                    </p>
                    <p className="mt-2 text-[0.92rem] text-body">{location.note}</p>
                    <a
                      href={location.maps}
                      target="_blank"
                      rel="noreferrer"
                      className="action-secondary mt-auto !min-h-[50px] self-start text-[0.92rem]"
                    >
                      <Navigation className="size-4" aria-hidden="true" /> Get directions
                    </a>
                  </article>
                ))}
              </div>

              <div className="mt-12">
                <span className="sub-title">Reception</span>
                <div className="mt-7">
                  {receptionRows.map((row) => (
                    <div key={row.value} className="flex items-center gap-3 border-b border-hairline py-4 first:border-t first:border-t-hairline">
                      <row.icon className="size-4 shrink-0 text-teal" aria-hidden="true" />
                      {row.href ? (
                        <a
                          href={row.href}
                          className="inline-flex min-h-11 items-center break-all text-[0.98rem] text-ink transition hover:text-teal"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-[0.98rem] text-body">{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to contact Dental Cure Clinic.")}`}
                  className="action-primary mt-8"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" /> Start a WhatsApp chat
                </a>
              </div>
            </div>

            <div>
              <SectionIntro
                eyebrow="Send a question"
                title="Write to the clinic"
                description="Use this form for treatment questions, documents or general information."
              />
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
