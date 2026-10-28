import { Clock3, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { PageHero, SectionIntro } from "@/components/SiteBlocks";
import AppointmentForm from "@/components/AppointmentForm";
import { clinic, clinicPhotos } from "@/lib/clinic-data";

const steps = [
  { title: "Send your request", text: "Choose the treatment you are interested in and the date and time that suits you." },
  {
    title: "The clinic confirms the details",
    text: "A member of the clinic team checks availability and contacts you to confirm the appointment.",
  },
  {
    title: "Attend for examination",
    text: "Bring any previous X-rays or treatment notes. The dentist examines you before treatment begins.",
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
        description="Send your preferred date, time and treatment below. A request does not confirm the appointment, so call the clinic as well if you need urgent treatment."
        image={clinicPhotos[0]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call {clinic.phone}
            </a>
            <a
              href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to ask about an appointment at Dental Cure Clinic.")}`}
              className="action-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </a>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-14">
            <div>
              <SectionIntro
                eyebrow="Appointment request"
                title="Tell us what you need"
                description="Only share the details needed to answer this request. Avoid diagnoses, medical history or sensitive information."
              />
              <AppointmentForm />
            </div>

            <aside className="grid gap-10 lg:sticky lg:top-32">
              <div>
                <span className="sub-title">How this works</span>
                <ol className="mt-7">
                  {steps.map((step, index) => (
                    <li key={step.title} className="border-b border-hairline py-5 first:pt-0 last:border-b-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[1rem] font-semibold text-teal">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-[1.05rem]">{step.title}</h3>
                      </div>
                      <p className="body-text mt-2 pl-8">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <span className="sub-title">Reach the clinic now</span>
                <div className="mt-7 space-y-4 text-[0.98rem]">
                  <a href={clinic.phoneHref} className="flex min-h-11 items-center gap-3 text-ink transition hover:text-teal">
                    <Phone className="size-4 shrink-0 text-teal" aria-hidden="true" />
                    {clinic.phone}
                  </a>
                  <a href={clinic.secondaryPhoneHref} className="flex min-h-11 items-center gap-3 text-ink transition hover:text-teal">
                    <Phone className="size-4 shrink-0 text-teal" aria-hidden="true" />
                    {clinic.secondaryPhone}
                  </a>
                  <p className="flex items-start gap-3 text-body">
                    <Clock3 className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
                    Call to confirm current hours
                  </p>
                  <p className="flex items-start gap-3 text-body">
                    <Mail className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
                    <span className="break-all">{clinic.email}</span>
                  </p>
                </div>
              </div>

              <div className="ink-panel p-7">
                <ShieldCheck className="size-6 text-teal" aria-hidden="true" />
                <h2 className="mt-6 text-[1.375rem] leading-tight text-white">How your request is handled</h2>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-light">
                  Requests are saved in this browser only, so call or WhatsApp the clinic to confirm an urgent visit. See
                  the privacy notice for details.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
