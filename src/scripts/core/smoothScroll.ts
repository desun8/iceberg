import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import { Data2d } from "smooth-scrollbar/interfaces";
import isDesktop from "../utils/isDesktop";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  // Setup
  const scroller = document.querySelector("#scroll-container") as HTMLElement;

  if (scroller === null) {
    return;
  }

  document.body.style.overflow = "hidden";
  scroller.style.height = "100vh";

  // Отключение скролла body, когда открыта модалка
  class ModalPlugin extends ScrollbarPlugin {
    static pluginName = 'modal';

    static defaultOptions = {
      open: false,
    };

    transformDelta(delta: Data2d) {
      return this.options.open ? { x: 0, y: 0 } : delta;
    }
  }

  Scrollbar.use(ModalPlugin);

  const scrollbar = Scrollbar.init(scroller, {damping: 0.1, delegateTo: document, alwaysShowTracks: isDesktop()});

  window.APP.scrollbar = scrollbar;


  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        if (typeof value === "number") {
          scrollbar.scrollTop = value;
        }
      }

      return scrollbar.scrollTop;
    },
  });

  scrollbar.addListener(ScrollTrigger.update);

  ScrollTrigger.defaults({scroller: scroller});


// The actual animations and ScrollTriggers
  const elements = Array.from(document.querySelectorAll('.js-scrolltrigger-fadein'));
  elements.forEach(element => {
    gsap.from(element, {
      y: 50,
      alpha: 0,
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        markers: true,
      },
    });
  })
//
//   gsap.from("section.red .text", {
//     x: -500,
//     opacity: 0,
//     scrollTrigger: {
//       trigger: "section.red",
//       start:"top 50%",
//       toggleActions: "play none none reset",
//       // markers:true
//     },
//   });

// Only necessary to correct marker position - not needed in production
//   if (document.querySelector('.gsap-marker-scroller-start')) {
//     const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
//
//     bodyScrollBar.addListener(({ offset }) => {
//       gsap.set(markers, { marginTop: -offset.y })
//     });
//   }
}
