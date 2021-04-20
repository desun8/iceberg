import gsap from "gsap";

export default () => {
  const container = document.querySelector("#teeth")!;

  const teethLeft = container.querySelector(".teeth__left");
  const teethRight = container.querySelector(".teeth__right");
  const teethLeftSmall = container.querySelector(".teeth__left-small");
  const teethRightSmall = container.querySelector(".teeth__right-small");
  const teethTopLeft = container.querySelector(".teeth__top-left");
  const teethTopRight = container.querySelector(".teeth__top-right");

  const btn = container.querySelector(".teeth-btn")!;

  const duration = 1.2;
  const ease = "sine.inOut";

  const timeline = gsap.timeline();
  timeline.to(teethLeft, {x: -104, y: 58, duration, ease}, 0);
  timeline.to(teethLeftSmall, {x: -45, y: -20, duration, ease}, 0);
  timeline.to(teethTopLeft, {x: -24, y: -24, duration, ease}, 0);
  timeline.to(teethRight, {x: 92, y: 46, duration, ease}, 0);
  timeline.to(teethRightSmall, {x: 40, y: 0, duration, ease}, 0);
  timeline.to(teethTopRight, {x: 54, y: -21, duration, ease}, 0);

  timeline.reverse(-1);
  timeline.reversed(true);

  btn.addEventListener("click", () => {
    timeline.reversed(!timeline.reversed());
  });
}
