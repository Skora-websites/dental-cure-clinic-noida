import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUp,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import PageMotion from "@/components/PageMotion";
import { clinic } from "@/lib/clinic-data";
import { scrollToTop } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Dentists", "/dentists"],
  ["Gallery", "/gallery"],
  ["Reviews", "/reviews"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const menuItems = [...navItems, ["FAQs", "/faqs"], ["Offers", "/offers"], ["Request appointment", "/appointment"]];

const clinicLinks = [
  ["About the clinic", "/about"],
  ["Services", "/services"],
  ["Our dentists", "/dentists"],
  ["Gallery", "/gallery"],
];

const patientLinks = [
  ["Patient feedback", "/reviews"],
  ["Journal", "/blog"],
  ["FAQs", "/faqs"],
  ["Offers", "/offers"],
];

export function PageMeta({ title, description }: { title: string; description: string }) {
  const location = useLocation();
  const canonicalUrl = `https://dentalcureclinics.com${location.pathname}`;

  useEffect(() => {
    document.title = `${title} | Dental Cure Clinic`;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  }, [title, description, canonicalUrl]);

  return null;
}

/**
 * The ring that follows the reader down the page, as the template has: the
 * stroke around it fills to the page's scroll position and it doubles as the
 * way back to the top. It sits above the WhatsApp button rather than over it.
 */
const RING_RADIUS = 48;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function ScrollProgress() {
  const ring = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const path = ring.current;
    if (!path) return undefined;

    /*
     * The circumference is arithmetic, not a measurement. The ring lives in a
     * button that is hidden below md, and `getTotalLength()` throws on an
     * unrendered element — measuring it would crash the page on every phone.
     */
    path.style.strokeDasharray = `${RING_LENGTH}`;

    const onScroll = () => {
      const travelled = window.scrollY;
      const remaining = document.documentElement.scrollHeight - window.innerHeight;
      const progress = remaining > 0 ? Math.min(travelled / remaining, 1) : 0;
      path.style.strokeDashoffset = `${RING_LENGTH * (1 - progress)}`;
      setVisible(travelled > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to the top of the page"
      className={cn(
        "fixed bottom-[92px] right-6 z-50 hidden size-[50px] cursor-pointer place-items-center rounded-full bg-ink text-white shadow-lift transition-opacity duration-300 hover:bg-teal md:grid",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <svg viewBox="-1 -1 102 102" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
        <circle
          ref={ring}
          cx="50"
          cy="50"
          r={RING_RADIUS}
          fill="none"
          stroke="#33A9B1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="relative size-5" aria-hidden="true" />
    </button>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /*
   * The mobile menu is a disclosure: Escape closes it and hands focus back to
   * the button that opened it, so a keyboard user is never stranded inside the
   * panel. A click outside the header closes it too.
   */
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (menuPanelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <PageMotion>
      <div className="min-h-screen bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>

        {/* Header sits over the page banner: a pine facts strip and a white pill nav. */}
        <header className="relative z-[9]">
          <div className="bg-pine">
            <div className="nav-shell flex flex-wrap items-center justify-center gap-x-8 gap-y-1 py-2 sm:justify-between">
              <p className="flex min-h-9 items-center gap-2.5 text-[0.88rem] text-white">
                <MapPin className="size-4 shrink-0 text-teal" aria-hidden="true" />
                {clinic.address}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
                <p className="hidden min-h-9 items-center gap-2.5 text-[0.88rem] text-white md:flex">
                  <Clock3 className="size-4 shrink-0 text-teal" aria-hidden="true" />
                  Mon – Sat, call to confirm current hours
                </p>
                <a
                  href={clinic.phoneHref}
                  className="flex min-h-11 items-center gap-2.5 text-[0.88rem] font-semibold text-white transition hover:text-light"
                >
                  <Phone className="size-4 shrink-0 text-teal" aria-hidden="true" />
                  {clinic.phone}
                </a>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "left-0 right-0 z-[9] transition-[top] duration-300",
              floating ? "fixed top-3" : "absolute top-[70px]",
            )}
          >
            <div className="nav-shell">
              <div className="rounded-pill bg-white shadow-[0_18px_45px_-24px_rgba(5,12,20,0.45)]">
                <div className="flex h-[76px] items-center gap-3 pl-4 pr-2.5 lg:h-[90px] lg:pl-[30px] lg:pr-[15px]">
                  <Link to="/" aria-label="Dental Cure Clinic home" className="flex min-h-11 shrink-0 items-center">
                    <BrandLogo compact />
                  </Link>

                  <nav className="ml-auto hidden items-center lg:flex" aria-label="Main navigation">
                    {navItems.map(([label, href]) => (
                      <NavLink
                        key={href}
                        to={href}
                        end={href === "/"}
                        className={({ isActive }) =>
                          cn(
                            "relative px-2 py-6 text-[0.92rem] font-semibold capitalize text-ink transition hover:text-teal xl:px-3 xl:text-[1.05rem]",
                            /* The rule under the current page means the state
                               does not rest on colour alone. */
                            isActive &&
                              "text-teal after:absolute after:inset-x-2 after:bottom-[22px] after:h-0.5 after:rounded-full after:bg-teal xl:after:inset-x-3",
                          )
                        }
                      >
                        {label}
                      </NavLink>
                    ))}
                  </nav>

                  <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
                    {/* The header phone repeats the strip above it, so it only
                        joins the bar once there is room for everything. */}
                    <a
                      href={clinic.phoneHref}
                      className="action-quiet hidden 2xl:inline-flex"
                      aria-label={`Call the clinic at ${clinic.phone}`}
                    >
                      <Phone className="size-4" aria-hidden="true" />
                      {clinic.phone}
                    </a>
                    {/* `.nav-cta` sheds its arrow badge and its long label
                        between 1024 and 1279, where the full pill would push
                        the navigation past the window edge. */}
                    <Link
                      to="/appointment"
                      className="action-primary nav-cta hidden !min-h-[50px] text-[0.92rem] sm:inline-flex"
                      aria-label="Make an appointment"
                    >
                      <span className="xl:hidden">Appointment</span>
                      <span className="hidden xl:inline">Make Appointment</span>
                    </Link>
                    <button
                      ref={menuButtonRef}
                      type="button"
                      className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full text-ink transition hover:bg-light lg:hidden"
                      onClick={() => setOpen((value) => !value)}
                      aria-label="Navigation menu"
                      aria-expanded={open}
                      aria-controls="mobile-menu"
                    >
                      {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
                    </button>
                  </div>
                </div>

                {open && (
                  <div id="mobile-menu" ref={menuPanelRef} className="border-t border-hairline lg:hidden">
                    <nav className="max-h-[60vh] overflow-y-auto px-5 py-2" aria-label="Mobile navigation">
                      {menuItems.map(([label, href]) => (
                        <NavLink
                          key={href}
                          to={href}
                          end={href === "/"}
                          className={({ isActive }) =>
                            cn(
                              "flex min-h-[54px] items-center border-b border-hairline text-[1rem] font-medium text-ink transition last:border-b-0",
                              isActive && "font-semibold text-teal",
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {/* The dot marks the page you are on without
                                  shifting the other labels. */}
                              <span
                                className={cn(
                                  "mr-3 size-2 shrink-0 rounded-full bg-teal transition-opacity",
                                  isActive ? "opacity-100" : "opacity-0",
                                )}
                                aria-hidden="true"
                              />
                              {label}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </nav>
                    <div className="grid gap-2 px-5 pb-5 pt-3 sm:grid-cols-2">
                      <a href={clinic.phoneHref} className="action-secondary w-full !pl-5">
                        <Phone className="size-4" aria-hidden="true" /> Call {clinic.phone}
                      </a>
                      <Link to="/appointment" className="action-primary w-full">
                        Make Appointment
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main id="main-content">{children}</main>

        <footer className="relative bg-white pb-24 text-body md:pb-0">
          <div className="page-shell pt-16 lg:pt-[120px]">
            {/* Contact strip: three facts separated by hairline rules. */}
            <div className="flex flex-col gap-8 border-b border-hairline pb-10 sm:flex-row sm:items-center sm:justify-between lg:pb-[50px]">
              <div className="flex items-center gap-4 sm:max-w-[30%]">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-pine text-white">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[0.85rem]">Write to the clinic</span>
                  {/* The address is wrapped rather than clipped: a truncated
                      email cannot be read or copied on a phone. */}
                  <h3 className="mt-1 text-[1.05rem]">
                    <a
                      href={`mailto:${clinic.email}`}
                      className="inline-block min-h-11 break-all py-2 transition hover:text-teal"
                    >
                      {clinic.email}
                    </a>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 border-hairline sm:max-w-[34%] sm:border-l sm:pl-8">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-pine text-white">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[0.85rem]">Visit the clinic</span>
                  <h3 className="mt-1 text-[1.05rem]">{clinic.address}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 border-hairline sm:max-w-[30%] sm:border-l sm:pl-8">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-pine text-white">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="block text-[0.85rem]">Reception</span>
                  <h3 className="mt-1 text-[1.05rem]">
                    <a
                      href={clinic.phoneHref}
                      className="inline-flex min-h-11 items-center transition hover:text-teal"
                    >
                      {clinic.phone}
                    </a>
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid gap-12 border-b border-hairline py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
              <div className="lg:border-r lg:border-hairline">
                <BrandLogo />
                <p className="mt-5 max-w-[42ch] text-[0.98rem] leading-[1.7]">
                  A general and cosmetic dental practice in Noida, led by Dr. Gurpreet Singh and Dr. Manpreet Kaur.
                  Treatment begins with an examination, digital imaging where it is needed, and a conversation about what
                  is actually required.
                </p>
                <dl className="mt-7 max-w-[22rem] space-y-2.5 text-[0.95rem]">
                  {clinic.hours.map(([days, note]) => (
                    <div key={days} className="flex items-baseline justify-between gap-6">
                      <dt>{days}</dt>
                      <dd className="text-right">{note}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="grid gap-12 sm:grid-cols-3">
                <div>
                  <h4 className="text-[1.375rem]">The clinic</h4>
                  <ul className="mt-6 space-y-3.5 text-[0.98rem]">
                    {clinicLinks.map(([label, href]) => (
                      <li key={href}>
                        <Link to={href} className="inline-flex min-h-11 items-center transition hover:text-teal">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[1.375rem]">For patients</h4>
                  <ul className="mt-6 space-y-3.5 text-[0.98rem]">
                    {patientLinks.map(([label, href]) => (
                      <li key={href}>
                        <Link to={href} className="inline-flex min-h-11 items-center transition hover:text-teal">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[1.375rem]">Second clinic</h4>
                  <p className="mt-6 text-[0.98rem] leading-[1.7]">{clinic.secondaryAddress}</p>
                  <div className="mt-5 space-y-3 text-[0.98rem]">
                    <a
                      href={clinic.secondaryPhoneHref}
                      className="flex min-h-11 items-center gap-2.5 transition hover:text-teal"
                    >
                      <Phone className="size-4 shrink-0 text-teal" aria-hidden="true" />
                      {clinic.secondaryPhone}
                    </a>
                    <a
                      href={`mailto:${clinic.secondaryEmail}`}
                      className="flex min-h-11 items-center gap-2.5 break-all transition hover:text-teal"
                    >
                      <Mail className="size-4 shrink-0 text-teal" aria-hidden="true" />
                      {clinic.secondaryEmail}
                    </a>
                  </div>
                  <Link to="/appointment" className="action-primary mt-6 !min-h-[50px] text-[0.92rem]">
                    Book a visit
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="page-shell">
            <div className="flex flex-col gap-3 py-6 text-[0.9rem] sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Dental Cure Clinic. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
                <Link to="/privacy-policy" className="inline-flex min-h-11 items-center transition hover:text-teal">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="inline-flex min-h-11 items-center transition hover:text-teal">
                  Terms and Conditions
                </Link>
                <a
                  href={clinic.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center transition hover:text-teal"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* On a phone, calling is the first thing most patients do. */}
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white px-3 py-2.5 md:hidden">
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to ask about an appointment at Dental Cure Clinic.")}`}
              target="_blank"
              rel="noreferrer"
              className="grid size-12 shrink-0 place-items-center rounded-full border border-hairline text-[#128C4A]"
              aria-label="Message Dental Cure Clinic on WhatsApp"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            {/* No arrow badge here: the pill is half the width of a phone, and a
                46px badge on top of the label pushed it onto a second line. */}
            <a href={clinic.phoneHref} className="action-primary action-compact h-12 min-h-0 flex-1 text-[0.9rem]">
              Call now
            </a>
            <Link to="/appointment" className="action-secondary action-compact h-12 min-h-0 flex-1 text-[0.9rem]">
              Book
            </Link>
          </div>
        </div>

        <ScrollProgress />

        <a
          href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to ask about an appointment at Dental Cure Clinic.")}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 hidden size-14 place-items-center rounded-full bg-[#1FA855] text-white shadow-lift transition hover:bg-[#16833f] md:grid"
          aria-label="Message Dental Cure Clinic on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true">
            <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.34 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01A9.9 9.9 0 0 0 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.18 8.18 0 0 1-1.26-4.4 8.2 8.2 0 0 1 8.22-8.2 8.2 8.2 0 0 1 8.21 8.2 8.2 8.2 0 0 1-8.21 8.24Zm4.5-6.14c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.86-.87 2.08s.89 2.42 1.02 2.58c.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
          </svg>
        </a>
      </div>
    </PageMotion>
  );
}
