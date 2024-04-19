import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { routes } from "./utils/routes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const router = createHashRouter(routes);
import en from "./locales/en/common.json";
import ar from "./locales/ar/common.json";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { getCookies } from "./utils/Cookies";
i18next.init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getCookies("lang") || "ar",
});
export default function App() {
  return (
    <>
      <I18nextProvider i18n={i18next}>
        <Toaster position="top-left" reverseOrder={false} />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </I18nextProvider>
    </>
  );
}
