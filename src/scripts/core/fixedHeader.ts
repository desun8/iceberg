import { throttle } from "lodash";
import gsap from "gsap";

type Status = {
  offset: { x: number, y: number },
  limit: { x: number, y: number }
}

enum ScrollDirection {
  Up,
  Down
}

export default () => {
  const headerElement = document.querySelector(".page-header") as HTMLElement;
  const headerContainer = headerElement.querySelector(".header__container")!;
  const btnToTop = document.querySelector("#btn-to-top");
  const footerElement = document.querySelector(".page-footer");
  let clientHeight = document.documentElement.clientHeight + 200;
  const scrollbar = window.APP.scrollbar;
  const isNativeScroll = scrollbar === undefined;

  if (document.querySelector("#page-home")) {
    const heroBlock = document.querySelector(".block-hero") as HTMLElement;

    if (heroBlock) {
      clientHeight = heroBlock.offsetHeight + 200;
    }
  }

  let prevScrollTop = 0;
  let currScrollTop = 0;
  let isHeaderPinned = false;
  let isFooterVisible = false;
  let isBtnVisible = false;
  const setHeaderY = gsap.quickSetter(headerElement, "y", "px");

  const pinHeader = (isNative = true) => {
    if (isHeaderPinned) return;

    gsap.killTweensOf(headerContainer);
    isHeaderPinned = true;

    if (isNative) {
      headerElement.style.position = "fixed";
    }

    headerElement.style.zIndex = "10";
    headerElement.classList.add("is-fixed");
    gsap.set(headerContainer, {y: -200});
    gsap.to(headerContainer, {y: 0});
  };

  const resetStyles = (isNative: boolean) => {
    if (isNative) {
      headerElement.style.position = "";
    } else {
      setHeaderY(0);
    }

    headerElement.style.zIndex = "";
    headerElement.classList.remove("is-fixed");
    gsap.set(headerContainer, {y: 0});

    isHeaderPinned = false;
  };

  const unpinHeader = (isNative = true) => {
    if (!isHeaderPinned) return;

    gsap.killTweensOf(headerContainer);

    gsap.to(headerContainer, {
      y: -200,
      onComplete() {
        resetStyles(isNative);
      },
    });
  };

  const toggleBtnVisible = (shouldShow: boolean) => {
    if (btnToTop) {
      if (shouldShow) {
        if (isBtnVisible) return;

        isBtnVisible = true;
        gsap.killTweensOf(btnToTop);

        gsap.set(btnToTop, {
          x: 0,
          y: 60,
          alpha: 0,
        });
        gsap.to(btnToTop, {
          y: 0,
          alpha: 1,
          duration: 0.4,
        });
      } else {
        if (!isBtnVisible) return;

        gsap.killTweensOf(btnToTop);

        gsap.to(btnToTop, {
          alpha: 0,
          y: 60,
          duration: 0.2,
          onComplete() {
            gsap.set(btnToTop, {x: -200, y: 0});

            isBtnVisible = false;
          },
        });
      }
    }
  };

  const toggleHeader = (scrollTop: number) => {
    currScrollTop = scrollTop;
    const direction = currScrollTop > prevScrollTop ? ScrollDirection.Down : ScrollDirection.Up;

    if (direction === ScrollDirection.Up && !isFooterVisible) {
      if (currScrollTop > clientHeight) {
        if (!isNativeScroll) {
          setHeaderY(currScrollTop);
        }

        pinHeader(isNativeScroll);
        toggleBtnVisible(true);
      } else {
        resetStyles(isNativeScroll);
        toggleBtnVisible(false);
      }
    } else {
      unpinHeader(isNativeScroll);
      toggleBtnVisible(false);
    }

    prevScrollTop = currScrollTop;
  };

  if (footerElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const {isIntersecting} = entry;
          isFooterVisible = isIntersecting;
        });
      },
      {rootMargin: "200px", threshold: [0.1, 0.5, 1]},
    );

    observer.observe(footerElement);
  }

  if (isNativeScroll) {
    const handleScroll = () => {
      toggleHeader(document.documentElement.scrollTop);
    };
    const onScroll = throttle(handleScroll, 200);

    document.addEventListener("scroll", onScroll, {passive: true});
  } else {
    scrollbar!.addListener((status: Status) => {
      toggleHeader(status.offset.y);
    });
  }
}
