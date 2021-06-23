export default () => {
  const elms = Array.from(document.querySelectorAll(".structure-place-direction-content__body")) as HTMLElement[];

  elms.forEach(elm => {
    const wrapperElm = elm.querySelector(".wrapper.truncate") as HTMLElement;
    const btn = elm.querySelector(".structure-place-direction-content__collapse") as HTMLButtonElement;

    const textOpen = btn.textContent;
    const textClose = "свернуть";

    if (wrapperElm.scrollHeight === wrapperElm.offsetHeight) {
      btn.style.display = "none";
    }

    btn.onclick = () => {
      const isCollapsed = btn.getAttribute("aria-expanded") === "true";

      if (isCollapsed) {
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = textOpen;
        wrapperElm.style.maxHeight = "";
        wrapperElm.style.webkitLineClamp = "";
        btn.scrollIntoView({block: "end", inline: "nearest"});
      } else {
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = textClose;
        wrapperElm.style.maxHeight = "100%";
        wrapperElm.style.webkitLineClamp = "unset";
      }
    };
  });
};
