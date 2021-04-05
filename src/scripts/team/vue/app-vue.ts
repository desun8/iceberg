import Vue from "vue";
import gsap from "gsap";
import { Data, EmployeeWithKey } from "./types";
import { testData } from "./testData";
import EmployeeCard from "./components/EmployeeCard";

const INITIAL_VIEW_SIZE = 6

export default () => new Vue({
  el: "#app-team",
  components: {
    "employee-card": EmployeeCard,
  },
  data(): Data {
    return {
      selectedTab: "1",
      viewStep: INITIAL_VIEW_SIZE,
      view: INITIAL_VIEW_SIZE,
      employeeItems: testData,
      observer: null,
    };
  },
  computed: {
    filteredEmployees(): EmployeeWithKey[] | [] {
      return (this.employeeItems.filter((item) => {
        const isCorrect = item.types.some((type: string) => type === this.selectedTab);

        // Если элемент подходит по типу,
        // то генерируем "key".
        if (isCorrect) {
          (item as EmployeeWithKey).key = item.name + (Date.now() * Math.random());
          return true;
        }

        return false;
      }) as EmployeeWithKey[] | []);
    },

    employees(): EmployeeWithKey[] {
      if (this.filteredEmployees.length === 0) {
        return this.filteredEmployees;
      }

      const newArr = this.filteredEmployees.slice(0, this.view);
      return newArr;
    },
  },

  methods: {
    setView(newVal: number) {
      this.view = newVal;
    },

    setSelectedTab(newValue: string) {
      this.selectedTab = newValue;
      this.setView(this.viewStep);
    },

    handleClickTab(event: MouseEvent) {
      const value = (event.currentTarget as HTMLButtonElement).value;
      this.setSelectedTab(value);
    },

    enterAnimation(el: any, done: () => void) {
      const index = this.viewStep - (this.view - +el.dataset.index);
      const delay = index * 0.4;

      gsap.from(el, {
        alpha: 0,
        y: 100,
        duration: 0.6,
        delay,
        onComplete() {
          done();
        },
      });
    },

    leaveAnimation(el: any, done: () => void) {
      gsap.to(el, {
        alpha: 0,
        y: 100,
        duration: 0.6,
        onComplete() {
          done();
        },
      });
    },

    unobserving(): void {
      if (this.filteredEmployees.length === this.employees.length && this.observer !== null) {
        const showMoreTrigger = this.$refs.showMoreTrigger as HTMLElement;

        if (showMoreTrigger) {
          this.observer.unobserve(showMoreTrigger);
        }

        console.log("disconnect observer");
      }
    },

    observing(): void {
      if (this.observer !== null) {
        const showMoreTrigger = this.$refs.showMoreTrigger as HTMLElement;

        if (showMoreTrigger) {
          this.observer.observe(showMoreTrigger);
        }
      }
    },

    createObserver(): void {
      // Автоподгрузка списка.
      // Меняем значение this.view.
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const {isIntersecting} = entry;

            if (isIntersecting) {
              this.setView(this.view + this.viewStep);
              // TODO: удалить
              console.log("loading next items");

              // Если отобразили все элементы, то удаляем обсервер
              if (this.filteredEmployees.length === this.employees.length && this.observer !== null) {
                this.unobserving();
              }
            }
          });
        },
        {threshold: [0.6, 0.8, 1]},
      );

      this.observing();
    },
  },

  watch: {
    selectedTab(currValue, prevValue) {
      if (currValue !== prevValue) {
        this.unobserving();
        this.observing();
      }
    },
  },

  mounted() {
    this.createObserver();
  },
})
