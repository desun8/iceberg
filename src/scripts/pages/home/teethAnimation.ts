import gsap from "gsap";

export default () => {
  const container = document.querySelector("#teeth")!;

  const teethMain = container.querySelector(".teeth__main")!;
  const teethLeft = container.querySelector(".teeth__left")!;
  const teethRight = container.querySelector(".teeth__right")!;
  const teethLeftSmall = container.querySelector(".teeth__left-small")!;
  const teethRightSmall = container.querySelector(".teeth__right-small")!;
  const teethTopLeft = container.querySelector(".teeth__top-left")!;
  const teethTopRight = container.querySelector(".teeth__top-right")!;

  const btn = container.querySelector(".teeth-btn")!;

  const isDesktop = window.APP.isDesktop;

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

  timeline.reverse(-1);
  timeline.reversed(true);

  btn.addEventListener("click", (event: Event) => {
    const element = event.currentTarget as HTMLButtonElement;
    let newText = null;

    timeline.reversed(!timeline.reversed());

    if (timeline.reversed()) {
      newText = element.dataset.forward || newText;
    } else {
      newText = element.dataset.backward || newText;
    }

    element.lastChild!.nodeValue = newText;
  });

  // drag
  // const mainRect = teethMain.getBoundingClientRect();
  //
  // console.log(mainRect);
  //
  // teethRight.onmousedown = function (event) {
  //
  //   console.log(event);
  //
  //   let shiftX = event.clientX - teethRight.getBoundingClientRect().left;
  //   let shiftY = event.clientY - teethRight.getBoundingClientRect().top;
  //
  //   // ball.style.position = 'absolute';
  //   // ball.style.zIndex = 1000;
  //   // document.body.append(ball);
  //
  //   // const posX = ;
  //
  //   // moveAt(event.pageX, event.pageY);
  //
  //   // переносит мяч на координаты (pageX, pageY),
  //   // дополнительно учитывая изначальный сдвиг относительно указателя мыши
  //   function moveAt(pageX, pageY) {
  //     // teethRight.style.left = pageX - shiftX + "px";
  //     // teethRight.style.top = pageY - shiftY + "px";
  //     const posX = (mainRect.left + mainRect.width) - shiftX + "px";
  //     const posY = (mainRect.top + mainRect.height) - shiftY + "px";
  //     console.log(posX);
  //     teethRight.style.transform = `translate(${posX}, ${posY})`;
  //   }
  //
  //   function onMouseMove(event) {
  //     moveAt(event.pageX, event.pageY);
  //   }
  //
  //   // передвигаем мяч при событии mousemove
  //   document.addEventListener("mousemove", onMouseMove);
  //
  //   // отпустить мяч, удалить ненужные обработчики
  //   teethRight.onmouseup = function () {
  //     document.removeEventListener("mousemove", onMouseMove);
  //     teethRight.onmouseup = null;
  //   };
  //
  // };
  //
  // teethRight.ondragstart = function () {
  //   return false;
  // };

  // const move = (target: HTMLElement, clientX: number, clientY: number, pageX: number, pageY: number) => {
  //   const {left, top} = target.getBoundingClientRect();
  //
  //   let shiftX = clientX - left;
  //   let shiftY = clientY - top;
  //
  //   const newPosX = pageX - shiftX;
  //   const newPosY = pageY - shiftY;
  //
  //   console.log(mainRect.left - left, clientY);
  //
  //   target.style.transform = `translate(${mainRect.left - left}px, 0)`;
  // };
  //
  // teethRight!.addEventListener("mousemove", (event) => {
  //   move(teethRight, event.clientX, event.clientY, event.pageX, event.pageY)
  // });
}
