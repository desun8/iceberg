import SmoothScrollbar from "smooth-scrollbar";

declare global {
  interface Window {
    grecaptcha: any;
    APP: {
      scrollbar: SmoothScrollbar | undefined
      isDesktop: boolean,
      isTouchScreen: boolean
    }
  }
}
