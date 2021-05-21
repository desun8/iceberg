// eslint-disable-next-line max-classes-per-file
import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import { mqIsDesktop } from './utils/mediaQueryEvent';

class Dialog {
  constructor(element, btnOpen, btnClose) {
    this.element = element;
    this.btnOpen = btnOpen;
    this.btnClose = btnClose;

    this.gapTargets = [
      this.element,
      this.element.querySelector('.page-menu__header'),
      this.element.querySelector('.page-menu__social'),
    ];

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

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
    // TODO: убрать scrollLock, а метод disable/enablePageScroll вывести в модуль
    scrollLock.disablePageScroll(this.element);
    this.disablePageScroll();
    this.fixGap();
    this.btnClose.classList.add('hamburger--close');

    if (this.btnOpen) {
      this.btnOpen.classList.add('hamburger--close');
    }
  }

  handleHide() {
    // TODO: убрать scrollLock, а метод disable/enablePageScroll вывести в модуль
    scrollLock.enablePageScroll(this.element);
    this.enablePageScroll();
    this.btnClose.classList.remove('hamburger--close');

    if (this.btnOpen) {
      this.btnOpen.classList.remove('hamburger--close');
    }
  }

  fixGap() {
    if (mqIsDesktop) {
      this.gapTargets.forEach((target) => {
        scrollLock.addFillGapTarget(target);
      });
    }
  }

  initDialog() {
    this.dialog = new A11yDialog(this.element);
    this.dialog.on('show', this.handleShow);
    this.dialog.on('hide', this.handleHide);
  }
}

class Menu {
  constructor() {
    this.element = document.querySelector('#page-menu');
    this.btnsOpen = document.querySelectorAll('.js-menu-open');
    this.btnOpen = undefined;
    this.btnClose = document.querySelector('.js-menu-close');

    this.dialog = new Dialog(this.element, this.btnOpen, this.btnClose).dialog;
    this.init();
  }

  open(btn) {
    this.btnOpen = btn;
    this.dialog.show();
  }

  close() {
    this.dialog.hide();
  }

  addEvents() {
    this.btnsOpen.forEach((btn) => {
      btn.addEventListener('click', (e) => this.open(e.currentTarget));
    });

    this.btnClose.addEventListener('click', this.close.bind(this));
  }

  init() {
    this.addEvents();
  }
}

export default Menu;
