// eslint-disable-next-line max-classes-per-file
import isMobile from "../utils/isMobile";
import Select from "./Select";
import FormSetup from "./FormSetup";
import { loadRecaptcha } from "./loadRecaptcha";
import DatePickerOriginal from "./DatePickerOriginal";
import A11yDialog from "a11y-dialog";

loadRecaptcha();

class Constructor {
  static createWrapper(type: string) {
    const elm = document.createElement("div");
    elm.dataset.type = `form-${type}`;
    elm.dataset.active = "false";
    elm.style.position = "relative"; // для блока с сообщением об отправке
    return elm;
  }

  static clone(template: HTMLTemplateElement, selector: string) {
    const cloneTarget = template.content.querySelector(selector)!;
    const cloneElm = document.importNode(cloneTarget, true);
    cloneElm.id = "";
    return cloneElm;
  }

  static create(formType: string, container: Element) {
    if (!("content" in document.createElement("template"))) {
      return;
    }

    const formId = `form-${formType}`;
    const template = document.querySelector("template#template-forms") as HTMLTemplateElement;

    const form = this.clone(template, "#template-form") as HTMLFormElement;
    form.id = formId;
    form.dataset.type = `${formType.toUpperCase()}_FORM`;

    const wrapper = this.createWrapper(formType);
    wrapper.appendChild(form);

    container.appendChild(wrapper);
    console.log(container);

    return form;
  }
}

class Form {
  private form: any;
  private datepickerInstance: any;
  private selectInstance: any;
  private isInit: boolean;

  constructor(private formType: string, private container: Element, private dialogInstance: A11yDialog) {
    this.form = undefined;

    // экземпляры кастомных полей
    // нужны для доступа к их методам
    this.datepickerInstance = undefined;
    this.selectInstance = undefined;

    this.isInit = false;
  }

  create() {
    this.form = Constructor.create(this.formType, this.container);

    this.datepickerInstance = new DatePickerOriginal(this.form.querySelector(".form__datepicker"));
    if (!isMobile()) {
      this.selectInstance = new Select(this.form.querySelector(".custom-select"));
    }
  }

  init() {
    if (!this.form && !this.isInit) {
      this.create();

      // eslint-disable-next-line no-new
      new FormSetup(this.form, this.datepickerInstance, this.selectInstance, this.dialogInstance);

      this.isInit = true;
    }
  }
}

export default Form;
