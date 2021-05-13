import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default () => {
  const parentElement = document.querySelector(".employee-detail") as HTMLElement;
  const pictureElement = parentElement.querySelector(".employee-detail__picture") as HTMLElement;
  let endScrollPos = 0;

  if (pictureElement === null) return -1;

  const toggleWillChange = (shouldAdd: boolean, element: HTMLElement) => {
    if (shouldAdd) {
      element.style.willChange = "transform";
    } else {
      element.style.willChange = "auto";
    }
  };

  gsap.set(pictureElement, {y: -40});

  const scrollTrigger = ScrollTrigger.create({
    trigger: pictureElement,
    start: "top top",
    end: `+=${endScrollPos}`,
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

  // Обновляем позицию "end" ScrollTrigger'а при ресайзе.
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const {height} = entry.contentRect;
      const pictureHeight = pictureElement.offsetHeight;
      const prevPos = endScrollPos;

      endScrollPos = height - pictureHeight;

      if (endScrollPos < 0) {
        endScrollPos = 0;
      }

      if (endScrollPos !== prevPos) {
        scrollTrigger.vars.end = `+=${endScrollPos}`;
        ScrollTrigger.refresh();
      }
    }
  });

  resizeObserver.observe(parentElement);
};
