import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default() => {
  const pictureElement = document.querySelector(".employee-detail__picture") as HTMLElement;

  if (pictureElement === null) return -1;

  const toggleWillChange = (shouldAdd: boolean, element: HTMLElement) => {
    if (shouldAdd) {
      element.style.willChange = "transform";
    } else {
      element.style.willChange = "auto";
    }
  };

  gsap.set(pictureElement, {y: -40});

  ScrollTrigger.create({
    trigger: pictureElement,
    start: "top top",
    end: "bottom 190",
    pin: true,
    pinSpacing: false,
    pinType: "transform",
    onEnter() {
      toggleWillChange(true, pictureElement);
    },
    onEnterBack() {
      toggleWillChange(true, pictureElement);
    },
    onLeave() {
      toggleWillChange(false, pictureElement);
    },
  });
};
