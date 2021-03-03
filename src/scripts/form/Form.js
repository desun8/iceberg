// eslint-disable-next-line max-classes-per-file
import isMobile from '../utils/isMobile';
import isDesktop from '../utils/isDesktop';
import DatePicker from './DatePicker';
import Select from './Select';
import FormSetup from './FormSetup';

export const APPOINTMENT = 'appointment'; // прием
export const CONSULTATION = 'consultation'; // консультация

class Constructor {
  static createWrapper(type) {
    const elm = document.createElement('div');
    elm.dataset.type = `form-${type}`;
    elm.dataset.active = 'false';
    elm.style.position = 'relative'; // для блока с сообщением об отправке
    return elm;
  }

  static clone(template, selector) {
    const cloneTarget = template.content.querySelector(selector);
    const cloneElm = document.importNode(cloneTarget, true);
    cloneElm.id = '';
    return cloneElm;
  }

  static create(formType) {
    if (!('content' in document.createElement('template'))) {
      return;
    }

    let modalContent;
    let formContainer;
    let noteContainer;
    // Десктоп
    if (isDesktop()) {
      modalContent = document.querySelector('.page-modal-footer');
      formContainer = modalContent.querySelector('.page-modal-footer__form');
      noteContainer = modalContent.querySelector('.page-modal-footer__note .modal__body');
    } else {
      modalContent = document.querySelector('.page-modal__content');
    }

    const template = document.querySelector('template');

    const form = this.clone(template, '#template-form');
    form.id = `form-${formType}`;
    form.dataset.type = `${formType.toUpperCase()}_FORM`;

    const successMessage = this.clone(template, '#template-form-success');

    const wrapper = this.createWrapper(formType);
    wrapper.appendChild(form);
    wrapper.appendChild(successMessage);

    if (formType === CONSULTATION) {
      const note = this.clone(template, '#template-form-note');

      if (noteContainer) {
        noteContainer.innerHTML = '';
        noteContainer.appendChild(note);
      } else {
        wrapper.appendChild(note);
      }
    }

    if (formContainer) {
      formContainer.appendChild(wrapper);
    } else {
      modalContent.appendChild(wrapper);
    }

    // eslint-disable-next-line consistent-return
    return form;
  }
}

class Form {
  constructor(formType) {
    this.formType = formType;
    this.form = undefined;

    // экземпляры кастомных полей
    // нужны для доступа к их методам
    this.datepickerInstance = undefined;
    this.selectInstance = undefined;
  }

  create() {
    this.form = Constructor.create(this.formType);

    this.datepickerInstance = new DatePicker(this.form.querySelector('.form__datepicker'));
    if (!isMobile()) {
      this.selectInstance = new Select(this.form.querySelector('.custom-select'));
    }
  }

  init() {
    if (!this.form) {
      this.create();

      // eslint-disable-next-line no-new
      new FormSetup(this.form, this.datepickerInstance, this.selectInstance);
    }
  }
}
export default Form;
