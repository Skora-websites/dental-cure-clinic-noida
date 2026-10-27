import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck2, Check, ChevronRight, Heart, MapPin, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { faqs, galleryImages, services, testimonials } from "@/lib/clinic-data";

const benefits = [
  { icon: Heart, title: "Comfort comes first", copy: "Unhurried appointments, clear explanations and a team that listens." },
  { icon: ShieldCheck, title: "Care you can trust", copy: "Thoughtful treatment planning with your comfort and long-term health in mind." },
  { icon: Sparkles, title: "Modern, gentle approach", copy: "Up-to-date techniques in a calm, clean and welcoming environment." },
];

export default function Index() {
  return (
    <PublicLayout>
      <PageMeta title="Gentle Dental Care in Bengaluru" description="Request an appointment with Dental Cure Clinic for comfortable, modern dental care in Koramangala, Bengaluru." />
      <section className="relative min-h-[640px] overflow-hidden bg-[#123f3a] sm:min-h-[680px]">
        <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2000&q=90" alt="Bright and welcoming Dental Cure Clinic treatment room" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3531]/95 via-[#0c3531]/75 to-[#0c3531]/15" />
        <div className="page-container relative flex min-h-[640px] items-center py-16 sm:min-h-[680px] sm:py-20">
          <div className="max-w-2xl text-white">
            <Badge data-hero className="glass-panel mb-6 rounded-full px-4 py-2 text-white hover:bg-white/15">Calm, modern dentistry in Koramangala</Badge>
            <h1 data-hero className="content-balance max-w-xl break-words font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Feel good about your smile.</h1>
            <p data-hero className="mt-7 max-w-xl text-lg leading-8 text-white/75 sm:text-xl">Comfort-led dental care, clear guidance and a team that takes the time to listen. Request your visit in just a few minutes.</p>
            <div data-hero className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full rounded-full bg-[#5eead4] px-7 text-[#123f3a] hover:bg-[#99f6e4] sm:w-auto"><Link to="/appointment">Request an appointment <ArrowRight className="ml-2 size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-white/35 bg-white/5 px-7 text-white hover:bg-white hover:text-[#123f3a] sm:w-auto"><a href="tel:+919876543210"><Phone className="mr-2 size-4" /> Call the clinic</a></Button>
            </div>
            <div data-hero className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {["No rush appointments", "Private consultation rooms", "English & Hindi support"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-4 text-[#5eead4]" /> {item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-5">
        <div className="page-container grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {["6 care areas", "3 caring specialists", "Open 6 days", "Same-week requests"].map((item, i) => <div key={item} className="px-2 py-2"><p className="font-display text-lg font-bold text-primary">{i === 0 ? "6" : i === 1 ? "3" : i === 2 ? "6" : "✓"}</p><p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">{item}</p></div>)}
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div><p className="eyebrow">Care that feels different</p><h2 className="section-title">Dentistry without the dread.</h2></div>
            <p className="section-copy lg:ml-auto">Good dental care should never feel like a hurdle. We pair thoughtful treatment with a calm environment, honest guidance and enough time for your questions.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, copy }) => <div key={title} className="glass-panel-light p-7 transition-transform hover:-translate-y-1"><span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-5" /></span><h3 className="mt-6 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#eef8f4]">
        <div className="page-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Treatments for every smile</p><h2 className="section-title">Complete care, under one roof.</h2></div><Button asChild variant="outline" className="rounded-full border-primary/25 bg-white"><Link to="/services">Explore all services <ArrowRight className="ml-2 size-4" /></Link></Button></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => <Link to={`/services/${service.slug}`} key={service.slug} className="surface-card group flex h-full flex-col overflow-hidden"><div className="relative h-48 overflow-hidden"><img src={service.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary">Explore care</span></div><div className="flex flex-1 flex-col p-6"><h3 className="font-display text-xl font-bold">{service.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.short}</p><span className="mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary">Learn more <ChevronRight className="ml-1 size-4 transition group-hover:translate-x-1" /></span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden bg-white">
        <div className="page-container grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative mb-8 sm:mb-0"><div className="overflow-hidden rounded-[2rem]"><img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85" alt="A calm and modern dental treatment room" className="aspect-[4/3] w-full object-cover" /></div><div className="surface-card absolute -bottom-6 left-4 right-4 max-w-[280px] p-5 sm:-right-6 sm:left-auto"><div className="flex gap-1 text-amber-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div><p className="mt-3 text-sm font-semibold leading-6">“Every detail is designed to help you feel at ease.”</p><p className="mt-2 text-xs text-muted-foreground">Dental Cure team</p></div></div>
          <div><p className="eyebrow">Meet your care team</p><h2 className="section-title">Experienced hands. Human care.</h2><p className="section-copy">Our dentists bring specialist training and a shared belief: good care starts with listening. You will always know what is happening, what it will cost and what comes next.</p><div className="mt-8 space-y-4">{["Clear, personalised treatment plans", "Strict sterilisation protocols", "A private, welcoming environment"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold"><span className="grid size-7 place-items-center rounded-full bg-secondary text-primary"><Check className="size-4" /></span>{item}</div>)}</div><Button asChild className="mt-9 rounded-full bg-primary"><Link to="/dentists">Meet our dentists <ArrowRight className="ml-2 size-4" /></Link></Button></div>
        </div>
      </section>

      <section className="section-padding bg-[#123f3a] text-white">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5eead4]">Patient experiences</p><h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Kind words from our patients.</h2><p className="mt-5 text-sm leading-6 text-white/60">Placeholder testimonials for layout review. Replace only with clinic-approved, properly consented patient feedback.</p></div><div className="grid gap-4 md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="glass-panel flex h-full flex-col rounded-3xl p-6"><div className="flex gap-1 text-[#5eead4]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div><blockquote className="mt-5 flex-1 text-sm leading-6 text-white/80">“{item.quote}”</blockquote><figcaption className="mt-6 text-xs font-semibold text-white">{item.name}<span className="mt-1 block font-normal text-white/45">{item.detail}</span></figcaption></figure>)}</div></div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="page-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3 sm:h-80 sm:gap-4">{galleryImages.slice(0, 4).map((image, i) => <img key={image} src={image} alt={i === 0 ? "Modern Dental Cure treatment room" : "Dental clinic interior detail"} className={`h-44 w-full rounded-3xl object-cover sm:h-full ${i % 3 === 0 ? "sm:translate-y-4" : ""}`} />)}</div>
          <div><p className="eyebrow">A space designed for calm</p><h2 className="section-title">A clinic that feels different from the first step.</h2><p className="section-copy">Natural light, warm materials and thoughtfully organised treatment spaces help every visit feel easy. Take a look around before you visit.</p><Button asChild variant="outline" className="mt-8 rounded-full border-primary/25"><Link to="/gallery">View the gallery <ArrowRight className="ml-2 size-4" /></Link></Button></div>
        </div>
      </section>

      <section className="section-padding bg-[#fff4dd]">
        <div className="page-container"><div className="mx-auto max-w-3xl text-center"><p className="eyebrow">Good to know</p><h2 className="section-title mx-auto">Questions, answered simply.</h2></div><div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">{faqs.slice(0, 4).map((faq) => <details key={faq.question} className="surface-card group p-6"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display font-bold marker:hidden">{faq.question}<span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-lg leading-none text-primary transition group-open:rotate-45">+</span></summary><p className="mt-4 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:pb-28">
        <div className="page-container overflow-hidden rounded-[2rem] border border-white/20 bg-primary/90 px-6 py-12 text-white shadow-[0_24px_80px_-36px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-16"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#99f6e4]">Ready when you are</p><h2 className="content-balance mt-3 font-display text-3xl font-bold sm:text-4xl">Let’s take care of your smile.</h2><p className="mt-3 text-pretty text-white/70">Request your preferred time online. Our team will call to confirm.</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0"><Button asChild size="lg" className="rounded-full bg-[#5eead4] text-[#123f3a] hover:bg-[#99f6e4]"><Link to="/appointment"><CalendarCheck2 className="mr-2 size-4" /> Request appointment</Link></Button><Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"><a href="https://maps.google.com/?q=Green+Park+Avenue+Koramangala+Bengaluru"><MapPin className="mr-2 size-4" /> Get directions</a></Button></div></div>
      </section>
    </PublicLayout>
  );
}
