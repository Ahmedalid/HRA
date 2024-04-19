import toast from "react-hot-toast";

export default function toastErrorMessage(errors) {
  Object.values(errors).forEach((item) => {
    toast.error(item);
  });
}
