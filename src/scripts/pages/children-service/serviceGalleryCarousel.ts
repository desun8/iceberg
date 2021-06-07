import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

Swiper.use([Autoplay, Navigation, Pagination, EffectFade]);

export default () => {
  // В целом, для других элементов,
  // нужно будет менять только карусель (или убирать).
  // Сам photoswiper сейчас должен быть универсальным.{
  const element = document.querySelector(".children-services-gallery.swiper-container") as HTMLElement;

  const progressBarElement = document.querySelector(".children-services-gallery.swiper-container .progress-bar__inner") as HTMLElement;
  const autoplayDelay = 5000;
  let isAnimationStart: null | number = null;
  let rAF: null | number = null;

  const animatedProgressBar = (timestamp: number) => {
    if (isAnimationStart === null) isAnimationStart = timestamp;
    // Прошло времени (мс) со старта
    const elapsed = timestamp - isAnimationStart;
    // Прогресс в %
    const progress = (elapsed / autoplayDelay);
    progressBarElement.style.transformOrigin = "0 50%";
    progressBarElement.style.transform = `scaleX(${progress})`;

    if (elapsed < autoplayDelay) {
      rAF = requestAnimationFrame(animatedProgressBar);
    }
  };

  const handleSlideChange = () => {
    if (rAF) {
      cancelAnimationFrame(rAF);
    }

    isAnimationStart = null;
    progressBarElement.style.transform = "";

    rAF = requestAnimationFrame(animatedProgressBar);
  };


  new Swiper(element, {
    loop: true,
    autoplay: {
      delay: autoplayDelay,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      formatFractionCurrent: (number): any => {
        if (number < 10) {
          return "0" + number;
        }

        return number;
      },
    },
    navigation: {
      nextEl: ".children-services-gallery__button-next",
      prevEl: ".children-services-gallery__button-prev",
    },
    on: {
      slideChange: () => handleSlideChange(),
    },
  });
}
