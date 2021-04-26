import teethAnimation from "./teethAnimation";
import fixedHero from "./fixedHero";

export default () => {
  teethAnimation();
  fixedHero();

  if (window.APP.isDesktop) {
    import('./serviceAnimation').then(({ default: serviceAnimation }) => {
      serviceAnimation();
    });
  }
}
