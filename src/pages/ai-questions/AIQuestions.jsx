import { useState } from "react";
import DataTableComponent from "../../components/shared/Tables/DataTable";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";

import { useParams } from "react-router-dom";

import {
  useDeleteAiQuestionMutation,
  useGetAiQuestionsQuery,
} from "../../redux/slices/ai-questions/aiQuestionSlice";
import AddAIQuestion from "../../components/forms/ai-questoins/add/AddAIQuestions";
import EditAIQuestion from "../../components/forms/ai-questoins/edit/EditAIQuestion";
export default function AIQuestions() {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: questions, isLoading, isSuccess } = useGetAiQuestionsQuery(id);
  const [deleteAiQuestion] = useDeleteAiQuestionMutation();

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const canCreate = true;

  const questionTemplate = ({ question }) => <span dir="ltr">{question}</span>;
  const cols = [
    {
      field: "id",
      header: t("#"),
    },
    {
      field: "question",
      header: t("question"),
      body: questionTemplate,
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (questions.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("questions")}</h4>
            {canCreate && (
              <Button
                variant=""
                className="btn-blue-green shadow"
                onClick={() => setShowDialog(true)}
              >
                <FaPlus /> <span>{t("add_new")}</span>
              </Button>
            )}
          </div>
          <DataTableComponent
            data={questions.data}
            cols={cols}
            setDialogDelete={setDialogDelete}
            setShowDialog={setShowEditDialog}
            showDeleteButton={true}
            showEditButton={true}
          />
          {/* Add New */}
          <DialogComponent
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            title={t("add_new")}
            size={"md"}
          >
            <AddAIQuestion setShowDialog={setShowDialog} />
          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_question")}
            size={"md"}
          >
            <EditAIQuestion setShowDialog={setShowEditDialog} />
          </DialogComponent>
          {/* Delete Item */}
          <DialogComponent
            title={t("delete")}
            setShowDialog={setDialogDelete}
            showDialog={dialogDelete}
            center
            size={"md"}
            dialogFooter={
              <DeleteItems
                deleteQuery={deleteAiQuestion}
                setDialogDelete={setDialogDelete}
              />
            }
          >
            <h4>{t("delete_message")}</h4>
          </DialogComponent>
        </>
      );
    } else {
      toast.error(questions.message);
    }
  }
  return content;
}
