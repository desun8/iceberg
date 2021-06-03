import gsap from "gsap";

export default () => {
  const block = document.querySelector(".children-features")!;
  const brushElm = block.querySelector(".children-features__brush");

  gsap.to(brushElm, {
    scrollTrigger: {
      trigger: block,
      start: "top center",
      once: true,
    },
    x: 0,
    rotate: 0,
    duration: 0.8,
    onComplete() {
      setTimeout(
        () => gsap.to(brushElm, {
          scrollTrigger: {
            trigger: block,
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
          rotate: 10,
        }), 500);
    },
  });
}
