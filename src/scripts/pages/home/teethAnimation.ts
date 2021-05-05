import gsap from "gsap";

const consoleStyle = (background: string) => `
  background: ${background};
  padding: 1em;
  font-weight: 700`;

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
  const btn = container.querySelector(".teeth-btn")!;

  const createTeethPartsAnimation = () => {
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

    const timeline = gsap.timeline();
    timeline.to(teethLeft, {...positions.left, duration, ease}, 0);
    timeline.to(teethLeftSmall, {...positions.leftSmall, duration, ease}, 0);
    timeline.to(teethTopLeft, {...positions.leftTop, duration, ease}, 0);
    timeline.to(teethRight, {...positions.right, duration, ease}, 0);
    timeline.to(teethRightSmall, {...positions.rightSmall, duration, ease}, 0);
    timeline.to(teethTopRight, {...positions.rightTop, duration, ease}, 0);

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

  const teethPartsAnimation = createTeethPartsAnimation();
  teethPartsAnimation.reverse(-1);
  teethPartsAnimation.reversed(true);

  const teethIconsAnimation = createTeethIconsAnimation();


  btn.addEventListener("click", (event: Event) => {
    const element = event.currentTarget as HTMLButtonElement;
    let newText = null;

    teethPartsAnimation.reversed(!teethPartsAnimation.reversed());

    if (teethPartsAnimation.reversed()) {
      newText = element.dataset.backward || newText;
    } else {
      newText = element.dataset.forward || newText;
    }

    element.lastChild!.nodeValue = newText;
  });
  window.addEventListener("load", () => {
    teethPartsAnimation.reversed(!teethPartsAnimation.reversed());
    teethIconsAnimation.play();
  });


  if (!window.APP.isTouchScreen) {
    // DRAG v2
    const addDrag = (dragItem: HTMLElement, container = teethMain) => {
      let shouldCheckTransform = true;
      let active = false;
      let currentX: number;
      let currentY: number;
      let initialX: number;
      let initialY: number;
      let xOffset = 0;
      let yOffset = 0;

      console.log("initial");
      console.log(xOffset, yOffset);

      function dragStart(this: HTMLElement, event: MouseEvent) {
        if (shouldCheckTransform) {
          const currentTransform = dragItem.style.transform.match(/[0-9]+/g);

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
          dragItem.style.backgroundColor = "rgba(0,0,0,0.3)"
        }
      }

      function dragEnd() {
        initialX = currentX;
        initialY = currentY;

        active = false;
        dragItem.style.willChange = "";
        dragItem.style.backgroundColor = ""
      }

      function drag(this: HTMLElement, event: MouseEvent) {
        if (active) {
          event.preventDefault();

          currentX = event.clientX - initialX;
          currentY = event.clientY - initialY;

          xOffset = currentX;
          yOffset = currentY;

          setTranslate(Math.floor(currentX), Math.floor(currentY), dragItem);
        }
      }

      function setTranslate(xPos: number, yPos: number, el: HTMLElement) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
      }

      dragItem.addEventListener("mousedown", dragStart, false);
      dragItem.addEventListener("mouseup", dragEnd, false);
      dragItem.addEventListener("mouseleave", dragEnd, false);
      dragItem.addEventListener("mousemove", drag, false);
    };

    const items = [teethRight, teethRightSmall, teethTopRight, teethLeft, teethLeftSmall, teethTopLeft];
    // const items = [teethRight];
    items.forEach((element: HTMLElement) => {
      addDrag(element);
    });
  }
}
