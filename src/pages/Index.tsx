import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck2, Check, ChevronRight, Heart, MapPin, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { faqs, galleryImages, services, testimonials } from "@/lib/clinic-data";

const benefits = [
  { icon: ShieldCheck, title: "Professional experts", copy: "A qualified team led by Dr. Gurpreet Singh with more than 30 years of experience." },
  { icon: Sparkles, title: "Affordable pricing", copy: "Clear treatment options and reasonable implant ranges from ₹15,000 to ₹21,000." },
  { icon: Heart, title: "Complete dental care", copy: "Preventive, restorative, cosmetic, implant and orthodontic care under one roof." },
];

export default function Index() {
  return (
    <PublicLayout>
      <PageMeta title="Dental Implants and Dental Care in Noida" description="Request an appointment with Dental Cure Clinic for implants, fillings, root canals, cosmetic dentistry, orthodontics and complete dental care in Noida." />
      <section className="relative min-h-[640px] overflow-hidden bg-[#123f3a] sm:min-h-[680px]">
        <img src="https://dentalcureclinics.com/wp-content/uploads/2024/09/Untitled-design-2024-09-11T111231.868.jpg" alt="Dental Cure Clinic treatment space in Noida" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3531]/95 via-[#0c3531]/75 to-[#0c3531]/15" />
        <div className="page-container relative flex min-h-[640px] items-center py-16 sm:min-h-[680px] sm:py-20">
          <div className="max-w-2xl text-white">
            <Badge data-hero className="glass-panel mb-6 rounded-full px-4 py-2 text-white hover:bg-white/15">Dental implants and complete dental care in Noida</Badge>
            <h1 data-hero className="content-balance max-w-xl break-words font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">A confident smile can change a life.</h1>
            <p data-hero className="mt-7 max-w-xl text-lg leading-8 text-white/75 sm:text-xl">At Dental Cure Clinic, we provide dental implant solutions and everyday dental care tailored to each patient. Start with a consultation and leave with a clear plan.</p>
            <div data-hero className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full rounded-full bg-[#5eead4] px-7 text-[#123f3a] hover:bg-[#99f6e4] sm:w-auto"><Link to="/appointment">Request an appointment <ArrowRight className="ml-2 size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-white/35 bg-white/5 px-7 text-white hover:bg-white hover:text-[#123f3a] sm:w-auto"><a href="tel:+919876543210"><Phone className="mr-2 size-4" /> Call the clinic</a></Button>
            </div>
            <div data-hero className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {["Professional experts", "Affordable pricing", "Complete dental care"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-4 text-[#5eead4]" /> {item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-5">
        <div className="page-container grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
          {["8 treatment areas", "2 experienced dentists", "30+ years of care", "1,000+ implants"].map((item, i) => <div key={item} className="px-2 py-2"><p className="font-display text-lg font-bold text-primary">{i === 0 ? "8" : i === 1 ? "2" : i === 2 ? "30+" : "1,000+"}</p><p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">{item}</p></div>)}
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div><p className="eyebrow">Care that feels different</p><h2 className="section-title">A better day starts with a better smile.</h2></div>
            <p className="section-copy lg:ml-auto">Our experienced team uses modern technology and advanced techniques in a comfortable, welcoming environment. We listen first, explain the options and build a treatment plan around your needs.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, copy }) => <div key={title} className="glass-panel-light p-7 transition-transform hover:-translate-y-1"><span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-5" /></span><h3 className="mt-6 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#eef8f4]">
        <div className="page-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">What we offer</p><h2 className="section-title">A personalized and comfortable dental care.</h2></div><Button asChild variant="outline" className="rounded-full border-primary/25 bg-white"><Link to="/services">View all treatments <ArrowRight className="ml-2 size-4" /></Link></Button></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 8).map((service) => <Link to={`/services/${service.slug}`} key={service.slug} className="surface-card group flex h-full flex-col overflow-hidden"><div className="relative h-48 overflow-hidden"><img src={service.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary">Explore care</span></div><div className="flex flex-1 flex-col p-6"><h3 className="font-display text-xl font-bold">{service.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.short}</p><span className="mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary">Learn more <ChevronRight className="ml-1 size-4 transition group-hover:translate-x-1" /></span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden bg-white">
        <div className="page-container grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative mb-8 sm:mb-0"><div className="overflow-hidden rounded-[2rem]"><img src="https://dentalcureclinics.com/wp-content/uploads/2024/09/Untitled-design-2024-09-13T141020.408.jpg" alt="Dental Cure Clinic interior" className="aspect-[4/3] w-full object-cover" /></div><div className="surface-card absolute -bottom-6 left-4 right-4 max-w-[280px] p-5 sm:-right-6 sm:left-auto"><div className="flex gap-1 text-amber-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div><p className="mt-3 text-sm font-semibold leading-6">“Every detail is designed to help you feel at ease.”</p><p className="mt-2 text-xs text-muted-foreground">Dental Cure team</p></div></div>
          <div><p className="eyebrow">Meet your care team</p><h2 className="section-title">More than 30 years of experience.</h2><p className="section-copy">Dr. Gurpreet Singh has completed more than 1,000 implants and surgeries, including root canals, crowns and bridges. Digital X-rays combine with experience to create a comfortable, relaxing visit.</p><div className="mt-8 space-y-4">{["Digital X-ray and modern technology", "Sterilised equipment and disposable masks and gloves", "Implants, root canals, crowns and bridges"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold"><span className="grid size-7 place-items-center rounded-full bg-secondary text-primary"><Check className="size-4" /></span>{item}</div>)}</div><Button asChild className="mt-9 rounded-full bg-primary"><Link to="/dentists">Meet the dentists <ArrowRight className="ml-2 size-4" /></Link></Button></div>
        </div>
      </section>

      <section className="section-padding bg-[#123f3a] text-white">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5eead4]">Patient experiences</p><h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Kind words from our patients.</h2><p className="mt-5 text-sm leading-6 text-white/60">Patient feedback published on dentalcureclinics.com. Names and consent details are not included on the source page.</p></div><div className="grid gap-4 md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="glass-panel flex h-full flex-col rounded-3xl p-6"><div className="flex gap-1 text-[#5eead4]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div><blockquote className="mt-5 flex-1 text-sm leading-6 text-white/80">“{item.quote}”</blockquote><figcaption className="mt-6 text-xs font-semibold text-white">{item.name}<span className="mt-1 block font-normal text-white/45">{item.detail}</span></figcaption></figure>)}</div></div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="page-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3 sm:h-80 sm:gap-4">{galleryImages.slice(0, 4).map((image, i) => <img key={image} src={image} alt={i === 0 ? "Modern Dental Cure treatment room" : "Dental clinic interior detail"} className={`h-44 w-full rounded-3xl object-cover sm:h-full ${i % 3 === 0 ? "sm:translate-y-4" : ""}`} />)}</div>
          <div><p className="eyebrow">Inside Dental Cure Clinic</p><h2 className="section-title">Dedicated to excellence. Dedicated to your smile.</h2><p className="section-copy">Natural light, warm materials and thoughtfully organised treatment spaces help every visit feel easy. Take a look around before you visit.</p><Button asChild variant="outline" className="mt-8 rounded-full border-primary/25"><Link to="/gallery">Visit our gallery <ArrowRight className="ml-2 size-4" /></Link></Button></div>
        </div>
      </section>

      <section className="section-padding relative isolate overflow-hidden bg-[#fff4dd]">
        <div className="page-container flex flex-col items-center">
          <div data-reveal="fade" className="w-full max-w-3xl text-center">
            <p className="eyebrow">Good to know</p>
            <h2 data-reveal="fade" className="section-title mx-auto">Questions, answered simply.</h2>
          </div>
          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 items-start gap-4 md:grid-cols-2">
            {faqs.slice(0, 4).map((faq) => (
              <details key={faq.question} data-reveal="fade" className="surface-card group relative h-fit min-w-0 overflow-hidden p-6">
                <summary className="flex min-h-7 cursor-pointer list-none items-start justify-between gap-4 font-display font-bold marker:hidden">
                  <span className="min-w-0 flex-1">{faq.question}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-lg leading-none text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-[52ch] text-pretty text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:pb-28">
        <div className="page-container overflow-hidden rounded-[2rem] border border-white/20 bg-primary/90 px-6 py-12 text-white shadow-[0_24px_80px_-36px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-16"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#99f6e4]">Ready when you are</p><h2 className="content-balance mt-3 font-display text-3xl font-bold sm:text-4xl">Let’s plan your dental care.</h2><p className="mt-3 text-pretty text-white/70">Request an appointment with our Noida clinic. The team will contact you to confirm the date and time.</p></div><div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0"><Button asChild size="lg" className="rounded-full bg-[#5eead4] text-[#123f3a] hover:bg-[#99f6e4]"><Link to="/appointment"><CalendarCheck2 className="mr-2 size-4" /> Request appointment</Link></Button><Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"><a href="https://maps.google.com/?q=Futec+Gateway+Market+Sector+75+Noida"><MapPin className="mr-2 size-4" /> Get directions</a></Button></div></div>
      </section>
    </PublicLayout>
  );
}
