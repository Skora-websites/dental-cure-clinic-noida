import { Clock3, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionHeading } from "@/components/SiteBlocks";
import AppointmentForm from "@/components/AppointmentForm";
import { clinic } from "@/lib/clinic-data";

const steps = [
  {
    title: "Send your request",
    text: "Choose the treatment you are interested in and the date and time that suits you.",
  },
  {
    title: "The clinic confirms the details",
    text: "A member of the clinic team checks availability and contacts you to confirm the appointment.",
  },
  {
    title: "Attend for examination",
    text: "Bring any previous X-rays or treatment notes. The dentist will examine you before treatment begins.",
  },
];

export default function AppointmentPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Book an Appointment"
        description="Request a dental appointment at Dental Cure Clinic in Noida. Choose a treatment, preferred date and time, or call the clinic directly on 9810773530."
      />

      <PageHero
        eyebrow="Appointment"
        title="Request an appointment with Dental Cure Clinic"
        description="Send your preferred date, time and treatment below. Submitting a request does not confirm your appointment, so please also call the clinic if you need urgent treatment."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call {clinic.phone}
            </a>
            <a
              href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to ask about an appointment at Dental Cure Clinic.")}`}
              className="action-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" /> WhatsApp the clinic
            </a>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_340px] lg:items-start">
          <div data-reveal="up">
            <SectionHeading
              eyebrow="Appointment request"
              title="Tell us what you need"
              description="Only share the details needed to respond to this request. Avoid diagnoses, medical history or sensitive information."
            />
            <div className="mt-8">
              <AppointmentForm />
            </div>
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-24" data-reveal="up">
            <div className="surface-card p-6">
              <p className="section-eyebrow">How this works</p>
              <ol className="mt-5 grid gap-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-brand-teal/20 bg-accent text-sm font-bold text-brand-teal">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-brand-ink">{step.title}</h3>
                      <p className="body-text mt-1.5">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-card p-6">
              <p className="section-eyebrow">Need to reach us now</p>
              <div className="mt-5 grid gap-3 text-sm">
                <a href={clinic.phoneHref} className="flex items-start gap-3 text-brand-deep hover:text-brand-teal">
                  <Phone className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  {clinic.phone}
                </a>
                <a href={clinic.secondaryPhoneHref} className="flex items-start gap-3 text-brand-deep hover:text-brand-teal">
                  <Phone className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  {clinic.secondaryPhone}
                </a>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Clock3 className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  Call to confirm current hours
                </p>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                  {clinic.email}
                </p>
              </div>
            </div>

            <div className="ink-panel p-6">
              <span className="grid size-11 place-items-center rounded-2xl border border-white/25 bg-white/10 text-brand-mint">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-white">How your request is handled</h2>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Appointment requests are stored locally in this browser for demonstration and not sent to a shared clinic
                inbox. Call the clinic to confirm urgent requests. See the privacy notice for details.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
