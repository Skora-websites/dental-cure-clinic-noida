import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, FileImage, HeartPulse, Phone, ScanLine, Sparkles } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { ActionLink, CtaBand, DoctorCard, FaqList, PageHero, ReviewCard, SectionHeading, ServiceCard } from "@/components/SiteBlocks";
import { clinic, dentists, faqs, galleryImages, services, testimonials } from "@/lib/clinic-data";

const proofPoints = [
  {
    icon: ScanLine,
    title: "The X-ray comes first",
    text: "Implant and root canal plans begin with a digital image, so the dentist can review bone, tooth structure and options before treatment starts.",
  },
  {
    icon: HeartPulse,
    title: "The goal is to save natural teeth",
    text: "Where an infected or damaged tooth can be treated, the clinic reviews root canal treatment instead of moving straight to removal.",
  },
  {
    icon: Sparkles,
    title: "Full general dentistry in one place",
    text: "Implant, root canal, filling, crown, brace, aligner, hygiene and smile treatment care is handled by the same clinic team.",
  },
];

const journey = [
  {
    step: "01",
    title: "Examination",
    text: "You speak with the dentist about the problem, the look you want, or the treatment that has already been recommended elsewhere.",
  },
  {
    step: "02",
    title: "Digital X-ray",
    text: "The clinic takes the imaging it needs and shows you what it means for the treatment options.",
  },
  {
    step: "03",
    title: "Treatment plan",
    text: "The dentist explains which treatment is suitable, what it involves and the cost range before you decide.",
  },
];

export default function Index() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental Cure Clinic Noida"
        description="Dental implants, root canal treatment, fillings, braces, clear aligners and routine exams in Noida. Led by Dr. Gurpreet Singh and Dr. Manpreet Kaur. Call to book an appointment."
      />

      <PageHero
        eyebrow="Dental clinic in Sector 75, Noida"
        title="Dental care in Noida that starts with your X-ray"
        description="Dental Cure Clinic places implants, saves teeth with root canal treatment, restores damaged teeth and aligns smiles. Every plan begins with an examination and the imaging needed to see the real problem."
        image={services[0].image}
        highlights={[
          { value: "1,000+", label: "Implants completed" },
          { value: "30+", label: "Years of practice" },
          { value: "2", label: "Clinic locations" },
        ]}
        actions={
          <>
            <a href={clinic.phoneHref} className="action-primary">
              <Phone className="size-4" /> Call {clinic.phone}
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Book appointment
              <ArrowRight className="size-4" />
            </ActionLink>
          </>
        }
      />

      <section className="page-section bg-brand-ivory" data-reveal="fade">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Why patients come here"
            title="Treatment based on what the X-ray shows"
            description="The clinic does not sell a single standard package. It examines, images and then recommends what fits your teeth, bone and budget."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {proofPoints.map((point) => (
              <article key={point.title} className="surface-card surface-card-hover h-full p-7">
                <span className="grid size-12 place-items-center rounded-2xl border border-brand-teal/10 bg-accent text-brand-teal">
                  <point.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-brand-ink">{point.title}</h3>
                <p className="body-text mt-3">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-background" data-reveal="fade">
        <div className="page-shell">
          <SectionHeading
            eyebrow="How a visit works"
            title="Three steps, no guesswork"
            description="You will know what is being treated, why it is being treated that way and what happens next before the treatment begins."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {journey.map((item) => (
              <article key={item.step} className="soft-panel h-full p-7">
                <p className="font-display text-4xl font-semibold text-brand-teal/35">{item.step}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="body-text mt-3">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-brand-ivory" data-reveal="fade">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Treatments"
            title="The full range of care inside the clinic"
            description="From emergency dental problems to everyday check-ups, these are the treatments currently listed by Dental Cure Clinic."
            action={
              <ActionLink to="/services" variant="secondary">
                See all services
                <ArrowRight className="size-4" />
              </ActionLink>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-background" data-reveal="fade">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Your dentist"
            title="Two dentists, one consistent treatment plan"
            description="Dr. Gurpreet Singh leads implant cases. Dr. Manpreet Kaur focuses on careful restorative treatment and follow-up."
            action={
              <ActionLink to="/dentists" variant="secondary">
                Meet the team
                <ArrowRight className="size-4" />
              </ActionLink>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {dentists.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-brand-ivory" data-reveal="fade">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Patient feedback"
            title="What patients say after treatment"
            description="Feedback published by Dental Cure Clinic. Names are withheld in the source feedback."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((review) => (
              <ReviewCard key={review.quote} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-background" data-reveal="fade">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Inside the clinic"
                title="A look at the clinic and treatment rooms"
                description="The practice publishes images of its equipment, operatories and treatment areas on dentalcureclinics.com."
                action={
                  <ActionLink to="/gallery" variant="secondary">
                    Open gallery
                    <ArrowRight className="size-4" />
                  </ActionLink>
                }
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="soft-panel flex items-center gap-3 p-4">
                  <FileImage className="size-5 text-brand-teal" aria-hidden="true" />
                  <span className="text-sm font-semibold text-brand-deep">Digital X-ray and imaging</span>
                </div>
                <div className="soft-panel flex items-center gap-3 p-4">
                  <CalendarCheck className="size-5 text-brand-teal" aria-hidden="true" />
                  <span className="text-sm font-semibold text-brand-deep">Appointments by phone or request</span>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {galleryImages.slice(0, 4).map((image, index) => (
                <div key={image} className={`surface-card overflow-hidden ${index % 2 === 0 ? "sm:mt-0" : "sm:mt-8"}`}>
                  <img src={image} alt="Dental Cure Clinic" className="aspect-[4/5] size-full object-cover transition duration-700 hover:scale-[1.04]" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-brand-ivory" data-reveal="fade">
        <div className="page-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <SectionHeading eyebrow="Questions" title="What patients ask before treatment" />
            <div className="mt-10">
              <FaqList faqs={faqs.slice(0, 4)} />
            </div>
          </div>
          <aside className="ink-panel sticky top-24 p-7">
            <p className="section-eyebrow text-brand-mint">Talk to the clinic</p>
            <h2 className="font-display text-2xl font-semibold text-white">Not sure which treatment you need?</h2>
            <p className="mt-4 text-sm leading-7 text-white/78">
              Call and describe the problem. The clinic will tell you whether it needs an immediate visit, an X-ray or a
              scheduled treatment appointment.
            </p>
            <a href={clinic.phoneHref} className="action-primary mt-6 w-full bg-brand-mint text-brand-deep hover:bg-white">
              <Phone className="size-4" /> Call now
            </a>
            <Link to="/appointment" className="action-secondary mt-3 w-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
              Request an appointment
            </Link>
          </aside>
        </div>
      </section>

      <CtaBand />
    </PublicLayout>
  );
}
