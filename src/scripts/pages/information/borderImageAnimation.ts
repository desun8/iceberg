import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default (parentElm: HTMLElement, imageElm: HTMLElement) => {
  gsap.set(imageElm, {
    scale: 0.75,
    transformOrigin: "100% 50%",
  });

  ScrollTrigger.create({
    trigger: parentElm,
    start: "top center",
    once: true,
    onEnter() {
      console.log("appear founder images");
      gsap.to(imageElm, {
        scale: 1,
        duration: 2.5,
        ease: "elastic.out(1, 0.95)",
      });
    },
  });
}
