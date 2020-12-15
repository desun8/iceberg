import { NewCarousel } from './Carousel';

class CarouselProgress extends NewCarousel {
  constructor(...props) {
    super(...props);

    this.autoplayDelay = 5000;
    this.setOptions();
  }

  setOptions() {
    const pagination = {
      el: this.elm.querySelector('.swiper-progress'),
      type: 'progressbar',
    };

    this.params = {
      ...this.params,
      loop: true,
      autoplay: {
        delay: this.autoplayDelay,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          spaceBetween: 50,
        },
        1024: {
          spaceBetween: 200,
        },
        1220: {
          spaceBetween: 300,
        },
        1550: {
          spaceBetween: 400,
        },
      },
      pagination,
    };
  }
}

export default CarouselProgress;
