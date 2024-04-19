import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";

import { useTranslation } from "react-i18next";
import { react_Select_Styles } from "../../../../utils";
import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useState } from "react";

export default function FilterCvs({ setData }) {
  const { t } = useTranslation();
  const [department, setDepartment] = useState();
  const [company, setCompany] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={onSubmit} className="d-flex w-100 gap-5 align-items-center">
      <Row className="w-100">
        <Col md={3}>
          <Select
            styles={react_Select_Styles}
            getOptionValue={(option) => option?.name}
            getOptionLabel={(option) => option?.name}
            options={[]}
            placeholder={t("choose")}
            onChange={(selectedOption) => {}}
          />
        </Col>
        <Col md={3}>
          <Select
            styles={react_Select_Styles}
            getOptionValue={(option) => option?.name}
            getOptionLabel={(option) => option?.name}
            options={[]}
            placeholder={t("choose")}
            onChange={(selectedOption) => {}}
          />
        </Col>
        <Col md={3}>
          <Select
            styles={react_Select_Styles}
            getOptionValue={(option) => option?.name}
            getOptionLabel={(option) => option?.name}
            options={[]}
            placeholder={t("choose")}
            onChange={(selectedOption) => {}}
          />
        </Col>
        <Col md={3}>
          <Select
            styles={react_Select_Styles}
            getOptionValue={(option) => option?.name}
            getOptionLabel={(option) => option?.name}
            options={[]}
            placeholder={t("choose")}
            onChange={(selectedOption) => {}}
          />
        </Col>
      </Row>
      <Button variant="" className="btn-blue-green">
        {t("search")}
      </Button>
    </Form>
  );
}
