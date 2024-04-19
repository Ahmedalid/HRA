import { useState } from "react";
import DataTableComponent from "../../components/shared/Tables/DataTable";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";
import {
  useDeleteEmployeesMutation,
  useGetEmployeesQuery,
} from "../../redux/slices/employees/employeesSlice";
import AddEmployee from "../../components/forms/employees/add/AddEmployee";
import EditEmployee from "../../components/forms/employees/edit/EditEmployee";
import PushNotifications from "../../components/forms/employees/push-notifications/PushNotifications";
import PermissionAccessLayout from "../../layout/PermissionAccessLayout";
export default function Employees() {
  const { t } = useTranslation();

  const [deleteEmployees] = useDeleteEmployeesMutation();
  const { data: employees, isLoading, isSuccess } = useGetEmployeesQuery();
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const statusBodyTemplate = (rowData) => {
    return <span>{rowData.status === 0 ? t("disactive") : t("active")}</span>;
  };
  const canCreate = true;

  const cols = [
    {
      field: "name",
      header: t("name"),
    },
    {
      field: "email",
      header: t("email"),
    },
    {
      field: "phone",
      header: t("phone"),
    },
    {
      field: "job_title",
      header: t("job_title"),
    },
    {
      field: "salary",
      header: t("salary"),
    },
    {
      field: "status",
      header: t("status"),
      body: statusBodyTemplate,
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (employees.status) {
      content = (
        <PermissionAccessLayout pageName={"employees"} permissionAllowed={3}>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("employees")}</h4>
            <div className="d-flex my-3 justify-content-center gap-3">
              <Button
                variant=""
                className="btn-blue-green shadow"
                onClick={() => setShowNotificationDialog(true)}
              >
                <FaPlus /> <span>{t("notifications")}</span>
              </Button>
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
          </div>
          <DataTableComponent
            data={employees.data}
            cols={cols}
            setDialogDelete={setDialogDelete}
            setShowDialog={setShowEditDialog}
            pathItemDetails={"employees"}
            showDetails
            showDeleteButton={true}
            showEditButton={true}
          />
          {/* Push Notifications */}
          <DialogComponent
            setShowDialog={setShowNotificationDialog}
            showDialog={showNotificationDialog}
            title={t("send_notification")}
            size={"md"}
          >
            <PushNotifications setShowDialog={setShowNotificationDialog} />
          </DialogComponent>
          {/* Add New */}
          <DialogComponent
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            title={t("add_new")}
            size={"lg"}
          >
            <AddEmployee setShowDialog={setShowDialog} />
          </DialogComponent>
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_employee")}
            size={"lg"}
          >
            <EditEmployee setShowDialog={setShowEditDialog} />
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
        </PermissionAccessLayout>
      );
    } else {
      toast.error(employees.message);
    }
  }

  return content;
}
