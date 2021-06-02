// import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sticky = (parentElement: HTMLElement, targetElement: HTMLElement, endTriggerElement: HTMLElement) => {
  let endPos = 0;

  if (targetElement === null) return -1;

  const toggleWillChange = (shouldAdd: boolean, element: HTMLElement) => {
    if (shouldAdd) {
      element.style.willChange = "transform";
    } else {
      element.style.willChange = "auto";
    }
  };

  const scrollTrigger = ScrollTrigger.create({
    trigger: targetElement,
    start: "top 165",
    end: () => {
      const parentHeight = parentElement.offsetHeight;
      const pictureHeight = targetElement.offsetHeight;
      const endTriggerHeight = endTriggerElement.offsetHeight;
      endPos = parentHeight - (pictureHeight + endTriggerHeight);

      if (endPos < 0) {
        return 0;
      }

      return `+=${endPos}`;
    },
    pin: true,
    pinSpacing: false,
    pinType: "transform",
    onEnter() {
      toggleWillChange(true, targetElement);
    },
    onEnterBack() {
      toggleWillChange(true, targetElement);
    },
    onLeave() {
      toggleWillChange(false, targetElement);
    },
  });
};

export default () => {
  const parentElement = document.querySelector(".children-services__sticky-block") as HTMLElement;

  if (parentElement) {
    const stickyOrder = parentElement.querySelector(".children-sticky-order") as HTMLElement;
    const imageBg = parentElement.querySelector(".children-services-hand") as HTMLElement;

    if (stickyOrder && imageBg) {
      sticky(parentElement, stickyOrder, imageBg);
    }
  }
};
