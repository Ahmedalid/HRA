import { Navigate } from "react-router-dom";
import { getCookies } from "../utils/Cookies";

export default function ProtectedRoutesLayout({ children }) {
  return getCookies("token") === undefined || getCookies("token") === "" ? (
    <Navigate to={"/login"} />
  ) : (
    <>{children}</>
  );
}
