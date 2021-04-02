import Vue, { PropType } from "vue";
import { Images } from "./types";
import ImageMask from "../ImageMask";

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
  },

  mounted() {
    const {root, defaultImg, maskImg} = this.$refs;
    new ImageMask(root as HTMLDivElement, defaultImg as HTMLImageElement, maskImg as HTMLImageElement);
  },

  template: `
    <div ref="root" class="employee-picture">
    <span class="employee-picture__icon"></span>
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
