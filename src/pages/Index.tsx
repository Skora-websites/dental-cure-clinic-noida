import { Link } from "react-router-dom";
import { CalendarCheck, Phone, ScanLine, Sparkles, Stethoscope, Smile } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { QuickAppointmentForm } from "@/components/AppointmentForm";
import {
  ActionLink,
  BlogCard,
  ChoiceTabs,
  CtaBand,
  DoctorCard,
  FaqList,
  PageHero,
  ProcessSteps,
  ReviewSlider,
  SectionIntro,
  ServiceCard,
  StatRow,
  StoryCard,
  TrustStrip,
} from "@/components/SiteBlocks";
import { clinic, clinicPhotos, dentists, faqs, posts, services, testimonials } from "@/lib/clinic-data";

const stats = [
  { value: "30+", label: "Years in practice", note: "Led by Dr. Gurpreet Singh, who has treated patients in Noida since the 1990s." },
  { value: "1,000+", label: "Implants placed", note: "Implant cases planned from a digital X-ray and reviewed before treatment starts." },
  { value: "2", label: "Clinics in Noida", note: "One practice in Sector 75, and a second clinic at Sector 76, Noida." },
  { value: "8", label: "Treatments offered", note: "From emergency root canal care to implants, aligners and routine examinations." },
];

const strengths = [
  {
    label: "Digital imaging first",
    icon: ScanLine,
    title: "The X-ray comes before the plan",
    text: "Implant and root canal decisions depend on what the imaging shows. The clinic takes the digital X-ray it needs, then explains what it means for your options.",
    image: services[5].image,
    points: [
      "Lower radiation than film X-rays",
      "Images available immediately for discussion",
      "Treatment ranges explained before you decide",
      "Previous records reviewed if you bring them",
    ],
  },
  {
    label: "Saving natural teeth",
    icon: Stethoscope,
    title: "Restorative care before extraction",
    text: "Where a damaged or infected tooth can be treated, the clinic reviews root canal treatment and restoration rather than moving straight to removal.",
    image: services[2].image,
    points: [
      "Local anaesthesia for the procedure",
      "Careful cleaning and sealing of the canal",
      "Crown and filling options to rebuild the tooth",
      "Aftercare explained before you leave",
    ],
  },
  {
    label: "Implant dentistry",
    icon: Sparkles,
    title: "Implants planned around your bone",
    text: "Dr. Gurpreet Singh leads implant cases. The implant system is chosen for your bone structure rather than applied as a standard option.",
    image: services[0].image,
    points: [
      "Over 1,000 implants completed",
      "Placed into the bone without loading adjacent teeth",
      "Crown and bridge options reviewed together",
      "Reasonable treatment ranges from ₹15,000 to ₹21,000",
    ],
  },
  {
    label: "Smile and alignment",
    icon: Smile,
    title: "Cosmetic treatment shaped to you",
    text: "Whitening, clear aligners, veneers and bonding are discussed against what you want to change, with the expected timeline set out first.",
    image: services[3].image,
    points: [
      "Professional teeth whitening",
      "Invisalign clear aligners",
      "Braces for gaps and bite problems",
      "Veneers, bonding and smile planning",
    ],
  },
];

const journey = [
  {
    title: "Book an Appointment",
    text: "Call the clinic or send a request. Reception confirms the date, time and treatment with you.",
    icon: CalendarCheck,
  },
  {
    title: "Examination and X-ray",
    text: "The dentist examines your teeth and gums and takes the digital imaging the case needs.",
    icon: ScanLine,
  },
  {
    title: "Treatment plan",
    text: "Which treatment suits you, what it involves and the expected range are explained before you agree.",
    icon: Stethoscope,
  },
  {
    title: "Treatment and follow-up",
    text: "Treatment is carried out under local anaesthesia where needed, with a review afterwards.",
    icon: Smile,
  },
];

export default function Index() {
  return (
    <PublicLayout>
      <PageMeta
        title="Dental Cure Clinic Noida"
        description="Dental implants, root canal treatment, fillings, braces, clear aligners and routine examinations in Sector 75 and Sector 76, Noida. Led by Dr. Gurpreet Singh and Dr. Manpreet Kaur."
      />

      <PageHero
        eyebrow="Implantology and general dentistry in Noida"
        title="Modern dental care for confident smiles."
        description="Stay ahead with regular checks, early treatment of problems, and careful work on the teeth you already have. Implants, root canal treatment, cosmetic dentistry and routine examinations, all handled by the same clinic team."
        image={clinicPhotos[0]}
        actions={
          <>
            <ActionLink to="/appointment" variant="primary">
              Make Appointment
            </ActionLink>
            <a href={clinic.phoneHref} className="action-secondary">
              <Phone className="size-4" aria-hidden="true" /> {clinic.phone}
            </a>
          </>
        }
      />

      {/*
        The page's one direct ask, on the sage shelf tucked under the banner.

        There is no photograph here: the clinic publishes no reception or room
        photograph, and both dentist portraits are already on this page further
        down, so a face reused at this size would be filler. The number is set
        as display type instead — for most patients calling is the faster way
        in, and it is the one fact this band can state better than the form.

        Padding is measured against the 100px the band tucks under, so the copy
        still clears the banner's rounded corners by ~70px.
      */}
      <section className="band band-tuck band-shade !pb-[70px] !pt-[150px] lg:!pb-[100px] lg:!pt-[190px]">
        <div className="page-shell">
          {/*
            Three cells rather than two columns: on a phone the slip comes
            straight after the lede, and the phone block becomes the fallback
            below it. On desktop the slip holds the right side across both rows.
          */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16 xl:gap-24">
            <div className="max-w-[54ch]">
              <span className="sub-title" data-reveal>
                Request an appointment
              </span>
              <h2 className="section-title" data-split>
                Three details, and reception takes it from there.
              </h2>
              <p className="body-text max-w-[46ch]" data-reveal>
                Your name, your number and the treatment you are asking about. Reception calls back to agree a date and
                time — nothing is booked until that call.
              </p>
            </div>

            <div
              className="order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
              data-reveal
            >
              <QuickAppointmentForm />
            </div>

            <div className="order-last border-t border-ink/10 pt-8 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-end">
              <p className="text-[0.95rem] text-body">Prefer to speak to someone?</p>
              <a
                href={clinic.phoneHref}
                className="mt-1 inline-flex min-h-11 items-center font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight text-ink transition hover:text-teal"
              >
                {clinic.phone}
              </a>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-body">
                Monday to Saturday; call ahead to confirm current hours. The Sector 76 clinic is on{" "}
                <a
                  href={clinic.secondaryPhoneHref}
                  className="whitespace-nowrap font-semibold text-ink underline decoration-hairline underline-offset-4 transition hover:text-teal"
                >
                  {clinic.secondaryPhone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <SectionIntro
            align="center"
            eyebrow="Special care for your smile"
            title="Care planned around your teeth, not a standard package."
            className="mb-[70px]"
          />
          <StatRow stats={stats} />
          <p className="body-text mx-auto mt-16 max-w-[68ch] text-center" data-reveal>
            Dental Cure Clinic is a general and cosmetic dental practice in Noida. Every treatment begins with an
            examination and, where the case needs it, a digital X-ray, so the recommendation matches what is actually
            happening in your mouth rather than a fixed menu.
          </p>
        </div>
      </section>

      <section
        className="band band-tail band-photo"
        style={{ backgroundImage: `url(${clinicPhotos[1]})` }}
        data-parallax
      >
        <div className="page-shell">
          <SectionIntro
            tone="light"
            eyebrow="Our services"
            title="The treatments patients come to us for"
            description="From emergency dental problems to everyday check-ups, these are the treatments currently offered by the practice."
            action={
              <ActionLink to="/services" variant="secondary">
                All services
              </ActionLink>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-[60px] text-center" data-reveal>
            <h3 className="text-[1.5rem] text-white">Not sure which treatment you need?</h3>
            <p className="mx-auto mt-3 max-w-[56ch] text-[1rem] leading-[26px] text-light">
              Describe the problem on the phone and reception will say whether it needs an immediate visit, an X-ray or a
              scheduled appointment.
            </p>
            <a href={clinic.phoneHref} className="action-primary mt-7">
              Call {clinic.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Padding is measured against the 100px the band tucks under, so the
          strip sits centred in the part of it that is actually on screen. */}
      <section className="band band-tuck band-shade !pb-[60px] !pt-[140px]">
        <div className="page-shell">
          <TrustStrip
            items={[
              "30+ years in practice",
              "1,000+ implants",
              "Digital X-ray on site",
              "Invisalign clear aligners",
              "Two clinics in Noida",
            ]}
          />
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <SectionIntro
            align="center"
            eyebrow="Why choose us"
            title="Professional, personal dental treatment"
            className="mb-[70px]"
          />
          <ChoiceTabs tabs={strengths} />
        </div>
      </section>

      <section
        className="band band-tail band-photo"
        style={{ backgroundImage: `url(${clinicPhotos[2]})` }}
        data-parallax
      >
        <div className="page-shell">
          <SectionIntro
            tone="light"
            eyebrow="Treatment in practice"
            title="What the plan actually looks like"
            description="Two treatments that most often need a careful conversation before they begin."
          />
          <div className="grid gap-6 xl:grid-cols-2">
            <StoryCard
              image={services[0].image}
              eyebrow="Dental implants"
              title="An implant placed from the imaging, not a template"
              text="The site is assessed on a digital X-ray before the implant system is chosen, so the plan matches your bone and the surrounding teeth."
              points={[
                "Reasonable treatment ranges from ₹15,000 to ₹21,000",
                "Placed into the bone without using adjacent teeth for support",
                "Crown options reviewed with the implant",
              ]}
              to="/services/dental-implants"
            />
            <StoryCard
              image={services[2].image}
              eyebrow="Root canal treatment"
              title="Saving the tooth in the chair"
              text="Deep decay and trauma are treated by cleaning and sealing the canal, under local anaesthesia, rather than removing the tooth."
              points={[
                "Examined with X-rays before treatment",
                "Local anaesthesia for comfort",
                "Crown or filling to rebuild the tooth afterwards",
              ]}
              to="/services/root-canals"
            />
          </div>
        </div>
      </section>

      <CtaBand />

      <section className="band">
        <div className="page-shell">
          <SectionIntro
            align="center"
            eyebrow="How a visit works"
            title="Four steps, no guesswork"
            className="mb-[70px]"
          />
          <ProcessSteps steps={journey} />
        </div>
      </section>

      {/* Tucks under the process band and must sit above the team band, so its
          rounded corners reveal the photograph behind them. */}
      <section className="band band-tuck band-dark !z-[3] !pb-[80px] !pt-[110px] lg:!pb-[100px] lg:!pt-[170px]">
        <div className="page-shell">
          <ReviewSlider reviews={testimonials} />
        </div>
      </section>

      {/* Pine rather than a photograph: the clinic has no wide team shot, and a
          portrait blown up to full bleed reads as an accident. */}
      <section
        className="band band-tuck bg-pine !pt-[140px] lg:!pt-[200px]"
        id="team"
      >
        <div className="page-shell">
          <SectionIntro
            align="center"
            tone="light"
            eyebrow="Our professional team"
            title="Two dentists, one treatment plan"
            className="mb-[70px]"
          />
          <div className="mx-auto grid max-w-[980px] gap-6 md:grid-cols-2">
            {dentists.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
            <div>
              <SectionIntro eyebrow="Common questions" title="What patients ask before treatment" />
              <FaqList faqs={faqs} />
            </div>
            <aside className="lg:sticky lg:top-32">
              <figure className="overflow-hidden rounded-panel">
                <img
                  src={clinicPhotos[0]}
                  alt="Dental treatment at Dental Cure Clinic"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  width={520}
                  height={390}
                />
              </figure>
              <p className="body-text mt-6">
                Ask reception if your question is not covered here. The clinic will tell you whether the problem needs
                an immediate visit or can wait for a scheduled appointment.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={clinic.phoneHref} className="action-primary !min-h-[50px] text-[0.95rem]">
                  Call the clinic
                </a>
                <Link to="/faqs" className="action-secondary !min-h-[50px] text-[0.95rem]">
                  All FAQs
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="band band-tail band-light">
        <div className="page-shell">
          <SectionIntro align="center" eyebrow="News and blog" title="Insights from our blog." className="mb-[70px]" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center" data-reveal>
            <ActionLink to="/blog" variant="dark">
              Read the journal
            </ActionLink>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
