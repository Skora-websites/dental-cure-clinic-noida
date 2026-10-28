import type Lenis from "lenis";

/**
 * The page's smooth-scroll instance, held in one place so that anything that
 * moves the page itself — a route change, the back-to-top control — drives the
 * smoother rather than the browser, which would otherwise fight it.
 *
 * It is null whenever smoothing is off (a reader who asks for reduced motion),
 * so callers fall back to plain `window.scrollTo`.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

/** Jumps to the top of the page without animating, for a route change. */
export function resetScroll() {
  instance?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
}

/** Returns to the top of the page, smoothly where smoothing is available. */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 0.9 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
