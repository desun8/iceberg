// eslint-disable-next-line max-classes-per-file
import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import Accordion from './accordion';

class Dialog {
  constructor(element, btnOpen, btnClose) {
    this.element = element;
    this.btnOpen = btnOpen;
    this.btnClose = btnClose;

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.initDialog();
  }

  handleShow() {
    scrollLock.disablePageScroll(this.element);
    this.btnClose.classList.add('hamburger--close');

    if (this.btnOpen) {
      this.btnOpen.classList.add('hamburger--close');
    }
  }

  handleHide() {
    scrollLock.enablePageScroll(this.element);
    this.btnClose.classList.remove('hamburger--close');

    if (this.btnOpen) {
      this.btnOpen.classList.remove('hamburger--close');
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

    this.accordionElm = this.element.querySelector('.accordion');
    this.accordion = new Accordion(this.accordionElm);

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
    this.accordion.init();
  }
}

// const initPageMenu = () => {
//   let btnOpen;
//   const btnsOpen = document.querySelectorAll('.js-menu-open');
//   const btnClose = document.querySelector('.js-menu-close');
//   const element = document.querySelector('#page-menu');
//   const dialog = new A11yDialog(element);
//
//   const handleShow = () => {
//     scrollLock.disablePageScroll(element);
//     btnClose.classList.add('hamburger--close');
//
//     if (btnOpen) {
//       btnOpen.classList.add('hamburger--close');
//     }
//   };
//   const handleHide = () => {
//     scrollLock.enablePageScroll(element);
//     btnClose.classList.remove('hamburger--close');
//
//     if (btnOpen) {
//       btnOpen.classList.remove('hamburger--close');
//     }
//   };
//
//   dialog.on('show', handleShow);
//   dialog.on('hide', handleHide);
//
//   btnsOpen.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       btnOpen = btn;
//       dialog.show();
//     });
//   });
//
//   btnClose.addEventListener('click', () => {
//     dialog.hide();
//   });
//
//   const accordionElm = element.querySelector('.accordion');
//   const accordion = new Accordion(accordionElm);
//   accordion.init();
// };

export default Menu;
