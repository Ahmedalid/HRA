import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { onErrorMessage } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useUpdateSubCategoryMutation } from "../../../../redux/slices/sub-category/subCategorySlice";
import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useParams } from "react-router-dom";

export default function EditSubCategory({ setShowDialog }) {
  const currentSubCategory = useSelector(currentEditItem);
  const { parentId } = useParams();

  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();

  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string().required(),
    name_en: yup.string().required(),
  });
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: currentSubCategory,
  });

  const onSubmit = async (data) => {
    setValue("type", "sub");
    setValue("parent_id", parentId);

    if (isLoading) return;
    updateSubCategory({ id: currentSubCategory.id, _method: "put", ...data })
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
