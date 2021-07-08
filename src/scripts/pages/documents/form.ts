import Mask from "../../form/Mask";
import { FormElm, InputElement, MaskType, TextAreaElement } from "../../form/types";
import Validation from "../../form/Validation";
import DatePicker from "../../form/DatePicker";
import Submit from "../../form/Submit";
import SuccessDocument from "../../form/SuccessDocument";
import { Instance } from "flatpickr/dist/types/instance";

interface DatePickerElement extends HTMLInputElement {
  _flatpickr?: Instance;
}

const getTemplate = (id: number) => `
    <div id="child-form-${id}" class="child-form">
        <div class="document-form__container  document-form__container--personal">
          <div class="col-full" style="position: relative;">
            <h2 class="document-form__title">Данные ребёнка - ${id}</h2>
            <button class="document-form__btn-remove" type="button" aria-label="Удалить форму ребенка.">Удалить</button>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="lastname-${id}">Фамилия</label>
            <input id="lastname-${id}" type="text" name="child[${id}][lastname]" placeholder="Фамилия" autocomplete="family-name"
                   data-mask="name" data-validation="name" required>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="firstname-${id}">Имя</label>
            <input id="firstname-${id}" type="text" name="child[${id}][name]" placeholder="Имя" autocomplete="given-name"
                   data-mask="name"
                   data-validation="name" required>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="patronymic-${id}">Отчество</label>
            <input id="patronymic-${id}" type="text" name="child[${id}][patronymic]" placeholder="Отчество"
                   autocomplete="additional-name"
                   data-mask="name" data-validation="name"
                   required>
          </div>
          <div class="document-form__field  form-field">
            <div class="custom-datepicker  has-placeholder" data-date="Дата рождения *">
              <label for="birth-date-${id}" class="visually-hidden">Дата рождения</label>
              <input id="birth-date-${id}" class="form__datepicker" type="date" name="child[${id}][birthday]"
                     placeholder="Дата рождения"
                     autocomplete="bday" required data-mask="date" data-validation="date" data-required="true">
            </div>
          </div>
        </div>

        <div class="document-form__container  document-form__container--document">
          <h2 class="document-form__title  col-full">Документ ребёнка</h2>
          <div class="col-start-1 col-end-3 grid  grid--col-2">
            <div class="document-form__field  document-form__field--radio  form-field  grid  grid--col-2">
              <div class="c-checkbox">
                <input
                  id="document-passport-${id}"
                  class="visually-hidden"
                  type="radio"
                  name=child[${id}][child-document-type]"
                  value="1"
                  checked
                />
                <span class="c-checkbox__checkmark">
                <svg width="16" height="12" fill="none">
                  <path class="path"
                        d="M14.634.634a.8.8 0 011.132 1.132l-9.6 9.6a.8.8 0 01-1.132 0l-4-4a.8.8 0 011.132-1.132L5.6 9.67 14.634.634z"
                        fill="#000"/>
                </svg>
              </span>
                <label class="c-checkbox__label" for="document-passport-${id}">
                  <span>Паспорт</span>
                </label>
              </div>
              <div class="c-checkbox">
                <input
                  id="document-birth-${id}"
                  class="visually-hidden"
                  type="radio"
                  name="child[${id}][child-document-type]"
                  value="2"
                />
                <span class="c-checkbox__checkmark">
                <svg width="16" height="12" fill="none">
                  <path class="path"
                        d="M14.634.634a.8.8 0 011.132 1.132l-9.6 9.6a.8.8 0 01-1.132 0l-4-4a.8.8 0 011.132-1.132L5.6 9.67 14.634.634z"
                        fill="#000"/>
                </svg>
              </span>
                <label class="c-checkbox__label" for="document-birth-${id}">
                  <span>Свидетельство о рождении</span>
                </label>
              </div>
            </div>
            <div class="grid grid--col-2">
              <div class="document-form__field  form-field">
                <label class="visually-hidden" for="document-series-${id}">Серия</label>
                <input id="document-series-${id}" type="text" inputmode="decimal" name="child[${id}][series]" placeholder="Серия"
                       data-mask="document-series" data-validation="document-series" required>
              </div>
              <div class="document-form__field  form-field">
                <label class="visually-hidden" for="document-number-${id}">Номер</label>
                <input id="document-number-${id}" type="text" inputmode="decimal" name="child[${id}][number]" placeholder="Номер"
                       data-mask="document-number" data-validation="document-series" required>
              </div>
            </div>
          </div>
          <div class="document-form__field  form-field">
            <div class="custom-datepicker  has-placeholder" data-date="Дата выдачи *">
              <label for="document-release-${id}" class="visually-hidden">Дата выдачи</label>
              <input id="document-release-${id}" class="form__datepicker" type="date" name="child[${id}][document-release]"
                     placeholder="Дата выдачи"
                     required data-mask="date" data-validation="date" data-required="true">
            </div>
          </div>
          <div class="col-full  grid  grid--col-2">
            <div class="document-form__field  form-field">
              <label class="visually-hidden" for="document-place-${id}">Кем выдан</label>
              <input id="document-place-${id}" type="text" placeholder="Кем выдан" data-mask="cyrillic" data-validation="text" required>
            </div>
            <div class="document-form__field  form-field">
              <label class="visually-hidden" for="document-reg-${id}">Адрес регистрации</label>
              <input id="document-reg-${id}" type="text" placeholder="Адрес регистрации" data-mask="cyrillic" data-validation="text" required>
            </div>
          </div>

          <div class="col-full">
            <div class="grid grid--col-2 grid--mt40">
              <div class="document-form__field  form-field  col-start-1  col-end-2">
                <div class="c-checkbox">
                  <input
                    id="document-residence-checkbox-${id}"
                    class="visually-hidden"
                    type="checkbox"
                    name="child[${id}][document-same-residence]"
                  />
                  <span class="c-checkbox__checkmark">
              <svg width="16" height="12" fill="none">
                <path class="path"
                      d="M14.634.634a.8.8 0 011.132 1.132l-9.6 9.6a.8.8 0 01-1.132 0l-4-4a.8.8 0 011.132-1.132L5.6 9.67 14.634.634z"
                      fill="#000"/>
              </svg>
            </span>
                  <label class="c-checkbox__label" for="document-residence-checkbox-${id}">

                    <span>Адрес регистрации совпадает с адресом проживания</span>
                  </label>
                </div>
              </div>
              <div class="document-form__field  form-field  col-start-1  col-end-2">
                <label class="visually-hidden" for="document-residence-${id}">Адрес проживания</label>
                <input id="document-residence-${id}" type="text" placeholder="Адрес проживания"
                       name="child[${id}][document-residence]"
                       data-mask="cyrillic">
              </div>
            </div>
          </div>
        </div>

        <button class="document-form__btn-remove" type="button" aria-label="Удалить форму ребенка.">Удалить</button>
      </div>
`;

export default () => {
  const replaceTitleNumber = (formElm: HTMLElement, newNumber: number) => {
    const titleElm = formElm.querySelector(".document-form__title")!;
    let newText = titleElm.textContent!;
    newText = newText.replace(/(- \d)$/, `- ${newNumber}`);

    titleElm.textContent = newText;
  };

  const getFormFieldElms = (rootElm: HTMLElement) => {
    const inputElms = Array.from(rootElm.querySelectorAll("input")) as InputElement[];
    const textareaElms = Array.from(rootElm.querySelectorAll("textarea")) as TextAreaElement[];

    return [...inputElms, ...textareaElms];
  };

  const addMask = (elm: InputElement, type: string) => {
    switch (type) {
      case MaskType.Name:
        Mask.names(elm);
        break;
      case MaskType.Tel:
        Mask.tel(elm);
        break;
      case MaskType.DocumentSeries:
        Mask.documentSeries(elm);
        break;
      case MaskType.DocumentNumber:
        Mask.documentNumber(elm);
        break;
      case MaskType.Cyrillic:
        Mask.cyrillic(elm);
        break;
    }
  };

  const addBlurValidation = (elm: FormElm, type: string) => {
    elm.addEventListener("blur", () => {
      if (elm.value.length !== 0) {
        Validation.check(type, elm);
      }
    });
  };

  const initFormSection = (rootElm: HTMLElement) => {
    const fieldElms = getFormFieldElms(rootElm);
    const seriesInput = fieldElms.find(input => input.dataset.mask === "document-series");
    const numbersInput = fieldElms.find(input => input.dataset.mask === "document-number");

    fieldElms.forEach(elm => {
      const isRequired = elm.required;
      const isDateInput = elm.type === "date";
      const typeMask = elm.dataset.mask;
      const typeValidation = elm.dataset.validation || "";

      if (isRequired) {
        elm.placeholder = `${elm.placeholder} *`;
      }

      if (isDateInput) {
        const pickerInstance = new DatePicker(elm as HTMLInputElement);

        const pickerInput = pickerInstance.flatpickr?.altInput as HTMLInputElement;
        const pickerMobileInput = pickerInstance.flatpickr?.mobileInput as HTMLInputElement;

        if (pickerInput) {
          pickerInput.addEventListener("blur", () => {
            if (elm.value.length !== 0) {
              Validation.check(typeValidation, elm);
            }
          });
        }

        if (pickerMobileInput) {
          pickerMobileInput.addEventListener("blur", () => {
            if (elm.value.length !== 0) {
              Validation.check(typeValidation, elm);
            }
          });
        }
      }

      if (typeMask && elm.tagName === "INPUT") {
        addMask(elm as InputElement, typeMask);
      }

      if (typeValidation) {
        addBlurValidation(elm, typeValidation);
      }

      // Если чекбокс "адрес регистрации === адрес проживания"
      if (elm.type === "checkbox") {
        const residenceInput = fieldElms.find(elm => elm.name === "document-residence");

        if (residenceInput) {
          elm.onchange = () => {
            const isChecked = (elm as InputElement).checked;
            residenceInput.disabled = isChecked;
          };
        }
      }

      if (elm.type === "radio" && (elm.value === "1" || elm.value === "2") && seriesInput && numbersInput) {
        elm.onchange = () => {
          const isPassport = elm.value === "1";

          [seriesInput, numbersInput].forEach(elm => clearField(elm));

          Mask.documentSeries(<InputElement>seriesInput, isPassport ? "" : "document-birth");
        };
      }
    });
  };

  const addChildSection = (id: number) => {
    if (!hasChildForm) {
      hasChildForm = true;
    }

    const childFormSize = Array.from(document.querySelectorAll(".child-form")).length;

    formElm.classList.add("has-child");
    childrenSection.insertAdjacentHTML("beforeend", getTemplate(id));

    const childForm = document.querySelector(`#child-form-${id}`) as HTMLElement;

    if (idChildCount !== 1) {
      replaceTitleNumber(childForm, childFormSize + 1)
    }

    initFormSection(childForm);
    removeChildSection(id);
  };

  const removeChildSection = (id: number) => {
    const childForm = document.querySelector(`#child-form-${id}`) as HTMLElement;
    const btnRemoveElms = Array.from(childForm.querySelectorAll(".document-form__btn-remove")) as HTMLButtonElement[];

    if (btnRemoveElms.length) {
      btnRemoveElms.forEach(btn => {
        btn.onclick = () => {
          let childFormElms = Array.from(document.querySelectorAll(".child-form"))!;

          childForm.remove();

          if (childFormElms.length === 1) {
            formElm.classList.remove("has-child");
            hasChildForm = false;
          } else {
            // Меняем заголовок формы, чтобы номер соответствовал количеству элементов.
            // При этом id остается согласно idChildCount
            childFormElms = Array.from(document.querySelectorAll(".child-form"))!;

            childFormElms.forEach((formElm, index) => {
              replaceTitleNumber(formElm as HTMLElement, index + 1);
            });
          }
        };
      });
    }
  };

  const clearField = (elm: FormElm) => {
    // Если на инпуте используется маска,
    // то value устанавливается через ее метод
    if (elm.inputmask) {
      elm.inputmask.setValue("");
    } else {
      elm.value = "";
    }

    if (elm.type === "checkbox") {
      (<InputElement>elm).checked = false;
    }

    // Сбрасывается/очищается через методы кастомных полей
    if (elm.tagName === "INPUT" && elm.classList.contains("form__datepicker") && (<DatePickerElement>elm)._flatpickr) {
      // flatpickr
      (<DatePickerElement>elm)._flatpickr!.clear();
    }

    Validation.clearClasses(elm);
  };

  const clearForm = (formElm: HTMLFormElement) => {
    const formElms = getFormFieldElms(formElm);
    formElms.forEach((elm) => {
      clearField(elm);
    });
  };

  const formElm = document.querySelector(".document-form") as HTMLFormElement;
  const childrenSection = formElm.querySelector(".document-form__section--children") as HTMLElement;
  const btnAddForm = formElm.querySelector(".js-add-child-form") as HTMLButtonElement;
  const successBlock = document.querySelector(".document-success") as HTMLElement;
  const successTextElm = successBlock.querySelector(".document-success__text") as HTMLElement;
  const successBtnShowForm = successBlock.querySelector(".js-show-form") as HTMLButtonElement;

  const success = new SuccessDocument(successBlock, formElm);

  let idChildCount = 1;
  let hasChildForm = false;
  const successText = "Необходимо принести оригиналы документов: паспорт.";
  const successTextChild = "Необходимо принести оригиналы документов: паспорт законного представителя и паспорт или свидетельство о рождении ребенка/ постановление органов опеки/свидетельство о государственной регистрации акта усыновления ст. 125 СК РФ.";

  formElm.setAttribute("novalidate", "");

  formElm.onsubmit = (event) => {
    event.preventDefault();
    const KEY = "";
    const url = formElm.action || "/document";

    Submit.send(getFormFieldElms(formElm), url, KEY);

    (async () => {
      // TODO: убрать условие для прода
      if (0) {
        await Submit.send(getFormFieldElms(formElm), url, KEY);
      }

      // Если отправка прошла без ошибок,
      // то показываем блок с сообщение об успехе
      successTextElm.textContent = hasChildForm ? successTextChild : successText;
      await success.show();
      // console.log('await Success.show end');
    })();
  };

  btnAddForm.onclick = () => {
    addChildSection(idChildCount);
    idChildCount = idChildCount + 1;
  };

  successBtnShowForm.onclick = () => {
    clearForm(formElm);
    success.hide();
  };

  initFormSection(document.querySelector(".document-form__section--adult")!);
}
