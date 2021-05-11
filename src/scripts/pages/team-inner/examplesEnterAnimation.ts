import { gsap } from "gsap";

export const examplesEnterAnimation = () => {
  const root = document.querySelector(".examples-list") as HTMLElement;
  const elements = Array.from(root.querySelectorAll(".example-card")) as HTMLElement[];

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
