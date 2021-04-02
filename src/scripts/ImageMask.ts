import { autobind } from "./decorators/autobind";

enum CssVar {
  PosImg = "--pos-img",
  PosMask = "--pos-mask",
  MaskPosX = "--mask-pos-x",
  MaskPosY = "--mask-pos-y",
}

enum Position {
  ImgDefault = "0",
  ImgMove = "-100",
  MaskDefault = "100",
  MaskMove = "0",
}

enum State {
  Default,
  Mask
}

export default class ImageMask {
  private defaultImage: HTMLImageElement;
  private maskImage: HTMLImageElement;
  private state = State.Default;
  private touchStart = 0;
  private touchEnd = 0;
  private ticking = false;

  constructor(private rootElm: HTMLDivElement, defaultImage?: HTMLImageElement, maskImage?: HTMLImageElement) {
    this.defaultImage = defaultImage ? defaultImage : this.rootElm.querySelector(".employee-picture__image:not(.employee-picture__image--mask)")!;
    this.maskImage = maskImage ? maskImage : this.rootElm.querySelector(".employee-picture__image--mask")!;

    this.init();
  }

  private setState(newValue: State) {
    this.state = newValue;
  }

  private rAF(cb: Function, params: any[]) {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        cb(...params);
        this.ticking = false;
      });

      this.ticking = true;
    }
  };

  private swipe(): void {
    let state = this.state;
    const diff = this.touchStart - this.touchEnd;

    if (diff > 30) {
      state = State.Mask;
    } else if (diff < -30) {
      state = State.Default;
    }

    if (state !== this.state) {
      this.setState(state);

      switch (state) {
        case State.Default:
          this.rootElm.style.setProperty(CssVar.PosImg, Position.ImgDefault);
          this.rootElm.style.setProperty(CssVar.PosMask, Position.MaskDefault);
          console.log("default");
          break;
        case State.Mask:
          this.rootElm.style.setProperty(CssVar.PosImg, Position.ImgMove);
          this.rootElm.style.setProperty(CssVar.PosMask, Position.MaskMove);
          console.log("mask");
          break;
      }
    }
  }

  @autobind
  private moveMask(clientX: number, clientY: number): void {
    const rect = this.rootElm.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    this.rootElm.style.setProperty(CssVar.MaskPosX, x + "px");
    this.rootElm.style.setProperty(CssVar.MaskPosY, y + "px");
  }

  @autobind
  private handleTouchStart(event: TouchEvent) {
    this.touchStart = event.changedTouches[0].clientX;
  }

  @autobind
  private handleTouchEnd(event: TouchEvent) {
    this.touchEnd = event.changedTouches[0].clientX;

    this.swipe();
  }

  @autobind
  private handlePointerMove(event: PointerEvent) {
    const isMouse = event.pointerType === "mouse";

    if (isMouse) {
      this.rAF(this.moveMask, [event.clientX, event.clientY]);
    }
  }

  @autobind
  private handlePointerEnter(event: PointerEvent) {
    const isMouse = event.pointerType === "mouse";

    if (isMouse) {
      const setEnterStyle = (clientX: number, clientY: number) => {
        this.maskImage.style.transition = "none";
        this.moveMask(clientX, clientY);

        setTimeout(() => {
          this.maskImage.style.transition = "";
          this.maskImage.style.opacity = "1";
        }, 0);
      };

      this.rAF(setEnterStyle, [event.clientX, event.clientY]);
    }
  }

  @autobind
  private handlePointerLeave(event: PointerEvent) {
    const isMouse = event.pointerType === "mouse";

    if (isMouse) {
      this.maskImage.style.opacity = "0";
    }
  }

  private init() {
    console.log("Image mask init");
    this.rootElm.dataset.init = "true";

    this.rootElm.addEventListener("touchstart", this.handleTouchStart, false);
    this.rootElm.addEventListener("touchend", this.handleTouchEnd, false);

    this.rootElm.addEventListener("pointermove", this.handlePointerMove, false);
    this.rootElm.addEventListener("pointerenter", this.handlePointerEnter, false);
    this.rootElm.addEventListener("pointerleave", this.handlePointerLeave, false);
  }
}
