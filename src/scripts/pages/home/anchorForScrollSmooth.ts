// Фикс якорных ссылок под "smooth-scrollbar.js"
export default () => {
  const linksToTop: HTMLAnchorElement[] | [] = Array.from(document.querySelectorAll("a[href='#scroll-container']"));

  if (linksToTop.length) {
    linksToTop.forEach(link => {
      link.onclick = (event) => {
        event.preventDefault();

        if (window.APP.scrollbar !== undefined) {
          window.APP.scrollbar.scrollTop = 0;
        }
      };
    });
  }
}

