// 🐼
const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate()
    && someDate.getMonth() === today.getMonth()
    && someDate.getFullYear() === today.getFullYear();
};

// если используются кастомные инпуты с обертками
const getErrorElm = (input) => input.closest('.form__elm');

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
    // подразумевается использование inputmask
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
    // проверка на заполненность
    // дата < сегодня -> не валидна
    const { value } = input; // yyyy-mm-dd

    if (!value) {
      console.warn('Инпут-дата пустой', false);
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

export default Validation;
