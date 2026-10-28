import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlignCenter,
  Anchor,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  HeartPulse,
  Phone,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import type { ClinicService, Doctor, Faq, Review } from "@/lib/clinic-data-types";
import { clinic, clinicPhotos } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/**
 * Splits a figure such as "1,000+" into the number to count to and the suffix
 * to keep beside it. Anything that is not a plain countable figure (a date, a
 * price range, a place) returns null and is rendered as written.
 */
function countable(value: string) {
  const match = value.match(/^([\d,]+)(\s*[+%]?)$/);
  if (!match) return null;
  const to = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(to) ? { to, suffix: match[2].trim() } : null;
}

/** A figure that counts up when it scrolls into view. */
function Figure({ value }: { value: string }) {
  const figure = countable(value);
  if (!figure) return <>{value}</>;
  return (
    <span data-count-to={figure.to} data-count-suffix={figure.suffix}>
      {value}
    </span>
  );
}

/* ------------------------------------------------------------------ headings */

/** The reference's section intro: rule-led label, 40px title, lede. */
export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" sets white type for intros that sit on a dark band. */
  tone?: "dark" | "light";
  action?: ReactNode;
  className?: string;
}) {
  const invert = tone === "light" ? "tone-light" : undefined;

  if (align === "center") {
    return (
      <div className={cn("sec-intro text-center", invert, className)}>
        {eyebrow && (
          <span className="sub-title" data-reveal>
            {eyebrow}
          </span>
        )}
        <h2 className="section-title" data-split>
          {title}
        </h2>
        {description && (
          <p className="section-lede mx-auto max-w-[68ch]" data-reveal>
            {description}
          </p>
        )}
        {action && (
          <div className="mt-8" data-reveal>
            {action}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-[60px] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        invert,
        className,
      )}
    >
      <div className="max-w-[720px]">
        {eyebrow && (
          <span className="sub-title" data-reveal>
            {eyebrow}
          </span>
        )}
        <h2 className="section-title" data-split>
          {title}
        </h2>
        {description && (
          <p className="section-lede max-w-[68ch]" data-reveal>
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0" data-reveal>
          {action}
        </div>
      )}
    </div>
  );
}

/** Kept for the terse page markup: page gutters plus an optional label. */
export function Sheet({ label, children, className }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("page-shell", className)}>
      {label && <span className="sub-title mb-6">{label}</span>}
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------- hero */

/**
 * The page banner. Every page opens on a photograph under a pine wash so the
 * white pill navigation that floats over it stays legible.
 */
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
    <section
      className="band-photo band-photo-hero band-tail relative pt-[210px] pb-16 lg:pt-[260px] lg:pb-[110px]"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      data-parallax
    >
      <div className="page-shell">
        <div className="max-w-[770px]">
          <span className="sub-title text-white" data-hero>
            {eyebrow}
          </span>
          <h1 className="my-[25px] text-white" data-hero>
            {title}
          </h1>
          <p className="mb-10 max-w-[62ch] text-[1rem] leading-[26px] text-white" data-hero>
            {description}
          </p>
          {actions && (
            <div className="flex flex-wrap gap-4" data-hero>
              {actions}
            </div>
          )}
        </div>

        {highlights && (
          <dl className="mt-12 grid gap-px overflow-hidden rounded-panel border border-white/20 bg-white/20 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="bg-ink/60 px-6 py-5 backdrop-blur" data-reveal>
                <dd className="font-display text-[1.75rem] font-semibold leading-tight text-white">
                  <Figure value={item.value} />
                </dd>
                <dt className="mt-1.5 text-[0.9rem] leading-snug text-light">{item.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ actions */

export function ActionLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  className?: string;
}) {
  const classNames = {
    primary: "action-primary",
    secondary: "action-secondary",
    dark: "action-dark",
    ghost: "action-ghost",
  } as const;

  return (
    <Link to={to} className={cn(classNames[variant], className)}>
      {children}
    </Link>
  );
}

/* ----------------------------------------------------------------- services */

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
    <article className="surface-card surface-hover flex h-full flex-col p-5" data-reveal>
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between gap-4 border-b border-hairline pb-6">
          <h3 className="text-[1.375rem] leading-tight">
            <Link to={`/services/${service.slug}`} className="transition hover:text-teal">
              {service.name}
            </Link>
          </h3>
          <span className="grid size-14 shrink-0 place-items-center rounded-[5px] bg-shade text-ink">
            <Icon className="size-6" aria-hidden="true" />
          </span>
        </div>
        <p className="body-text pb-6">{service.short}</p>
      </div>
      <figure className="mt-auto overflow-hidden rounded-[15px]">
        <img
          src={service.image}
          alt={service.name}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          width={520}
          height={390}
        />
      </figure>
    </article>
  );
}

/* --------------------------------------------------------------------- team */

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [specialty, experience] = doctor.qualification.split(" · ");
  return (
    <article className="card-tile surface-hover flex h-full flex-col p-6 sm:p-[35px]" data-reveal>
      <div className="flex items-start justify-between gap-5">
        <Link
          to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-hairline text-ink transition hover:border-teal hover:bg-teal hover:text-white"
          aria-label={`Request an appointment with ${doctor.name}`}
        >
          <Phone className="size-5" aria-hidden="true" />
        </Link>
        <a href="#team" className="w-[46%] overflow-hidden rounded-[20px]">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="aspect-[3/4] w-full object-cover object-top"
            loading="lazy"
            width={340}
            height={453}
          />
        </a>
      </div>
      <div className="mt-5">
        <h3 className="text-[1.25rem]">
          <Link to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`} className="transition hover:text-teal">
            {doctor.name}
          </Link>
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[1rem] text-body">
          <span>{specialty}</span>
          {experience && (
            <span className="border-l border-hairline pl-3 text-teal">{experience}</span>
          )}
        </div>
        <p className="body-text mt-4">{doctor.bio}</p>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- testimony */

export function ReviewCard({ review, align = "center" }: { review: Review; align?: "center" | "left" }) {
  return (
    <figure className={align === "center" ? "text-center" : "text-left"}>
      <div
        className={cn("flex gap-1.5", align === "center" ? "justify-center" : "justify-start")}
        aria-label="Five out of five"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <Star key={index} className="size-5 fill-teal-bright text-teal-bright" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mx-auto mt-8 max-w-[62ch] text-[1.25rem] leading-[1.6] text-mute">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8">
        <h3 className="text-[1.875rem] text-white">{review.name}</h3>
        <span className="mt-2 block text-[1rem] text-mute">{review.detail}</span>
      </figcaption>
    </figure>
  );
}

/** Single-slide carousel: one quote at a time, as in the reference's dark band. */
export function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const current = reviews[index];
  const go = (next: number) => setIndex((next + reviews.length) % reviews.length);

  return (
    <div className="mx-auto max-w-[900px]" data-reveal>
      <div aria-live="polite">
        <ReviewCard review={current} />
      </div>

      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition hover:border-teal hover:bg-teal"
          aria-label="Previous review"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          {reviews.map((review, dot) => (
            <button
              key={review.quote}
              type="button"
              onClick={() => setIndex(dot)}
              aria-label={`Show review ${dot + 1}`}
              aria-current={dot === index}
              className={cn(
                "size-2.5 cursor-pointer rounded-full transition",
                dot === index ? "w-7 bg-teal" : "bg-white/35 hover:bg-white/60",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition hover:border-teal hover:bg-teal"
          aria-label="Next review"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- faq */

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div>
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className="group border-b border-hairline pb-[22px] last:border-b-0"
          data-reveal
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 pt-[22px] marker:content-none">
            <span className="font-display text-[1.125rem] font-semibold leading-[1.4] text-ink transition group-hover:text-teal">
              {faq.question}
            </span>
            <span
              className="grid size-12 shrink-0 place-items-center rounded-full bg-pine text-white transition group-hover:bg-teal"
              aria-hidden="true"
            >
              <ChevronDown className="size-5 transition-transform duration-300 group-open:rotate-180" />
            </span>
          </summary>
          <p className="body-text max-w-[68ch] pb-1 pr-16">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- blocks */

/** Centred figures over the reference's 63px rule. */
export function StatRow({ stats }: { stats: { value: string; label: string; note: string }[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center" data-reveal>
          <h3 className="text-[1.875rem] lg:text-[2.25rem]">
            <Figure value={stat.value} />
          </h3>
          <h4 className="mt-2 text-[1.25rem]">{stat.label}</h4>
          <span className="rule-tick mx-auto mt-4 mb-5" aria-hidden="true" />
          <p className="body-text mx-auto max-w-[34ch] text-[0.95rem]">{stat.note}</p>
        </div>
      ))}
    </div>
  );
}

/** Four steps inside a grey panel, each closing on its number. */
export function ProcessSteps({ steps }: { steps: { title: string; text: string; icon: typeof Anchor }[] }) {
  return (
    <div className="grid gap-10 rounded-panel bg-mist px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10 lg:py-[60px]">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          /* The icon and the position it holds sit on one line, so the title and
             its text read without an interruption between them. */
          <div key={step.title} className="text-center" data-reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="grid size-14 place-items-center rounded-full bg-shade text-ink">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="font-display text-[1rem] font-semibold text-teal-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-[1.125rem]">{step.title}</h3>
            <p className="body-text mt-3">{step.text}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Dark card used for the two treatment stories on the photographic band. */
export function StoryCard({
  image,
  eyebrow,
  title,
  text,
  points,
  to,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  to: string;
}) {
  return (
    <article
      className="flex h-full flex-col gap-7 rounded-tile bg-ink p-5 sm:flex-row sm:items-stretch"
      data-reveal
    >
      {/* The photograph runs the full height of the card rather than floating
          in the middle of a column of text. */}
      <figure className="overflow-hidden rounded-[20px] sm:w-[45%] sm:shrink-0">
        <img
          src={image}
          alt={title}
          className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full"
          loading="lazy"
          width={420}
          height={315}
        />
      </figure>
      <div>
        <span className="text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-teal-bright">{eyebrow}</span>
        <h3 className="mt-3 text-[1.375rem] text-white">{title}</h3>
        <p className="mt-3 text-[1rem] leading-[26px] text-mute">{text}</p>
        <ul className="mt-5 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex gap-2.5 text-[0.95rem] leading-[1.6] text-light">
              <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <Link to={to} className="action-ghost mt-5">
          Read the treatment note
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** The template's sage logo strip, carrying the clinic's own credentials. */
export function TrustStrip({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-5">
      {items.map((item) => (
        <p
          key={item}
          className="text-center font-display text-[1.05rem] font-semibold text-ink/70 transition hover:text-ink"
          data-reveal
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export function BlogCard({
  post,
}: {
  post: { slug: string; title: string; category: string; date: string; image?: string };
}) {
  return (
    <article className="card-blog flex h-full flex-col py-[30px] pl-[30px]" data-reveal>
      {post.image && (
        <Link to={`/blog/${post.slug}`} className="mb-[30px] block overflow-hidden rounded-l-[28px]">
          <img
            src={post.image}
            alt={post.title}
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
            width={420}
            height={263}
          />
        </Link>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pr-[30px]">
        <span className="rounded-[20px] bg-teal px-4 py-0.5 text-[0.875rem] font-semibold text-white">
          {post.category}
        </span>
        <span className="text-[0.875rem] text-body">{post.date}</span>
      </div>
      <h3 className="mt-5 pr-[30px] text-[1.375rem] leading-[1.3]">
        <Link to={`/blog/${post.slug}`} className="transition hover:text-teal">
          {post.title}
        </Link>
      </h3>
      <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-3 pt-7 text-[1rem] font-semibold">
        Read the article
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M16 5.3H0v1.4h16z" fill="#33A9B1" />
          <path d="M15.3 6.7c-3.2 0-5.9-2.9-5.9-6V0h1.4v.7c0 2.35 2.05 4.6 4.5 4.6H16v1.4z" fill="#33A9B1" />
          <path d="M15.3 5.3c-3.2 0-5.9 2.9-5.9 6V12h1.4v-.7c0-2.35 2.05-4.6 4.5-4.6H16V5.3z" fill="#33A9B1" />
        </svg>
      </Link>
    </article>
  );
}

/**
 * The "why choose us" panel: a vertical pill nav beside a bordered card whose
 * content swaps. The reference drives it from tabs, so the markup is real
 * buttons plus a labelled panel rather than a scripted carousel.
 */
export function ChoiceTabs({
  tabs,
}: {
  tabs: {
    label: string;
    icon: typeof Anchor;
    title: string;
    text: string;
    image: string;
    points: string[];
  }[];
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const panelId = `strength-panel-${uid}`;
  const tab = tabs[active];

  /*
   * The rail is a row on phones and a column from lg up, so the orientation
   * announced to assistive technology has to follow the layout rather than
   * stay fixed at the markup default.
   */
  const [vertical, setVertical] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setVertical(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  /* Moving the roving focus with the arrow keys also brings the tab into
     view inside the scrolling rail on a phone. */
  const selectTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    const node = tabRefs.current[next];
    node?.focus({ preventScroll: true });
    node?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = vertical ? "ArrowDown" : "ArrowRight";
    const back = vertical ? "ArrowUp" : "ArrowLeft";
    if (event.key === forward) {
      event.preventDefault();
      selectTab(index + 1);
    } else if (event.key === back) {
      event.preventDefault();
      selectTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(tabs.length - 1);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.75fr)] lg:gap-10">
      <div
        className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible"
        role="tablist"
        aria-label="Clinic strengths"
        aria-orientation={vertical ? "vertical" : "horizontal"}
      >
        {tabs.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === active;
          return (
            <button
              key={item.label}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`strength-tab-${uid}-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "flex min-h-[56px] shrink-0 cursor-pointer items-center gap-3 rounded-[20px] py-3 pl-[18px] pr-4 text-left font-display text-[1.125rem] font-semibold transition",
                isActive ? "bg-ink text-white" : "bg-mist text-ink hover:bg-light",
              )}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full",
                  isActive ? "bg-white text-ink" : "bg-ink/10 text-ink",
                )}
                aria-hidden="true"
              >
                <Icon className="size-5" />
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`strength-tab-${uid}-${active}`}
        tabIndex={0}
        className="flex flex-col gap-7 rounded-panel border border-hairline p-5 lg:flex-row lg:items-center lg:p-[25px]"
        data-reveal
      >
        <figure className="overflow-hidden rounded-[20px] lg:w-[42%] lg:shrink-0">
          <img
            src={tab.image}
            alt={tab.title}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
            width={440}
            height={330}
          />
        </figure>
        <div>
          <h3 className="text-[1.875rem]">{tab.title}</h3>
          <p className="body-text mt-4">{tab.text}</p>
          <ul className="ct-list mt-6">
            {tab.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** The sage CTA shelf that closes a page. */
export function CtaBand({
  eyebrow = "Book a visit",
  title = "We can help you maintain a radiant smile.",
  text = "Call the clinic or send a request. Reception confirms your date, time and treatment before you arrive, and treatment only begins after an examination.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="band band-tuck band-shade pt-[140px] pb-[70px] lg:pt-[175px]">
      <div className="page-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-14">
          <img
            src={clinicPhotos[4]}
            alt=""
            className="hidden size-[120px] rounded-full border-4 border-white object-cover object-top lg:block"
            aria-hidden="true"
            loading="lazy"
            width={120}
            height={120}
            data-reveal
          />
          <div className="text-center lg:text-left">
            <span className="sub-title" data-reveal>
              {eyebrow}
            </span>
            <h2 className="section-title mb-0" data-split>
              {title}
            </h2>
            <p className="body-text mt-4 max-w-[60ch]" data-reveal>
              {text}
            </p>
          </div>
          <div className="grid justify-items-center gap-3 lg:justify-items-end" data-reveal>
            <a href={clinic.phoneHref} className="action-dark">
              Call {clinic.phone}
            </a>
            <ActionLink to="/appointment" variant="secondary">
              Make Appointment
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
