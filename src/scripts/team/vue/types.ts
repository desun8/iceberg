import ScrollTriggerInstance = gsap.plugins.ScrollTriggerInstance;

export type Images = [string, string];

export type Employee = {
  name: string;
  specialization: string;
  url: string;
  images: Images;
  types: string[];
};

export type EmployeeWithKey = {
  key: undefined | string;
  name: string;
  specialization: string;
  url: string;
  images: Images;
  types: string[];
  isEmptyPlaceholder?: boolean;
};

export type Data = {
  selectedType: string;
  viewStep: number;
  view: number;
  observer: null | IntersectionObserver;
  scrollTriggerInstance: ScrollTriggerInstance | null;
  employeeItems: Employee[] | null;
  isEmptyType: boolean;
  hasMore: boolean;
  isFetching: boolean;
};

export enum Storage {
  View = "view",
  Items = "employee-items",
  Type = "selected-type",
  Scroll = "scroll-position",
}
