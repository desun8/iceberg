import gsap from "gsap";

export default () => {
  const handElm = document.querySelector('.children-services-hand') as HTMLElement;
  const brushElm = handElm.querySelector('.children-services-hand__brush');

  gsap.to(brushElm, {
    scrollTrigger: {
      trigger: handElm,
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
    x: () => {
      if (window.matchMedia('(max-width: 1599px)').matches) {
        return "+=-40px";
      }

      return "+=-85px"
    },
  })
}
