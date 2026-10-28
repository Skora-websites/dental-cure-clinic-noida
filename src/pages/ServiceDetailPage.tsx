import { useParams, Link } from "react-router-dom";
import { Phone } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, PageHero, SectionIntro } from "@/components/SiteBlocks";
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
        <PageMeta
          title="Service not found"
          description="The requested treatment page was not found at Dental Cure Clinic."
        />
        <PageHero
          eyebrow="Service not found"
          title="That treatment page does not exist"
          description="The link may be out of date. You can view every Dental Cure Clinic treatment from the services page."
          actions={<ActionLink to="/services">Back to services</ActionLink>}
        />
        <section className="band">
          <div className="page-shell">
            <SectionIntro eyebrow="Treatments" title="Browse the clinic's services" />
            <ActionLink to="/services" variant="primary">
              All services
            </ActionLink>
          </div>
        </section>
      </PublicLayout>
    );
  }

  const copy = treatmentBlurbs[service.slug];
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 2);

  return (
    <PublicLayout>
      <PageMeta title={service.name} description={service.short} />

      <PageHero
        eyebrow={`Treatments · ${service.name}`}
        title={service.name}
        description={service.short}
        image={service.image}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" aria-hidden="true" /> Call about {service.name.toLowerCase()}
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Make Appointment
            </ActionLink>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-14">
            <article>
              <SectionIntro eyebrow="Treatment overview" title={`What ${service.name.toLowerCase()} involves`} />
              <div className="prose-clinic space-y-5">
                <p>{copy.what}</p>
                <p>{copy.detail}</p>
              </div>

              <div className="mt-12">
                <span className="sub-title">Included in planning</span>
                <ul className="ct-list mt-7">
                  {service.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-panel bg-light p-7">
                <h3 className="text-[1.25rem]">Suitability</h3>
                <p className="body-text mt-3 max-w-[64ch]">
                  Not every patient needs the same treatment. Bring previous records to the appointment so the dentist can
                  confirm whether {service.name.toLowerCase()} is right for your condition.
                </p>
              </div>
            </article>

            <aside className="ink-panel p-7 lg:sticky lg:top-32">
              <span className="sub-title">Ready to start</span>
              <h2 className="mt-6 text-[1.5rem] leading-tight text-white">Talk to the dentist first</h2>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-light">
                Send a request for {service.name.toLowerCase()} or call the clinic. The team will confirm the date, time
                and any X-ray needed before you arrive.
              </p>
              <div className="mt-7 grid gap-3">
                <a href={clinic.phoneHref} className="action-primary w-full">
                  <Phone className="size-4" aria-hidden="true" /> {clinic.phone}
                </a>
                <Link to="/appointment" className="action-secondary w-full">
                  Make Appointment
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="band band-tuck band-shade">
        <div className="page-shell">
          <SectionIntro
            eyebrow="Related treatments"
            title="Other services you may need"
            description="Most treatment plans combine more than one service. Here are two related options."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {relatedServices.map((item) => (
              <article key={item.slug} className="card-tile surface-hover grid sm:grid-cols-[minmax(0,1fr)_180px]">
                <div className="p-7">
                  <h3 className="text-[1.375rem] leading-tight">{item.name}</h3>
                  <p className="body-text mt-3">{item.short}</p>
                  <Link to={`/services/${item.slug}`} className="action-ghost mt-5">
                    Open {item.name.toLowerCase()}
                  </Link>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="hidden h-full w-full rounded-r-tile object-cover sm:block"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <div className="flex flex-col gap-7 rounded-panel bg-light p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <span className="sub-title">Not the treatment you need?</span>
              <h2 className="mt-6 text-[1.75rem] leading-tight">Browse all Dental Cure Clinic services</h2>
            </div>
            <div className="flex flex-wrap gap-3">
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
