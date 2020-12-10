// 🐼
// отображение/скрытие блока с сообщением об отправке (успешной)
// и очитска формы (лучше перенести?)
import scrollLock from 'scroll-lock';
import isDesktop from '../utils/isDesktop';

class Success {
  static get modalElm() {
    return document.querySelector('#page-modal');
  }

  static show(formElm, msgElm) {
    // прокручиваем модалку в начало (вверх) и отключаем скролл
    if (!isDesktop()) {
      const { modalElm } = this;
      modalElm.scrollTop = 0;
      scrollLock.removeScrollableTarget(modalElm);
    }

    formElm.classList.add('is-hide');
    msgElm.classList.add('is-show');
  }

  static hide(formElm, msgElm) {
    // возвращаем скролл
    if (!isDesktop()) {
      scrollLock.addScrollableTarget(this.modalElm);
    }

    formElm.classList.remove('is-hide');
    msgElm.classList.remove('is-show');
  }
}

export default Success;
