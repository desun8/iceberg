import Swiper, {
  Pagination, Navigation, Autoplay, EffectFade, Scrollbar,
} from 'swiper';

Swiper.use([Pagination, Navigation, Autoplay, EffectFade, Scrollbar]);

class Carousel {
  constructor(elm, wrapper, slides, controls = null) {
    this.elm = elm;
    this.wrapper = wrapper;
    this.slides = slides;
    this.controls = controls;
    this.swiper = undefined;
    this.params = {
      effect: 'fade',
      fadeEffect: {
        crossFade: false,
      },
    };
    this.classNames = {
      container: 'swiper-container',
      wrapper: 'swiper-wrapper',
      slide: 'swiper-slide',
    };
  }

  // Добавляем/удаляем css классы для корректной работы карусели
  setClassNames(isRemove = false) {
    if (isRemove) {
      this.elm.classList.remove(this.classNames.container);
      this.wrapper.classList.remove(this.classNames.wrapper);
      this.slides.forEach((slide) => {
        slide.classList.remove(this.classNames.slide);
      });
    } else {
      this.elm.classList.add(this.classNames.container);
      this.wrapper.classList.add(this.classNames.wrapper);
      this.slides.forEach((slide) => {
        slide.classList.add(this.classNames.slide);
      });
    }
  }

  addClassNames() {
    this.setClassNames();
  }

  removeClassNames() {
    this.setClassNames(true);
  }

  init() {
    this.addClassNames();
    this.swiper = new Swiper(this.elm, this.params);
  }

  destroy() {
    this.removeClassNames();
    this.swiper.destroy();
  }
}

export class NewCarousel {
  constructor(elm) {
    this.elm = elm;
    this.wrapper = this.elm.querySelector('.swiper-wrapper');
    this.slides = this.elm.querySelectorAll('.swiper-slide');
    this.swiper = undefined;
    this.params = {
      effect: 'fade',
      fadeEffect: {
        crossFade: false,
      },
    };
    this.classNames = {
      container: 'swiper-container',
      wrapper: 'swiper-wrapper',
      slide: 'swiper-slide',
    };
  }

  // Добавляем/удаляем css классы для корректной работы карусели
  setClassNames(isRemove = false) {
    if (isRemove) {
      this.elm.classList.remove(this.classNames.container);
      this.wrapper.classList.remove(this.classNames.wrapper);
      this.slides.forEach((slide) => {
        slide.classList.remove(this.classNames.slide);
      });
    } else {
      this.elm.classList.add(this.classNames.container);
      this.wrapper.classList.add(this.classNames.wrapper);
      this.slides.forEach((slide) => {
        slide.classList.add(this.classNames.slide);
      });
    }
  }

  addClassNames() {
    this.setClassNames();
  }

  removeClassNames() {
    this.setClassNames(true);
  }

  init() {
    this.addClassNames();
    this.swiper = new Swiper(this.elm, this.params);
  }

  destroy() {
    this.removeClassNames();
    this.swiper.destroy();
  }
}

export default Carousel;
