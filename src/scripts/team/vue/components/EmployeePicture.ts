import Vue, { PropType } from "vue";
import { Images } from "../types";

const EmployeePicture = Vue.extend({
  props: {
    images: {
      type: Array as unknown as PropType<Images>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function
    }
  },

  mounted() {
    const {root, defaultImg, maskImg} = this.$refs;

    setTimeout(() =>
      import("../../../ImageMask").then(({default: ImageMask}) => {
        new ImageMask(root as HTMLDivElement, defaultImg as HTMLImageElement, maskImg as HTMLImageElement);
      }), 200);
    // new ImageMask(root as HTMLDivElement, defaultImg as HTMLImageElement, maskImg as HTMLImageElement);
  },

  template: `
    <div ref="root" class="employee-picture">
      <a v-on:click="onClick" v-bind:href="href" class="employee-picture__link" aria-hidden="true"></a>
      <span class="employee-picture__icon" aria-hidden="true"></span>
      <img 
          ref="defaultImg"
          v-bind:src="images[0]"
          v-bind:alt="\`Фотография $\{name}.\`"
          class="employee-picture__image"
          width="440"
          height="486">
      <img
          ref="maskImg"
          v-bind:src="images[1]"
          v-bind:alt="\`Фотография $\{name}.\`"
          class="employee-picture__image  employee-picture__image--mask"
          width="440"
          height="486">
    </div>`,
});

export default EmployeePicture;
