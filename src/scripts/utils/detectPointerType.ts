enum Pointer {
  Mouse = "js-pointer-mouse",
  Touch = "js-pointer-touch"
}

export default () => {
  let currType: Pointer | "" = "";
  let prevType: Pointer | "" = "";

  const getType = (value: string) => {
    switch (value) {
      case "touch":
        currType = Pointer.Touch;
        break;
      case "mouse":
        currType = Pointer.Mouse;
        break;
      default:
        currType = "";
    }
  };

  const setHtmlCLass = () => {
    if (currType !== prevType) {
      if (prevType !== "") {
        document.documentElement.classList.remove(prevType);
      }

      if (currType !== "") {
        document.documentElement.classList.add(currType);
      }
    }

    prevType = currType;
  };

  const removeHandle = () => {
    window.removeEventListener("pointermove", handlePointerMove, false);
  };

  const handlePointerMove = (event: PointerEvent) => {
    getType(event.pointerType);
    setHtmlCLass();

    setTimeout(removeHandle, 0);
  };

  window.addEventListener("pointermove", handlePointerMove, false);
}
