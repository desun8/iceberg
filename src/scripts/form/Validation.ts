import { CheckType, FormElm, InputElement, ValidationCSSClass } from "./types";

const isToday = (someDate: Date) => {
  const today = new Date();
  return someDate.getDate() === today.getDate()
    && someDate.getMonth() === today.getMonth()
    && someDate.getFullYear() === today.getFullYear();
};

// если используются кастомные инпуты с обертками
const getFieldElm = (input: FormElm) => input.closest(".form-field");

// валидация
class Validation {
  static get errorClass() {
    return "has-error";
  }

  static get successClass() {
    return "is-success";
  }

  private static addClass(input: FormElm, type: ValidationCSSClass) {
    const className = type === ValidationCSSClass.Success ? this.successClass : this.errorClass;
    const elm = getFieldElm(input);

    if (elm) {
      elm.classList.add(className);
    }
  }

  private static removeClass(input: FormElm, type: ValidationCSSClass) {
    const className = type === ValidationCSSClass.Success ? this.successClass : this.errorClass;
    const elm = getFieldElm(input);

    if (elm) {
      elm.classList.remove(className);
    }
  }

  static setClass(input: FormElm, type: ValidationCSSClass, isAdd: boolean) {
    if (isAdd) {
      this.addClass(input, type);
    } else {
      this.removeClass(input, type);
    }
  }

  private static setValidationClass(input: FormElm, isValid: boolean) {
    if (isValid) {
      this.setClass(input, ValidationCSSClass.Error, false);
      this.setClass(input, ValidationCSSClass.Success, true);
    } else {
      this.setClass(input, ValidationCSSClass.Success, false);
      this.setClass(input, ValidationCSSClass.Error, true);
    }
  }

  static checkText(input: FormElm) {
    // проверка на количество символов
    const {value} = input;
    const isValid = value.length > 3;

    this.setValidationClass(input, isValid);

    console.warn("Проверка текста", isValid);
    return isValid;
  }

  static checkNameStrong(input: InputElement) {
    // проверка на допустимые символы
    const {value} = input;
    const isValid = value.match(/^[а-я]+-?(([а-я]+)?)*$/i) !== null;

    this.setValidationClass(input, isValid);

    console.warn("Строгая проверка имени", isValid);
    return isValid;
  }

  static checkTel(input: InputElement) {
    // проверка на заполненность
    // подразумевается использование inputmask
    let isValid = false;

    if (input.inputmask) {
      isValid = input.inputmask.isComplete();
      this.setValidationClass(input, isValid);

      console.warn("Проверка телефона", isValid);
    }

    return isValid;
  }

  static checkEmail(input: InputElement) {
    // проверка на допустимые символы
    const {value} = input;
    console.log(value);
    const isValid = value.match(/^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]+)])$/i) !== null;

    this.setValidationClass(input, isValid);

    console.warn("Проверка email", isValid);
    return isValid;
  }

  static checkSelect(input: HTMLInputElement) {
    const {value} = input;
    const isValid = !!value || value === "0";

    this.setValidationClass(input, isValid);

    console.warn("Проверка селекта", isValid);
    return isValid;
  }

  static checkDate(input: HTMLInputElement) {
    // проверка на заполненность
    // дата < сегодня -> не валидна
    const {value} = input; // yyyy-mm-dd
    console.log("Validation DATE");
    console.log("START");
    console.log(value);

    if (!value) {
      console.warn("Инпут-дата пустой", true);
      this.setValidationClass(input, false);
      console.log("END");
      return false;
    }

    const date = new Date(value);
    const isValid = isToday(date) || date.getTime() < Date.now();

    this.setValidationClass(input, isValid);

    console.warn("Проверка даты", isValid);
    console.log("END");
    return isValid;
  }

  static checkInputMask(input: InputElement) {
    // проверка на заполненность
    // подразумевается использование inputmask
    let isValid = false;

    if (input.inputmask) {
      isValid = input.inputmask.isComplete();
      this.setValidationClass(input, isValid);

      console.warn(`Проверка input[${input.name}] `, isValid);
    }

    return isValid;
  }

  static check(type: string, input: FormElm) {
    const isInputElm = input.tagName === "INPUT";
    switch (type) {
      case CheckType.Name:
        return isInputElm && this.checkNameStrong(input as InputElement);
      case CheckType.Tel:
        return isInputElm && this.checkInputMask(input as InputElement);
      case CheckType.Email:
        return isInputElm && this.checkEmail(input as InputElement);
      case CheckType.DocumentSeries:
        return isInputElm && this.checkInputMask(input as InputElement);
      case CheckType.DocumentNumber:
        return isInputElm && this.checkInputMask(input as InputElement);
      case CheckType.Select:
        return isInputElm && this.checkSelect(input as InputElement);
      case CheckType.Date:
        return isInputElm && this.checkDate(input as InputElement);
      case CheckType.Text:
        return this.checkText(input);
      default:
        return false;
    }
  }
}

export default Validation;
