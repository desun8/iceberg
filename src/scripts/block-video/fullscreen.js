/**
 * Открытие видео во весь экран при клике на кнопку
 */
const fullscreen = () => {
  try {
    // В Safari 14.0.1 (mac) без префикса webkit не работает
    const btn = document.querySelector('.js-btn-fullscreen');
    const video = document.querySelector('.block-video__video');
    const { src, webm } = video.dataset;

    const isSupportWebm = !!window.Modernizr?.video.webm;

    // При клике запускаем видео и переходим во весь экран
    btn.addEventListener('click', () => {
      video.src = isSupportWebm ? webm : src;
      video.play();

      if (document.documentElement.requestFullscreen) {
        video.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });

    // При выходе из фуллскрина видео ставится на паузу и очищается src
    const handleFullscreenchange = (e) => {
      if (document.fullscreenElement === null || document.webkitFullscreenElement === null) {
        e.currentTarget.pause();
        e.currentTarget.src = '';
      }
    };

    video.addEventListener('fullscreenchange', handleFullscreenchange);
    video.addEventListener('webkitfullscreenchange', handleFullscreenchange);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Открытие видео во весь экран', e);
  }
};

export default fullscreen;
