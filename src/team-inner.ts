import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import core from "./initCore";
import { exampleLinkHover } from "./scripts/pages/team-inner/exampleLinkHover";
import { addPictureMask } from "./scripts/pages/team-inner/addPictureMask";
import { examplesEnterAnimation } from "./scripts/pages/team-inner/examplesEnterAnimation";

gsap.registerPlugin(ScrollTrigger);

core();

exampleLinkHover();
addPictureMask();
examplesEnterAnimation();

if (window.APP.isDesktop) {
  import("./scripts/pages/team-inner/stickyPhoto").then(({default: stickyPhoto}) => stickyPhoto());
}
