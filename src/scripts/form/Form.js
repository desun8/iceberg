// eslint-disable-next-line max-classes-per-file
import isMobile from '../utils/isMobile';
import { isDesktop as mqDesktop } from '../utils/mediaQueryEvent';
import DatePicker from './datePicker';

export const APPOINTMENT = 'appointment'; // прием
export const CONSULTATION = 'consultation'; // консультация

async function loadSelect(elm) {
  const module = await import('./select');
  const Select = module.default;

  // eslint-disable-next-line no-new
  new Select(elm);
}

const isDesktop = () => !isMobile() && mqDesktop;

class FormConstructor {
  static createWrapper(type) {
    const elm = document.createElement('div');
    elm.dataset.type = `form-${type}`;
    elm.dataset.active = 'false';
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

    const wrapper = this.createWrapper(formType);
    wrapper.appendChild(form);

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
  }

  createForm() {
    this.form = FormConstructor.create(this.formType);

    // eslint-disable-next-line no-new
    new DatePicker(this.form.querySelector('.form__datepicker'));
    if (!isMobile()) {
      loadSelect(this.form.querySelector('.custom-select'));
    }
  }

  init() {
    if (!this.form) {
      this.createForm();
    }
  }
}

export default Form;
