import A11yDialog from 'a11y-dialog';
import scrollLock from 'scroll-lock';
import Accordion from './accordion';

const initPageMenu = () => {
  let btnOpen;
  const btnsOpen = document.querySelectorAll('.js-menu-open');
  const btnClose = document.querySelector('.js-menu-close');
  const element = document.querySelector('#page-menu');
  const dialog = new A11yDialog(element);

  const handleShow = () => {
    scrollLock.disablePageScroll(element);
    btnClose.classList.add('hamburger--close');

    if (btnOpen) {
      btnOpen.classList.add('hamburger--close');
    }
  };
  const handleHide = () => {
    scrollLock.enablePageScroll(element);
    btnClose.classList.remove('hamburger--close');

    if (btnOpen) {
      btnOpen.classList.remove('hamburger--close');
    }
  };

  dialog.on('show', handleShow);
  dialog.on('hide', handleHide);

  btnsOpen.forEach((btn) => {
    btn.addEventListener('click', () => {
      btnOpen = btn;
      dialog.show();
    });
  });

  btnClose.addEventListener('click', () => {
    dialog.hide();
  });

  const accordionElm = element.querySelector('.accordion');
  const accordion = new Accordion(accordionElm);
  accordion.init();
};

export default initPageMenu;
