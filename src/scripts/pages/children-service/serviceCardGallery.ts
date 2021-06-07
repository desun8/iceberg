import Swiper, { Pagination, Scrollbar } from "swiper";

Swiper.use([Pagination, Scrollbar]);

export default () => {
  const cardElements = Array.from(document.querySelectorAll(".children-service:not(.children-service--accordion)")) as HTMLElement[];

  cardElements.forEach(cardElement => {
    const gallery = cardElement.querySelector(".children-service-gallery") as HTMLElement;
    const galleryItems = Array.from(gallery.querySelectorAll(".children-service-gallery__item")) as HTMLElement[];

    if (galleryItems.length > 2) {
      console.log("need carousel");
      console.log(galleryItems);

      const addClassNames = (container: HTMLElement, wrapper: HTMLElement, slides: HTMLElement[]) => {
        container.classList.add("swiper-container");
        wrapper.classList.add("swiper-wrapper");
        slides.forEach((slide) => {
          slide.classList.add("swiper-slide");
        });
      };

      const galleryWrapper = gallery.querySelector('.children-service-gallery__wrapper') as HTMLElement;
      const galleryScrollbar = gallery.querySelector(".swiper-scrollbar") as HTMLElement;

      addClassNames(gallery, galleryWrapper, galleryItems);

      new Swiper(gallery, {
        scrollbar: {
          el: galleryScrollbar,
          draggable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 46,
          }
        }
      });
    }
  });
}
