import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  // Setup
  const scroller = document.querySelector("#scroll-container") as HTMLElement;

  if (scroller === null) {
    return;
  }

  document.body.style.overflow = "hidden";
  scroller.style.height = "100vh";

  const bodyScrollBar = Scrollbar.init(scroller, {damping: 0.1, delegateTo: document, alwaysShowTracks: true});

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        if (typeof value === "number") {
          bodyScrollBar.scrollTop = value;
        }
      }

      return bodyScrollBar.scrollTop;
    },
  });

  bodyScrollBar.addListener(ScrollTrigger.update);

  ScrollTrigger.defaults({scroller: scroller});


// The actual animations and ScrollTriggers
//   gsap.to('.employees-list__item', {
//     rotation: 360,
//     scrollTrigger: {
//       trigger: ".employee-card",
//       start: "top top",
//       end: "bottom bottom",
//       pin: true,
//       scrub: true,
//       markers: true
//     }
//   });
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
