import Scrollbar from "smooth-scrollbar";
import ModalPlugin from "./ModalPlugin";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class SmoothScroll {
  private smoothScrollInstance?: Scrollbar;
  private options = {
    damping: 0.1,
    delegateTo: document,
    alwaysShowTracks: window.APP.isDesktop,
  };

  constructor(private element: HTMLElement | null) {
    if (this.element) {
      if (!window.APP.isTouchScreen) {
        this.addPlugins();
        this.smoothScrollInstance = Scrollbar.init(this.element, this.options);

        this.setup();
      }

      this.setupAnimation();
    } else {
      console.warn("Не удалось инициализировать плавный скролл.");
    }
  }

  private addPlugins() {
    Scrollbar.use(ModalPlugin);
  }

  private addStyles() {
    document.body.style.overflow = "hidden";
    this.element!.style.height = "100vh";
    const scrollContent = this.element!.querySelector(".scroll-content") as HTMLElement;

    if (scrollContent) {
    scrollContent.style.willChange = "transform";
    }
  }

  private addToGlobal() {
    window.APP.scrollbar = this.smoothScrollInstance;
  }

  private setupScrollTrigger() {
    const smoothScrollInstance = this.smoothScrollInstance!;

    ScrollTrigger.scrollerProxy(this.element!, {
      scrollTop(value) {
        if (arguments.length) {
          if (typeof value === "number") {
            smoothScrollInstance.scrollTop = value;
          }
        }

        return smoothScrollInstance.scrollTop;
      },
    });

    this.smoothScrollInstance!.addListener(ScrollTrigger.update);

    ScrollTrigger.defaults({scroller: this.element!});
  }

  private setup() {
    this.addStyles();
    this.addToGlobal();
    this.setupScrollTrigger();
  }

  private animationFadeIn() {
    const elements = Array.from(document.querySelectorAll(".js-scrolltrigger-fadein"));

    elements.forEach(element => {
      gsap.from(element, {
        y: 50,
        alpha: 0,
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
        },
      });
    });
  }

  private setupAnimation() {
    this.animationFadeIn();
  }
}

export default SmoothScroll;
