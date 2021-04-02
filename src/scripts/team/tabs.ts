import SimpleBar from "simplebar";

export default () => {
  const element = document.querySelector(".team__filter.js-simplebar") as HTMLElement;

  if (element) {
    new SimpleBar(element, {
      autoHide: false,
    });
  }
}
