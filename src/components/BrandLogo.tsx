import { cn } from "@/lib/utils";

/**
 * Tooth mark plus wordmark. The reference template sets a single tooth glyph
 * beside the practice name, so the mark stays a plain silhouette rather than a
 * badge.
 */
export function BrandLogo({
  light = false,
  className,
  compact = false,
}: {
  light?: boolean;
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-2.5 align-middle", className)}>
      <svg viewBox="0 0 24 24" className="size-8 shrink-0" aria-hidden="true">
        <path
          d="M12 3.2c-2 0-3.1.9-4.7.9-1.4 0-2.5-.5-3.4.6C2.5 6.4 2.7 9.3 3.4 11.8c.5 1.8 1.1 3.1 1.5 4.6.4 1.3.7 2.8 1.6 2.7.9-.1.9-1.8 1.3-3.1.3-1.2.7-2 1.9-2s1.6.8 1.9 2c.4 1.3.4 3 1.3 3.1.9.1 1.2-1.4 1.6-2.7.4-1.5 1-2.8 1.5-4.6.7-2.5.9-5.4-.5-7.1-.9-1.1-2-.6-3.4-.6-1.6 0-2.7-.9-4.7-.9Z"
          fill={light ? "#FFFFFF" : "#33A9B1"}
        />
      </svg>
      <span className="font-display text-[1.4rem] font-semibold leading-none">
        <span className={light ? "text-white" : "text-ink"}>Dental</span>
        <span className={light ? "text-light" : "text-teal"}>Cure</span>
        {!compact && (
          <span
            className={cn(
              "mt-1 block text-[0.6rem] font-semibold uppercase leading-none tracking-[0.22em]",
              light ? "text-light/80" : "text-[#5C6B7F]",
            )}
          >
            Clinic Noida
          </span>
        )}
      </span>
    </span>
  );
}
