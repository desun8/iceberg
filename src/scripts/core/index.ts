import detectTouchScreen from "../utils/detectTouchScreen";
import isDesktop from "../utils/isDesktop";
import SmoothScroll from "./smoothScroll/SmoothScroll";
import fixedHeader from "./fixedHeader";

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
  fixedHeader();

  if (window.APP.scrollbar !== undefined) {
    import('./smoothScroll/anchorForScrollSmooth').then(({ default: anchorForScrollSmooth }) => {
      anchorForScrollSmooth();
    });
  }

// компоненты
}

