import reviewCarousel from "./reviewCarousel";
import borderImageAnimation from "./borderImageAnimation";

export default () => {
  const departmentsElms = Array.from(document.querySelectorAll(".information-departments__img")) as HTMLElement[];
  departmentsElms.forEach(elm => {
    const imgElm = elm.querySelector(".information-departments__picture") as HTMLElement;
    borderImageAnimation(elm, imgElm);
  })

  reviewCarousel();
}
