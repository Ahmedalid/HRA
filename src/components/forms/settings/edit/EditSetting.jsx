import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { onErrorMessage } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";

import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useUpdateSettingMutation } from "../../../../redux/slices/settings/settingSlice";

export default function EditSetting({ setShowDialog }) {
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();
  const currentSetting = useSelector(currentEditItem);
  const { t } = useTranslation();
  const schema = yup.object({
    value_ar: yup.string().typeError("name ar is a required field").required(),
    value_en: yup.string().typeError("name en is a required field").required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    values: currentSetting,
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    updateSetting({ id: currentSetting.id, _method: "put", ...data })
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
          <Col sm={12}>
            <InputValidation {...register("value_ar")} label={t("name_ar")} />
          </Col>
          <Col sm={12}>
            <InputValidation {...register("value_en")} label={t("name_en")} />
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
