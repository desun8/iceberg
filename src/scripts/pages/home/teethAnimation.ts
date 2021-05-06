import gsap from "gsap";

enum AnimationDirection {
  Forward,
  Backward
}

export default () => {
  const isDesktop = window.APP.isDesktop;

  const container = document.querySelector("#teeth")!;
  const teethMain = container.querySelector(".teeth__main") as HTMLElement;
  const teethLeft = container.querySelector(".teeth__part--left") as HTMLElement;
  const teethRight = container.querySelector(".teeth__part--right") as HTMLElement;
  const teethLeftSmall = container.querySelector(".teeth__part--left-small") as HTMLElement;
  const teethRightSmall = container.querySelector(".teeth__part--right-small") as HTMLElement;
  const teethTopLeft = container.querySelector(".teeth__part--top-left") as HTMLElement;
  const teethTopRight = container.querySelector(".teeth__part--top-right") as HTMLElement;
  const btn = container.querySelector(".teeth-btn") as HTMLButtonElement;

  let animationDirection = AnimationDirection.Forward;

  const addBuildAnimation = () => {
    const createTeethPartsAnimation = (direction: AnimationDirection) => {
      const positions = {
        left: {
          x: isDesktop ? -260 : -104,
          y: 58,
        },
        leftSmall: {
          x: isDesktop ? -110 : -45,
          y: isDesktop ? -70 : -20,
        },
        leftTop: {
          x: isDesktop ? -80 : -24,
          y: isDesktop ? -70 : -24,
        },
        right: {
          x: isDesktop ? 230 : 92,
          y: isDesktop ? 90 : 46,
        },
        rightSmall: {
          x: isDesktop ? 100 : 40,
          y: 0,
        },
        rightTop: {
          x: isDesktop ? 150 : 54,
          y: isDesktop ? -50 : -21,
        },
      };

      const duration = 1.2;
      const ease = "sine.inOut";

      const timeline = gsap.timeline({paused: true});

      if (direction === AnimationDirection.Forward) {
        timeline.to(teethLeft, {...positions.left, duration, ease}, 0);
        timeline.to(teethLeftSmall, {...positions.leftSmall, duration, ease}, 0);
        timeline.to(teethTopLeft, {...positions.leftTop, duration, ease}, 0);
        timeline.to(teethRight, {...positions.right, duration, ease}, 0);
        timeline.to(teethRightSmall, {...positions.rightSmall, duration, ease}, 0);
        timeline.to(teethTopRight, {...positions.rightTop, duration, ease}, 0);
      } else {
        const resetPosition = {x: 0, y: 0};

        timeline.to(teethLeft, {...resetPosition, duration, ease}, 0);
        timeline.to(teethLeftSmall, {...resetPosition, duration, ease}, 0);
        timeline.to(teethTopLeft, {...resetPosition, duration, ease}, 0);
        timeline.to(teethRight, {...resetPosition, duration, ease}, 0);
        timeline.to(teethRightSmall, {...resetPosition, duration, ease}, 0);
        timeline.to(teethTopRight, {...resetPosition, duration, ease}, 0);
      }

      return timeline;
    };
    const createTeethIconsAnimation = () => {
      const icons = Array.from(teethMain.querySelectorAll(".teeth__icon"));

      const timeline = gsap.timeline({repeat: -1, paused: true});
      icons.forEach(icon => {
        const duration = 0;

        timeline.to(icon, {alpha: 1, duration});
        timeline.to(icon, {alpha: 0, duration}, "+=0.8");
      });

      return timeline;
    };

    const teethPartsAnimationForward = createTeethPartsAnimation(AnimationDirection.Forward);
    const teethPartsAnimationBackward = createTeethPartsAnimation(AnimationDirection.Backward);
    const teethIconsAnimation = createTeethIconsAnimation();

    teethPartsAnimationForward.reverse(-1);
    teethPartsAnimationForward.reversed(true);

    btn.addEventListener("click", (event: Event) => {
      const element = event.currentTarget as HTMLButtonElement;
      let newText = null;

      const isForwardPlaying = teethPartsAnimationForward.isActive();
      const isBackwardPlaying = teethPartsAnimationBackward.isActive();

      if (animationDirection === AnimationDirection.Forward) {
        if (isForwardPlaying) {
          teethPartsAnimationForward.reversed(!teethPartsAnimationForward.reversed());
        } else {
          if (isBackwardPlaying) {
            teethPartsAnimationBackward.reversed(!teethPartsAnimationBackward.reversed());
          } else {
            console.log("isBackwardPlaying");
            console.log(isBackwardPlaying);
            teethPartsAnimationBackward.invalidate();
            teethPartsAnimationBackward.restart();
          }
        }

        newText = element.dataset.backward || newText;
        animationDirection = AnimationDirection.Backward;
      } else {
        if (isBackwardPlaying) {
          teethPartsAnimationBackward.reversed(!teethPartsAnimationBackward.reversed());
        } else {
          if (isForwardPlaying) {
            teethPartsAnimationForward.reversed(!teethPartsAnimationForward.reversed());
          } else {
            teethPartsAnimationForward.invalidate();
            teethPartsAnimationForward.restart();
          }
        }

        newText = element.dataset.forward || newText;
        animationDirection = AnimationDirection.Forward;
      }

      element.lastChild!.nodeValue = newText;
    });
    // Стартуем анимации, когда все загрузилось.
    window.addEventListener("load", () => {
      teethPartsAnimationForward.reversed(!teethPartsAnimationForward.reversed());
      teethIconsAnimation.play();
    });
  };

  const addDrag = (dragItem: HTMLElement) => {
      let shouldCheckTransform = true;
      let active = false;
      let currentX: number;
      let currentY: number;
      let initialX: number;
      let initialY: number;
      let xOffset = 0;
      let yOffset = 0;

      const setX = gsap.quickSetter(dragItem, "x", "px");
      const setY = gsap.quickSetter(dragItem, "y", "px");


      function dragStart(this: HTMLElement, event: MouseEvent) {
        if (shouldCheckTransform) {
          const currentTransform = dragItem.style.transform.match(/-?[0-9]+/g);

          if (currentTransform && currentTransform.length === 2) {
            xOffset = parseInt(currentTransform[0]);
            yOffset = parseInt(currentTransform[1]);
          }

          shouldCheckTransform = false;
        }

        initialX = event.clientX - xOffset;
        initialY = event.clientY - yOffset;

        if (event.target === dragItem) {
          active = true;
          dragItem.style.willChange = "transform";
          dragItem.style.zIndex = "1000";

          btn.lastChild!.nodeValue = btn.dataset.forward || null;
          animationDirection = AnimationDirection.Forward;
        }
      }

      function dragEnd() {
        initialX = currentX;
        initialY = currentY;

        active = false;
        dragItem.style.willChange = "";
        dragItem.style.zIndex = "";
      }

      function drag(this: HTMLElement, event: MouseEvent) {
        if (active) {
          event.preventDefault();

          currentX = event.clientX - initialX;
          currentY = event.clientY - initialY;

          xOffset = currentX;
          yOffset = currentY;

          // setTranslate(Math.floor(currentX), Math.floor(currentY), dragItem);
          setX(Math.floor(currentX));
          setY(Math.floor(currentY));
        }
      }

      dragItem.addEventListener("mousedown", dragStart, false);
      dragItem.addEventListener("mouseup", dragEnd, false);
      dragItem.addEventListener("mouseleave", dragEnd, false);
      dragItem.addEventListener("mousemove", drag, false);

      // При клике на кнопку (запускает анимацию сборки/разборки)
      btn.addEventListener("click", () => {
        shouldCheckTransform = true;
      });
    };

  addBuildAnimation();

  if (!window.APP.isTouchScreen) {
    const items = [teethRight, teethRightSmall, teethTopRight, teethLeft, teethLeftSmall, teethTopLeft];
    items.forEach((element: HTMLElement) => {
      addDrag(element);
    });
  }
}
