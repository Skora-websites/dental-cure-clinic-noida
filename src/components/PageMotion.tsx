import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { resetScroll, setLenis } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Killable = { kill: () => void };

/**
 * The template's page motion, rebuilt rather than copied: the page scrolls
 * under inertia, every section label and card rises as it enters the viewport,
 * each section title assembles character by character, the figures count up and
 * the photographic bands drift as they pass.
 *
 * Two rules hold everywhere:
 *  - every animation sits inside a `prefers-reduced-motion: no-preference`
 *    query, so a reader who asks for less motion gets the page, still and
 *    complete;
 *  - nothing is hidden in CSS. Start states are written by script, so if the
 *    script never runs the page is fully legible.
 */
export default function PageMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const location = useLocation();

  /*
   * Inertial scrolling, as in the template. Lenis is a frame loop, not a
   * scroller: it takes the wheel, eases its own position and only writes the
   * result during `raf`. Nothing moves until that loop is driven, so it is
   * driven by GSAP's ticker — one clock for the scroll and the ScrollTriggers
   * reading it, which keeps the two from drifting apart.
   * Off entirely for reduced motion.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    const sync = () => ScrollTrigger.update();
    lenis.on("scroll", sync);
    setLenis(lenis);

    /* Lenis measures in milliseconds; the ticker hands out seconds. */
    const drive = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(drive);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(drive);
      lenis.off("scroll", sync);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  /* A new page opens at its top; the smoother has to be told, not the browser. */
  useEffect(() => {
    resetScroll();
  }, [location.pathname]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return undefined;

        /* 1. The banner settles in as one sequence. */
        const hero = gsap.utils.toArray<HTMLElement>("[data-hero]", root);
        if (hero.length) {
          gsap.fromTo(
            hero,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.07, clearProps: "all" },
          );
        }

        /*
         * Entry is decided by a sweep, not by ScrollTrigger's enter/leave
         * events. A single jump — an anchor, a restored scroll position, a
         * fling, the back-to-top ring — can cross a whole screen in one frame,
         * and anything that was waiting only for an `onEnter` stays invisible
         * for the rest of the visit. The sweep asks, on every scroll, which
         * staged elements are now above the line, so nothing can be skipped.
         */
        const threshold = () => window.innerHeight * 0.92;

        /* 2. Section titles assemble character by character, as `.sec-title`
              does in the template: words split, chars slide in from the right. */
        const splits: SplitText[] = [];
        const titles: { el: HTMLElement; tween: gsap.core.Tween }[] = [];
        gsap.utils.toArray<HTMLElement>("[data-split]", root).forEach((title) => {
          const split = SplitText.create(title, { type: "words,chars", autoSplit: false });
          splits.push(split);
          titles.push({
            el: title,
            tween: gsap.from(split.chars, {
              duration: 1,
              delay: 0.05,
              x: 20,
              autoAlpha: 0,
              ease: "power2.out",
              stagger: 0.03,
              paused: true,
            }),
          });
        });
        let pendingTitles = titles.slice();
        const playTitles = () => {
          if (!pendingTitles.length) return;
          const limit = threshold();
          const ready = pendingTitles.filter(({ el }) => el.getBoundingClientRect().top < limit);
          if (!ready.length) return;
          pendingTitles = pendingTitles.filter((title) => ready.indexOf(title) === -1);
          ready.forEach(({ tween }) => tween.play());
        };

        /* 3. Reveals: everything that enters together rises together. Only what
              is below the fold is withheld, so the first screen never waits. */
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        const staged = reveals.filter((el) => el.getBoundingClientRect().top > threshold());
        gsap.set(staged, { autoAlpha: 0, y: 34 });

        const release = (elements: HTMLElement[]) => {
          /* Cards carry a CSS transform on hover; a live transition would smear
             the reveal, so it is paused for the duration. */
          elements.forEach((el) => {
            el.style.transition = "none";
          });
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform",
            onComplete: () => {
              elements.forEach((el) => el.style.removeProperty("transition"));
            },
          });
        };

        let queue = staged.slice();
        const sweep = () => {
          if (!queue.length) return;
          const limit = threshold();
          const entering: HTMLElement[] = [];
          const passed: HTMLElement[] = [];

          queue.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top >= limit) return;
            /*
             * A jump can land beyond a short element entirely. It still has to
             * be shown — the reader may scroll back up to it — but it is out of
             * sight, so it appears at once rather than joining a stagger the
             * reader cannot see.
             */
            if (rect.bottom < 0) passed.push(el);
            else entering.push(el);
          });

          if (!entering.length && !passed.length) return;
          queue = queue.filter((el) => entering.indexOf(el) === -1 && passed.indexOf(el) === -1);
          if (passed.length) gsap.set(passed, { autoAlpha: 1, y: 0, clearProps: "transform" });
          if (entering.length) release(entering);
        };

        /* 4. Figures count up to the value the markup already states. */
        const counters = gsap.utils.toArray<HTMLElement>("[data-count-to]", root).map((el) => ({
          el,
          to: Number(el.dataset.countTo),
          suffix: el.dataset.countSuffix ?? "",
          final: el.textContent ?? "",
        }));
        const counterTweens: Killable[] = [];
        counters.forEach(({ el, to, suffix, final }) => {
          if (!Number.isFinite(to)) return;
          const box = { value: 0 };
          const write = () => {
            el.textContent = `${Math.round(box.value).toLocaleString("en-IN")}${suffix}`;
          };
          counterTweens.push(
            gsap.to(box, {
              value: to,
              duration: 1.3,
              ease: "power1.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
              onStart: write,
              onUpdate: write,
              onComplete: () => {
                el.textContent = final;
              },
            }),
          );
        });

        /* 5. The photographic bands drift as they pass, as the template's
              parallax banners do. */
        gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((el) => {
          gsap.fromTo(
            el,
            { backgroundPositionY: "18%" },
            {
              backgroundPositionY: "82%",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        /* The same sweep answers every way the page can move. */
        const onScroll = () => {
          sweep();
          playTitles();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        playTitles();

        /* Images change the page height after this runs, so re-measure. */
        const refresh = () => {
          ScrollTrigger.refresh();
          sweep();
          playTitles();
        };
        const timer = window.setTimeout(refresh, 400);
        window.addEventListener("load", refresh);

        return () => {
          window.clearTimeout(timer);
          window.removeEventListener("load", refresh);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          counterTweens.forEach((tween) => tween.kill());
          titles.forEach(({ tween }) => tween.kill());
          counters.forEach(({ el, final }) => {
            el.textContent = final;
          });
          gsap.set(reveals, { clearProps: "opacity,visibility,transform" });
          /* Unwrap the split titles so a re-run splits clean markup, not itself. */
          splits.forEach((split) => split.revert());
        };
      });

      return () => media.revert();
    },
    { scope, revertOnUpdate: true, dependencies: [location.pathname] },
  );

  return (
    /*
      `overflow-x: clip` keeps the page from scrolling sideways. The section
      titles slide in character by character from 20px to the right, and that
      overhang was the only thing widening the document on a 320px phone.
      Clip rather than hidden: it costs no scroll container, so the floating
      header and the smooth scroller behave as before.
    */
    <div ref={scope} className="min-h-screen overflow-x-clip">
      {children}
    </div>
  );
}
