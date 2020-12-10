// 🐼
// инициализация инпут-маски
import Inputmask from 'inputmask';
import Validation from './Validation';

class Mask {
  static get regName() {
    return '^[А-Яа-яA-Za-z]+( [А-Яа-яA-Za-z]+)*$';
  }

  static get InputMask() {
    // Странно импортируется, скорее всего это проблемы сборщика.
    // Чтобы работало, нужно вызывать "Inputmask.default"
    return Inputmask.default;
  }

  // убираем css класс ошибки
  static onKeyDown(event) {
    Validation.removeErrorClass(event.target);
  }

  static name(input) {
    const {
      InputMask,
      onKeyDown,
      regName,
    } = this;

    new InputMask({
      regex: regName,
      placeholder: '',
      showMaskOnHover: false,
      onKeyDown,
    }).mask(input);
  }

  // Можно тут же для инпута устанавливать inputmode="tel"
  // Чтобы на тачах появлялась клавиатура для набора номера телефона
  // Или непосредственно в разметке это делать
  static phone(input) {
    const {
      InputMask,
      onKeyDown,
    } = this;
    new InputMask(
      '+7 (999) 999 99 99', {
        placeholder: 'x',
        onKeyDown,
      },
    ).mask(input);
  }
}

export default Mask;
