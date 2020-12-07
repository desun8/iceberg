import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import DatePicker from './form/datePicker';
import isMobile from './utils/isMobile';
import Form, { APPOINTMENT, CONSULTATION } from './form/Form';
import { isDesktop } from './utils/mediaQueryEvent';

// import Select from './select';

async function loadSelect(elm) {
  const module = await import('./form/select');
  const Select = module.default;

  // eslint-disable-next-line no-new
  new Select(elm);
}

const addForm = () => {
  // Проверяем поддерживает ли браузер тег <template>
// проверив наличие аттрибута content у элемента template
  if (!('content' in document.createElement('template'))) {
    return;
  }

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
  if (!('content' in document.createElement('template'))) {
    return;
  }

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

const formAppointment = new Form('appointment');
const formConsultation = new Form('consultation');

const initPageModal = () => {
  const btnsOpen = document.querySelectorAll('.js-modal-open');
  const btnClose = document.querySelector('.js-modal-close');
  const element = document.querySelector('#page-modal');
  const dialog = new A11yDialog(element);
  const footerModal = document.querySelector('.page-modal-footer');

  const handleShow = () => {
    btnClose.classList.add('hamburger--close');
  };
  const handleHide = () => {
    btnClose.classList.remove('hamburger--close');
  };

  dialog.on('show', handleShow);
  dialog.on('hide', handleHide);

  const toggleForm = (form1, form2) => {
    if (form1) {
      form1.style.display = '';
    }

    if (form2) {
      form2.style.display = 'none';
    }
  };

  btnsOpen.forEach((btn) => {
    const isBtnForm = btn.classList.contains('js-form-open');
    const isBtnFeedback = btn.classList.contains('js-feedback-open');

    btn.addEventListener('click', () => {
      // Показ формы (2 вида)
      // На декстопе форма уже не в главной модалке
      if (isBtnForm) {
        const formContainers = {
          [APPOINTMENT]: element.querySelector('div[data-type="form-appointment"]'),
          [CONSULTATION]: element.querySelector('div[data-type="form-consultation"]'),
        };

        switch (btn.dataset.type) {
          case APPOINTMENT:
            formAppointment.init();
            toggleForm(formContainers[APPOINTMENT], formContainers[CONSULTATION]);
            break;
          case CONSULTATION:
            formConsultation.init();
            toggleForm(formContainers[CONSULTATION], formContainers[APPOINTMENT]);
            break;
          default:
            break;
        }

        if (!isMobile() && isDesktop) {
          console.log('desktop');

          // TODO: Переделать, тк повторяется switch
          const formContainers = {
            [APPOINTMENT]: footerModal.querySelector('div[data-type="form-appointment"]'),
            [CONSULTATION]: footerModal.querySelector('div[data-type="form-consultation"]'),
          };

          switch (btn.dataset.type) {
            case APPOINTMENT:
              formAppointment.init();
              toggleForm(formContainers[APPOINTMENT], formContainers[CONSULTATION]);
              break;
            case CONSULTATION:
              formConsultation.init();
              toggleForm(formContainers[CONSULTATION], formContainers[APPOINTMENT]);
              break;
            default:
              break;
          }

          footerModal.classList.add('is-active');

          return;
        }
      }

      dialog.show();
      scrollLock.disablePageScroll(element);
    });
  });

  btnClose.addEventListener('click', () => {
    dialog.hide();
    scrollLock.enablePageScroll(element);
  });

  // dialog.show();
  // scrollLock.disablePageScroll(element);

  // addForm();
  // addFormWithNote();
};

export default initPageModal;
