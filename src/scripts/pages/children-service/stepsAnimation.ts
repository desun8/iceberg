import gsap from "gsap";
import getCssProp from "../../utils/getCssProp";

export default () => {
  const CIRCLE_HEIGHT = 20;

  const stepList = document.querySelector(".children-steps-list") as HTMLOListElement;
  const stepItemElms = Array.from(stepList.querySelectorAll(".children-steps-list-item")) as HTMLLIElement[];
  const stepProgressElms = Array.from(document.querySelectorAll(".step-progress"));

  const listGap = parseFloat(getCssProp("row-gap", stepList));

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stepList,
      start: "top 75%",
      once: true,
    },
  });

  stepProgressElms.forEach((progressElm, index) => {
    const circleElm = progressElm.querySelector(".step-progress__circle") as HTMLElement;
    const lineElm = progressElm.querySelector(".step-progress__line") as HTMLElement;
    const stepItemElm = stepItemElms[index];

    tl.to(circleElm, {autoAlpha: 1, duration: 0.3, delay: 0.15});

    if (lineElm) {
      const itemHeight = stepItemElm.offsetHeight;
      const totalHeight = itemHeight + listGap - CIRCLE_HEIGHT;

      lineElm.style.height = `${totalHeight}px`;

      tl.to(lineElm, {scaleY: 1, duration: 0.4});
    }

    tl.from(stepItemElm, {y: -10, autoAlpha: 0, duration: 0.4}, "-=0.2");

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const itemHeight = entry.contentRect.height;
        const listGap = parseFloat(getCssProp("gap", stepList));
        const totalHeight = itemHeight + listGap - CIRCLE_HEIGHT;
        lineElm.style.height = `${totalHeight}px`;
      }
    });

    if (lineElm) {
      resizeObserver.observe(stepItemElm);
    }
  });
}
