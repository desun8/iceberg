// 🐼
// инициализация инпут-маски
import Inputmask from "inputmask";
import Validation from "./Validation";
import { FormElm } from "./types";

class Mask {
  static get InputMask() {
    // Странно импортируется, скорее всего это проблемы сборщика.
    // Чтобы работало, нужно вызывать "Inputmask.default"
    // @ts-ignore
    return Inputmask.default;
  }

  // убираем css класс ошибки
  static onKeyDown(event: Event) {
    Validation.setClass(event.target as FormElm, false);
  }

  static names(input: HTMLInputElement) {
    const {
      onKeyDown,
    } = this;

    input.addEventListener("keypress", (event) => {
      const isForbiddenKey = !/[а-я-]/i.test(event.key)

      if (isForbiddenKey) {
        event.preventDefault();
      } else {
        onKeyDown(event);
      }
    });
  }

  static cyrillic(input: HTMLInputElement) {
    const {
      onKeyDown,
    } = this;

    input.addEventListener("keypress", (event) => {
      const isForbiddenKey = !/[а-я\s\d.,-/\\]/i.test(event.key)

      if (isForbiddenKey) {
        event.preventDefault();
      } else {
        onKeyDown(event);
      }
    });
  }

  // Можно тут же для инпута устанавливать inputmode="tel"
  // Чтобы на тачах появлялась клавиатура для набора номера телефона
  // Или непосредственно в разметке это делать
  static tel(input: HTMLInputElement) {
    const {
      InputMask,
      onKeyDown,
    } = this;
    new InputMask(
      "+7 (999) 999-99-99", {
        placeholder: "x",
        onKeyDown,
      },
    ).mask(input);
  }

  static date(input: HTMLInputElement) {
    const {
      InputMask,
      onKeyDown,
    } = this;
    new InputMask(
      "99.99.9999", {
        placeholder: "дд.мм.гггг",
        onKeyDown,
      },
    ).mask(input);
  }

  static documentSeries(input: HTMLInputElement, type?: string) {
    const {
      InputMask,
      onKeyDown,
    } = this;

    const mask = type === "document-birth" ? "**|-*|-*[*]" : "9999";

    if (input.inputmask) {
      input.inputmask.remove();
    }

    new InputMask(
      mask, {
        placeholder: "x",
        greedy: false,
        onKeyDown,
      },
    ).mask(input);
  }

  static documentNumber(input: HTMLInputElement) {
    const {
      InputMask,
      onKeyDown,
    } = this;
    new InputMask(
      "999999", {
        placeholder: "x",
        onKeyDown,
      },
    ).mask(input);
  }
}

export default Mask;
