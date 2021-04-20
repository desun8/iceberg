import detectTouchScreen from "../utils/detectTouchScreen";
import isDesktop from "../utils/isDesktop";
import SmoothScroll from "./smoothScroll/SmoothScroll";

export default () => {
  // служебные
  // set APP
  if (window.APP === undefined) {
    window.APP = {
      scrollbar: undefined,
      isDesktop: isDesktop(),
      isTouchScreen: false,
    };
  }

  detectTouchScreen();

  new SmoothScroll(document.querySelector("#scroll-container"));

// компоненты
}

