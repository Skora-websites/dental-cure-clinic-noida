import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, CalendarCheck, Clock3, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import PageMotion from "@/components/PageMotion";
import { clinic } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

const navItems = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Dentists", "/dentists"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Blog", "/blog"],
  ["FAQs", "/faqs"],
  ["Contact", "/contact"],
];

const footerLinks = [...navItems, ["Offers", "/offers"], ["Appointment", "/appointment"]];

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Dental Cure Clinic`;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
  return null;
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <PageMotion>
      <div className="site-shell min-h-screen overflow-x-hidden">
        <div className="bg-brand-deep px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/92 sm:text-xs">
          <span className="inline-flex items-center justify-center gap-2">
            <Clock3 className="size-3.5 shrink-0 text-brand-mint" aria-hidden="true" />
            Call to confirm current appointment times
          </span>
        </div>

        <header className="sticky top-0 z-50 border-b border-brand-teal/10 bg-brand-ivory/92 shadow-[0_18px_45px_-38px_rgba(15,63,60,0.55)] backdrop-blur-xl backdrop-saturate-150">
          <div className="page-shell flex h-[74px] items-center gap-2 sm:gap-3">
            <Link to="/" aria-label="Dental Cure Clinic home" className="shrink-0">
              <BrandLogo />
            </Link>

            <nav className="ml-auto hidden items-center gap-6 pr-3 lg:flex xl:gap-7" aria-label="Main navigation">
              {navItems.map(([label, href]) => (
                <NavLink
                  key={href}
                  to={href}
                  className={({ isActive }) =>
                    cn(
                      "relative py-2 text-sm font-semibold tracking-[-0.01em] text-foreground/70 transition-colors hover:text-brand-teal",
                      isActive && "text-brand-teal after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-brand-teal",
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center justify-end gap-1 sm:gap-2 lg:ml-0">
              <a href={clinic.phoneHref} className="action-quiet" aria-label={`Call the clinic at ${clinic.phone}`}>
                <Phone className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Call</span>
              </a>
              <Link to="/appointment" className="action-primary px-3.5 sm:px-5" aria-label="Book an appointment">
                <CalendarCheck className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Book appointment</span>
              </Link>
              <button
                type="button"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-teal/15 bg-white/85 text-brand-deep transition hover:border-brand-teal/40 sm:size-11 lg:hidden"
                onClick={() => setOpen((value) => !value)}
                aria-label="Toggle navigation menu"
                aria-expanded={open}
              >
                {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="max-h-[calc(100vh-118px)] overflow-y-auto border-t border-brand-teal/10 bg-white/95 px-4 py-5 shadow-[0_28px_50px_-34px_rgba(15,63,60,0.45)] lg:hidden">
              <nav className="grid grid-cols-2 gap-2.5 sm:grid-cols-3" aria-label="Mobile navigation">
                {footerLinks.map(([label, href]) => (
                  <Link key={href} to={href} className="rounded-2xl border border-border bg-brand-ivory px-4 py-3.5 text-sm font-semibold text-brand-deep transition hover:border-brand-teal/35 hover:bg-white">
                    {label}
                  </Link>
                ))}
              </nav>
              <a href={clinic.phoneHref} className="action-secondary mt-4 w-full">
                <Phone className="size-4" /> Call the clinic
              </a>
            </div>
          )}
        </header>

        <main>{children}</main>

        <footer className="bg-brand-deep text-white">
          <div className="page-shell grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_1fr]">
            <div>
              <BrandLogo light />
              <p className="mt-6 max-w-sm text-[0.98rem] leading-7 text-white/72">
                Dental Cure Clinic in Noida, led by Dr. Gurpreet Singh and Dr. Manpreet Kaur. Treatments begin with
                examination, digital X-ray where needed, and a conversation about what is actually required.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={clinic.phoneHref} className="action-primary bg-brand-mint px-5 text-brand-deep hover:bg-white">
                  <Phone className="size-4" /> Call clinic
                </a>
                <Link to="/appointment" className="action-secondary border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-deep">
                  Book appointment
                </Link>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-white">Clinic pages</h2>
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/72 sm:gap-x-8">
                {footerLinks.map(([label, href]) => (
                  <Link key={href} to={href} className="transition hover:text-brand-mint">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-7">
              <div>
                <h2 className="font-display text-xl font-semibold text-white">Visit</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-white/72">
                  <p className="flex gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                    <span className="break-words">{clinic.address}</span>
                  </p>
                  <p className="flex gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                    <span className="break-words">{clinic.secondaryAddress}</span>
                  </p>
                </div>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-white">Contact</h2>
                <div className="mt-4 space-y-3 text-sm">
                  <a href={clinic.phoneHref} className="flex items-center gap-3 text-white/78 transition hover:text-white">
                    <Phone className="size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                    {clinic.phone}
                  </a>
                  <a href={clinic.secondaryPhoneHref} className="flex items-center gap-3 text-white/78 transition hover:text-white">
                    <Phone className="size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                    {clinic.secondaryPhone}
                  </a>
                  <a href={`mailto:${clinic.email}`} className="flex min-w-0 items-center gap-3 text-white/78 transition hover:text-white">
                    <Mail className="size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                    <span className="break-all">{clinic.email}</span>
                  </a>
                  <a href={`mailto:${clinic.secondaryEmail}`} className="flex min-w-0 items-center gap-3 text-white/78 transition hover:text-white">
                    <Mail className="size-4 shrink-0 text-brand-mint" aria-hidden="true" />
                    <span className="break-all">{clinic.secondaryEmail}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="page-shell flex flex-col gap-4 py-6 text-xs text-white/62 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Dental Cure Clinic. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link to="/privacy-policy" className="transition hover:text-white">
                  Privacy
                </Link>
                <Link to="/terms" className="transition hover:text-white">
                  Terms
                </Link>
                <a href={clinic.maps} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  Directions
                </a>
              </div>
            </div>
          </div>
        </footer>

        <a
          href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to ask about an appointment at Dental Cure Clinic.")}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-3 z-50 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-14px_rgba(37,211,102,0.65)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:size-14"
          aria-label="Chat with Dental Cure Clinic on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true">
            <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.34 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01A9.9 9.9 0 0 0 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.18 8.18 0 0 1-1.26-4.4 8.2 8.2 0 0 1 8.22-8.2 8.2 8.2 0 0 1 8.21 8.2 8.2 8.2 0 0 1-8.21 8.24Zm4.5-6.14c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.86-.87 2.08s.89 2.42 1.02 2.58c.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
          </svg>
        </a>
      </div>
    </PageMotion>
  );
}
