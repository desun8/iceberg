import SmoothScrollbar from "smooth-scrollbar";

declare global {
  interface Window {
    grecaptcha: any;
    Modernizr?: any;
    ymaps?: any;
    APP: {
      scrollbar: SmoothScrollbar | undefined
      isDesktop: boolean,
      isTouchScreen: boolean
    }
  }
}
