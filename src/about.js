import core from './core';
import CarouselAboutHero from './scripts/Carousel/CarouselAboutHero';
import CarouselAbout from './scripts/Carousel/CarouselAbout';
import CarouselProgress from './scripts/Carousel/CarouselProgress';

core();

const initCarousels = () => {
  const hero = document.querySelector('.hero-slider');
  const team = document.querySelector('.team-slider');
  const steps = document.querySelector('.steps-slider');
  const slider = document.querySelector('.block-slider .swiper-container');

  const carouselHero = new CarouselAboutHero(hero);
  carouselHero.init();

  const carouselTeam = new CarouselProgress(team);
  carouselTeam.init();

  [steps, slider].forEach((elm) => {
    const carousel = new CarouselAbout(elm);
    carousel.init();
  });
};

initCarousels();

const fullscreenCertificate = () => {
  const btn = document.querySelector('.js-open-certificate');
  const img = document.querySelector('.certificate-original-img');

  const handleClick = () => {
    img.src = img.dataset.src;
    img.style.display = 'block';
    img.style.border = '0';
    img.style.borderRadius = '0';
    img.requestFullscreen();
  };

  btn.addEventListener('click', handleClick);
};

fullscreenCertificate();
