import { Phone, ShieldCheck } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { FaqList, PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos, faqs } from "@/lib/clinic-data";

export default function FaqPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental FAQs"
        description="Answers to common questions about implants, root canal treatment, clear aligners, X-rays and appointment requests at Dental Cure Clinic."
      />

      <PageHero
        eyebrow="Common questions"
        title="Questions patients ask before treatment"
        description="These answers describe the clinic process. They do not replace a clinical examination, imaging or advice from a dentist."
        image={clinicPhotos[1]}
        actions={
          <a href={clinic.phoneHref} className="action-primary">
            <Phone className="size-4" aria-hidden="true" /> Call the clinic
          </a>
        }
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
            <div>
              <SectionIntro eyebrow="Questions" title="Dental treatment questions" />
              <FaqList faqs={faqs} />
            </div>

            <aside className="grid gap-10 lg:sticky lg:top-32">
              <figure className="overflow-hidden rounded-panel">
                <img
                  src={clinicPhotos[3]}
                  alt="Dentist at Dental Cure Clinic"
                  className="aspect-[4/3] w-full object-cover object-top"
                  loading="lazy"
                  width={520}
                  height={390}
                />
              </figure>
              <div>
                <span className="sub-title">Clinical disclaimer</span>
                <p className="body-text mt-6">
                  Treatment options depend on your own teeth, gums, bone and medical history. Treatment costs and timings
                  are confirmed after examination.
                </p>
              </div>
              <div className="ink-panel p-7">
                <ShieldCheck className="size-6 text-teal" aria-hidden="true" />
                <h2 className="mt-6 text-[1.375rem] leading-tight text-white">Need to talk to a dentist?</h2>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-light">
                  Call and describe the problem. The clinic can tell you whether you need an urgent visit, an X-ray or a
                  scheduled treatment appointment.
                </p>
                <a href={clinic.phoneHref} className="action-primary mt-6 w-full">
                  <Phone className="size-4" aria-hidden="true" /> {clinic.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
