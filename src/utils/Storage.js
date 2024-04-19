export const setStorage = async (key, value) =>
  localStorage.setItem(key, value);
export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
