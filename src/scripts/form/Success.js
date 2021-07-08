// 🐼
// отображение/скрытие блока с сообщением об отправке (успешной)
// и очитска формы (лучше перенести?)

class Success {
  static get modalElm() {
    return document.querySelector('#page-feedback-modal');
  }

  static show(msgElm) {
    msgElm.classList.add('is-show');

    setTimeout(() => {
      Success.hide(msgElm);
    }, 3000);
  }

  static hide(msgElm) {
    msgElm.classList.remove('is-show');
  }
}

export default Success;
