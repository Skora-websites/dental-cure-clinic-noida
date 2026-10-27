import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Clock3, Instagram, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import PageMotion from "@/components/PageMotion";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

const navItems = [
  ["About", "/about"], ["Services", "/services"], ["Dentists", "/dentists"], ["Offers", "/offers"],
  ["Gallery", "/gallery"], ["Reviews", "/reviews"], ["Blog", "/blog"], ["FAQs", "/faqs"],
];

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Dental Cure Clinic`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
  }, [title, description]);
  return null;
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <PageMotion>
      <div className="bg-[#123f3a] px-3 py-2.5 text-center text-[11px] font-medium leading-4 text-white/90 sm:text-xs">
        <span className="inline-flex items-center justify-center gap-2"><Clock3 className="size-3.5 shrink-0" /> <span>Open today until 8:00 PM · Same-week requests available</span></span>
      </div>
      <header className="sticky top-0 z-50 border-b border-white/60 bg-[#fffdf8]/75 shadow-[0_8px_30px_-22px_rgba(15,118,110,0.5)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="page-container flex h-[72px] items-center justify-between gap-3 sm:h-[76px]">
          <Link to="/" aria-label="Dental Cure Clinic home" className="shrink-0"><BrandLogo /></Link>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <NavLink key={href} to={href} className={({ isActive }) => cn("text-sm font-semibold transition-colors hover:text-primary", isActive ? "text-primary" : "text-foreground/75")}>{label}</NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 sm:flex">
            <Button asChild variant="ghost" size="icon" aria-label="Call clinic"><a href={clinic.phoneHref}><Phone className="size-4" /></a></Button>
            <Button asChild className="rounded-full bg-primary px-4 hover:bg-[#0b625c] sm:px-5"><Link to="/appointment">Book <span className="hidden sm:inline">appointment</span> <ArrowRight className="ml-1 size-4 sm:ml-2" /></Link></Button>
          </div>
          <button className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <div className="max-h-[calc(100vh-104px)] overflow-y-auto border-t border-white/60 bg-white/80 px-4 py-5 shadow-xl backdrop-blur-2xl xl:hidden">
            <nav className="grid grid-cols-2 gap-2" aria-label="Mobile navigation">
              {navItems.map(([label, href]) => <Link key={href} to={href} className="rounded-xl bg-muted px-3 py-3 text-center text-sm font-semibold">{label}</Link>)}
              <Link to="/contact" className="rounded-xl bg-muted px-3 py-3 text-center text-sm font-semibold">Contact</Link>
              <Link to="/appointment" className="col-span-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white">Book appointment</Link>
            </nav>
          </div>
        )}
      </header>

      <main className="pb-20 sm:pb-0">{children}</main>

      <footer className="bg-[#123f3a] text-white">
        <div className="page-container grid gap-10 py-14 sm:py-16 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div>
            <BrandLogo light />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">A calm, modern dental clinic focused on comfortable care and long-term oral health.</p>
            <p className="mt-5 inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/65">Demo clinic details · ready to replace</p>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">Explore</h3>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/65">
              {navItems.map(([label, href]) => <Link key={href} to={href} className="hover:text-white">{label}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">Visit the clinic</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-white/65">
              <p className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-[#5eead4]" /> <span className="break-words">{clinic.address}</span></p>
              {clinic.hours.map(([day, time]) => <p key={day} className="flex flex-col gap-0.5 border-b border-white/10 pb-2 sm:flex-row sm:justify-between sm:gap-4"><span>{day}</span><span className="sm:text-right">{time}</span></p>)}
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">Get in touch</h3>
            <div className="mt-5 space-y-3 text-sm">
              <a href={clinic.phoneHref} className="flex items-center gap-3 text-white/70 hover:text-white"><Phone className="size-4 text-[#5eead4]" /> {clinic.phone}</a>
              <a href={`mailto:${clinic.email}`} className="flex min-w-0 items-center gap-3 text-white/70 hover:text-white"><Mail className="size-4 shrink-0 text-[#5eead4]" /> <span className="break-all">{clinic.email}</span></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white"><Instagram className="size-4 text-[#5eead4]" /> Instagram</a>
            </div>
            <Button asChild variant="outline" className="mt-6 rounded-full border-white/25 bg-transparent text-white hover:bg-white hover:text-[#123f3a]"><Link to="/contact">Contact the clinic <ArrowRight className="ml-2 size-4" /></Link></Button>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="page-container flex flex-col gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Dental Cure Clinic. All rights reserved.</p>
            <div className="flex gap-5"><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/contact">Contact</Link></div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/70 bg-white/75 px-3 py-2.5 shadow-[0_-10px_30px_-18px_rgba(15,118,110,0.5)] backdrop-blur-2xl backdrop-saturate-150 sm:hidden">
        <a href={clinic.phoneHref} className="flex h-11 items-center justify-center gap-2 rounded-full border border-primary/25 bg-white text-sm font-bold text-primary"><Phone className="size-4" /> Call clinic</a>
        <Link to="/appointment" className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-white">Book appointment <ArrowRight className="size-4" /></Link>
      </div>

      <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to enquire about an appointment at Dental Cure Clinic.")}`} target="_blank" rel="noreferrer" className="fixed bottom-[4.75rem] right-3 z-50 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)] transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-5 sm:right-6 sm:size-14" aria-label="Chat with Dental Cure Clinic on WhatsApp">
        <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true"><path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.45 1.34 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01A9.9 9.9 0 0 0 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.18 8.18 0 0 1-1.26-4.4 8.2 8.2 0 0 1 8.22-8.2 8.2 8.2 0 0 1 8.21 8.2 8.2 8.2 0 0 1-8.21 8.24Zm4.5-6.14c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.86-.87 2.08s.89 2.42 1.02 2.58c.12.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" /></svg>
      </a>
    </PageMotion>
  );
}
