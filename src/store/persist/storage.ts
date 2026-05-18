const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, item: string) =>
    Promise.resolve(localStorage.setItem(key, item)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

export default storage;
