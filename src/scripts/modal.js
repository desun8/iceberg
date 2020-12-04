import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import DatePicker from './datePicker';
import isMobile from './utils/isMobile';
import Form from './form/Form';
// import Select from './select';

async function loadSelect(elm) {
  const module = await import('./select');
  const Select = module.default;

  // eslint-disable-next-line no-new
  new Select(elm);
}

const addForm = () => {
  // Проверяем поддерживает ли браузер тег <template>
// проверив наличие аттрибута content у элемента template
  if (!('content' in document.createElement('template'))) { return; }

  const modalContent = document.querySelector('.page-modal__content');
  modalContent.innerHTML = '';

  const template = document.querySelector('template');
  const form = template.content.querySelector('#template-form');

  const clone = document.importNode(form, true);
  modalContent.appendChild(clone);
};

const addFormWithNote = () => {
  // Проверяем поддерживает ли браузер тег <template>
// проверив наличие аттрибута content у элемента template
  if (!('content' in document.createElement('template'))) { return; }

  const modalContent = document.querySelector('.page-modal__content');
  modalContent.innerHTML = '';

  const template = document.querySelector('template');
  const form = template.content.querySelector('#template-form');
  const formNote = template.content.querySelector('#template-form-note');

  const clone = document.importNode(form, true);
  const cloneNote = document.importNode(formNote, true);

  // initDatePicker(clone.querySelector('.form__datepicker'));
  new DatePicker(clone.querySelector('.form__datepicker'));

  if (isMobile() === false) {
    console.warn('IS MOBILE');
    // new Select(clone.querySelector('.form__select'));
    loadSelect(clone.querySelector('.custom-select'));
  }

  modalContent.appendChild(clone);
  modalContent.appendChild(cloneNote);
};

const initPageModal = () => {
  const btnsOpen = document.querySelectorAll('.js-modal-open');
  const btnClose = document.querySelector('.js-modal-close');
  const element = document.querySelector('#page-modal');
  const dialog = new A11yDialog(element);

  const handleShow = () => {
    btnClose.classList.add('hamburger--close');

    // if (btnOpen) {
    //   btnOpen.classList.add('hamburger--close');
    // }
  };
  const handleHide = () => {
    btnClose.classList.remove('hamburger--close');

    // if (btnOpen) {
    //   btnOpen.classList.remove('hamburger--close');
    // }
  };

  dialog.on('show', handleShow);
  dialog.on('hide', handleHide);

  btnsOpen.forEach((btn) => {
    btn.addEventListener('click', () => {
      dialog.show();
      scrollLock.disablePageScroll(element);
    });
  });

  btnClose.addEventListener('click', () => {
    dialog.hide();
    scrollLock.enablePageScroll(element);
  });

  dialog.show();
  scrollLock.disablePageScroll(element);

  // addForm();
  // addFormWithNote();
  new Form('1');
};

export default initPageModal;
