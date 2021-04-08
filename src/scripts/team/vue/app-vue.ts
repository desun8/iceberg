import Vue from "vue";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Data, Employee, EmployeeWithKey } from "./types";
import { testData } from "./testData";
import EmployeeCard from "./components/EmployeeCard";
import isDesktop from "../../utils/isDesktop";
import Persistence from "../../Persistence";

gsap.registerPlugin(ScrollTrigger);

export enum Storage {
  View = "view",
  Items = "employee-items",
  Type = "selected-type",
  Scroll = "scroll-position"
}

const INITIAL_VIEW_SIZE = 6;
const INITIAL_TYPE = "1";

const shouldRestore: boolean = (() => {
  const referrer: string = document.referrer;

  // TODO: заменить на название подраздела.
  // Например url - site.ru/employee/volchkova
  // Название подраздела - "employee". Его и ищем.
  const searchPhrase = /team-inner/;

  // TODO: удалить
  console.log(`Restore data from storage? ${referrer.search(searchPhrase) !== -1}`);

  return referrer.search(searchPhrase) !== -1;
})();

const initialView = (shouldRestore && Persistence.get(Storage.View)) || INITIAL_VIEW_SIZE;
const initialType = (shouldRestore && Persistence.get(Storage.Type)) || INITIAL_TYPE;

export default () => new Vue({
  el: "#app-team",
  components: {
    "employee-card": EmployeeCard,
  },
  data(): Data {
    return {
      selectedType: initialType,
      viewStep: INITIAL_VIEW_SIZE,
      view: +initialView,
      observer: null,
      scrollTriggerInstance: null,
    };
  },

  computed: {
    employeeItems(): Employee[] {
      if (shouldRestore && Persistence.get(Storage.Items)) {
        return JSON.parse(Persistence.get(Storage.Items) as string) as Employee[];
      }

      Persistence.set(Storage.Items, JSON.stringify(testData));
      return testData;
    },

    filteredEmployees(): EmployeeWithKey[] | [] {
      return (this.employeeItems.filter((item) => {
        const isCorrect = item.types.some((type: string) => type === this.selectedType);

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

      if (isDesktop()) {
        setTimeout(() => {
          this.createScrollAnimation();
        }, 100);
      }

      return newArr;
    },
  },

  methods: {
    setView(newVal: number) {
      Persistence.set(Storage.View, newVal);
      this.view = newVal;
    },

    setSelectedType(newValue: string) {
      Persistence.set(Storage.Type, newValue);
      this.selectedType = newValue;
      this.setView(this.viewStep);
    },

    handleClickTab(event: MouseEvent) {
      const value = (event.currentTarget as HTMLButtonElement).value;
      this.setSelectedType(value);
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

    createScrollAnimation() {
      if (this.scrollTriggerInstance !== null) {
        this.scrollTriggerInstance.kill();
      }

      let proxy = {skew: 0};
      let skewSetter = gsap.quickSetter(".employees-list__item", "skewY", "deg"); // fast
      let clamp = gsap.utils.clamp(-1, 1); // don't let the skew go beyond 20 degrees.

      this.scrollTriggerInstance = ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -300);
          // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              // ease: "sine.in",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      // make the right edge "stick" to the scroll bar. force3D: true improves performance
      gsap.set(".employees-list__item", {transformOrigin: "right center", force3D: true});
    },
  },

  watch: {
    selectedType(currValue, prevValue) {
      if (currValue !== prevValue) {
        this.unobserving();
        this.observing();
      }
    },
  },

  mounted() {
    this.createObserver();

    if (isDesktop()) {
      this.createScrollAnimation();
    }

    if (shouldRestore) {
      const scrollPosition = Persistence.get(Storage.Scroll);

      if (scrollPosition) {
        document.documentElement.scrollTop = +scrollPosition;
      }
    }
  },
})
