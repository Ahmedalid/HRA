import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import { useCreateCategoryMutation } from "../../../../redux/slices/category/categorySlice";
import toastErrorMessage from "../../../shared/ToastErrorMessage";

export default function AddCategory({ setShowDialog }) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string().required(),
    name_en: yup.string().required(),
  });
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    setValue("type", "main");
    if (isLoading) return;
    createCategory(data)
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
            <InputValidation label={t("name_ar")} {...register("name_ar")} />
          </Col>
          <Col md={12}>
            <InputValidation {...register("name_en")} label={t("name_en")} />
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
