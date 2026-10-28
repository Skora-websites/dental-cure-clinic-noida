import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos } from "@/lib/clinic-data";

const destinations = [
  { title: "Treatments", text: "Implants, root canals, crowns, aligners and examinations.", href: "/services" },
  { title: "Appointment", text: "Request a date, time and treatment with the clinic.", href: "/appointment" },
  { title: "Contact", text: "Phone, email, WhatsApp and both clinic addresses.", href: "/contact" },
];

export default function NotFound() {
  return (
    <PublicLayout>
      <PageMeta
        title="Page not found"
        description="The page you requested could not be found at Dental Cure Clinic in Noida."
      />

      <PageHero
        eyebrow="Page not found"
        title="That page is not available"
        description="The link may be broken or out of date. Call the clinic directly, or choose one of the main pages below."
        image={clinicPhotos[0]}
        actions={
          <a href={clinic.phoneHref} className="action-primary">
            <Phone className="size-4" aria-hidden="true" /> Call the clinic
          </a>
        }
      />

      <section className="band">
        <div className="page-shell">
          <SectionIntro eyebrow="Where to go next" title="Main pages" />
          <div className="grid gap-6 md:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.href}
                to={destination.href}
                className="surface-card surface-hover flex h-full flex-col p-7"
              >
                <h2 className="text-[1.5rem] leading-tight">{destination.title}</h2>
                <p className="body-text mt-3">{destination.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
