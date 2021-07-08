import PhotoSwipe from "photoswipe";

type GalleryItem = {
  src: string, // path to image
  w: number, // image width
  h: number, // image height
  title: string  // if you skip it, there won't be any caption
}

interface PhotoSwipeItem extends PhotoSwipe.Item {
  title: string;
}

export default () => {
  const appendTemplate = () => {
    const template = `
      <!-- Root element of PhotoSwipe. Must have class pswp. -->
      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

      <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
    </div>
    
    <span class="pswp-title"></span>
    <button class="pswp-close  hamburger hamburger--close  btn  btn--circle  btn--pink" type="button" aria-label="Закрыть.">
      <span class="hamburger__line"></span>
      <span class="hamburger__line"></span>
</button>
      <button class="pswp-btn pswp-btn--prev  slider-btn  slider-btn--hover-pink slider-btn--prev" type="button" aria-label="Предыдущее изображение."></button>
      <button class="pswp-btn pswp-btn--next  slider-btn  slider-btn--hover-pink" type="button" aria-label="Следующее изображение."></button>
</div>
    `;
    document.body.insertAdjacentHTML("beforeend", template);
  };
  const getGalleryItems = (btns: HTMLButtonElement[]) => {
    let items: GalleryItem[] = [];

    btns.forEach(btn => {
      const imgElement = btn.querySelector("img") as HTMLImageElement;

      const src = imgElement.getAttribute("src")!;
      const width = parseFloat(imgElement.getAttribute("width")!);
      const height = parseFloat(imgElement.getAttribute("height")!);
      const alt = imgElement.dataset.title || imgElement.getAttribute("alt")! || "";

      items.push({
        src: src,
        w: width,
        h: height,
        title: alt,
      });
    });

    return items;
  };
  const initGallery = (items: GalleryItem[], index = 0) => {
    const galleryElement = document.querySelector(".pswp") as HTMLElement;
    const galleryContainer = galleryElement.querySelector(".pswp__container") as HTMLElement;
    const galleryTitle = galleryElement.querySelector(".pswp-title") as HTMLElement;
    const galleryBtnClose = galleryElement.querySelector(".pswp-close") as HTMLButtonElement;
    const galleryBtnPrev = galleryElement.querySelector(".pswp-btn--prev") as HTMLButtonElement;
    const galleryBtnNext = galleryElement.querySelector(".pswp-btn--next") as HTMLButtonElement;

    if (items.length === 1) {
      galleryBtnPrev.style.opacity = "0";
      galleryBtnNext.style.opacity = "0";
    } else {
      galleryBtnPrev.style.opacity = "";
      galleryBtnNext.style.opacity = "";
    }

    // define options (if needed)
    const options = {
      index: index,
      history: false,
      closeOnScroll: false,
      maxSpreadZoom: 1,
      zoomEl: false,
      scaleMode: "fit",
    };

    // Initializes and opens PhotoSwipe
    const gallery = new PhotoSwipe(galleryElement, false, items, options);

    galleryBtnClose.onclick = gallery.close;
    galleryContainer.onclick = (e) => {
      if ((e.target as HTMLElement).tagName !== "IMG") {
        gallery.close();
      }
    };
    galleryBtnNext.onclick = gallery.next;
    galleryBtnPrev.onclick = gallery.prev;

    // Задаем позицию текущего изображения,
    // чтобы кнопки подстроились под новый размер.
    gallery.listen("beforeChange", function () {
      console.log(gallery.currItem);
      const {initialPosition, title} = gallery.currItem as PhotoSwipeItem;

      galleryTitle.textContent = title;

      galleryElement.style.setProperty("--gap-x", `${initialPosition.x}px`);
      galleryElement.style.setProperty("--gap-y", `${initialPosition.y}px`);
    });

    gallery.init();
  };

  const galleryElements = Array.from(document.querySelectorAll("[data-photoswipe-gallery]")!);

  appendTemplate();

  galleryElements.forEach(gallery => {
    const btns = Array.from(gallery.querySelectorAll("button[data-photoswiper-item]")) as HTMLButtonElement[];

    const galleryItems = getGalleryItems(btns);

    btns.forEach((btn, index) => {
      btn.onclick = () => {
        console.log("open gallery");
        initGallery(galleryItems, index);
      };
    });
  });
}
