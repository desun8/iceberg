// eslint-disable-next-line max-classes-per-file
import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import SimpleBar from 'simplebar';
import Form, { APPOINTMENT, CONSULTATION } from './form/Form';
import Feedback from './Feedback';
import isDesktop from './utils/isDesktop';

const MODAL_TYPES = {
  form: 'form',
  feedback: 'feedback',
  iframe: 'iframe',
};
// Переключение видимости между модалками (типами - формы, отзыв, iframe)
const showElm = (parent, visibleElm) => {
  const elements = parent.querySelectorAll('[data-active]');
  elements.forEach((elm) => {
    if (elm === visibleElm) {
      // eslint-disable-next-line no-param-reassign
      elm.dataset.active = 'true';
    } else {
      // eslint-disable-next-line no-param-reassign
      elm.dataset.active = 'false';
    }
  });
};
// Для десктопа
const toggleVisibilityFooterModal = (modal, isShow, isConsultation = false) => {
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
  // eslint-disable-next-line no-new
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
  toggleVisibilityFooterModal(modal, true, isConsultation);
  // eslint-disable-next-line no-unused-expressions
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

class Open {
  static form(modalPage, modalFooter, formAppointment, formConsultation, btn, cbCloseMenu) {
    const isScreenSm = isDesktop();
    const modal = isScreenSm ? modalFooter : modalPage;
    const { type } = btn.dataset;

    switch (type) {
      case APPOINTMENT:
        formAppointment.init();
        showElm(modal, modal.querySelector('div[data-type="form-appointment"]'));
        break;
      case CONSULTATION:
        formConsultation.init();
        showElm(modal, modal.querySelector('div[data-type="form-consultation"]'));
        break;
      default:
        break;
    }

    if (isScreenSm) {
      setFooterModal(
        type,
        modal,
        btn,
        cbCloseMenu,
      );
    }
  }

  static feedback(modalPage, container, btn) {
    showElm(modalPage, container);

    const { id } = btn.dataset;
    Feedback.add(container, id);

    if (isDesktop()) {
      initSimplebar(modalPage);
    }
  }

  static iframe(modalPage, container) {
    showElm(modalPage, container);
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

    this.feedbackContainer = this.pageModal.querySelector('[data-type="feedback"]');
    this.iframeContainer = this.pageModal.querySelector('[data-type="iframe"]');

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.addEvents();
  }

  handleOpen(e) {
    const { currentTarget } = e;
    let type;

    // Определяем тип модалки (разница на декстопе):
    // • ФОРМА
    // • ОТЗЫВ
    // • IFRAME
    if (currentTarget.matches('.js-form-open')) {
      type = MODAL_TYPES.form;
    } else if (currentTarget.matches('.js-feedback-open')) {
      type = MODAL_TYPES.feedback;
    } else {
      type = currentTarget.matches('.js-iframe-open') ? MODAL_TYPES.iframe : '';
    }

    if (type === MODAL_TYPES.form) {
      Open.form(
        this.pageModal,
        this.footerModal,
        this.formAppointment,
        this.formConsultation,
        currentTarget,
        this.menu.close.bind(this.menu),
      );
    }

    if (type === MODAL_TYPES.feedback) {
      Open.feedback(this.pageModal, this.feedbackContainer, currentTarget);
    }

    if (type === MODAL_TYPES.iframe) {
      Open.iframe(this.pageModal, this.iframeContainer);
    }

    // Если это не модалка формы для десктопа десктоп,
    // то показывается диалог и блокируется скролл
    if (!(type === MODAL_TYPES.form && isDesktop())) {
      this.dialog.show();
    }
  }

  handleClose() {
    toggleVisibilityFooterModal(this.footerModal, false);
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
