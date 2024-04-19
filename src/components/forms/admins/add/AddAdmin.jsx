import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import { CONVERT } from "../../../../utils/Convert";
import { useCreateAdminMutation } from "../../../../redux/slices/admins/adminSlice";

export default function AddAdmin({ setShowDialog }) {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const { t } = useTranslation();
  const schema = yup.object({
    name: yup.string().required(),
    phone: yup.number().typeError("phone is a required field").required(),
    password: yup.string().required(),
    password_confirmation: yup.string().required(),
    type: yup.number().typeError("type is a required field").required(),
  });
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    createAdmin(CONVERT.ConvertObjectToFormData(data))
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
  const adminType = [
    { id: 1, name: t("super_admin") },
    { id: 2, name: t("admin_companies") },
    { id: 3, name: t("admin_employees") },
  ];
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <Row>
          <Col sm={12}>
            <InputValidation {...register("name")} label={t("name")} />
          </Col>
          <Col sm={12}>
            <InputValidation
              {...register("phone")}
              label={t("phone")}
              type="number"
            />
          </Col>{" "}
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>{t("rule")}</Form.Label>
              <Controller
                control={control}
                name="type"
                defaultValue={""}
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.name}
                    getOptionLabel={(option) => option?.name}
                    options={adminType}
                    placeholder={t("choose")}
                    value={adminType.find((c) => c.value === field.value)}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.id)
                    }
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Col sm={12}>
            <InputValidation
              {...register("password")}
              label={t("password")}
              type="password"
            />
          </Col>
          <Col sm={12}>
            <InputValidation
              {...register("password_confirmation")}
              label={t("password_confirmation")}
              type="password"
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
