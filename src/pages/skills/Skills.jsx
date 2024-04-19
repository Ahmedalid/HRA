import { useState } from "react";
import DataTableComponent from "../../components/shared/Tables/DataTable";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";

import AddSkill from "../../components/forms/skills/add/AddSkill";
import EditSkill from "../../components/forms/skills/edit/EditSkill";
import {
  useDeleteSkillMutation,
  useGetSkillsQuery,
} from "../../redux/slices/skills/skillsSlice";
export default function Skills() {
  const { t } = useTranslation();

  const [deleteSkill] = useDeleteSkillMutation();
  const { data: skills, isLoading, isSuccess } = useGetSkillsQuery();

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const canCreate = true;

  const cols = [
    {
      field: "id",
      header: t("#"),
    },
    {
      field: "name",
      header: t("name"),
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (skills.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("skills")}</h4>
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
            data={skills.data}
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
            <AddSkill setShowDialog={setShowDialog} />
          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_skill")}
            size={"md"}
          >
            <EditSkill setShowDialog={setShowEditDialog} />
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
                deleteQuery={deleteSkill}
                setDialogDelete={setDialogDelete}
              />
            }
          >
            <h4>{t("delete_message")}</h4>
          </DialogComponent>
        </>
      );
    } else {
      toast.error(skills.message);
    }
  }
  return content;
}
