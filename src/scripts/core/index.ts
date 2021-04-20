import SmoothScroll from "./smoothScroll";

export default () => {
// служебные
  if (window.APP === undefined) {
    window.APP = {
      scrollbar: undefined
    };
  }

  SmoothScroll();

// компоненты
}

