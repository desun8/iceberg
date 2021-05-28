import NewCarouselFeedback from "../../Carousel/NewCarouselFeedback";

export default () => {
  const element = document.querySelector(".children-reviews-slider") as HTMLElement;
  const wrapper = element.querySelector(".children-reviews-slider__slides") as HTMLElement;
  const slides = wrapper.querySelectorAll(".children-review");

  const carousel = new NewCarouselFeedback(element, wrapper, slides);
  carousel.init();
}
