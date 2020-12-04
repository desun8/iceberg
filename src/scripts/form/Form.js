// eslint-disable-next-line max-classes-per-file

// appointment - прием
// consultation - консультация

class AddForm {
  static createElm(type) {
    const elm = document.createElement('div');
    elm.dataset.type = `form-${type}`;
    return elm;
  }

  static add(formType) {
    if (!('content' in document.createElement('template'))) { return; }

    const modalContent = document.querySelector('.page-modal__content');
    modalContent.innerHTML = '';

    const template = document.querySelector('template');
    const form = template.content.querySelector('#template-form');

    const clone = document.importNode(form, true);
    clone.id = `form-${formType}`;
    const wrapper = this.createElm(formType);
    wrapper.appendChild(clone);

    console.log(wrapper);
    modalContent.appendChild(wrapper);
  }
}

class Form {
  constructor(formType) {
    this.formType = formType;
    this.init();
  }

  init() {
    AddForm.add(this.formType);
  }
}

export default Form;
