import {
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Row,
  Stack,
} from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useGetSingleEmployeesQuery } from "../../../redux/slices/employees/employeesSlice";
import LoadingComponent from "../../../components/LoadingComponent";
import RowData from "../../../components/shared/RowData";
import avatar from "../../../assets/images/avatar.png";
import { URL_WITHOUT_API } from "../../../utils";
import { useState } from "react";
import { useRef } from "react";
import PermissionAccessLayout from "../../../layout/PermissionAccessLayout";
export default function ShowEmployeeDetails() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const iframeRef = useRef();
  const {
    data: employee,
    isSuccess,
    isLoading,
  } = useGetSingleEmployeesQuery(id);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    return (
      <PermissionAccessLayout pageName={"employees"} permissionAllowed={3}>
        <Container>
          <Row>
            {employee.data.image && (
              <Col md={6}>
                <div className={`mb-3`}>
                  <img
                    className="img-fluid rounded-2 w-25"
                    src={URL_WITHOUT_API + employee.data.image || avatar}
                  />
                </div>
              </Col>
            )}
            <Col sm={12}>
              <RowData name="name" value={employee.data.name} />
            </Col>
            <Col sm={12}>
              <RowData
                name="email"
                value={employee.data.email}
                type={"email"}
              />
            </Col>
            <Col sm={12}>
              <RowData value={employee.data.phone} name="phone" />
            </Col>
            <Col sm={12}>
              <RowData value={employee.data.birth_date} name="birth_date" />
            </Col>
            <Col sm={12}>
              <RowData name="address" value={employee.data.address} />
            </Col>
            <Col sm={12}>
              <RowData name="code" value={employee.data.city.phone_key} />
            </Col>
            <Col sm={12}>
              <RowData name="education" value={employee.data.education} />
            </Col>
            <Col sm={12}>
              <RowData name="major" value={employee.data.major} />
            </Col>
            <Col sm={12}>
              <RowData name="job_title" value={employee.data.job_title} />
            </Col>
            <Col sm={12}>
              <RowData name="industry" value={employee.data.industry} />
            </Col>
            <Col sm={12}>
              <RowData
                name="military"
                value={employee.data.military}
                type={"number"}
              />
            </Col>
            <Col sm={12}>
              <RowData
                name="marital"
                value={employee.data.marital}
                type={"number"}
              />
            </Col>
            <Col sm={12}>
              <RowData
                name="salary"
                value={employee.data.salary}
                type={"number"}
              />
            </Col>
            <Col sm={12}>
              <RowData name={"note"} value={employee.data.notes} />
            </Col>
            <Col md={12}>
              <Button
                variant=""
                className="btn-blue-green"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="example-collapse-text"
              >
                {`${open ? t("close") : t("show")} ${t("cv")}`}
              </Button>
              <Collapse in={open} dimension="width">
                <div>
                  <Card className="px-2 pt-2" id="example-collapse-text">
                    <div>
                      <Button
                        variant=""
                        className="btn-blue-green mb-2"
                        onClick={() => {
                          if (iframeRef.current.requestFullscreen) {
                            iframeRef.current.requestFullscreen();
                          } else if (
                            iframeRef.current.webkitRequestFullscreen
                          ) {
                            iframeRef.current.webkitRequestFullscreen();
                          } else if (iframeRef.current.mozRequestFullScreen) {
                            iframeRef.current.mozRequestFullScreen();
                          } else if (iframeRef.current.msRequestFullscreen) {
                            iframeRef.current.msRequestFullscreen();
                          }
                        }}
                      >
                        {t("full_screen")}
                      </Button>
                    </div>
                    {open && (
                      <iframe
                        src={URL_WITHOUT_API + employee.data.cv}
                        width="100%"
                        height="500px"
                        ref={iframeRef}
                      />
                    )}
                  </Card>
                </div>
              </Collapse>
            </Col>
          </Row>
          <Stack
            direction="horizontal"
            className="justify-content-center mt-4"
            gap="3"
          >
            <Button
              onClick={() => navigate(-1)}
              variant=""
              type="button"
              className="btn-blue-green"
            >
              {t("back")}
            </Button>
          </Stack>
        </Container>
      </PermissionAccessLayout>
    );
  }
}
