import "simplebar";
import core from "./core";
import featureCarousel from "./scripts/pages/children-service/featureCarousel";
import accordion from "./scripts/accordion";
import reviewCarousel from "./scripts/pages/children-service/reviewCarousel";
import stickyService from "./scripts/pages/children-service/stickyService";
import stepsAnimation from "./scripts/pages/children-service/stepsAnimation";
import welcomeAnimation from "./scripts/pages/children-service/welcomeAnimation";
import handBrushAnimation from "./scripts/pages/children-service/handBrushAnimation";
import qaAnimation from "./scripts/pages/children-service/qaAnimation";
import serviceCardGallery from "./scripts/pages/children-service/serviceCardGallery";
import lightboxGallery from "./scripts/core/lightboxGallery";
import borderImageAnimation from "./scripts/pages/children-service/borderImageAnimation";

core();

lightboxGallery();
featureCarousel();
accordion();
reviewCarousel();
stickyService();
stepsAnimation();
welcomeAnimation();
qaAnimation();
handBrushAnimation();
serviceCardGallery();
borderImageAnimation();

if (window.APP.isDesktop) {
  import("./scripts/pages/children-service/serviceGalleryCarousel").then(({default: serviceGallery}) => {
    serviceGallery();
  });
}

if (window.matchMedia("(min-width: 1600px)").matches) {
  import("./scripts/pages/children-service/featureBrushAnimation").then(({default: featureBrushAnimation}) => {
    featureBrushAnimation();
  });
}
