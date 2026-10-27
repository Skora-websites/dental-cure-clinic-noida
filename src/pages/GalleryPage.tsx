import { ArrowRight, Camera } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, PageHero, SectionHeading } from "@/components/SiteBlocks";
import { clinic, galleryImages } from "@/lib/clinic-data";

export default function GalleryPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Clinic Gallery"
        description="Images of Dental Cure Clinic in Noida, including treatment areas, equipment and the clinical environment published on dentalcureclinics.com."
      />

      <PageHero
        eyebrow="Gallery"
        title="Clinic environment"
        description="These images are taken from the clinic's published material. They show the environment where examination, digital imaging and treatment are carried out."
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              Call to book a visit
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Book appointment
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Clinic photographs"
            title="Treatment rooms and equipment"
            description="Equipment varies by treatment. Bring previous records to your appointment so the dentist can select the right imaging and tools."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <figure key={image} className="surface-card surface-card-hover overflow-hidden">
                <img src={image} alt={`Dental Cure Clinic photograph ${index + 1}`} className="aspect-[4/3] size-full object-cover" loading="lazy" />
              </figure>
            ))}
          </div>
          <p className="body-text mt-8 flex items-start gap-3">
            <Camera className="mt-1 size-4 shrink-0 text-brand-teal" aria-hidden="true" />
            Gallery images are sourced from the clinic's public website. Do not use them as evidence of treatment results.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
