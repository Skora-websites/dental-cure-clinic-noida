import { useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function PageMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);
        const cards = gsap.utils.toArray<HTMLElement>(".surface-card", scope.current).filter(
          (card) => !card.closest("[data-reveal]") && !card.hasAttribute("data-reveal"),
        );
        const headings = gsap.utils.toArray<HTMLElement>("section h2", scope.current).filter(
          (heading) => !heading.closest("[data-reveal]") && !heading.closest(".surface-card"),
        );
        const hero = gsap.utils.toArray<HTMLElement>("[data-hero]", scope.current);

        if (hero.length) {
          gsap.fromTo(
            hero,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, clearProps: "transform" },
          );
        }

        [...reveals, ...cards, ...headings].forEach((element) => {
          const direction = element.dataset.reveal ?? "up";
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: direction === "up" ? 42 : 0, x: direction === "right" ? 42 : 0, scale: direction === "scale" ? 0.96 : 1 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      });
    },
    { scope, revertOnUpdate: true, dependencies: [location.pathname] },
  );

  return <div ref={scope} className="min-h-screen overflow-x-hidden">{children}</div>;
}
