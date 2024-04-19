import { GiClick, GiSkills } from "react-icons/gi";
import { MdAdminPanelSettings, MdCategory } from "react-icons/md";
import { LuPackageOpen } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaFileInvoice,
  FaGear,
  FaMapLocationDot,
  FaUsers,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { rtl, showSlider } from "../../../redux/slices/theme/themeSlice";
import { getCookies } from "../../../utils/Cookies";

export default function SidebarComponent() {
  const { t } = useTranslation();
  const userHavePermission = (permissionAllowed, pageName) => {
    let permissions = false;
    if (getCookies("user_type") === 1) {
      permissions = true;
    } else if (
      getCookies("user_type") === permissionAllowed &&
      pageName === "employees"
    ) {
      permissions = true;
    } else if (
      getCookies("user_type") === permissionAllowed &&
      pageName === "companies"
    ) {
      permissions = true;
    } else {
      permissions = false;
    }
    return permissions;
  };
  const links = [
    {
      id: 1,
      icon: <FaHome />,
      title: t("home"),
      path: "/",
      permission: userHavePermission(),
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: t("employees"),
      permission: userHavePermission(3, "employees"),
      path: "/employees",
    },
    {
      id: 3,
      icon: <FaBuilding />,
      title: t("companies"),
      permission: userHavePermission(2, "companies"),
      path: "/companies",
    },
    {
      id: 4,
      icon: <LuPackageOpen />,
      title: t("packages"),
      permission: userHavePermission(),
      path: "/packages",
    },
    {
      id: 6,
      icon: <GiSkills />,
      title: t("skills"),
      permission: userHavePermission(),
      path: "/skills",
    },
    {
      id: 7,
      icon: <MdCategory />,
      title: t("Categories"),
      permission: userHavePermission(),
      path: "/categories",
    },
    {
      id: 9,
      icon: <GiClick />,
      title: t("subscriptions"),
      permission: userHavePermission(),
      path: "/subscriptions",
    },
    {
      id: 10,
      icon: <FaMapLocationDot />,
      title: t("locations"),
      path: "/locations",
      permission: userHavePermission(),
    },
    {
      id: 11,
      icon: <FaFileInvoice />,
      title: t("cvs"),
      path: "/cvs",
      permission: userHavePermission(),
    },
    {
      id: 12,
      icon: <MdAdminPanelSettings />,
      title: t("admins"),
      path: "/admins",
      permission: userHavePermission(),
    },
    {
      id: 13,
      icon: <FaGear />,
      title: t("settings"),
      permission: userHavePermission(),
      path: "/settings",
    },
  ];

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const show = useSelector(showSlider);
  const rtlState = useSelector(rtl);
  return (
    <Sidebar
      width="200px"
      collapsed={show}
      rtl={rtlState}
      className="sidebar-custom"
    >
      <Menu>
        {links?.map(
          (item) =>
            item.permission && (
              <MenuItem
                onClick={scrollToTop}
                key={item.id}
                icon={item.icon}
                title={item.title}
                component={<NavLink to={item.path} />}
              >
                {item.title}
              </MenuItem>
            )
        )}
      </Menu>
    </Sidebar>
  );
}
