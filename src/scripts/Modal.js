// eslint-disable-next-line max-classes-per-file
import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import SimpleBar from 'simplebar';
import isMobile from './utils/isMobile';
import { isDesktop as mqDesktop } from './utils/mediaQueryEvent';
import Form, { APPOINTMENT, CONSULTATION } from './form/Form';
import Feedback from './Feedback';

const MODAL_TYPES = {
  form: 'form',
  feedback: 'feedback',
  iframe: 'iframe',
};

const isDesktop = () => !isMobile() && mqDesktop;
// TODO: Удалить?
const toggleElmVisible = (elm, type) => {
  switch (type) {
    case 'show':
      elm.style.display = '';
      break;
    case 'hide':
      elm.style.display = 'none';
      break;
    default:
      elm.style.display = '';
      break;
  }
};

// Переключение видимости между модалками (типами - формы, отзыв, iframe)
const hideElms = (parent, visibleElm) => {
  const elements = parent.querySelectorAll('[data-active]');
  elements.forEach((elm) => {
    if (elm === visibleElm) {
      elm.dataset.active = 'true';
    } else {
      elm.dataset.active = 'false';
    }
  });
};
// TODO: Удалить?
const hideForm = (...rest) => {
  if (rest.length) {
    rest.forEach((elm) => {
      if (elm) {
        toggleElmVisible(elm, 'hide');
      }
    });
  }
};
// TODO: Удалить?
const toggleForm = (formShow, formHide) => {
  if (formShow) {
    toggleElmVisible(formShow, 'show');
  }

  if (formHide) {
    toggleElmVisible(formHide, 'hide');
  }
};

// TODO: Переименовать в более понятное название например - toggleVisibileFooterModal
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

const initSimplebar = (parent, target = undefined) => {
  const elm = target || parent.querySelector('.js-simplebar');
  new SimpleBar(elm, {
    autoHide: false,
  });
};

const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

const closeMenu = (btn, cb) => {
  if (btn.closest('.page-menu')) {
    cb();
  }
};

const setFooterModal = (type, modal, btn, close) => {
  const isConsultation = type === CONSULTATION;
  closeMenu(btn, close);
  toggleFooterModal(modal, true, isConsultation);
  isConsultation && initSimplebar(modal);
  scrollToBottom();
};

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
    scrollLock.disablePageScroll(this.element);
  }

  handleHide() {
    this.btnsClose.forEach((btn) => {
      btn.classList.remove('hamburger--close');
    });
    scrollLock.enablePageScroll(this.element);
  }

  initDialog() {
    this.dialog = new A11yDialog(this.element);
    this.dialog.on('show', this.handleShow.bind(this));
    this.dialog.on('hide', this.handleHide.bind(this));
  }
}

class Modal {
  constructor(menu) {
    this.menu = menu;

    this.btnsOpen = Array.from(document.querySelectorAll('.js-modal-open'));
    this.btnsClose = Array.from(document.querySelectorAll('.js-modal-close'));
    this.footerModal = document.querySelector('.page-modal-footer');
    this.pageModal = document.querySelector('#page-modal');

    this.dialog = new Dialog(this.pageModal, this.btnsClose).dialog;

    this.formAppointment = new Form(APPOINTMENT);
    this.formConsultation = new Form(CONSULTATION);

    this.formContainers = undefined;
    this.feedbackContainer = this.pageModal.querySelector('[data-type="feedback"]');
    this.iframeContainer = this.pageModal.querySelector('[data-type="iframe"]');

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
    } else if (currentTarget.matches('.js-feedback-open')) {
      type = MODAL_TYPES.feedback;
    } else {
      type = currentTarget.matches('.js-iframe-open') ? MODAL_TYPES.iframe : '';
    }

    if (type === MODAL_TYPES.form) {
      // toggleElmVisible(this.feedbackContainer, 'hide');

      const isDesk = isDesktop();
      const modal = isDesk ? this.footerModal : this.pageModal;

      // const formContainers = {
      //   [APPOINTMENT]: modal.querySelector('div[data-type="form-appointment"]'),
      //   [CONSULTATION]: modal.querySelector('div[data-type="form-consultation"]'),
      // };

      // this.formContainers = { ...formContainers };

      switch (currentTarget.dataset.type) {
        case APPOINTMENT:
          this.formAppointment.init();
          hideElms(modal, modal.querySelector('div[data-type="form-appointment"]'));
          // toggleForm(formContainers[APPOINTMENT], formContainers[CONSULTATION]);
          break;
        case CONSULTATION:
          this.formConsultation.init();
          hideElms(modal, modal.querySelector('div[data-type="form-consultation"]'));
          // toggleForm(formContainers[CONSULTATION], formContainers[APPOINTMENT]);
          break;

        default:
          break;
      }

      if (isDesk) {
        setFooterModal(
          currentTarget.dataset.type,
          modal,
          currentTarget,
          this.menu.close.bind(this.menu),
        );
      }
    }

    if (type === MODAL_TYPES.feedback) {
      // if (this.formContainers) {
      //   const formContainers = {
      //     [APPOINTMENT]: this.pageModal.querySelector('div[data-type="form-appointment"]'),
      //     [CONSULTATION]: this.pageModal.querySelector('div[data-type="form-consultation"]'),
      //   };
      //
      //   const forms = [];
      //   for (const key in formContainers) {
      //     if (Object.prototype.hasOwnProperty.call(formContainers, key)) {
      //       const elm = formContainers[key];
      //       if (elm) {
      //         forms.push(elm);
      //       }
      //     }
      //   }
      //   hideForm(...forms);
      // }

      hideElms(this.pageModal, this.feedbackContainer);

      const { id } = currentTarget.dataset;
      Feedback.add(this.feedbackContainer, id);

      if (isDesktop()) {
        initSimplebar(this.pageModal);
      }

      // toggleElmVisible(this.feedbackContainer, 'show');
    }

    if (type === MODAL_TYPES.iframe) {
      hideElms(this.pageModal, this.iframeContainer);
    }

    // Если это не модалка формы для десктопа десктоп,
    // то показывается диалог и блокируется скролл
    if (!(type === MODAL_TYPES.form && isDesktop())) {
      this.dialog.show();
    }
  }

  handleClose() {
    toggleFooterModal(this.footerModal, false);
  }

  handleCloseDialog() {
    this.dialog.hide();
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
