// 🐼
import { FormElm } from "./types";

class Formdata {
  static create(inputs: FormElm[] = []) {
    const formData = new FormData();

    inputs.forEach((item) => {
      formData.append(item.name, item.value);
    });

    return formData;
  }
}

export default Formdata;
