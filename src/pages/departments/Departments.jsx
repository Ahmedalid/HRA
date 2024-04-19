import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DataTableComponent from "../../components/shared/Tables/DataTable";
import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";
import { useDeleteEmployeesMutation } from "../../redux/slices/employees/employeesSlice";
import AddDepartment from "../../components/forms/department/add/AddDepartment";
import EditDepartment from "../../components/forms/department/edit/EditDepartment";
import { useGetDepartmentsQuery } from "../../redux/slices/departments/departmentSlice";
import { useParams } from "react-router-dom";
export default function Departments() {
  const { parentId } = useParams();
  const { t } = useTranslation();

  const [deleteEmployees] = useDeleteEmployeesMutation();
  const {
    data: departments,
    isSuccess,
    isLoading,
  } = useGetDepartmentsQuery(parentId);
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
    if (departments.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("departments")}</h4>
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
            data={departments.data}
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
            <AddDepartment setShowDialog={setShowDialog} />
          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_department")}
            size={"md"}
          >
            <EditDepartment setShowDialog={setShowEditDialog} />
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
                deleteQuery={deleteEmployees}
                setDialogDelete={setDialogDelete}
              />
            }
          >
            <h4>{t("delete_message")}</h4>
          </DialogComponent>
        </>
      );
    } else {
      toast.error(departments.message);
    }
  }
  return content;
}
