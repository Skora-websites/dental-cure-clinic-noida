import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlignCenter,
  Anchor,
  ArrowRight,
  HeartPulse,
  Phone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Smile,
} from "lucide-react";
import type { ClinicService } from "@/lib/clinic-data-types";
import type { Doctor, Faq, Review } from "@/lib/clinic-data-types";
import { clinic } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  image,
  highlights,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  image?: string;
  highlights?: { value: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-brand-teal/10 bg-brand-ivory">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 size-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-brand-deep/82" aria-hidden="true" />
        </>
      )}
      <div
        className={cn(
          "relative grid gap-10 px-5 py-16 sm:px-6 lg:px-8 lg:py-24",
          highlights ? "lg:grid-cols-[minmax(0,1fr)_320px]" : "lg:py-24",
        )}
      >
        <div className="mx-auto w-full max-w-[1120px]">
          <p className={cn("eyebrow", image && "border-white/25 bg-white/10 text-brand-ivory")}>{eyebrow}</p>
          <h1
            className={cn(
              "font-display text-[clamp(2.4rem,6.1vw,4.15rem)] font-semibold leading-[1.02] tracking-[-0.035em]",
              image ? "text-white text-shadow-luxury" : "text-brand-ink",
            )}
          >
            {title}
          </h1>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl", image ? "text-white/82" : "text-muted-foreground")}>
            {description}
          </p>
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
        </div>

        {highlights && (
          <div className="mx-auto grid w-full max-w-[1120px] gap-4 sm:grid-cols-3 lg:mx-0 lg:max-w-none">
            {highlights.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "rounded-[24px] border p-6",
                  image ? "border-white/20 bg-white/10" : "border-brand-teal/10 bg-white/85 shadow-card",
                )}
              >
                <p className={cn("font-display text-3xl font-semibold", image ? "text-brand-mint" : "text-brand-teal")}>{item.value}</p>
                <p className={cn("mt-2 text-xs font-semibold uppercase tracking-[0.16em]", image ? "text-white/70" : "text-muted-foreground")}>{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center")}>
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {description && <p className="section-lede">{description}</p>}
      </div>
      {action && <div className="w-full sm:w-auto">{action}</div>}
    </div>
  );
}

export function ActionLink({ to, children, variant = "primary" }: { to: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  const className = variant === "primary" ? "action-primary" : variant === "secondary" ? "action-secondary" : "action-ghost";
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

const serviceIcons = {
  Anchor,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Smile,
  ScanLine,
  AlignCenter,
  Stethoscope,
} as const;

export function ServiceCard({ service }: { service: ClinicService }) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Stethoscope;
  return (
    <article className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/11] overflow-hidden bg-brand-ivory">
        <img src={service.image} alt={service.name} className="size-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-2xl border border-white/25 bg-brand-deep/85 text-brand-mint">
          <Icon className="size-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl font-semibold text-brand-ink">{service.name}</h3>
        <p className="body-text mt-3">{service.short}</p>
        <ul className="mt-5 space-y-2.5">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
              <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-brand-teal/55" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
        <Link to={`/services/${service.slug}`} className="action-ghost mt-6 self-start px-0">
          View {service.name.toLowerCase()} details
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function DoctorCard({ doctor, compact = false }: { doctor: Doctor; compact?: boolean }) {
  return (
    <article className="surface-card surface-card-hover h-full overflow-hidden">
      <div className={cn("overflow-hidden bg-white", compact ? "aspect-[5/4]" : "aspect-[4/5]")}>
        <img src={doctor.image} alt={doctor.name} className="size-full object-cover transition duration-700 hover:scale-[1.04]" loading="lazy" />
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-display text-2xl font-semibold text-brand-ink">{doctor.name}</h3>
        <p className="mt-2 text-sm font-semibold text-brand-teal">{doctor.qualification}</p>
        <p className="body-text mt-4">{doctor.bio}</p>
      </div>
    </article>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="surface-card surface-card-hover h-full p-7">
      <blockquote className="font-display text-xl leading-snug text-brand-ink">“{review.quote}”</blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm font-semibold text-muted-foreground">
        {review.name}
        <span className="mt-1 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/75">{review.detail}</span>
      </figcaption>
    </figure>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="grid gap-4" data-reveal="up">
      {faqs.map((faq) => (
        <details key={faq.question} className="surface-card group h-fit open:shadow-[var(--lift-shadow)]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 font-display text-lg font-semibold text-brand-ink marker:content-none">
            {faq.question}
            <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-brand-teal/25 text-brand-teal transition group-open:rotate-45 group-open:border-brand-teal group-open:bg-brand-teal group-open:text-white">
              +
            </span>
          </summary>
          <p className="body-text px-6 pb-6 pt-0">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="page-section bg-brand-ivory">
      <div className="page-shell">
        <div className="ink-panel relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
            <div>
              <p className="section-eyebrow text-brand-mint">Next step</p>
              <h2 className="font-display text-[clamp(1.95rem,4vw,3rem)] font-semibold leading-[1.06] text-white">
                Book an examination with the dentist who will treat you.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78">
                Send your appointment request or call the clinic. The team will confirm your date, time and treatment before you arrive.
              </p>
            </div>
            <div className="grid gap-3">
              <a href={clinic.phoneHref} className="action-primary bg-brand-mint text-brand-deep hover:bg-white">
                <Phone className="size-4" /> Call {clinic.phone}
              </a>
              <Link to="/appointment" className="action-secondary border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
                Request an appointment
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
