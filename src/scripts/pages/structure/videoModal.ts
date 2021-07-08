import A11yDialog from "a11y-dialog";
// @ts-ignore
import scrollLock from "scroll-lock";
import SimpleBar from "simplebar";

// const fixVideoPreview = (videoElm: HTMLVideoElement) => {
//   const sourceElms = videoElm.querySelectorAll("source");
//   sourceElms.forEach(elm => {
//     elm.src = `${elm.src}#t=0.01`;
//   });
//
//   videoElm.setAttribute("controls", "");
//   videoElm.setAttribute("preload", "metadata");
// };

const setupDialog = (dialogElm: Element) => {
  if (dialogElm && dialog === null) {
    dialog = new A11yDialog(dialogElm);

    const scrollbar = window.APP.scrollbar;
    const isNativeScroll = scrollbar === undefined;

    const disablePageScroll = () => {
      if (scrollbar) {
        scrollbar.updatePluginOptions("modal", {open: true});
      }
    };

    const enablePageScroll = () => {
      if (scrollbar) {
        scrollbar.updatePluginOptions("modal", {open: false});
      }
    };

    const handleShow = () => {
      if (isNativeScroll) {
        scrollLock.disablePageScroll(dialogElm);
      } else {
        disablePageScroll();
      }

      document.documentElement.classList.add("dialog-open"); // firefox backdrop-filter fix
    };

    const handleHide = () => {
      if (isNativeScroll) {
        scrollLock.enablePageScroll(dialogElm);
      } else {
        enablePageScroll();
      }

      if (activeModalSection) {
        activeModalSection.style.display = "none";
      }

      document.documentElement.classList.remove("dialog-open"); // firefox backdrop-filter fix
    };

    dialog.on("show", handleShow);
    dialog.on("hide", handleHide);
  }
};

const openDialog = (dialogContainer: HTMLElement, btn: HTMLElement) => {
  const {id, type} = btn.dataset;

  const modalElm = dialogContainer.querySelector(`.video-modal-section[data-id='${id}'][data-type='${type}']`) as HTMLElement;

  if (modalElm) {
    modalElm.style.display = "block";
    activeModalSection = modalElm;
  }
};

const handleOpen = (event: Event) => {
  const target = event.currentTarget as HTMLButtonElement;

  openDialog(dialogBody, target);

  if (dialog) {
    dialog.show();
  }
};

const dialogElm = document.querySelector("#video-modal")!;
const dialogBody = dialogElm.querySelector(".page-modal__content") as HTMLElement;
const btnsClose = dialogElm.querySelectorAll(".js-modal-close")!;
const btnsOpen = document.querySelectorAll<HTMLButtonElement>(".js-video-modal-open");

let dialog: A11yDialog = null!;
let activeModalSection: HTMLElement;

btnsOpen.forEach(btn => {
  btn.addEventListener("click", handleOpen);
});

btnsClose.forEach(btn => {
  btn.addEventListener("click", () => {
    if (dialog) {
      dialog.hide();
    }
  });
});


const initSimplebar = (parent: Element, target: Element = undefined!) => {
  const elm = target || parent.querySelector(".js-simplebar");
  // eslint-disable-next-line no-new
  new SimpleBar(elm as HTMLElement, {
    autoHide: false,
  });
};

initSimplebar(dialogElm);

export const initVideoModal = () => {
  setupDialog(dialogElm);
};
