import { useState } from "react";
import DataTableComponent from "../../components/shared/Tables/DataTable";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";

import EditPackage from "../../components/forms/packages/edit/EditPackage";
import AddPackage from "../../components/forms/packages/add/AddPackage";
import {
  useDeletePackageMutation,
  useGetPackagesQuery,
} from "../../redux/slices/packages/packagesSlice";
export default function Packages() {
  const { t } = useTranslation();
  const { data: packages, isSuccess, isLoading } = useGetPackagesQuery();
  const [deletePackage] = useDeletePackageMutation();

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const canCreate = true;
console.log("ahmnmmmmmmmmmmmmmmmm" , packages);
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
      field: "price",
      header: t("price"),
    },
    {
      field: "cvs",
      header: t("cvs_number"),
    },
    {
      field: "jobs",
      header: t("jobs_number"),
    },
    {
      field: "month",
      header: t("month_number"),
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
            size={"lg"}
          >
            <AddPackage setShowDialog={setShowDialog} />
          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_package")}
            size={"lg"}
          >
            <EditPackage setShowDialog={setShowEditDialog} />
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
