import gsap from "gsap";

export default () => {
  const qaBlock = document.querySelector(".children-qa")!;
  const handElm = qaBlock.querySelector(".children-qa__hand") as HTMLElement;

  gsap.to(handElm, {
    scrollTrigger: {
      trigger: qaBlock,
      start: "top center",
      end: "bottom top",
      scrub: true,
    },
    rotate: 12,
  })
}
