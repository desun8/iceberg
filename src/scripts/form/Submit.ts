// 🐼
import Validation from "./Validation";
import Formdata from "./Formdata";
import { FormElm } from "./types";

class Submit {
  private static isValid(inputs: FormElm[] = []) {
    // обязательные поля устанавливаются через data-required
    const requiredElms = inputs.filter((input) => input.required && input.id);
    // название типа для валидации хранится в data-name
    const isInvalid = !!requiredElms.filter((elm) => !Validation.check(elm.dataset.validation!, elm)).length;
    return !isInvalid;
  }

  private static fetch(url: string, formData: FormData) {
    const params = {
      method: "POST",
      // mode: 'no-cors', // TODO: удалить при натягивании
      body: formData,
    };

    // TODO: раскомментировать при натягивании
    const handleErrors = (response: Response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    };

    // TODO: можно удалить. Либо закомментировать и оставить для тестов
    const handleSuccess = (response: Object) => {
      console.log("форма отправилась");
      console.log(response);
      // console.log(response.json().status);
    };

    fetch(url, params)
      // TODO: раскомментировать при натягивании
      .then(handleErrors)
      .then(handleSuccess)
      .catch((error) => console.error("Форма не отправилась", error));
  }

  // невидимая гугл-каптча
  private static recaptcha(key: string, formData: FormData, fetch: (a: FormData) => void) {
    try {
      // подключается через <script>
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(key, {action: "form"})
          .then((token: string) => {
            // добавляем в отправляемые данные токен рекаптчи
            formData.append("recaptcha_response", token);
            fetch(formData);
          })
          .then((res: Response | Object) => res);
      });
    } catch (e) {
      console.error("Что-то не так с рекаптчей -> Submit.recaptcha", e);
    }
  }

  // static handleSuccess(formElm, msgElm) {
  //   console.warn('HANDLE_SUCCESS');
  //   Success.toggleMessage(true, formElm, msgElm);
  //   Success.clearForm();
  // }

  // eslint-disable-next-line consistent-return
  static send(inputs: FormElm[] = [], url: string, captchaKey: string, formType?: string) {
    if (this.isValid(inputs)) {
      const formData = Formdata.create(inputs);

      if (formType) {
        formData.append("iblock", formType);
      }

      // TODO: Закомментировать после проверки
      // проверка значений formData
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      this.recaptcha(captchaKey, formData, (data) => this.fetch(url, data));
    } else {
      console.warn("%c Поля заполнены с ошибками", "color: #212121; font-weight: bold; padding: 1em; background: #fa9f0c");
      return Promise.reject(new Error("Форма не отправилась. Поля заполнены с ошибками"))
        .catch((error) => {
          // console.log(error); // печатает "провал" + Stacktrace
          throw error; // повторно выбрасываем ошибку, вызывая новый reject
        });
    }
  }
}

export default Submit;
