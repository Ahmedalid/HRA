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
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../redux/slices/admins/adminSlice";
import AddAdmin from "../../components/forms/admins/add/AddAdmin";
import EditAdmin from "../../components/forms/admins/edit/EditAdmin";

export default function Admins() {
  const { t } = useTranslation();
  const { data: packages, isSuccess, isLoading } = useGetAdminsQuery();
  const [deletePackage] = useDeleteAdminMutation();

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const canCreate = true;
  const adminTemplate = (rowData) => (
    <span>
      {rowData.type === 1
        ? t("super_admin")
        : rowData.type === 2
        ? t("admin_companies")
        : t("admin_employees")}
    </span>
  );
  const cols = [
    {
      field: "id",
      header: t("#"),
    },
    {
      field: "name",
      header: t("name"),
    },
    {
      field: "phone",
      header: t("phone"),
    },
    {
      field: "type",
      header: t("rule"),
      body: adminTemplate,
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (packages.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("packages")}</h4>
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
            data={packages.data}
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
            <AddAdmin setShowDialog={setShowDialog} />
          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_package")}
            size={"md"}
          >
            <EditAdmin setShowDialog={setShowEditDialog} />
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
                deleteQuery={deletePackage}
                setDialogDelete={setDialogDelete}
              />
            }
          >
            <h4>{t("delete_message")}</h4>
          </DialogComponent>
        </>
      );
    } else {
      toast.error(packages.message);
    }
  }
  return content;
}
