// Добавляем кастомную кнопку play для видео
const svgIcon = `<svg fill="none" viewBox="0 0 115 115"><path fill="#fff" d="M76.59 55.659L52.92 38.449a2.854 2.854 0 00-4.534 2.303V75.16a2.846 2.846 0 004.534 2.3L76.59 60.264a2.86 2.86 0 001.184-2.303 2.834 2.834 0 00-1.184-2.303z"/><path fill="#fff" d="M57.79.888C26.304.888.788 26.407.788 57.898c0 31.479 25.515 56.99 57.002 56.99 31.479 0 56.998-25.515 56.998-56.99.004-31.491-25.52-57.01-56.998-57.01zm0 104.488c-26.221 0-47.48-21.25-47.48-47.479 0-26.216 21.259-47.494 47.48-47.494 26.217 0 47.472 21.274 47.472 47.494.004 26.229-21.255 47.479-47.472 47.479z"/></svg>`;

const btnPlayTemplate = `
  <button class="play" aria-label="Запустить видео.">${svgIcon}</button>
`;

export const addCustomPlayBtn = (elm: HTMLElement) => {
  const videoElm = elm.querySelector("video")!;

  videoElm.removeAttribute("controls");
  elm.insertAdjacentHTML("beforeend", btnPlayTemplate);

  const btnPlay = elm.querySelector("button.play") as HTMLButtonElement;
  btnPlay.onclick = () => {
    btnPlay.style.display = "none";
    videoElm.play();
    videoElm.setAttribute("controls", "");
  };
};
