import Carousel from './Carousel';
import isScreenSm from '../utils/isScreenSm';

class NewCarouselFeedback extends Carousel {
  // private autoplay = 5000;
  // private progressBar: SVGElement;

  constructor(...props) {
    super(...props);

    this.progressBar = this.controls.querySelector('.slider-btn--next .circle-progress-bar');
    this.autoplayDelay = 5000;
    this.progress = {
      from: 1000,
      to: 840,
      step: 160, // from - to; 100%T
    };

    this.start = undefined;
    this.rAF = undefined;
    this.isScreenSm = isScreenSm().matches;

    this.animatedProgressBar = this.animatedProgressBar.bind(this);

    this.setOptions();
  }

  animatedProgressBar(timestamp) {
    if (this.start === undefined) this.start = timestamp;
    // Прошло времени (мс) со старта
    const elapsed = timestamp - this.start;
    // Прогресс в %
    const progress = (elapsed / this.autoplayDelay) * 100;
    // Прогресс линии
    const dashProgress = this.progress.step * (progress / 100);
    this.progressBar.style.strokeDashoffset = this.progress.from - dashProgress;

    if (elapsed < this.autoplayDelay) {
      this.rAF = requestAnimationFrame(this.animatedProgressBar);
    }
  }

  handleSlideChange() {
    if (this.rAF) {
      cancelAnimationFrame(this.rAF);
    }

    this.start = undefined;
    this.progressBar.style = '';

    this.rAF = requestAnimationFrame(this.animatedProgressBar);
  }

  setOptions() {
    const on = {
      slideChange: () => this.handleSlideChange(),
    };

    let pagination = false;
    let scrollbar = false;

    console.log('this.isScreenLg');
    console.log(this.isScreenSm);

    if (this.isScreenSm) {
      pagination = {
        el: this.controls.querySelector('.slider-pagination'),
        type: 'fraction',
        renderFraction(currentClass, totalClass) {
          return `<span class="${currentClass}"></span> \\ <span class="${totalClass}"></span>`;
        },
      };
    } else {
      scrollbar = {
        el: this.elm.querySelector('.swiper-scrollbar'),
        draggable: true,
      };
    }

    const navigation = {
      nextEl: this.controls.querySelector('.slider-btn--next'),
      prevEl: this.controls.querySelector('.slider-btn--prev'),
    };

    if (this.isScreenSm) {
      this.params = {
        ...this.params,
        loop: true,
        autoplay: {
          delay: this.autoplayDelay,
          disableOnInteraction: false,
        },
        spaceBetween: 50,
        on,
      };
    } else {
      this.params = {
        spaceBetween: 40,
        slidesPerView: 'auto',
        clickable: true,
      };
    }

    this.params = {
      ...this.params,
      navigation,
      pagination,
      scrollbar,
    };
  }
}

export default NewCarouselFeedback;
