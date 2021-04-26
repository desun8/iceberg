import "./scripts/lib/modernizr"; // Проверяет на поддержку webp и webm

import detectPointerType from "./scripts/utils/detectPointerType";
import detectRestoreTeamState from "./scripts/detectRestoreTeamState";
import core from "./scripts/core/index"
import Modal from "./scripts/Modal";
import Menu from "./scripts/Menu";

export default () => {
  core();
  detectPointerType();

  // меню
  const menu = new Menu();

  // модалка
  // eslint-disable-next-line no-new
  new Modal(menu);

  detectRestoreTeamState();
};
