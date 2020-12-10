// 🐼
class Formdata {
  static create(inputs = []) {
    const formData = new FormData();

    inputs.forEach((item) => {
      formData.append(item.name, item.value);
    });

    return formData;
  }
}

export default Formdata;
