import core from "./core";
import fixedHero from "./scripts/pages/about/fixedHero";
import stepsAnimation from "./scripts/pages/children-service/stepsAnimation";
import serviceGalleryCarousel from "./scripts/pages/children-service/serviceGalleryCarousel";

core();
fixedHero();
stepsAnimation();
serviceGalleryCarousel();

const heroSlider = () => {
  //slider in main
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlide() {
    showSlides(slideIndex += 1);
  }

  function minusSlide() {
    showSlides(slideIndex -= 1);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    const slides = document.querySelectorAll(".main__slide");


    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }

    for(i=0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }



    slides[slideIndex-1].style.display = "block";


    const arrows = document.querySelectorAll(".arrow");
    if (slides.length === 1) {
      arrows.forEach((arrow) => {
        arrow.style.display = "none"
      })
    }


    const circle = document.querySelector('.circle-ring');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;



    circle.style.strokeDasharray = ` ${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;


    function setProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
    }

  }




  // slider with progress bar

  const slides = document.querySelectorAll('.slide');

  function slideShow(){
    // get current slide
    const current = document.querySelector('.slide_active')
    if (current) {
      //remove active class
      current.classList.remove("slide_active");
      // if there is a nextElementSibling:
      if (current.nextElementSibling) {
        //add active to next slide
        current.nextElementSibling.classList.add("slide_active");
      } else {
        // add active to first one
        slides[0].classList.add("slide_active");
      }

      setTimeout("slideShow()", 6000);
    }
  }

  // load the function when the website loads
  window.onload = slideShow;
}

heroSlider();

if (window.APP.isDesktop) {
  import("./scripts/core/lightboxGallery").then(({default: lightboxGallery}) => {
    lightboxGallery();
  });
}
