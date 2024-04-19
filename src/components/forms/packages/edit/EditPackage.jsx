import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
// import { useCreateCompanyMutation } from "../../../../redux/slices/employees/employeesSlice";
import { onErrorMessage } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import { CONVERT } from "../../../../utils/Convert";
import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useUpdatePackageMutation } from "../../../../redux/slices/packages/packagesSlice";

export default function EditPackage({ setShowDialog }) {
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();
  const currentPackage = useSelector(currentEditItem);
  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string().required(),
    name_en: yup.string().required(),
    price: yup.number().typeError("price is a required field").required(),
    cvs: yup.number().typeError("cvs is a required field").required(),
    jobs: yup.number().typeError("jobs is a required field").required(),
    month: yup.number().typeError("month is a required field").required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: currentPackage,
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    updatePackage({ id: currentPackage.id, _method: "put", ...data })
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
          <Col md={6}>
            <InputValidation {...register("name_ar")} label={t("name_ar")} />
          </Col>
          <Col md={6}>
            <InputValidation {...register("name_en")} label={t("name_en")} />
          </Col>
          <Col md={6}>
            <InputValidation
              {...register("price")}
              label={t("price")}
              type={"number"}
            />
          </Col>
          <Col md={6}>
            <InputValidation
              {...register("cvs")}
              label={t("cvs_number")}
              type={"number"}
            />
          </Col>
          <Col md={6}>
            <InputValidation
              {...register("jobs")}
              label={t("jobs_number")}
              type={"number"}
            />
          </Col>
          <Col md={6}>
            <InputValidation
              {...register("month")}
              label={t("month_number")}
              type={"number"}
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
  // }
}
