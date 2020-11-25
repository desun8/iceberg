import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

class Carousel {
  constructor(elm, wrapper, slides) {
    this.elm = elm;
    this.wrapper = wrapper;
    this.slides = slides;
    this.swiper = undefined;
    this.params = {};
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
