import teethAnimation from "./teethAnimation";
import fixedHero from "./fixedHero";

export default () => {
  teethAnimation();
  fixedHero();

  if (window.APP.isDesktop) {
    // import('./serviceAnimation').then(({ default: serviceAnimation }) => {
    //   serviceAnimation();
    // });

    import('./founderImageAnimation').then(({ default: founderImageAnimation }) => {
      founderImageAnimation();
    });

    // if (window.APP.scrollbar !== undefined) {
    //   import('./anchorForScrollSmooth').then(({ default: anchorForScrollSmooth }) => {
    //     anchorForScrollSmooth();
    //   });
    // }
  }
}
