// eslint-disable-next-line max-classes-per-file
import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import SimpleBar from 'simplebar';
import { APPOINTMENT, CONSULTATION } from './form/FormType';
import isDesktop from './utils/isDesktop';

const MODAL_TYPES = {
  form: 'form',
  feedback: 'feedback',
  iframe: 'iframe',
};
// Переключение видимости между модалками (типами - формы, отзыв, iframe)
const showModalElm = (parent, visibleElm) => {
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
const initSimplebar = (parent, target = undefined) => {
  const elm = target || parent.querySelector('.js-simplebar');
  // eslint-disable-next-line no-new
  new SimpleBar(elm, {
    autoHide: false,
  });
};
// фикс проблемы safari для ifram'а (в данном случае - matterport) в фуллскрине
// (в данном случае .page-header был поверх ifram'а в фуллскрине)
const pageHeader = document.querySelector('.page-header');
const togglePageHeader = (isReset) => {
  pageHeader.style.zIndex = isReset ? '' : 0;
};

class FooterModal {
  static toggleVisibility(modal, isShow, isConsultation = false) {
    const footerHeader = document.querySelector('.footer-header');
    const footerImage = document.querySelector('.footer-image'); // firefox backdrop-filter fix

    if (isShow) {
      modal.classList.add('is-active');
      footerHeader.classList.add('is-small');

      const note = modal.querySelector('.page-modal-footer__note');

      if (isConsultation) {
        modal.classList.add('is-full');
        note.style.display = '';
        footerImage.classList.add('is-blur'); // firefox backdrop-filter fix
      } else {
        modal.classList.remove('is-full');
        note.style.display = 'none';
        footerImage.classList.remove('is-blur'); // firefox backdrop-filter fix
      }
    } else {
      modal.classList.remove('is-active');
      footerHeader.classList.remove('is-small');
      footerImage.classList.remove('is-blur'); // firefox backdrop-filter fix
    }
  }

  static scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  static closeMenu(btn, cb) {
    if (btn.closest('.page-menu')) {
      cb();
    }
  }

  static setup(type, modal, btn, close) {
    const isConsultation = type === CONSULTATION;
    this.closeMenu(btn, close);
    this.toggleVisibility(modal, true, isConsultation);
    // eslint-disable-next-line no-unused-expressions
    isConsultation && initSimplebar(modal);
    this.scrollToBottom();
  }
}

class Dialog {
  constructor(element, btnsClose) {
    this.element = element;
    this.btnsClose = btnsClose.filter((btn) => btn.closest('#page-modal'));

    this.initDialog();
  }

  disablePageScroll() {
    if (window.APP?.scrollbar) {
      window.APP.scrollbar.updatePluginOptions('modal', { open: true });
    }
  }

  enablePageScroll() {
    if (window.APP?.scrollbar) {
      window.APP.scrollbar.updatePluginOptions('modal', { open: false });
    }
  }

  handleShow() {
    this.btnsClose.forEach((btn) => {
      btn.classList.add('hamburger--close');
    });
    // TODO: убрать scrollLock, а метод disable/enablePageScroll вывести в модуль
    scrollLock.disablePageScroll(this.element);
    this.disablePageScroll();
    document.documentElement.classList.add('dialog-open'); // firefox backdrop-filter fix
  }

  handleHide() {
    this.btnsClose.forEach((btn) => {
      btn.classList.remove('hamburger--close');
    });
    // TODO: убрать scrollLock, а метод disable/enablePageScroll вывести в модуль
    scrollLock.enablePageScroll(this.element);
    this.enablePageScroll();
    document.documentElement.classList.remove('dialog-open'); // firefox backdrop-filter fix
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
        showModalElm(modal, modal.querySelector('div[data-type="form-appointment"]'));
        break;
      case CONSULTATION:
        formConsultation.init();
        showModalElm(modal, modal.querySelector('div[data-type="form-consultation"]'));
        break;
      default:
        break;
    }

    if (isScreenSm) {
      FooterModal.setup(
        type,
        modal,
        btn,
        cbCloseMenu,
      );
    }
  }

  static feedback(modalPage, container, btn) {
    showModalElm(modalPage, container);

    const { id } = btn.dataset;
    // dynamic
    import('./Feedback').then(({ default: Feedback }) => {
      Feedback.add(container, id);
    });
    if (isDesktop()) {
      initSimplebar(modalPage);
    }
  }

  static iframe(modalPage, container) {
    showModalElm(modalPage, container);

    if (isDesktop()) {
      togglePageHeader(false);
    }
  }
}

class Modal {
  constructor(menu) {
    this.menu = menu;

    this.btnsOpen = Array.from(document.querySelectorAll('.js-modal-open'));
    this.btnsClose = Array.from(document.querySelectorAll('.js-modal-close'));
    this.footerModal = document.querySelector('.page-modal-footer');
    this.pageModal = document.querySelector('#page-modal');
    this.pageModalBody = this.pageModal.querySelector('.page-modal__body');

    this.dialog = new Dialog(this.pageModal, this.btnsClose).dialog;

    this.formAppointment = null;
    this.formConsultation = null;

    this.feedbackContainer = this.pageModal.querySelector('[data-type="feedback"]');
    this.iframeContainer = this.pageModal.querySelector('[data-type="iframe"]');

    this.type = undefined;

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.addEvents();
  }

  handleOpen(e) {
    const { currentTarget } = e;
    // Определяем тип модалки (разница на декстопе):
    // • ФОРМА
    // • ОТЗЫВ
    // • IFRAME
    if (currentTarget.matches('.js-form-open')) {
      this.type = MODAL_TYPES.form;
    } else if (currentTarget.matches('.js-feedback-open')) {
      this.type = MODAL_TYPES.feedback;
    } else {
      this.type = currentTarget.matches('.js-iframe-open') ? MODAL_TYPES.iframe : '';
    }

    if (this.type === MODAL_TYPES.form) {
      import('./form/Form').then(({ default: Form }) => {
        this.formAppointment = new Form(APPOINTMENT);
        this.formConsultation = new Form(CONSULTATION);

        if (this.formAppointment !== null && this.formConsultation !== null) {
          Open.form(
            this.pageModal,
            this.footerModal,
            this.formAppointment,
            this.formConsultation,
            currentTarget,
            this.menu.close.bind(this.menu),
          );
        }
      });
    }

    if (this.type === MODAL_TYPES.feedback) {
      Open.feedback(
        this.pageModal,
        this.feedbackContainer,
        currentTarget,
      );
    }

    if (this.type === MODAL_TYPES.iframe) {
      Open.iframe(this.pageModal, this.iframeContainer);
    }

    // Если это не модалка формы для десктопа десктоп,
    // то показывается диалог и блокируется скролл
    if (!(this.type === MODAL_TYPES.form && isDesktop())) {
      this.dialog.show(); // new Dialog
    }
  }

  handleClose() {
    FooterModal.toggleVisibility(this.footerModal, false);
  }

  handleCloseDialog() {
    this.dialog.hide();

    if (this.type === MODAL_TYPES.iframe && isDesktop()) {
      togglePageHeader(true);
    }
  }

  addEvents() {
    this.btnsOpen.forEach((btn) => {
      btn.addEventListener('click', this.handleOpen);
    });

    this.btnsClose.forEach((btn) => {
      const isFooterModal = btn.closest('.page-modal-footer');

      btn.addEventListener('click', isFooterModal ? this.handleClose : this.handleCloseDialog);
    });

    this.pageModalBody.addEventListener('click', ({
      currentTarget,
      target,
    }) => {
      if (currentTarget === target) this.handleCloseDialog();
    });
  }
}

export default Modal;
