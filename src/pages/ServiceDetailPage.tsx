import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, services } from "@/lib/clinic-data";

const treatmentBlurbs: Record<string, { what: string; detail: string }> = {
  "dental-implants": {
    what: "A dental implant replaces the root of a missing tooth. The implant is placed into the jawbone and then restored with a crown above the gumline.",
    detail:
      "Dr. Gurpreet Singh has completed more than 1,000 implants and surgeries. The clinic reviews your X-ray and bone structure, then recommends an implant plan rather than using one standard option. Treatment is carried out under local anaesthesia and does not depend on the adjoining teeth for support. The clinic lists implant treatment from ₹15,000 to ₹21,000 depending on the case.",
  },
  "dental-fillings": {
    what: "A filling repairs a tooth damaged by decay or wear. Composite material is matched to the surrounding tooth and bonded back into place.",
    detail:
      "The dentist removes the damaged tissue, prepares the tooth and restores normal shape and bite. The follow-up plan focuses on keeping the remaining tooth healthy and stopping decay from returning.",
  },
  "root-canals": {
    what: "Root canal treatment removes infected pulp from inside the tooth. The tissue contains nerves and blood vessels, and infection can spread once it is damaged.",
    detail:
      "The clinic examines the tooth and takes an X-ray to see the extent of the problem. Local anaesthesia is used for comfort. The infected tissue is removed, the canal is cleaned and sealed, and the tooth is restored so you can keep your natural tooth where possible.",
  },
  "cosmetic-dentistry": {
    what: "Cosmetic dentistry covers whitening, clear aligners, veneers, bonding and smile planning.",
    detail:
      "Treatment is chosen around what you want to change. For discoloured teeth, professional whitening is used where suitable. For spacing or alignment, clear aligners are reviewed alongside traditional orthodontics. Veneers and bonding are used for chips, staining and uneven edges.",
  },
  "restorative-dentistry": {
    what: "Restorative dentistry rebuilds teeth that are cracked, worn, heavily filled or missing.",
    detail:
      "Crowns and bridges restore strength and function when a filling is no longer enough. Bonding and smile makeovers are used where appearance is part of the problem. Your dentist will explain what can be repaired and what needs replacing.",
  },
  "digital-x-ray": {
    what: "Digital dental X-ray produces immediate images without film processing.",
    detail:
      "The clinic uses digital imaging before implants, root canal treatment and orthodontics. Lower radiation and high-resolution detail mean images can be reviewed with you during the appointment, so you can see what the dentist is seeing.",
  },
  orthodontics: {
    what: "Orthodontics treats crooked teeth, gaps, overbites, underbites and crossbites with braces or clear aligners.",
    detail:
      "Traditional braces use fixed brackets and wires. Clear aligners use a series of removable trays and can be taken out for eating and cleaning. Both move teeth gradually, and the dentist confirms which approach fits the case after examining your bite and reviewing your X-rays.",
  },
  "routine-dental-exam": {
    what: "A routine dental exam reviews teeth, gums and soft tissues for early signs of decay, gum disease or wear.",
    detail:
      "The appointment includes a digital examination, X-rays where needed and a review of previous dental work. You leave with a clear plan for preventive care or any restorative treatment required.",
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <PublicLayout>
        <PageMeta title="Service not found" description="The requested treatment page was not found at Dental Cure Clinic." />
        <PageHero
          eyebrow="Service not found"
          title="That treatment page does not exist"
          description="The link may be out of date. You can view all Dental Cure Clinic treatments here."
          actions={<ActionLink to="/services">Back to services</ActionLink>}
        />
      </PublicLayout>
    );
  }

  const copy = treatmentBlurbs[service.slug];
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 2);

  return (
    <PublicLayout>
      <PageMeta title={service.name} description={service.short} />

      <PageHero
        eyebrow={`Service · ${service.name}`}
        title={service.name}
        description={service.short}
        image={service.image}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call about {service.name.toLowerCase()}
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Book appointment
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_340px] lg:items-start">
          <article className="surface-card p-6 sm:p-9">
            <p className="section-eyebrow">Treatment overview</p>
            <h2 className="section-title">What {service.name.toLowerCase()} involves</h2>
            <div className="prose-clinic mt-6 space-y-5">
              <p>{copy.what}</p>
              <p>{copy.detail}</p>
            </div>

            <div className="mt-9">
              <p className="section-eyebrow">Included in planning</p>
              <ul className="mt-5 grid gap-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-[1.02rem] leading-7 text-brand-deep">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 rounded-[24px] border border-brand-teal/15 bg-accent/60 p-6">
              <p className="section-eyebrow">Suitability</p>
              <p className="body-text mt-3">
                Not every patient needs the same treatment. Bring previous records to the appointment so the dentist can
                confirm whether {service.name.toLowerCase()} is right for your condition.
              </p>
            </div>
          </article>

          <aside className="ink-panel p-6 sm:p-7">
            <p className="section-eyebrow text-brand-mint">Ready to start</p>
            <h2 className="font-display text-2xl font-semibold text-white">Talk to the dentist first</h2>
            <p className="mt-4 text-sm leading-7 text-white/78">
              Send an appointment request for {service.name.toLowerCase()} or call the clinic. The team will confirm the
              date, time and any X-ray needed before you arrive.
            </p>
            <div className="mt-6 grid gap-3">
              <a href={clinic.phoneHref} className="action-primary bg-brand-mint text-brand-deep hover:bg-white">
                <Phone className="size-4" /> {clinic.phone}
              </a>
              <Link to="/appointment" className="action-secondary border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
                Request appointment
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="page-section bg-background">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Related treatments"
            title="Other services you may need"
            description="Most treatment plans combine more than one service. Here are two related options."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {relatedServices.map((item) => (
              <article key={item.slug} className="surface-card surface-card-hover overflow-hidden">
                <div className="grid sm:grid-cols-[minmax(0,1fr)_160px]">
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display text-2xl font-semibold text-brand-ink">{item.name}</h3>
                    <p className="body-text mt-3">{item.short}</p>
                    <Link to={`/services/${item.slug}`} className="action-ghost mt-5 px-0">
                      View details
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                  <img src={item.image} alt={item.name} className="hidden h-full object-cover sm:block" loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <div className="surface-card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-eyebrow">Not the treatment you need?</p>
              <h2 className="font-display text-2xl font-semibold text-brand-ink">Browse all Dental Cure Clinic services</h2>
            </div>
            <div className="grid gap-3 sm:flex">
              <ActionLink to="/services">All services</ActionLink>
              <a href={clinic.phoneHref} className="action-secondary">
                Call the clinic
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
