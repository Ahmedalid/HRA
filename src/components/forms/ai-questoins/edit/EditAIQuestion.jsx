import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { onErrorMessage } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useUpdateAiQuestionMutation } from "../../../../redux/slices/ai-questions/aiQuestionSlice";

export default function EditAIQuestion({ setShowDialog }) {
  const currentQuestion = useSelector(currentEditItem);

  const [updateQuestion, { isLoading }] = useUpdateAiQuestionMutation();

  const { t } = useTranslation();
  const schema = yup.object({
    question: yup.string().required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    values: {
      question: currentQuestion.question,
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    updateQuestion({ id: currentQuestion.id, _method: "put", ...data })
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
            <InputValidation {...register("question")} label={t("question")} />
          </Col>{" "}
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
