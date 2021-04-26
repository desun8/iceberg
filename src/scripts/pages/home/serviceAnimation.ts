import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default () => {
  const cards = document.querySelectorAll(".service-card");

  if (cards) {
    cards.forEach((card, index) => {
      const delay = (index % 2) * 0.4;

      gsap.set(card, {y: 50, alpha: 0});

      ScrollTrigger.create({
        trigger: card,
        start: "center bottom",
        once: true,
        onEnter() {
          console.log("service animation card");
          gsap.to(card, {y: 0, alpha: 1, duration: 0.6, delay});
        }
      })
    });
  }
}
