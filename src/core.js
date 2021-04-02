import './scripts/lib/modernizr'; // Проверяет на поддержку webp и webm
import Map from './scripts/map';
import Modal from './scripts/Modal';
import Menu from './scripts/Menu';
import detectPointerType from './scripts/utils/detectPointerType';

export default () => {
  detectPointerType();
  // меню
  const menu = new Menu();

  // модалка
  // eslint-disable-next-line no-new
  new Modal(menu);

  // карта
  // eslint-disable-next-line no-new
  new Map();
};
