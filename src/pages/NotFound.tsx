import { ArrowRight, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero } from "@/components/SiteBlocks";
import { clinic } from "@/lib/clinic-data";

export default function NotFound() {
  return (
    <PublicLayout>
      <PageMeta
        title="Page not found"
        description="The page you requested could not be found at Dental Cure Clinic in Noida."
      />

      <PageHero
        eyebrow="404"
        title="That page is not available"
        description="The link may be broken or out of date. You can call the clinic directly or choose one of the main pages."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call the clinic
            </a>
            <a href="/" className="action-secondary">
              Return to homepage
              <ArrowRight className="size-4" />
            </a>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <div className="grid gap-4 sm:grid-cols-3">
            <a href="/services" className="surface-card surface-card-hover p-6">
              <h2 className="font-display text-2xl font-semibold text-brand-ink">Treatments</h2>
              <p className="body-text mt-2">Implants, root canals, crowns, aligners and exams.</p>
            </a>
            <a href="/appointment" className="surface-card surface-card-hover p-6">
              <h2 className="font-display text-2xl font-semibold text-brand-ink">Appointment</h2>
              <p className="body-text mt-2">Request a date, time and treatment with the clinic.</p>
            </a>
            <a href="/contact" className="surface-card surface-card-hover p-6">
              <h2 className="font-display text-2xl font-semibold text-brand-ink">Contact</h2>
              <p className="body-text mt-2">Phone, email, WhatsApp and both clinic addresses.</p>
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
