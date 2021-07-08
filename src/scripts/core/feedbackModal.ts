import A11yDialog from "a11y-dialog";
// @ts-ignore
import scrollLock from "scroll-lock";
import { APPOINTMENT, CONSULTATION } from "../form/FormType";
import accordion from "../accordion";
import SimpleBar from "simplebar";

let isAccordionInit = false;
// Переключение видимости между модалками (типами - формы, отзыв, iframe)
const showModalElm = (parent: Element, visibleElm: HTMLElement) => {
  const elements = parent.querySelectorAll<HTMLElement>("[data-active]");

  elements.forEach((elm) => {
    if (elm === visibleElm) {
      elm.dataset.active = "true";
    } else {
      elm.dataset.active = "false";
    }
  });
};

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
      btnClose.classList.add("hamburger--close");

      if (isNativeScroll) {
        scrollLock.disablePageScroll(dialogElm);
      } else {
        disablePageScroll();
      }

      document.documentElement.classList.add("dialog-open"); // firefox backdrop-filter fix
    };

    const handleHide = () => {
      btnClose.classList.remove("hamburger--close");
      dialogBody.dataset.type = "";

      if (isNativeScroll) {
        scrollLock.enablePageScroll(dialogElm);
      } else {
        enablePageScroll();
      }

      document.documentElement.classList.remove("dialog-open"); // firefox backdrop-filter fix
    };

    dialog.on("show", handleShow);
    dialog.on("hide", handleHide);
  }
};

const openDialog = (dialogContainer: HTMLElement, formAppointment: any, formConsultation: any, btn: HTMLElement) => {
  const type = btn.dataset.type;
  console.log("type");
  console.log(type);

  switch (type) {
    case APPOINTMENT:
      formAppointment.init();

      showModalElm(dialogContainer, dialogContainer.querySelector("div[data-type='form-appointment']")!);
      break;
    case CONSULTATION:
      formConsultation.init();
      showModalElm(dialogContainer, dialogContainer.querySelector("div[data-type='form-consultation']")!);

      dialogContainer.dataset.type = "consultation";
      break;
    default:
      break;
  }

  if (!isAccordionInit) {
    accordion();
    isAccordionInit = true;
  }
};

const handleOpen = (event: Event) => {
  const target = event.currentTarget as HTMLButtonElement;

  console.log(event);
  if (formAppointment === null && formConsultation === null) {
    import("../form/Form").then(({default: Form}) => {
      formAppointment = new Form(APPOINTMENT, dialogFormContainer, dialog);
      formConsultation = new Form(CONSULTATION, dialogFormContainer, dialog);

      openDialog(
        dialogBody,
        formAppointment,
        formConsultation,
        target,
      );
    });
  } else {
    openDialog(
      dialogBody,
      formAppointment,
      formConsultation,
      target,
    );
  }

  if (dialog) {
    dialog.show();
  }
};

const dialogElm = document.querySelector("#page-feedback-modal")!;
const dialogBody = dialogElm.querySelector(".page-modal__content") as HTMLElement;
const dialogFormContainer = dialogBody.querySelector(".page-modal__content-main")!;
const btnClose = dialogElm.querySelector(".js-modal-close")!;
const btnsOpen = document.querySelectorAll<HTMLButtonElement>(".js-form-open");

let dialog: A11yDialog = null!;
let formAppointment: any = null;
let formConsultation: any = null;

btnsOpen.forEach(btn => {
  btn.addEventListener("click", handleOpen);
});

console.log('btnClose');
console.log(btnClose);

btnClose.addEventListener("click", () => {
  console.log('click');
  if (dialog) {
    dialog.hide();
  }
});

const initSimplebar = (parent: Element, target: Element = undefined!) => {
  const elm = target || parent.querySelector(".js-simplebar");
  // eslint-disable-next-line no-new
  new SimpleBar(elm as HTMLElement, {
    autoHide: false,
  });
};

initSimplebar(dialogBody, dialogBody.querySelector(".page-feedback-modal__note .js-simplebar")!);

export const initFeedbackModal = () => {
  setupDialog(dialogElm);
};
