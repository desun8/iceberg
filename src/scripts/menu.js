import A11yDialog from 'a11y-dialog';
import Accordion from './accordion';

const initPageMenu = () => {
  const btnsOpen = document.querySelectorAll('.js-menu-open');
  const btnClose = document.querySelector('.js-menu-close');
  const element = document.querySelector('#page-menu');
  const dialog = new A11yDialog(element);

  dialog.show();

  btnsOpen.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.add('hamburger--close');
      btnClose.classList.add('hamburger--close');
      dialog.show();
    });
  });

  btnClose.addEventListener('click', () => {
    dialog.hide();
    btnClose.classList.remove('hamburger--close');

    btnsOpen.forEach((btn) => {
      btn.classList.remove('hamburger--close');
    });
  });

  const accordionElm = element.querySelector('.accordion');
  const accordion = new Accordion(accordionElm);
  accordion.init();
};

export default initPageMenu;
