// Фикс якорных ссылок под "smooth-scrollbar.js"
export default () => {
  const linksToTop: HTMLAnchorElement[] | [] = Array.from(document.querySelectorAll("a[href^='#']"));
  console.log(linksToTop);

  if (linksToTop.length) {
    linksToTop.forEach(link => {
      const id = link.href;
      const target = document.querySelector(id);

      console.log(target);

      link.onclick = (event) => {
        event.preventDefault();

        if (window.APP.scrollbar !== undefined) {
          window.APP.scrollbar.scrollTop = 0;
        }
      };
    });
  }
}

