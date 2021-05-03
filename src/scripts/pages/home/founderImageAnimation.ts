import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  const parentElement = document.querySelector(".block-founder");
  const imageElement = document.querySelector(".block-founder__img");

  if (parentElement && imageElement) {
    gsap.set(imageElement, {
      scale: 0.1,
      transformOrigin: "100% 50%",
    })

    ScrollTrigger.create({
      trigger: parentElement,
      start: "top center",
      once: true,
      onEnter() {
        console.log("appear founder images");
        gsap.to(imageElement, {
          scale: 1,
          duration: 2.5,
          ease: "elastic.out(1, 0.95)",
        });
      },
    });
  }
}
