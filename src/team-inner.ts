import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import core from "./core";

gsap.registerPlugin(ScrollTrigger);

core();

const exampleLinkHover = () => {
  const HOVER_CLASS = "is-hover";
  const links = Array.from(document.querySelectorAll(".example-card__link")) as HTMLAnchorElement[];

  links.forEach(link => {
    const parent: HTMLElement = link.closest(".example-card") as HTMLElement;

    link.addEventListener("mouseenter", () => {
      parent.classList.add(HOVER_CLASS);
    }, {passive: true});

    link.addEventListener("mouseleave", () => {
      parent.classList.remove(HOVER_CLASS);
    }, {passive: true});
  });
};

const addPictureMask = () => {
  const element = document.querySelector(".employee-picture") as HTMLDivElement;
  if (element) {
    setTimeout(() =>
      import("./scripts/ImageMask").then(({default: ImageMask}) => {
        new ImageMask(element);
      }), 200);
  }
};

const examplesEnterAnimation = () => {
  const root = document.querySelector(".examples-list") as HTMLElement;
  const elements = Array.from(document.querySelectorAll(".example-card")) as HTMLElement[];

  gsap.from(elements, {
    scrollTrigger: {
      trigger: root,
      start: "200px bottom",
    },
    stagger: 0.4,
    alpha: 0,
    y: 100,
    duration: 0.6,
  });
};

exampleLinkHover();
addPictureMask();
examplesEnterAnimation();
