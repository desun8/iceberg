import Vue, { PropType } from "vue";
import { Employee } from "../types";
import EmployeePicture from "./EmployeePicture";

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
  template: `
    <article class="employee-card">
      <employee-picture 
          v-bind:images="employee.images" 
          v-bind:name="employee.name"
          v-bind:href="employee.url"
      >
      </employee-picture>

      <div class="employee-card__body">
        <h2 class="employee-card__name">{{ employee.name }}</h2>
        <span class="employee-card__specialization">{{ employee.specialization }}</span>
        <a v-bind:href="employee.url" class="employee-card__link">
          <span class="icon"></span>
        </a>
      </div>
    </article>
  `,
});

export default EmployeeCard;
