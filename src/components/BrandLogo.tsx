import { cn } from "@/lib/utils";

export function BrandLogo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-2.5 align-middle sm:gap-3", className)} aria-label="Dental Cure Clinic">
      <span
        className={cn(
          "grid size-10 place-items-center rounded-2xl border sm:size-11",
          light ? "border-white/25 bg-white/10" : "border-brand-teal/10 bg-brand-teal",
        )}
      >
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <path
            d="M10 6.5c3.2-1.6 8.8-1.6 12 0 2 .9 2.4 3.5 2 6.1-.3 2-.7 3.4-.9 5.5-.2 2.6-.9 4.4-2.6 4.4-1.6 0-1.8-2.5-3.1-5.1-1.5-3-4.4-3-5.9 0-1.3 2.6-1.5 5.1-3.1 5.1-1.7 0-2.4-1.8-2.6-4.4-.2-2.1-.6-3.5-.9-5.5-.4-2.6 0-5.2 2-6.1Z"
            fill={light ? "#FFFFFF" : "#FFFFFF"}
          />
          <path d="M22 9.5c-2.4-1.2-4.9-.2-5.6 1.6.4 1.9 1.9 3 3.9 3.2 1.3.1 2.3-.4 2.8-1.3-.4-1.3-.7-2.4-1.1-3.5Z" fill="#7EE2D3" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={cn("block font-display text-[1.08rem] font-semibold tracking-[-0.035em] sm:text-[1.15rem]", light ? "text-white" : "text-brand-ink")}>
          Dental Cure
        </span>
        <span className={cn("mt-1 block text-[9px] font-bold uppercase tracking-[0.26em]", light ? "text-white/65" : "text-brand-teal/75")}>Noida</span>
      </span>
    </span>
  );
}
