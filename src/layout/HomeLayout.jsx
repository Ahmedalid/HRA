import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavbarComponent from "../components/shared/Navbar/NavbarComponent";
import SidebarComponent from "../components/shared/sidebar/SidebarComponent";

import { useDispatch, useSelector } from "react-redux";
import { rtl } from "../redux/slices/theme/themeSlice";
import { useNavigate } from "react-router-dom";
import { getCookies } from "../utils/Cookies";
export default function HomeLayout() {
  const rtlState = useSelector(rtl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (getCookies("user_type") === 3) {
      navigate("/employees");
    } else if (getCookies("user_type") === 2) {
      navigate("/companies");
    }
  }, []);
  useEffect(() => {
    document.body.dir = rtlState ? "rtl" : "ltr";
  }, [rtlState, dispatch]);

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div
          className="d-flex gap-2"
          style={{ overflowY: "auto", height: "calc(100vh - 4rem)" }}
        >
          <div>
            <SidebarComponent />
          </div>
          <div style={{ overflow: "auto", width: "100%" }}>
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
}
