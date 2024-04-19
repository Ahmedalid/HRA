import toast from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

export const URL_API = import.meta.env.VITE_API_URL;
export const URL_WITHOUT_API = import.meta.env.VITE_URL;

export const react_Select_Styles = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      borderColor: state.isFocused ? "#27c9c4" : "#dee2e6",
      boxShadow: "none",
      zIndex: 99999,
    };
  },
  menu: (baseStyles) => {
    return {
      ...baseStyles,
      zIndex: 9999999,
    };
  },
};

// this function is called inside useForm has onError
export const onErrorMessage = (error) => {
  Object.values(error).forEach(({ message }) => {
    const clearMessage = message.split("_").join(" ");
    toast.error(clearMessage);
  });
};
