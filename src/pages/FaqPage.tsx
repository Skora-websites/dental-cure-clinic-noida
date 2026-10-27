import { Phone, ShieldCheck } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { FaqList, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, faqs } from "@/lib/clinic-data";

export default function FaqPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental FAQs"
        description="Answers to common questions about implants, root canal treatment, clear aligners, X-rays and appointment requests at Dental Cure Clinic."
      />

      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        description="These answers describe the clinic process. They do not replace a clinical examination, imaging or advice from a dentist."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call the clinic
            </a>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div>
            <SectionHeading eyebrow="Questions" title="Dental treatment questions" description="Ask reception if your question is not covered here." />
            <div className="mt-10">
              <FaqList faqs={faqs} />
            </div>
          </div>

          <aside className="surface-card grid gap-5 lg:sticky lg:top-24" data-reveal="up">
            <div>
              <p className="section-eyebrow">Clinical disclaimer</p>
              <p className="body-text mt-3">
                Dental treatment options depend on your own teeth, gums, bone and medical history. Treatment costs and
                timings are confirmed after examination.
              </p>
            </div>
            <div className="ink-panel p-6">
              <span className="grid size-11 place-items-center rounded-2xl border border-white/25 bg-white/10 text-brand-mint">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-white">Need to talk to a dentist</h2>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Call and describe the problem. The clinic can tell you whether you need an urgent visit, an X-ray or a
                scheduled treatment appointment.
              </p>
              <a href={clinic.phoneHref} className="action-primary mt-5 w-full bg-brand-mint text-brand-deep hover:bg-white">
                {clinic.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
