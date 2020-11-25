import { mediaQueryEvent } from './scripts/utils/mediaQueryEvent';
import initMap from './scripts/map';
import CarouselFeature from './scripts/Carousel/CarouselFeature';
import TabsFeature from './scripts/Carousel/TabsFeature';

initMap();

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
