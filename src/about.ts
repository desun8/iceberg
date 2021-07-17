import core from "./core";
import fixedHero from "./scripts/pages/about/fixedHero";
import stepsAnimation from "./scripts/pages/children-service/stepsAnimation";
import serviceGalleryCarousel from "./scripts/pages/children-service/serviceGalleryCarousel";
import CarouselAboutHero from "./scripts/Carousel/CarouselAboutHero";

core();
fixedHero();
stepsAnimation();
serviceGalleryCarousel();

const heroCarousel = new CarouselAboutHero(document.querySelector(".about-hero-carousel"));
heroCarousel.init();

if (window.APP.isDesktop) {
  import("./scripts/core/lightboxGallery").then(({default: lightboxGallery}) => {
    lightboxGallery();
  });
}
