import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default () => {
  const qaBlock = document.querySelector(".children-qa")!;
  const handElm = qaBlock.querySelector(".children-qa__hand") as HTMLElement;

  const addAnimation = (elm: HTMLElement) => gsap.fromTo(elm, {
    rotate: -2,
  }, {
    rotate: 2,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
  });

  const tween = addAnimation(handElm).pause();

  ScrollTrigger.create({
    trigger: qaBlock,
    start: "top 80%",
    end: "center top",
    onEnter() {
      tween.play();
    },
    onEnterBack() {
      tween.play();
    },
    onLeave() {
      tween.pause();
    },
    onLeaveBack() {
      tween.pause();
    }
  });

}
