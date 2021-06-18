// 🐼
// отображение/скрытие блока с сообщением об отправке (успешной)
// и очитска формы (лучше перенести?)

class SuccessDocument {
  constructor(private successElm: HTMLElement, private formElm: HTMLElement) {
  }

  private scrollTop() {
    if (window.APP.scrollbar) {
      window.APP.scrollbar.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
  }

  show() {
    this.scrollTop();
    this.formElm.style.display = "none";
    this.successElm.style.display = "";
  }

  hide() {
    this.scrollTop();
    this.successElm.style.display = "none";
    this.formElm.style.display = "";
  }
}

export default SuccessDocument;
