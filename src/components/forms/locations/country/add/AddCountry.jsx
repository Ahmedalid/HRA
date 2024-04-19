import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputValidation from "../../../inputs/InputValidation";
import { onErrorMessage } from "../../../../../utils";
import { useCreateCountryMutation } from "../../../../../redux/slices/locations/locationsSlice";
import { CONVERT } from "../../../../../utils/Convert";
import toastErrorMessage from "../../../../shared/ToastErrorMessage";

export default function AddCountry({ setShowDialog }) {
  const [createCountry, { isLoading }] = useCreateCountryMutation();

  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string().required(),
    name_en: yup.string().required(),
    phone_key: yup.string().required(),
    phone_length: yup
      .number()
      .typeError("Phone Length is a required field")
      .required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    createCountry(CONVERT.ConvertObjectToFormData(data))
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
          <Col md={12}>
            <InputValidation
              {...register("phone_key")}
              label={t("phone_key")}
            />
          </Col>
          <Col md={12}>
            <InputValidation
              {...register("phone_length")}
              label={t("phone_length")}
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
