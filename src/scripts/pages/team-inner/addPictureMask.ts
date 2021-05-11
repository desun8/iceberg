export const addPictureMask = () => {
  const element = document.querySelector(".employee-picture") as HTMLDivElement;
  if (element) {
    setTimeout(() =>
      import("../../ImageMask").then(({default: ImageMask}) => {
        new ImageMask(element);
      }), 200);
  }
};
