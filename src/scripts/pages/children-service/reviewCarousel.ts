import NewCarouselFeedback from "../../Carousel/NewCarouselFeedback";
import { mediaQueryEvent } from "../../utils/mediaQueryEvent";
import isScreenLg from "../../utils/isScreenSm";

enum CarouselType {
  Mobile,
  Desktop
}

export default () => {
  let carousel: NewCarouselFeedback | null = null;

  const element = document.querySelector(".children-reviews-slider") as HTMLElement;
  const wrapper = element.querySelector(".children-reviews-slider__slides") as HTMLElement;
  const slides = wrapper.querySelectorAll(".children-review");

  const destroyCarousel = () => {
    if (carousel !== null) {
      carousel.destroy();
      carousel = null;
    }
  };

  const initCarousel = (type: CarouselType) => {
    destroyCarousel();

    const controls = type === CarouselType.Mobile ? element.querySelector(".slider-controls") : document.querySelector(".children-reviews > .slider-controls");
    console.log(controls);
    carousel = new NewCarouselFeedback(element, wrapper, slides, controls);
    carousel.init();
  };

  mediaQueryEvent(
    () => initCarousel(CarouselType.Mobile),
    () => initCarousel(CarouselType.Desktop),
    isScreenLg(),
  );
}
