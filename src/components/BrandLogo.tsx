import { cn } from "@/lib/utils";

export function BrandLogo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-3 align-middle", className)} aria-label="Dental Cure Clinic">
      <span className={cn("grid size-11 place-items-center rounded-2xl", light ? "bg-white/12" : "bg-primary")}>
        <svg viewBox="0 0 48 48" className="size-7" aria-hidden="true">
          <path d="M13 8c-4 4-5 10-3 15 1 3 1 5 2 9 1 5 3 8 6 8 3 0 3-8 5-11 2 3 2 11 5 11 3 0 5-3 6-8 1-4 1-6 2-9 2-5 1-11-3-15-4-4-12-5-20 0Z" fill={light ? "#fff" : "#fff"} />
          <path d="M34 10c-4-3-9-2-11 1 4 0 6 2 7 5 1-4 3-5 6-4-1-1-1-2-2-2Z" fill="#5eead4" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={cn("block font-display text-lg font-extrabold", light ? "text-white" : "text-foreground")}>Dental Cure</span>
        <span className={cn("mt-1 block text-[10px] font-bold uppercase tracking-[0.22em]", light ? "text-white/65" : "text-primary/75")}>Clinic</span>
      </span>
    </span>
  );
}
