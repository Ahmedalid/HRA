import PermissionNotAllowed from "./PermissionNotAllowed";
import { useTranslation } from "react-i18next";
import { getCookies } from "../utils/Cookies";
export default function PermissionAccessLayout({
  permissionAllowed,
  pageName,
  children,
}) {
  const { t } = useTranslation();
  if (getCookies("user_type") === 1) {
    return children;
  }
  return getCookies("user_type") === permissionAllowed ? (
    children
  ) : (
    <PermissionNotAllowed pageName={t(pageName)} />
  );
}
