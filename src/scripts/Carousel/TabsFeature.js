import Carousel from './Carousel';

class TabsFeature extends Carousel {
  constructor(...props) {
    super(...props);

    this.slidesImg = undefined;
    this.indexField = this.elm.querySelector('.feature-slider__index');
    this.progressBar = this.elm.querySelector('.feature-slider__progress');
    this.index = 0;
    this.timerId = undefined;
    this.autoplaySpeed = 10000; // ms

    this.classNames = {
      container: 'tabs-container',
      wrapper: 'tabs-wrapper',
      slide: 'tabs-slide',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  clearInterval() {
    if (this.timerId) clearInterval(this.timerId);
  }

  // Копируем изображения элементов (слайдов)
  // И вставляем в отдельный элемент
  cloneImgElms() {
    const parent = this.elm.querySelector('.feature-slider__images');
    const imgs = this.elm.querySelectorAll('.feature-card__picture');
    const clonedImgs = this.elm.querySelectorAll('.feature-slider__img');

    // Если уже было копирование (например был резайс окна), то просто присваиваем значение
    if (clonedImgs.length === imgs.length) {
      this.slidesImg = clonedImgs;
      return;
    }

    imgs.forEach((img) => {
      const clone = img.cloneNode(true);
      clone.className = '';
      clone.classList.add('feature-slider__img');

      if (this.slidesImg === undefined) {
        this.slidesImg = [];
      }
      this.slidesImg.push(clone);

      parent.appendChild(clone);

      console.log(clone);
    });
  }

  setIndexField() {
    this.indexField.innerText = this.index < 9 ? `0${this.index + 1}` : this.index;
  }

  animatedProgressBar() {
    this.progressBar.style = '';

    setTimeout(() => {
      this.progressBar.style.transition = `transform ${this.autoplaySpeed}ms linear`;
      this.progressBar.style.transform = 'scaleX(1)';
    }, 100);
  }

  changeSlide(activeIndex) {
    this.index = activeIndex;

    this.setIndexField();
    this.animatedProgressBar();

    this.setActiveClass(this.index);
  }

  autoplay() {
    this.clearInterval();

    this.timerId = setInterval(
      () => {
        const isNext = this.index + 1 < this.slides.length;
        this.index = isNext ? this.index + 1 : 0;

        this.changeSlide(this.index);
      }, this.autoplaySpeed,
    );
  }

  handleClick({ currentTarget }) {
    this.clearInterval();

    const index = parseInt(currentTarget.dataset.index, 10);

    this.changeSlide(index);
    this.autoplay();
  }

  setEvents(isRemove = false) {
    this.slides.forEach((item, index) => {
      // eslint-disable-next-line no-param-reassign
      item.dataset.index = `${index}`;

      if (isRemove) {
        item.removeEventListener('click', this.handleClick);
        item.removeEventListener('mouseenter', this.handleClick, { passive: true });
      } else {
        item.addEventListener('click', this.handleClick);
        item.addEventListener('mouseenter', this.handleClick, { passive: true });
      }
    });
  }

  addEvents() {
    this.setEvents();
  }

  removeEvents() {
    this.setEvents(true);
  }

  // Отображаем изображение, которое соответсвует индексу с текущим слайдом
  setActiveImg(activeIndex, isRemove = false) {
    if (isRemove) {
      this.slidesImg[activeIndex].classList.remove('is-active');
    } else {
      this.slidesImg[activeIndex].classList.add('is-active');
    }
  }

  // Переключаем css классы для активного/неактивного слайда + переключаем изображение
  setActiveClass(activeIndex) {
    this.slides.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('is-active');
        this.setActiveImg(index);
      } else {
        item.classList.remove('is-active');
        this.setActiveImg(index, true);
      }
    });
  }

  init() {
    this.addClassNames();
    this.cloneImgElms();
    this.changeSlide(this.index);
    this.autoplay();
    this.addEvents();
  }

  destroy() {
    this.clearInterval();
    this.removeClassNames();
    this.removeEvents();
  }
}

export default TabsFeature;
