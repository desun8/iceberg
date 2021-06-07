import gsap from "gsap";
import isScreenSm from "../../utils/isScreenSm";

export default () => {
  const imgHands = document.querySelector(".children-welcome__hands");

  if (!isScreenSm().matches) {
    const textBlock = document.querySelector(".children-welcome__body");

    const tl = gsap.timeline();
    tl.to(textBlock, {y: 0, autoAlpha: 1, duration: 0.8, delay: 0.5});
    tl.to(imgHands, {
      y: 0, autoAlpha: 1, duration: 0.6, onComplete() {
        gsap.to(imgHands, {
          y: 18,
          duration: 1.5,
          delay: 0.4,
          repeat: -1,
          ease: "power1.inOut",
          repeatDelay: 0.3,
          yoyo: true,
        });
      },
    }, "-=0.2");

  } else {
    gsap.to(imgHands, {
      y: 14,
      duration: 1.5,
      delay: 0.4,
      repeat: -1,
      ease: "power1.inOut",
      repeatDelay: 0.5,
      yoyo: true,
    });
  }
}
