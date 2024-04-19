import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  rtl,
  setRtl,
  showSlider,
  toggleSidebar,
} from "../../../redux/slices/theme/themeSlice";
import { useTranslation } from "react-i18next";

// import { useChangeLangMutation } from "../../../redux/slices/company/companySlice";
import LoadingComponent from "../../LoadingComponent";
import toast from "react-hot-toast";
import { removeCookies, setCookies } from "../../../utils/Cookies";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/slices/auth/authSlice";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

function NavbarComponent() {
  // const [changeLanguage, { isLoading }] = useChangeLangMutation();
  const rtlState = useSelector(rtl);
  const show = useSelector(showSlider);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  // if (isLoading) {
  //   return <LoadingComponent />;
  // }
  return (
    <Navbar
      expand="lg"
      className="header flex-nowrap navbar p-0 m-0 navbar-expand-sm expand-header sticky-top bg-white border-0 border-bottom"
    >
      <Container fluid>
        <div className={`header-title align-items-center d-flex`}>
          <span className="px-3 branch-name">{t("logo_name")}</span>
          <span
            className="btn"
            // style={{ cursor: "pointer" }}
            onClick={() => dispatch(toggleSidebar(!show))}
          >
            <FaBars />
          </span>
        </div>
        <Nav className="navbar-nav justify-content-end align-items-center header-nav px-0">
          <Nav.Item
            className="nav-item btn"
            onClick={() => {
              dispatch(setRtl(!rtlState));
              if (rtlState) {
                setCookies("lang", "en");
                // changeLanguage({ lang: "en" })
                //   .unwrap()
                //   .then((data) => {
                //     toast.success(data.message);
                //   });
                i18n.changeLanguage("en");
              } else {
                setCookies("lang", "ar");
                // changeLanguage({ lang: "ar" })
                //   .unwrap()
                //   .then((data) => {
                //     toast.success(data.message);
                //   });
                i18n.changeLanguage("ar");
              }
            }}
          >
            {rtlState ? "English" : "العربية"}
          </Nav.Item>
          <Nav.Item className="btn" as={Link} to="/profile">
            {t("profile")}
          </Nav.Item>
          <Nav.Item
            className="btn"
            onClick={() => {
              logout()
                .unwrap()
                .then(({ status, message }) => {
                  if (status) {
                    navigate("/login");
                    toast.success(message);
                    removeCookies("token");
                    removeCookies("user_type");
                  } else {
                    toast.error(message);
                  }
                });
            }}
          >
            {t("log_out")}
          </Nav.Item>

          {/* <DropDown /> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default forwardRef(NavbarComponent);
