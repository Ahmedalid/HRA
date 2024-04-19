import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useUpdateProfileMutation } from "../../../redux/slices/profile/profileSlice";
import toastErrorMessage from "../../shared/ToastErrorMessage";
import { onErrorMessage } from "../../../utils";
import InputValidation from "../inputs/InputValidation";

export default function UpdateProfile({ setShowDialog, data }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { t } = useTranslation();
  const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string().required(),
  });
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    values: data,
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    updateProfile({ _method: "put", ...data })
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
    reset();
  };
  const onError = (errors) => {
    onErrorMessage(errors);
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Container>
            <Row>
              <Col md={6}>
                <InputValidation {...register("name")} label={t("name")} />
              </Col>
              <Col md={6}>
                <InputValidation {...register("phone")} label={t("phone")} />
              </Col>
              <Col md={6}>
                <InputValidation
                  {...register("password")}
                  label={t("password")}
                  type="password"
                />
              </Col>
              <Col md={6}>
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
                variant=""
                disabled={isLoading}
                type="submit"
                className="btn-blue-green"
              >
                {isLoading ? t("updating") : t("update")}
              </Button>
            </Stack>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}
