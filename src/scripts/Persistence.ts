class Persistence {
  static get(key: string) {
    return sessionStorage.getItem(key);
  }

  static set(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
}

export default Persistence;
