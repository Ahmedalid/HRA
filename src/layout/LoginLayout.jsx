import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { getCookies } from "../utils/Cookies";

export default function LoginLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getCookies("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="d-flex flex-column justify-content-between">
      <Container>
        <div
          style={{ minHeight: "calc(100vh)" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Outlet />
        </div>
      </Container>
    </div>
  );
}
