import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import * as yup from "yup";

import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { usePushNotificationForCompaniesMutation } from "../../../../redux/slices/notifications/notificationSlice";
import TextareaValidation from "../../inputs/TextareaValidation";
import { useGetCompaniesQuery } from "../../../../redux/slices/company/companySlice";
import { useState } from "react";

export default function CompaniesPushNotifications({ setShowDialog }) {
  const [pushNotification, { isLoading }] =
    usePushNotificationForCompaniesMutation();
  const { data: companies, isLoading: isCompaniesLoading } =
    useGetCompaniesQuery();
  const [selectCompanies, setSelectCompanies] = useState(false);

  const [selectedOption, setSelectedOption] = useState([]);

  const { t } = useTranslation();
  const schema = yup.object({
    title: yup.string().required(),
    message: yup.string().required(),
  });
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;

    setValue(
      "ids",
      selectedOption.map((item) => item.id)
    );
    pushNotification(data)
      .unwrap()
      .then((data) => {
        if (data.status) {
          setShowDialog(false);
          toast.success(data.message);
        } else {
          data.message && toast.error(data.message);
          toastErrorMessage(data.errors);
        }
      });
  };
  const onError = (errors) => {
    onErrorMessage(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <Row>
          <Col md={12}>
            <Form.Check
              type="switch"
              onChange={(e) => setSelectCompanies(e.target.checked)}
              label={
                selectCompanies ? t("select_companies") : t("all_companies")
              }
            />
          </Col>
          <Col md={12}>
            <InputValidation {...register("title")} label={t("title")} />
          </Col>
          {selectCompanies && (
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>{t("companies")}</Form.Label>
                <Select
                  styles={react_Select_Styles}
                  getOptionValue={(option) => option?.id}
                  getOptionLabel={(option) => option?.user_name}
                  options={companies?.data}
                  isMulti
                  isLoading={isCompaniesLoading}
                  placeholder={t("choose")}
                  onChange={(selectedOption) =>
                    setSelectedOption(selectedOption)
                  }
                />
              </Form.Group>
            </Col>
          )}
          <Col md={12}>
            <TextareaValidation
              rows="5"
              {...register("message")}
              label={t("message")}
            />
          </Col>
        </Row>
        <Stack
          direction="horizontal"
          className="justify-content-center mt-4"
          gap="3"
        >
          <Button
            onClick={() => setShowDialog(false)}
            variant=""
            type="button"
            className="btn-blue-green"
          >
            {t("close")}
          </Button>
          <Button
            variant=""
            disabled={isLoading}
            type="submit"
            className="btn-blue-green"
          >
            {isLoading ? t("saving") : t("save")}
          </Button>
        </Stack>
      </Container>
    </Form>
  );
}
