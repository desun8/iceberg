// eslint-disable-next-line max-classes-per-file
import Inputmask from 'inputmask';
import scrollLock from 'scroll-lock';
import isDesktop from '../utils/isDesktop';

const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate()
    && someDate.getMonth() === today.getMonth()
    && someDate.getFullYear() === today.getFullYear();
};

// если используются кастомные инпуты с обертками
const getErrorElm = (input) => input.closest('.form__elm');

// ✅
// валидация
class Validation {
  static get errorClass() {
    return 'has-error';
  }

  static addErrorClass(input, isAdd) {
    if (isAdd) {
      getErrorElm(input)
        .classList
        .add(this.errorClass);
    }
  }

  static removeErrorClass(input) {
    getErrorElm(input)
      .classList
      .remove(this.errorClass);
  }

  static checkName(input) {
    // проверка на количество символов
    const { value } = input;
    const isValid = value.length > 1;

    this.addErrorClass(input, !isValid);

    console.warn('Проверка имени', isValid);
    return isValid;
  }

  static checkPhone(input) {
    // проверка на заполненность
    const isValid = input.inputmask.isComplete();

    this.addErrorClass(input, !isValid);

    console.warn('Проверка телефона', isValid);
    return isValid;
  }

  static checkSelect(input) {
    const { value } = input;
    const isValid = !!value || value === 0;

    this.addErrorClass(input, !isValid);

    console.warn('Проверка селекта', isValid);
    return isValid;
  }

  static checkDate(input) {
    const { value } = input; // yyyy-mm-dd

    if (!value) {
      console.warn('Дата пустая', false);
      input.classList.add(this.errorClass);
      this.addErrorClass(input, true);
      return false;
    }

    const date = new Date(value);
    const isValid = isToday(date) || date > Date.now();

    this.addErrorClass(input, !isValid);

    console.warn('Проверка даты', isValid);
    return isValid;
  }

  static check(type, input) {
    switch (type) {
      case 'name':
        return this.checkName(input);
      case 'phone':
        return this.checkPhone(input);
      case 'select':
        return this.checkSelect(input);
      case 'date':
        return this.checkDate(input);
      default:
        return false;
    }
  }
}

// ✅
// инициализация инпут-маски
class Mask {
  static get regName() {
    return '^[А-Яа-яA-Za-z]+( [А-Яа-яA-Za-z]+)*$';
  }

  static get InputMask() {
    // Странно импортируется, чтобы работало, нужно вызывать "Inputmask.default"
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

class Formdata {
  static create(inputs = []) {
    const formData = new FormData();

    inputs.forEach((item) => {
      formData.append(item.name, item.value);
    });

    return formData;
  }
}

// отображение/скрытие блока с сообщением об отправке (успешной)
// и очитска формы (лучше перенести?)
class Success {
  static get modalElm() {
    return document.querySelector('#page-modal');
  }

  static show(formElm, msgElm) {
    if (!isDesktop()) {
      const { modalElm } = this;
      modalElm.scrollTop = 0;
      scrollLock.removeScrollableTarget(modalElm);
    }

    formElm.classList.add('is-hide');
    msgElm.classList.add('is-show');
  }

  static hide(formElm, msgElm) {
    if (!isDesktop()) {
      scrollLock.addScrollableTarget(this.modalElm);
    }

    formElm.classList.remove('is-hide');
    msgElm.classList.remove('is-show');
  }

  static clearForm(inputs, clearDatepicker, clearSelect) {
    inputs.forEach((input) => {
      if (input.inputmask) {
        input.inputmask.setValue('');
      } else {
        // eslint-disable-next-line no-param-reassign
        input.value = '';
      }

      if (input.tagName === 'INPUT' && input.classList.contains('form__datepicker') && clearDatepicker) {
        clearDatepicker();
      }

      if (input.tagName === 'SELECT' && clearSelect) {
        clearSelect();
      }
    });
  }
}

class Submit {
  static isValid(inputs = []) {
    const requiredElms = inputs.filter((input) => input.dataset.required === 'true');
    const isInvalid = requiredElms.some((elm) => Validation.check(elm.dataset.name, elm) === false);
    return !isInvalid;
  }

  static fetch(url, formData) {
    const params = {
      method: 'POST',
      mode: 'no-cors', // TODO: удалить при натягивании
      body: formData,
    };

    const handleErrors = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    };
    const handleSuccess = (response) => {
      // Success.toggleMessage(true);
      // Success.clearForm();

      console.log('форма отправилась');
      console.log(response.json());
      // console.log(response.json().status);
    };

    fetch(url, params)
      // TODO: раскомментировать при натягивании
      // .then(handleErrors)
      // .then(handleSuccess)
      .catch((error) => console.error('Форма не отправилась', error));
  }

  // невидимая гугл-каптча
  static recaptcha(key, formData, fetch) {
    try {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(key, { action: 'form' })
          .then((token) => {
            formData.append('recaptcha_response', token);
            fetch(formData);
          })
          .then((res) => res);
      });
    } catch (e) {
      console.error('Ошибка с рекаптчей -> Submit.recaptcha', e);
    }
  }

  static handleSuccess(formElm, msgElm) {
    console.warn('HANDLE_SUCCESS');
    Success.toggleMessage(true, formElm, msgElm);
    Success.clearForm();
  }

  static send(inputs = [], url, captchaKey) {
    if (this.isValid(inputs)) {
      const formData = Formdata.create(inputs);

      // проверка значений formData
      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}, ${pair[1]}`);
      // }
      this.recaptcha(captchaKey, formData, (data) => this.fetch(url, data));
      //  Делать очистку формы и показ сообщения после отправки
      // this.handleSuccess(); // сейчас должна всегда срабатывать
    } else {
      console.warn('%c Поля заполнены с ошибками', 'color: #212121; font-weight: bold; padding: 1em; background: #fa9f0c');
      return Promise.reject(new Error('Форма не отправилась. Поля заполнены с ошибками'))
        .catch((error) => {
          // console.log(error); // печатает "провал" + Stacktrace
          throw error; // повторно выбрасываем ошибку, вызывая новый reject
        });
    }
  }
}

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
class Form {
  constructor(elm, datepickerInstance, selectInstance) {
    this.$elm = {
      form: elm,
      name: elm.querySelector('[name=name]'),
      phone: elm.querySelector('[name=phone]'),
      select: elm.querySelector('[name=type]'),
      date: elm.querySelector('[name=date]'),
      message: elm.querySelector('[name=message]'),
      successMessage: {
        elm: elm.nextElementSibling,
        btn: elm.nextElementSibling?.querySelector('button'),
      },
    };
    this.inputs = [
      this.$elm.name,
      this.$elm.phone,
      this.$elm.select,
      this.$elm.date,
      this.$elm.message,
    ];

    this.datepickerInstance = datepickerInstance;
    this.selectInstance = selectInstance;

    this.captchaKey = '6LeDFv8ZAAAAADvO8QeneqiQyoJE0f9UOIRvt8uG';
    this.submitUrl = this.$elm.form.action || 'ajax.php';

    this.init();
  }

  setInputMask() {
    Mask.name(this.$elm.name);
    Mask.phone(this.$elm.phone);
  }

  setInputs() {
    this.setInputMask();

    this.inputs.forEach((input) => {
      if (!input.inputmask) {
        input.addEventListener('change', Mask.onKeyDown);
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // TODO: удалить. Только для разработки без бека
    // this.toggleSuccessMessage(true);

    this.inputs.forEach((input) => {
      console.log(input.name, input.value);
    });

    (async () => {
      const submit = await Submit.send(this.inputs, this.submitUrl, this.captchaKey);
      console.log('await Submit.send end');
      const success = await Success.show(this.$elm.form, this.$elm.successMessage.elm);
      console.log('await Success.show end');
    })();
  }

  init() {
    this.setInputs();

    // удаляем пробелы по краям
    // this.$elm.name.addEventListener('change', (e) => {
    //   const { target } = e;
    //   const { value } = target;
    //   const valueTrim = value.trim();
    //
    //   target.inputmask.setValue(valueTrim);
    // });

    // показываем форму
    this.$elm.successMessage.btn.addEventListener('click', () => {
      Success.hide(this.$elm.form, this.$elm.successMessage.elm);
      Success.clearForm(
        this.inputs,
        () => this.datepickerInstance.clear(),
        () => this.selectInstance?.clearValue(),
      );
    });

    window.datepicker = this.datepickerInstance;

    // отправка формы
    this.$elm.form.addEventListener('submit', this.onSubmit.bind(this));
  }
}

export default Form;
