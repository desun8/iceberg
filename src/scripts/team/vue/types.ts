export type Images = [string, string];

export type Employee = {
  name: string,
  specialization: string,
  url: string,
  images: Images,
  types: string[]
}

export type EmployeeWithKey = {
  key: undefined | string,
  name: string,
  specialization: string,
  url: string,
  images: Images,
  types: string[]
}

export type Data = {
  selectedTab: string,
  viewStep: number,
  view: number,
  employeeItems: Employee[],
  observer: null | IntersectionObserver,
}
