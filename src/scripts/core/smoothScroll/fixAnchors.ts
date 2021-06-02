// Фикс якорных ссылок под "smooth-scrollbar.js"
export default () => {
  const linksToTop: HTMLAnchorElement[] | [] = Array.from(document.querySelectorAll("a[href^='#']:not([href$='#'])"));
  console.log(linksToTop);

  if (linksToTop.length) {
    linksToTop.forEach(link => {
      const id = link.hash;
      const target = document.querySelector(id) as HTMLElement;

      console.log(target);

      link.onclick = (event) => {
        event.preventDefault();

        if (window.APP.scrollbar !== undefined) {
          if (id === "#scroll-container") {
            window.APP.scrollbar.scrollTop = 0;
          } else {
            window.APP.scrollbar.scrollIntoView(target, {
              offsetTop: -window.APP.scrollbar.containerEl.scrollTop,
            });
          }
        }
      };
    });
  }
}

