import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Status = {
  offset: { x: number, y: number },
  limit: { x: number, y: number }
}

export default () => {
  const element = document.querySelector(".block-hero") as HTMLElement;
  const isLargeHeightScreen = window.matchMedia("(min-height: 1000px)").matches;
  const triggerStart = isLargeHeightScreen ? "top top" : "bottom bottom";

  const clientHeight = document.documentElement.clientHeight;
  const elementHeight = element.offsetHeight;

  // Если блок <= 100vh, то фиксируем хедер и сам блок.
  // Иначе используем "ScrollTrigger" и тогда фиксируется только блок.
  if (elementHeight <= clientHeight) {
    const headerElement = document.querySelector(".page-header") as HTMLElement;
    const mainElement = document.querySelector(".js-home-main") as HTMLElement;
    const scrollbar = window.APP.scrollbar;
    const isNativeScroll = scrollbar === undefined;

    element.style.top = "0";
    element.style.left = "0";
    element.style.right = "0";
    element.style.position = "fixed";
    mainElement.style.paddingTop = `${elementHeight}px`;
    headerElement.classList.add("is-pinned");

    if (!isNativeScroll) {
      headerElement.style.zIndex = "1";
      scrollbar!.addListener((status: Status) => {
        const posY = status.offset.y;

        if (posY <= clientHeight) {
          element.style.display = "";
          element.style.visibility = "";

          element.style.willChange = "transform";
          headerElement.style.willChange = "transform";
          element.style.transform = `translate3d(0, ${posY}px, 0)`;
          headerElement.style.transform = `translate3d(0, ${posY}px, 0)`;
        } else {
          element.style.display = "none"; // немного улучшает производительность в safari
          element.style.visibility = "hidden"; // немного улучшает производительность в safari

          element.style.willChange = "auto";
          headerElement.style.willChange = "auto";
        }
      });
    }
  } else {
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
}
