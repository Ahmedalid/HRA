import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
// import { useCreateCompanyMutation } from "../../../../redux/slices/employees/employeesSlice";
import { onErrorMessage } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";

import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useUpdateSkillMutation } from "../../../../redux/slices/skills/skillsSlice";
export default function EditSkill({ setShowDialog }) {
  const [updateSkill, { isLoading }] = useUpdateSkillMutation();
  const currentSkill = useSelector(currentEditItem);

  const { t } = useTranslation();
  const schema = yup.object({
    name: yup.string().required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: currentSkill,
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    updateSkill({ id: currentSkill.id, _method: "put", ...data })
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
          <Col>
            <InputValidation label={t("name")} {...register("name")} />
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
