import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  const element = document.querySelector(".block-hero") as HTMLElement;
  const isLargeHeightScreen = window.matchMedia('(min-height: 1000px)').matches;
  const triggerStart = isLargeHeightScreen ? "top top" : "bottom bottom"

  if (window.APP.isDesktop) {
    const toggleWillChange = (shouldAdd: boolean, element: HTMLElement) => {
      if (shouldAdd) {
        element.style.willChange = "transform";
      } else {
        element.style.willChange = "auto";
      }
    };

    ScrollTrigger.create({
      trigger: element,
      start: triggerStart,
      pin: true,
      pinSpacing: false,
      pinType: "transform",
      onEnter() {
        toggleWillChange(true, element);
      },
      onEnterBack() {
        toggleWillChange(true, element);
      },
      onLeave() {
        toggleWillChange(false, element);
      },
    });
  } else {
    ScrollTrigger.create({
      trigger: element,
      start: triggerStart,
      pin: true,
      pinSpacing: false,
    });
  }
}
