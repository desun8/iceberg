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

  // карта
  const loadMap = () => {
    const footer = document.querySelector(".page-footer")!;

    let observerFooter = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          const {target, isIntersecting} = entry;

          if (isIntersecting) {
            observerRef.unobserve(target);

            import("./scripts/Map").then(({default: Map}) => new Map());
          }
        });
      },
      {
        rootMargin: "500px",
        threshold: 0.2,
      },
    );
    observerFooter.observe(footer);
  };
  loadMap();


  detectRestoreTeamState();
};
