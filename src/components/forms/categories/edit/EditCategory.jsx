import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { onErrorMessage } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../redux/slices/category/categorySlice";
import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";

export default function EditCategory({ setShowDialog }) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const currentCategory = useSelector(currentEditItem);
  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string().required(),
    name_en: yup.string().required(),
  });
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: currentCategory,
    mode: "all",
  });

  const onSubmit = async (data) => {
    setValue("type", "main");
    if (isLoading) return;
    updateCategory({ id: currentCategory.id, _method: "put", ...data })
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
            <InputValidation {...register("name_ar")} label={t("name_ar")} />
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
