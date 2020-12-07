import './scripts/lib/modernizr'; // Проверяет на поддержку webp и webm
import { mediaQueryEvent } from './scripts/utils/mediaQueryEvent';
import initMap from './scripts/map';
import CarouselFeature from './scripts/Carousel/CarouselFeature';
import TabsFeature from './scripts/Carousel/TabsFeature';
import CarouselFeedback from './scripts/Carousel/CarouselFeedback';
import autoplayVideo from './scripts/utils/autoplayVideo';
import fullscreen from './scripts/block-video/fullscreen';
import Modal from './scripts/Modal';
import Menu from './scripts/menu';

// меню
new Menu();

// модалка
// initPageModal();
new Modal();

// карта
initMap();

// карусель особенности
const initFeatureCarousel = () => {
  let carouselFeature;

  const elm = document.querySelector('.feature-slider');
  const wrapper = elm.querySelector('.features-list');
  const slides = wrapper.querySelectorAll('.features-list__item');

  const initSmScreen = () => {
    carouselFeature?.destroy();

    carouselFeature = new CarouselFeature(elm, wrapper, slides);
    carouselFeature.init();
  };

  const initMdScreen = () => {
    carouselFeature?.destroy();

    carouselFeature = new TabsFeature(elm, wrapper, slides);
    carouselFeature.init();
  };

  mediaQueryEvent(initSmScreen, initMdScreen);
};
initFeatureCarousel();

// карусель отзывы
const initFeedbackCarousel = () => {
  const elm = document.querySelector('.feedback-slider');
  const wrapper = elm.querySelector('.feedback-list');
  const slides = wrapper.querySelectorAll('.feedback-list__item');

  const carouselFeedback = new CarouselFeedback(elm, wrapper, slides);
  carouselFeedback.init();
};
initFeedbackCarousel();

// блок видео
const initVideoBlock = () => {
  const videoBg = document.querySelector('.block-video__bg-video video');
  autoplayVideo(videoBg);
  fullscreen();
};
initVideoBlock();
