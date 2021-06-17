import Mask from "../../form/Mask";
import Validation from "../../form/Validation";

enum MaskType {
  Name = "name",
  Email = "email",
  Tel = "tel",
  Series = "series",
  Number = "number"
}

type FormElm = HTMLInputElement | HTMLTextAreaElement;

export default () => {
  const addValidation = (elm: FormElm) => {
    const addKeypressEvent = (elm: FormElm, keyRegex?: RegExp, stringRegex?: RegExp) => {
      let prevValue = "";

      elm.addEventListener("keypress", (event) => {
        if (keyRegex) {
          event.preventDefault();

          const key = (event as KeyboardEventInit).key!;
          const elm = event.target as FormElm;
          let tempValue = "";
          let value = elm.value;
          console.log(value);

          if (keyRegex.test(key)) {
            tempValue = value + key;

            if (stringRegex) {
              if (tempValue.match(stringRegex) !== null) {
                elm.value = tempValue;
                prevValue = value;
              }
            } else {
              elm.value = tempValue;
            }
          }
        }
      });
    };

    const addBlurEvent = (elm: FormElm, validateRegex: RegExp) => {
      let prevValue = "";

      elm.addEventListener("blur", event => {
        const elm = event.target as FormElm;
        let value = elm.value;

        if (value !== prevValue) {
          prevValue = value;

          const isValid = value.match(validateRegex) !== null;
          if (!isValid) {
            Validation.addErrorClass(elm, true);
          }
        }

        console.log("change");
      });
    };

    const maskType = elm.dataset.mask;

    switch (maskType) {
      case MaskType.Name:
        // addKeypressEvent(elm, /[а-я-]/i, /^[а-я]+-?(([а-я]+)?)*$/i);
        // addBlurEvent(elm, /^[а-я]+-?(([а-я]+)?)*$/i);

        // elm.addEventListener("keypress", e => {
        //   console.log("keypress");
        //   console.log("key: " + e.key);
        //   console.log("value: " + e.target.value);
        // });
        elm.addEventListener("keypress", e => {
          console.log("KEYPRESS");
          console.log("key: " + e.key);
          console.log("value: " + e.target.value);

          if (!/[a-z-]/i.test(e.key)) {
            e.preventDefault();
          }
        });
        elm.addEventListener("keyup", e => {
          console.log("KEYUP");
          console.log("key: " + e.key);
          console.log("value: " + e.target.value);
        });
        break;
      case MaskType.Email:
        // addKeypressEvent(elm, /[a-z0-9!#$%&'*+/=?^_`{|}@.~-]/i);
        addBlurEvent(elm, /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]+)])/i);
        break;
      case MaskType.Tel:
        Mask.tel(elm);
        elm.addEventListener("blur", () => Validation.checkTel(elm));
        break;
      case MaskType.Series:
        Mask.documentSeries(elm);
        elm.addEventListener("blur", () => Validation.checkTel(elm));
        break;
      case MaskType.Number:
        Mask.documentNumber(elm);
        elm.addEventListener("blur", () => Validation.checkTel(elm));
        break;
      default:
        break;
    }
  };

  const initFormSection = (rootElm: HTMLElement) => {
    const inputElms = Array.from(rootElm.querySelectorAll("input")) as HTMLInputElement[];
    const textfieldElms = Array.from(rootElm.querySelectorAll("textarea")) as HTMLTextAreaElement[];
    const fieldElms = [...inputElms, ...textfieldElms];

    fieldElms.forEach(elm => {
      addValidation(elm);
    });
  };

  initFormSection(document.querySelector(".document-form__section--adult")!);
}
