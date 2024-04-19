import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { onErrorMessage } from "../../../../utils";

import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import {
  useAssignCVMutation,
  useGetScoreQuery,
} from "../../../../redux/slices/assign-cv-to-job/assignCvToJobSlice";
import TextareaValidation from "../../inputs/TextareaValidation";
import LoadingComponent from "../../../LoadingComponent";

export default function AssignCv({ setShowDialog, job_id }) {
  const currentEmployeeInJob = useSelector(currentEditItem);
  const {
    data: score,
    isSuccess: isScoreSuccess,
    isLoading: isScoreLoading,
  } = useGetScoreQuery({ job_id, employee_id: currentEmployeeInJob.id });
  const [assignCV, { isLoading }] = useAssignCVMutation();

  const { t } = useTranslation();

  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    assignCV({
      job_id,
      employee_id: currentEmployeeInJob.id,
      comment: data.comment,
    })
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
  if (isScoreLoading) {
    return <LoadingComponent boxed />;
  } else if (isScoreSuccess) {
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Row>
            <Col sm={12}>
              <div>
                {t("score")} : {score.data.score}
              </div>
              <TextareaValidation
                {...register("comment")}
                label={t("comment")}
                rows={7}
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
}
