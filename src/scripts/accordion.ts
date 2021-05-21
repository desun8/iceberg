export default () => {
  const accordionElements = Array.from(document.querySelectorAll(".js-accordion"));

  accordionElements.forEach(element => {
    const btn = element.querySelector(".js-accordion-btn") as HTMLButtonElement;
    const content = element.querySelector(".js-accordion-content") as HTMLElement;

    if (btn && content) {
      const height = content.offsetHeight;
      const duration = 600;

      content.hidden = true;
      content.style.maxHeight = "0";
      content.style.overflow = "hidden";
      content.style.transition = `all ${duration}ms`;

      let timer: ReturnType<typeof setTimeout> | null = null;

      btn.addEventListener("click", () => {
        const isExpanded = btn.getAttribute("aria-expanded") === "true" || false;
        btn.setAttribute("aria-expanded", `${!isExpanded}`);

        content.style.willChange = "max-height, padding-top";

        if (isExpanded) {
          console.log("hidden");
          content.style.maxHeight = "0";
          content.style.paddingTop = "0";

          if (timer !== null) clearTimeout(timer);

          timer = setTimeout(() => {
            content.hidden = isExpanded;
            content.style.willChange = "";
          }, duration * 0.9);
        } else {
          console.log("show");
          content.hidden = isExpanded;

          if (timer !== null) clearTimeout(timer);

          setTimeout(() => {
            content.style.maxHeight = height + "px";
            content.style.paddingTop = "";
          }, 100);
        }
      });
    }
  });
}
