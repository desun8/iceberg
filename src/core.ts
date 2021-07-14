import "./scripts/lib/modernizr"; // Проверяет на поддержку webp и webm
import detectPointerType from "./scripts/utils/detectPointerType";
import detectRestoreTeamState from "./scripts/detectRestoreTeamState";
import core from "./scripts/core/index"
import Modal from "./scripts/Modal";
import Menu from "./scripts/Menu";
import accordion from "./scripts/accordion";
import "focus-visible";

export default () => {
  core();
  detectPointerType();

  // МЕНЮ
  const menu = new Menu();

  accordion();

  // МОДАЛКА
  // Делаем задержку для того, что зацикленная карусель делает дубли слайдов,
  // и они не уже не имеют нужного события.
  // По этому сначала инициализируем карусель, а потом модалки.
  setTimeout(() => {
    new Modal(menu);
  }, 100);

  detectRestoreTeamState();
};
