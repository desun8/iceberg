import teethAnimation from "./teethAnimation";
import fixedHero from "./fixedHero";

export default () => {
  console.log("SUKA");
  teethAnimation();
  fixedHero();

  if (window.APP.isDesktop) {
    // import('./serviceAnimation').then(({ default: serviceAnimation }) => {
    //   serviceAnimation();
    // });

    if (window.APP.scrollbar !== undefined) {
      import('./anchorForScrollSmooth').then(({ default: anchorForScrollSmooth }) => {
        anchorForScrollSmooth();
      });
    }
  }
}
