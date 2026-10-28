import { Camera } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, PageHero, SectionIntro } from "@/components/SiteBlocks";
import { clinic, clinicPhotos } from "@/lib/clinic-data";

export default function GalleryPage() {
  return (
    <PublicLayout>
      <PageMeta
        title="Clinic Gallery"
        description="Images of Dental Cure Clinic in Noida, including treatment illustrations, equipment and the clinical team published on dentalcureclinics.com."
      />

      <PageHero
        eyebrow="Gallery"
        title="Inside the clinic"
        description="These images are taken from the clinic's own published material. They show the treatments the clinic provides and the dentists who provide them."
        image={clinicPhotos[0]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              Call to book a visit
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Make Appointment
            </ActionLink>
          </>
        }
      />

      <section className="band">
        <div className="page-shell">
          <SectionIntro
            eyebrow="Published images"
            title="Treatment images and the clinic team"
            description="Treatment illustrations show how a procedure works; they are not photographs of patient results. Equipment varies by treatment, so bring previous records to your appointment."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clinicPhotos.map((image, index) => (
              <figure key={image} className="overflow-hidden rounded-panel">
                <img
                  src={image}
                  alt={`Dental Cure Clinic published image ${index + 1}`}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  width={420}
                  height={315}
                />
              </figure>
            ))}
          </div>
          <p className="body-text mt-10 flex max-w-[70ch] items-start gap-3">
            <Camera className="mt-1 size-4 shrink-0 text-teal" aria-hidden="true" />
            Dental Cure Clinic publishes treatment illustrations and photographs of its dentists rather than a
            photographic tour of the rooms. Call the clinic if you would like to know what a specific appointment
            involves.
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Visit the clinic"
        title="See the clinic on the day of your visit"
        text="Reception can explain what happens at your first appointment, what to bring, and how long to allow."
      />
    </PublicLayout>
  );
}
