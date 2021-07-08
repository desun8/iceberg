// eslint-disable-next-line max-classes-per-file

// Функционал:
// - инициализация инпут-маски
// - валидация
// - отправка формы
// - отображение сообщения об успешной отправке
// - очистка полей формы
// *
// В форме используется инпутмаска
// https://github.com/RobinHerbots/Inputmask
// *
// Соответственно вся валидация учитывает наличие данной библиотеки
import Submit from './Submit';
import Success from './Success';
import Mask from './Mask';

class FormSetup {
  constructor(elm, datepickerInstance, selectInstance, dialogInstance) {
    this.$elm = {
      form: elm,
      name: elm.querySelector('[name=name]'),
      phone: elm.querySelector('[name=phone]'),
      select: elm.querySelector('[name=type]'),
      date: elm.querySelector('[name=date]'),
      message: elm.querySelector('[name=message]'),
      successMessage: {
        elm: document.querySelector('#page-feedback-success'),
        btn: document.querySelector('#page-feedback-success .page-feedback-success__close'),
      },
    };
    this.inputs = [
      this.$elm.name,
      this.$elm.phone,
      this.$elm.select,
      this.$elm.date,
      this.$elm.message,
    ];

    // нужны для сброса кастомных полей
    this.datepickerInstance = datepickerInstance;
    this.selectInstance = selectInstance;

    this.dialogInstance = dialogInstance;

    this.captchaKey = '6Ld-J0kaAAAAAP8EVz9EvYDlSEbbPUOEwi-WDfwG';
    this.submitUrl = this.$elm.form.action || '/ajax/form.php';
    this.formType = this.$elm.form.dataset.type;

    this.init();
  }

  addInputMask() {
    Mask.names(this.$elm.name);
    Mask.tel(this.$elm.phone);
  }

  // очистка значений полей
  reset() {
    this.inputs.forEach((input) => {
      // Если на инпуте используется маска,
      // то value устанавливается через ее метод
      if (input.inputmask) {
        input.inputmask.setValue('');
      } else {
        // eslint-disable-next-line no-param-reassign
        input.value = '';
      }

      // Сбрасывается/очищается через методы кастомных полей
      if (input.tagName === 'INPUT' && input.classList.contains('form__datepicker') && this.datepickerInstance) {
        // flatpickr
        this.datepickerInstance.clear();
      }

      // Сбрасывается/очищается через методы кастомных полей
      if (input.tagName === 'SELECT' && this.selectInstance) {
        // choices.js
        this.selectInstance?.clearValue();
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // TODO: удалить. Только для разработки без бека
    // this.toggleSuccessMessage(true);
    // this.inputs.forEach((input) => {
    //   console.log(input.name, input.value);
    // });

    (async () => {
      await Submit.send(this.inputs, this.submitUrl, this.captchaKey, this.formType);
      // console.log('await Submit.send end');

      // Если отправка прошла без ошибок,
      // то показываем блок с сообщение об успехе
      await this.dialogInstance.hide();
      await this.reset();
      await Success.show(this.$elm.successMessage.elm);
      // console.log('await Success.show end');
    })();
  }

  addEvents() {
    // сбрасываем css класс ошибки
    this.inputs.forEach((input) => {
      if (!input.inputmask) {
        // сбрасываем класс ошибки
        input.addEventListener('change', Mask.onKeyDown);
      }
    });

    // Закрытие сообщения об успехе и отображение формы
    this.$elm.successMessage.btn.addEventListener('click', () => {
      Success.hide(this.$elm.successMessage.elm);
      this.reset();
    });

    // отправка формы
    this.$elm.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  init() {
    this.addInputMask();
    this.addEvents();
  }
}

export default FormSetup;
