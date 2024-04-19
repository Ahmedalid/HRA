import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getCookies = (name) => cookies.get(name);

export const setCookies = async (name, value) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);

  return cookies.set(name, value, {
    expires,
  });
};
export const removeCookies = async (name) => cookies.remove(name);
