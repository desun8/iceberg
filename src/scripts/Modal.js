// eslint-disable-next-line max-classes-per-file
import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import SimpleBar from 'simplebar';
import isMobile from './utils/isMobile';
import { isDesktop as mqDesktop } from './utils/mediaQueryEvent';
import Form, { APPOINTMENT, CONSULTATION } from './form/Form';

const MODAL_TYPES = {
  form: 'form',
  feedback: 'feedback',
};

const isDesktop = () => !isMobile() && mqDesktop;

const toggleForm = (formShow, formHide) => {
  if (formShow) {
    formShow.style.display = '';
  }

  if (formHide) {
    formHide.style.display = 'none';
  }
};

const toggleFooterModal = (modal, isShow, isConsultation = false) => {
  const logo = document.querySelector('.page-footer .header__logo');

  if (isShow) {
    modal.classList.add('is-active');
    logo.style.opacity = '0';
    logo.style.visibility = 'hidden';

    const note = modal.querySelector('.page-modal-footer__note');

    if (isConsultation) {
      note.style.display = '';
    } else {
      note.style.display = 'none';
    }
  } else {
    modal.classList.remove('is-active');
    logo.style.opacity = '';
    logo.style.visibility = '';
  }
};

const initSimplebar = (parent) => {
  const elm = parent.querySelector('.js-simplebar');
  new SimpleBar(elm, {
    autoHide: false,
  });
};

const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

class Dialog {
  constructor(element, btnsClose) {
    this.element = element;
    this.btnsClose = btnsClose.filter((btn) => btn.closest('#page-modal'));

    this.initDialog();
  }

  handleShow() {
    this.btnsClose.forEach((btn) => {
      btn.classList.add('hamburger--close');
    });
  }

  handleHide() {
    this.btnsClose.forEach((btn) => {
      btn.classList.remove('hamburger--close');
    });
  }

  initDialog() {
    this.dialog = new A11yDialog(this.element);
    this.dialog.on('show', this.handleShow.bind(this));
    this.dialog.on('hide', this.handleHide.bind(this));
  }
}

class Modal {
  constructor() {
    this.btnsOpen = Array.from(document.querySelectorAll('.js-modal-open'));
    this.btnsClose = Array.from(document.querySelectorAll('.js-modal-close'));
    this.footerModal = document.querySelector('.page-modal-footer');
    this.pageModal = document.querySelector('#page-modal');

    this.dialog = new Dialog(this.pageModal, this.btnsClose).dialog;

    this.formAppointment = new Form(APPOINTMENT);
    this.formConsultation = new Form(CONSULTATION);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.addEvents();
  }

  handleOpen(e) {
    const { currentTarget } = e;
    let type = '';

    // Определяем тип модалки (разница на декстопе):
    // • Форма
    // • Отзыв
    if (currentTarget.matches('.js-form-open')) {
      type = MODAL_TYPES.form;
    } else {
      type = currentTarget.matches('.js-feedback-open') ? MODAL_TYPES.feedback : '';
    }

    if (type === MODAL_TYPES.form) {
      const isDesk = isDesktop();
      const modal = isDesk ? this.footerModal : this.pageModal;

      const formContainers = {
        [APPOINTMENT]: modal.querySelector('div[data-type="form-appointment"]'),
        [CONSULTATION]: modal.querySelector('div[data-type="form-consultation"]'),
      };

      switch (currentTarget.dataset.type) {
        case APPOINTMENT:
          this.formAppointment.init();
          toggleForm(formContainers[APPOINTMENT], formContainers[CONSULTATION]);

          if (isDesk) {
            toggleFooterModal(modal, true);
            scrollToBottom();
          }
          break;
        case CONSULTATION:
          this.formConsultation.init();
          toggleForm(formContainers[CONSULTATION], formContainers[APPOINTMENT]);

          if (isDesk) {
            toggleFooterModal(modal, true, true);
            initSimplebar(this.footerModal);
            scrollToBottom();
          }

          break;

        default:
          break;
      }
    }

    // Если это не модалка формы для десктопа десктоп,
    // то показывается диалог и блокируется скролл
    if (!(type === MODAL_TYPES.form && isDesktop())) {
      this.dialog.show();
      scrollLock.disablePageScroll(this.pageModal);
    }
  }

  handleClose() {
    toggleFooterModal(this.footerModal, false);
  }

  handleCloseDialog() {
    this.dialog.hide();
    scrollLock.enablePageScroll(this.pageModal);
  }

  addEvents() {
    this.btnsOpen.forEach((btn) => {
      btn.addEventListener('click', this.handleOpen);
    });

    this.btnsClose.forEach((btn) => {
      const isFooterModal = btn.closest('.page-modal-footer');

      btn.addEventListener('click', isFooterModal ? this.handleClose : this.handleCloseDialog);
    });
  }
}

export default Modal;
