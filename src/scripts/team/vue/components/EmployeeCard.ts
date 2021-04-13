import Vue, { PropType } from "vue";
import { Employee } from "../types";
import EmployeePicture from "./EmployeePicture";
import Persistence from "../../../Persistence";
import { Storage } from "../app-vue";

const EmployeeCard = Vue.extend({
  components: {
    "employee-picture": EmployeePicture,
  },
  props: {
    employee: {
      type: Object as PropType<Employee>,
      required: true,
    },
  },
  computed: {
    images(): string[] {
      return this.employee.images;
    }
  },
  methods: {
    handleLinkClick() {
      Persistence.set(Storage.Scroll, document.documentElement.scrollTop);
    },
  },
  template: `
    <article class="employee-card">
      <employee-picture 
          v-bind:images="employee.images" 
          v-bind:name="employee.name"
          v-bind:href="employee.url"
          v-bind:on-click="handleLinkClick"
          
      >
      </employee-picture>

      <div class="employee-card__body">
        <h2 class="employee-card__name">{{ employee.name }}</h2>
        <span class="employee-card__specialization">{{ employee.specialization }}</span>
        <a v-on:click="handleLinkClick" v-bind:href="employee.url" class="employee-card__link">
          <span class="icon"></span>
        </a>
      </div>
    </article>
  `,
});

export default EmployeeCard;
