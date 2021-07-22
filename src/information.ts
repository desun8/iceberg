import core from "./initCore";
import information from "./scripts/pages/information/index";

core();
information();

if (window.APP.isDesktop) {
  import("./scripts/core/lightboxGallery").then(({default: lightboxGallery}) => {
    lightboxGallery();
  });
}
