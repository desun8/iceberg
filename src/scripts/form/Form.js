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

class AddForm {
  static createElm(type) {
    const elm = document.createElement('div');
    elm.dataset.type = `form-${type}`;
    return elm;
  }

  static addNote(template) {
    const note = template.content.querySelector('#template-form-note');
    const clone = document.importNode(note, true);
    clone.id = '';

    return clone;
  }

  // TODO: Элемент, в который добавляется форма, отличается на десктопе и телефонах.
  static add(formType) {
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
    // modalContent.innerHTML = '';

    const template = document.querySelector('template');
    const templateForm = template.content.querySelector('#template-form');

    const form = document.importNode(templateForm, true);
    form.id = `form-${formType}`;
    const wrapper = this.createElm(formType);
    wrapper.appendChild(form);

    if (formType === CONSULTATION) {
      if (noteContainer) {
        noteContainer.innerHTML = '';
        noteContainer.appendChild(this.addNote(template));
      } else {
        wrapper.appendChild(this.addNote(template));
      }
    }

    console.log(wrapper);
    if (formContainer) {
      formContainer.appendChild(wrapper);
    } else {
      modalContent.appendChild(wrapper);
    }

    return form;
  }
}

class Form {
  constructor(formType) {
    this.formType = formType;
    this.isInit = false;
    this.form = undefined;
  }

  init() {
    if (!this.isInit) {
      this.isInit = true;
      this.form = AddForm.add(this.formType);

      new DatePicker(this.form.querySelector('.form__datepicker'));
      if (isMobile() === false) {
        loadSelect(this.form.querySelector('.custom-select'));
      }
    }
  }
}

export default Form;
