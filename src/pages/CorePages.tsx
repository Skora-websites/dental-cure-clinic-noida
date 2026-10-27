import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Clock3, Mail, MapPin, Phone, Quote, ShieldCheck, Sparkles } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import AppointmentForm from "@/components/AppointmentForm";
import EnquiryForm from "@/components/EnquiryForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clinic, dentists, services } from "@/lib/clinic-data";

export function PageIntro({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#123f3a] py-16 sm:py-20 lg:py-24">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c3531] via-[#0c3531]/90 to-[#0c3531]/50" />
      <div className="page-container relative"><Badge data-reveal="scale" className="glass-panel max-w-full rounded-full text-white hover:bg-white/15">{eyebrow}</Badge><h1 data-reveal="up" className="content-balance mt-5 max-w-3xl break-words font-display text-[2.25rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">{title}</h1><p data-reveal="up" className="text-pretty mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{copy}</p></div>
    </section>
  );
}

export function AboutPage() {
  return (
    <PublicLayout>
      <PageMeta title="About Our Clinic" description="Meet the experienced dental team behind Dental Cure Clinic's implant, restorative and general dental care in Noida." />
      <PageIntro eyebrow="About Dental Cure" title="We passionately care for your smile." copy="Dr. Gurpreet Singh has completed more than 1,000 implants. The clinic combines experienced care, digital X-rays and a warm, relaxed atmosphere." image="https://dentalcureclinics.com/wp-content/uploads/2024/09/Untitled-design-2024-09-11T112110.851.jpg" />
      <section className="section-padding">
        <div className="page-container grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem]"><img src="https://dentalcureclinics.com/wp-content/uploads/2024/09/img_3.png" alt="Dental Cure Clinic care team" className="aspect-[4/3] w-full object-cover" /></div>
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="section-title">A team with experience behind every visit.</h2>
            <p className="section-copy">Dr. Gurpreet Singh has more than 30 years of experience and has performed over 1,000 surgeries, including implants, root canal treatments, crowns and bridges. The team uses sterilised equipment, disposable gloves and masks, and digital X-rays to support accurate, comfortable care.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">{[{ icon: ShieldCheck, title: "Sterilised care", copy: "Sterilised instruments and disposable protective equipment for every patient." }, { icon: Sparkles, title: "Digital diagnostics", copy: "Digital X-rays give the team a clearer picture before treatment begins." }].map(({ icon: Icon, title, copy }) => <div key={title} className="glass-panel-light p-6"><Icon className="size-6 text-primary" /><h3 className="mt-4 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div>
          </div>
        </div>
      </section>
      <section className="bg-[#eef8f4] py-16">
        <div className="page-container grid gap-8 sm:grid-cols-3">{[{ n: "01", t: "Listen first", c: "Your concerns, goals and medical history guide the consultation." }, { n: "02", t: "Plan clearly", c: "Examination findings, options and expected costs are explained before treatment." }, { n: "03", t: "Support follow-up", c: "The team stays available through treatment and follow-up appointments." }].map((item) => <div key={item.n}><span className="font-display text-4xl font-bold text-primary/25">{item.n}</span><h3 className="mt-4 font-display text-xl font-bold">{item.t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.c}</p></div>)}</div>
      </section>
    </PublicLayout>
  );
}

export function ServicesPage() {
  return <PublicLayout><PageMeta title="Our Dental Services" description="Explore dental implants, fillings, root canals, cosmetic dentistry, restorations, digital X-rays and orthodontics at Dental Cure Clinic." /><PageIntro eyebrow="Our treatments" title="Care for every stage of your smile." copy="From preventive visits to restorative care, our approach is always personal, precise and gentle." /><section className="section-padding"><div className="page-container grid gap-6 md:grid-cols-2">{services.map((service, i) => <Link key={service.slug} to={`/services/${service.slug}`} className="surface-card group grid h-full overflow-hidden sm:grid-cols-[0.8fr_1.2fr]"><div className="relative min-h-56 overflow-hidden"><img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary">0{i + 1}</span></div><div className="flex h-full flex-col justify-center p-7"><h2 className="font-display text-2xl font-bold">{service.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.short}</p><span className="mt-6 inline-flex items-center text-sm font-bold text-primary">View treatment <ArrowRight className="ml-2 size-4 transition group-hover:translate-x-1" /></span></div></Link>)}</div></section></PublicLayout>;
}

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <PublicLayout><PageIntro eyebrow="Service" title="Treatment not found" copy="Please explore our available dental services." /><div className="page-container py-20"><Button asChild className="rounded-full"><Link to="/services">View all services</Link></Button></div></PublicLayout>;
  return <PublicLayout><PageMeta title={service.name} description={service.short} /><section className="grid lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:min-h-[650px]"><img src={service.image} alt={`${service.name} at Dental Cure Clinic`} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#123f3a]/60 to-transparent" /></div><div className="mx-auto flex w-full max-w-3xl items-center px-4 py-14 sm:px-10 lg:max-w-none lg:px-16 lg:py-20"><div className="w-full max-w-xl"><p className="eyebrow">Dental treatment</p><h1 className="content-balance mt-4 font-display text-4xl font-extrabold sm:text-5xl">{service.name}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{service.short} We begin with a detailed conversation and examination, then outline suitable options in clear, everyday language.</p><div className="mt-8 space-y-3">{service.benefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 text-sm font-semibold"><span className="grid size-7 place-items-center rounded-full bg-secondary text-primary"><Check className="size-4" /></span>{benefit}</div>)}</div><div className="mt-9 rounded-2xl bg-[#fff4dd] p-5 text-sm leading-6 text-muted-foreground">Treatment suitability, timelines and costs depend on a professional examination. This page provides general information, not a diagnosis.</div><Button asChild size="lg" className="mt-8 rounded-full bg-primary"><Link to={`/appointment?service=${encodeURIComponent(service.name)}`}>Request this appointment <ArrowRight className="ml-2 size-4" /></Link></Button></div></div></section><section className="section-padding bg-[#eef8f4]"><div className="page-container grid gap-10 lg:grid-cols-2"><div><p className="eyebrow">What to expect</p><h2 className="section-title">A careful plan, one step at a time.</h2></div><div className="space-y-5">{["A conversation about your symptoms, history and goals", "A careful examination and any necessary imaging", "A written explanation of findings and available options", "A plan that includes timing, costs and aftercare"].map((item, i) => <div key={item} className="surface-card flex items-start gap-4 p-5"><span className="pt-0.5 font-display text-xl font-bold text-primary/40">0{i + 1}</span><p className="font-semibold">{item}</p></div>)}</div></div></section></PublicLayout>;
}

export function DentistsPage() {
  return <PublicLayout><PageMeta title="Our Dentists" description="Meet Dr. Gurpreet Singh and Dr. Manpreet Kaur, the experienced dental team at Dental Cure Clinic in Noida." /><PageIntro eyebrow="Meet the team" title="Helping you smile." copy="Dr. Gurpreet Singh leads implant care while Dr. Manpreet Kaur focuses on careful, patient-led treatment and follow-up." /><section className="section-padding"><div className="page-container grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{dentists.map((dentist) => <article key={dentist.slug} className="surface-card flex h-full flex-col overflow-hidden"><img src={dentist.image} alt={`${dentist.name}, dentist at Dental Cure Clinic`} className="aspect-[4/5] w-full object-cover object-top" /><div className="flex flex-1 flex-col p-6"><h2 className="font-display text-xl font-bold">{dentist.name}</h2><p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">{dentist.qualification}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{dentist.bio}</p></div></article>)}</div></section></PublicLayout>;
}

export function AppointmentPage() {
  return <PublicLayout><PageMeta title="Request an Appointment" description="Request your dental appointment with Dental Cure Clinic in Noida. The team will contact you to confirm the date and time." /><PageIntro eyebrow="Book a visit" title="Tell us what you need." copy="Share a few details and choose your preferred time. We will call or email you to confirm the appointment." /><section className="section-padding"><div className="page-container grid min-w-0 gap-10 lg:grid-cols-[1.25fr_0.75fr]"><AppointmentForm /><aside className="space-y-5"><div className="surface-card p-5 sm:p-6"><h2 className="font-display text-xl font-bold">What happens next?</h2><ol className="mt-5 space-y-5">{["You send your request", "We review the preferred time", "Our team calls to confirm", "You visit the clinic"].map((item, i) => <li key={item} className="flex gap-3 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span><span className="pt-1 font-semibold">{item}</span></li>)}</ol></div><div className="rounded-3xl border border-white/15 bg-[#123f3a]/95 p-5 text-white shadow-[0_18px_50px_-28px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6"><h3 className="font-display text-xl font-bold">Need us sooner?</h3><p className="mt-3 text-sm leading-6 text-white/65">Call the clinic directly for urgent concerns or same-day requests.</p><a href={clinic.phoneHref} className="mt-5 inline-flex items-center gap-2 font-bold text-[#5eead4]"><Phone className="size-4" /> {clinic.phone}</a></div></aside></div></section></PublicLayout>;
}

export function ContactPage() {
  return (
    <PublicLayout>
      <PageMeta title="Contact the Clinic" description="Contact Dental Cure Clinic in Noida by phone or email and find the clinic address for your appointment." />
      <PageIntro eyebrow="Get in touch" title="Have other questions?" copy="For any enquiry, assistance or consultation, contact the Dental Cure Clinic team." />
      <section className="section-padding">
        <div className="page-container grid min-w-0 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="surface-card flex items-start gap-4 p-5 sm:p-6"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Phone className="size-5" /></span><div><h2 className="font-display text-lg font-bold">Call the clinic</h2><a href={clinic.phoneHref} className="mt-2 block text-sm font-semibold text-muted-foreground">{clinic.phone}</a><a href={clinic.secondaryPhoneHref} className="mt-1 block text-sm font-semibold text-muted-foreground">{clinic.secondaryPhone}</a></div></div>
            <div className="surface-card flex items-start gap-4 p-5 sm:p-6"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Mail className="size-5" /></span><div><h2 className="font-display text-lg font-bold">Email us</h2><a href={`mailto:${clinic.email}`} className="mt-2 block break-all text-sm font-semibold text-muted-foreground">{clinic.email}</a><a href={`mailto:${clinic.secondaryEmail}`} className="mt-1 block break-all text-sm font-semibold text-muted-foreground">{clinic.secondaryEmail}</a></div></div>
            <div className="surface-card flex items-start gap-4 p-5 sm:p-6"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><MapPin className="size-5" /></span><div><h2 className="font-display text-lg font-bold">Locations</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{clinic.address}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{clinic.secondaryAddress}</p><a className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary" href={clinic.maps} target="_blank" rel="noreferrer">Get directions <ArrowRight className="size-4" /></a></div></div>
            <div className="surface-card flex items-start gap-4 p-5 sm:p-6"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-primary"><Clock3 className="size-5" /></span><div><h2 className="font-display text-lg font-bold">Opening hours</h2><div className="mt-2 space-y-1">{clinic.hours.map(([d, t]) => <p key={d} className="flex flex-col gap-0.5 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:gap-4"><span>{d}</span><span className="sm:text-right">{t}</span></p>)}</div></div></div>
          </div>
          <div className="surface-card p-4 sm:p-9"><h2 className="font-display text-3xl font-bold">Send us a message</h2><p className="mb-7 mt-3 text-sm leading-6 text-muted-foreground">For general questions, use this form. For appointments, the dedicated request form gives the team the details they need.</p><EnquiryForm /><Button asChild variant="outline" className="mt-5 w-full rounded-full"><Link to="/appointment">Request an appointment instead</Link></Button></div>
        </div>
      </section>
    </PublicLayout>
  );
}
