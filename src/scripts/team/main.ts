import Vue from "vue";
import { Employee } from "./types";
import EmployeeCard from "./EmployeeCard";

const testData: Employee[] = [
  {
    name: "Елена Тишкова",
    specialization: "Ортодонт",
    url: "/team-inner.html",
    images: ["images/employees/employee-image.jpg", "images/employees/employee-image--mask.jpg"],
    types: ["1", "2"],
  },
  {
    name: "Сергей Иванов",
    specialization: "Терапевт",
    url: "/team-inner.html",
    images: ["images/employees/employee-image-1.jpg", "images/employees/employee-image-1--mask.jpg"],
    types: ["1", "3"],
  },
];

export default () => new Vue({
  el: "#app-team",
  components: {
    "employee-card": EmployeeCard,
  },
  data() {
    return {
      selectedTab: "1",
      employeeItems: testData,
    };
  },
  computed: {
    filteredEmployees(): Employee[] {
      return this.employeeItems.filter((item) => item.types.some((type) => type === this.selectedTab));
    },
  },

  methods: {
    setSelectedTab(newValue: string) {
      console.log(`Selected value is ${newValue}`);
      this.selectedTab = newValue;
    },

    handleClickTab(event: MouseEvent) {
      const value = (event.currentTarget as HTMLButtonElement).value;
      this.setSelectedTab(value);
    },
  },
})
