import Mask from "../../form/Mask";
import { FormElm, InputElement, MaskType, TextAreaElement } from "../../form/types";
import Validation from "../../form/Validation";
import DatePicker from "../../form/DatePicker";
import Submit from "../../form/Submit";

const getTemplate = (id: number) => `
    <div id="child-form-${id}" class="child-form">
        <div class="document-form__container  document-form__container--personal">
          <div class="col-full" style="position: relative;">
            <h2 class="document-form__title">Данные ребёнка - ${id}</h2>
            <button class="document-form__btn-remove" type="button" aria-label="Удалить форму ребенка.">Удалить</button>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="lastname-${id}">Фамилия</label>
            <input id="lastname-${id}" type="text" name="lastname" placeholder="Фамилия" autocomplete="family-name"
                   data-mask="name" data-validation="name" required>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="firstname-${id}">Имя</label>
            <input id="firstname-${id}" type="text" name="name" placeholder="Имя" autocomplete="given-name"
                   data-mask="name"
                   data-validation="name" required>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="patronymic-${id}">Отчество</label>
            <input id="patronymic-${id}" type="text" name="patronymic" placeholder="Отчество"
                   autocomplete="additional-name"
                   data-mask="name" data-validation="name"
                   required>
          </div>
          <div class="document-form__field  form-field">
            <div class="custom-datepicker  has-placeholder" data-date="Дата рождения *">
              <label for="birth-date-${id}" class="visually-hidden">Дата рождения</label>
              <input id="birth-date-${id}" class="form__datepicker" type="date" name="birthday"
                     placeholder="Дата рождения"
                     autocomplete="bday" required data-mask="date" data-validation="date" data-required="true">
            </div>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="email-${id}">Email</label>
            <input id="email-${id}" type="text" name="email" placeholder="Email" autocomplete="email" data-mask="email"
                   data-validation="email" required>
          </div>
          <div class="document-form__field  form-field">
            <label class="visually-hidden" for="tel-${id}">Номер телефона</label>
            <input id="tel-${id}" type="tel" inputmode="decimal" name="phone" placeholder="Номер телефона"
                   autocomplete="tel"
                   data-mask="tel" data-validation="tel" required>
          </div>
          <div class="document-form__field  form-field  col-full">
            <label class="visually-hidden" for="comment-${id}">Комментарий</label>
            <textarea id="comment-${id}" rows="3" name="message" placeholder="Комментарий"></textarea>
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
                  name="child-document-type-${id}"
                  value="1"
                  checked
                  required
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
                  name="child-document-type-${id}"
                  value="2"
                  required
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
                <input id="document-series-${id}" type="text" inputmode="decimal" name="series" placeholder="Серия"
                       data-mask="document-series" data-validation="document-series" required>
              </div>
              <div class="document-form__field  form-field">
                <label class="visually-hidden" for="document-number-${id}">Номер</label>
                <input id="document-number-${id}" type="text" inputmode="decimal" name="number" placeholder="Номер"
                       data-mask="document-number" data-validation="document-series" required>
              </div>
            </div>
          </div>
          <div class="document-form__field  form-field">
            <div class="custom-datepicker  has-placeholder" data-date="Дата выдачи *">
              <label for="document-release-${id}" class="visually-hidden">Дата выдачи</label>
              <input id="document-release-${id}" class="form__datepicker" type="date" name="document-release"
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
                    name="document-same-residence"
                    required
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
                       name="document-residence"
                       data-mask="cyrillic">
              </div>
            </div>
          </div>
        </div>

        <button class="document-form__btn-remove" type="button" aria-label="Удалить форму ребенка.">Удалить</button>
      </div>
`;

export default () => {
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
      case MaskType.Date:
        const input = elm.nextElementSibling as InputElement;

        if (input) {
          Mask.date(elm);
          Mask.date(input);
        }
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
    const seriesInput = fieldElms.find(input => input.dataset.validation === "document-series");

    console.log(seriesInput);

    fieldElms.forEach(elm => {
      const isRequired = elm.required;
      const isDateInput = elm.type === "date";
      const typeMask = elm.dataset.mask;
      const typeValidation = elm.dataset.validation;

      if (isRequired) {
        elm.placeholder = `${elm.placeholder} *`;
      }

      if (isDateInput) {
        new DatePicker(elm as HTMLInputElement);
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

      if (elm.type === "radio" && (elm.value === "1" || elm.value === "2") && seriesInput) {
        elm.onchange = () => {
          const isPassport = elm.value === "1";
          seriesInput.value = "";
          Mask.documentSeries(<InputElement>seriesInput, isPassport ? "" : "document-birth");
        };
      }
    });
  };

  const addChildSection = (id: number) => {
    form.classList.add("has-child");
    childrenSection.insertAdjacentHTML("beforeend", getTemplate(id));

    const childForm = document.querySelector(`#child-form-${id}`) as HTMLElement;

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
            form.classList.remove("has-child");
          } else {
            // Меняем заголовок формы, чтобы номер соответствовал количеству элементов.
            // При этом id остается согласно idCount
            childFormElms = Array.from(document.querySelectorAll(".child-form"))!;

            childFormElms.forEach((formElm, index) => {
              const titleElm = formElm.querySelector(".document-form__title")!;
              let newText = titleElm.textContent!;
              newText = newText.replace(/(- \d)$/, `- ${index + 1}`);

              titleElm.textContent = newText;
            });
          }
        };
      });
    }
  };

  const form = document.querySelector(".document-form") as HTMLFormElement;
  const childrenSection = form.querySelector(".document-form__section--children") as HTMLElement;
  const btnAddForm = form.querySelector(".js-add-child-form") as HTMLButtonElement;

  let idCount = 1;

  form.setAttribute("novalidate", "");

  form.onsubmit = (event) => {
    event.preventDefault();
    const KEY = "";
    const url = form.action || "/document";

    Submit.send(getFormFieldElms(form), url, KEY);
  };

  btnAddForm.onclick = () => {
    addChildSection(idCount);
    idCount = idCount + 1;
  };

  initFormSection(document.querySelector(".document-form__section--adult")!);
}
