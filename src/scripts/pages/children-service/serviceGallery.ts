import PhotoSwipe from "photoswipe";
import Swiper, { EffectFade, Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination, EffectFade]);


type GalleryItem = {
  src: string, // path to image
  w: number, // image width
  h: number, // image height
  title?: string  // if you skip it, there won't be any caption
}

export default () => {
  const initCarousel = () => {
    const element = document.querySelector(".children-services-gallery.swiper-container") as HTMLElement;

    new Swiper(element, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        formatFractionCurrent: (number): any => {
          if (number < 10) {
            return "0" + number;
          }

          return number;
        },
      },
      navigation: {
        nextEl: ".children-services-gallery__button-next",
        prevEl: ".children-services-gallery__button-prev",
      },
    });
  };

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

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div> 
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
    `;
    document.body.insertAdjacentHTML("beforeend", template);
  };
  const initGallery = (index = 0) => {
    const getGalleryItems = () => {
      let items: GalleryItem[] = [];

      btns.forEach(btn => {
        const imgElement = btn.querySelector("img") as HTMLImageElement;

        const src = imgElement.getAttribute("src")!;
        const width = parseFloat(imgElement.getAttribute("width")!);
        const height = parseFloat(imgElement.getAttribute("height")!);
        const alt = imgElement.getAttribute("alt")!;

        items.push({
          src: src,
          w: width,
          h: height,
          title: alt,
        });
      });

      return items;
    };
    const galleryElement = document.querySelector(".pswp")!;

    // build items array
    const items = getGalleryItems();
    console.log(items);

    // define options (if needed)
    const options = {
      history: false,
      index: index,
    };

    // Initializes and opens PhotoSwipe
    const gallery = new PhotoSwipe(galleryElement, false, items, options);
    gallery.init();
  };

  const btns = Array.from(document.querySelectorAll("button[data-photoswiper-item]")) as HTMLButtonElement[];

  initCarousel();
  appendTemplate();

  btns.forEach((btn, index) => {
    btn.onclick = () => {
      console.log("open gallery");
      initGallery(index);
    };
  });
}
