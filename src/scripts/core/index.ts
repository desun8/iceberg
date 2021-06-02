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


  console.log("is desktop?");
  console.log(window.APP.isDesktop);

  if (window.APP.isDesktop) {
    console.log("is desktop");
    if (window.APP.scrollbar !== undefined) {
      console.log("is smoothscroll");
      import('./smoothScroll/fixAnchors').then(({ default: fixAnchors }) => {
        fixAnchors();
        console.log("init fix anchors");
      });
    }
  }

// компоненты
}

