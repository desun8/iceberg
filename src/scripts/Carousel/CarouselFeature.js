import Carousel from './Carousel';

class CarouselFeature extends Carousel {
  constructor(...props) {
    super(...props);

    this.setOptions();
  }

  setOptions() {
    const pagination = {
      el: document.querySelector('.feature-slider .swiper-pagination'),
      type: 'bullets',
    };

    this.params = {
      ...this.params,
      loop: true,
      spaceBetween: 50,
      pagination,
    };
  }
}

export default CarouselFeature;
