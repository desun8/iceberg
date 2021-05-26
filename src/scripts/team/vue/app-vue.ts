import Vue from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Data, Employee, EmployeeWithKey, Storage } from "./types";
import EmployeeCard from "./components/EmployeeCard";
import isDesktop from "../../utils/isDesktop";
import Persistence from "../../Persistence";
import { worker } from "../../../mocks/browser";

// TODO: удалить для прода
worker.start();

gsap.registerPlugin(ScrollTrigger);

const INITIAL_VIEW_SIZE = 6;
const INITIAL_TYPE = "1";

const shouldRestore: boolean = (() => {
  let restore = Persistence.get("restore") === "true";

  // TODO: удалить
  if (restore) {
    console.log("Страница команды. Восстанавливаем состояние.");
  }

  return restore;
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
      employeeItems: null,
      isEmptyType: false,
    };
  },

  computed: {
    filteredEmployees(): EmployeeWithKey[] | [] {
      if (this.employeeItems === null) {
        return [];
      }

      return (this.employeeItems.filter((item) => {
        const isCorrect = item.types.some((type: string) => type === this.selectedType);

        // Если элемент подходит по типу,
        // то генерируем "key".
        if (isCorrect) {
          (item as EmployeeWithKey).key = item.name + (Date.now() * Math.random() * Math.random());
          return true;
        }

        return false;
      }) as EmployeeWithKey[] | []);
    },

    employees(): EmployeeWithKey[] {
      if (this.filteredEmployees.length === 0) {
        this.isEmptyType = true;
        return this.filteredEmployees;
      }

      this.isEmptyType = false;

      return this.filteredEmployees.slice(0, this.view);
    },
  },

  methods: {
    fetchEmployees() {
      if (shouldRestore && Persistence.get(Storage.Items)) {
        console.log("восстановление данных из sessionStorage");
        const getSessionData = new Promise((resolve) => {
          resolve("done");
        });

        return getSessionData.then(() => JSON.parse(Persistence.get(Storage.Items) as string) as Employee[]);
      }

      const handleErrors = (response: Response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      };

      return fetch("/api/employees", {method: "POST"})
        .then(handleErrors)
        .then((response) => response.results ? JSON.parse(response.results) : [])
        .catch((error) => console.error("При получении списка сотрудников что то пошло не так", error));
    },

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
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      // make the right edge "stick" to the scroll bar. force3D: true improves performance
      gsap.set(".employees-list__item", {transformOrigin: "right center", force3D: true});
    },

    delay() {
      const delay = new Promise((resolve) => {
        setTimeout(() => resolve(""), 200);
      });

      return delay.then();
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

  async mounted() {
    this.employeeItems = await this.fetchEmployees();

    await this.delay();

    if (shouldRestore) {
      const scrollPosition = Persistence.get(Storage.Scroll);

      if (scrollPosition) {
        if (window.APP.scrollbar) {
          window.APP.scrollbar.setMomentum(0, +scrollPosition);
        } else {
          document.documentElement.scrollTop = +scrollPosition;
        }
      }
    }

    // console.log("this.employeeItems");
    // console.log(this.employeeItems);

    this.createObserver();
  },

  updated() {
    if (isDesktop()) {
      this.createScrollAnimation();
    }
  }
})
