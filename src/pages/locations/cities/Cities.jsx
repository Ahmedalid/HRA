import { useParams } from "react-router-dom";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  useDeleteCityMutation,
  useGetCitiesQuery,
} from "../../../redux/slices/locations/locationsSlice";
import DeleteItems from "../../../components/shared/DeleteItems/DeleteItems";
import DialogComponent from "../../../components/shared/Dialog";
import DataTableComponent from "../../../components/shared/Tables/DataTable";
import LoadingComponent from "../../../components/LoadingComponent";
import EditCity from "../../../components/forms/locations/city/edit/EditCity";

export default function Cities() {
  const { t } = useTranslation();
  const { parentId } = useParams();
  const { data: locations, isSuccess, isLoading } = useGetCitiesQuery(parentId);

  const [deleteCity] = useDeleteCityMutation();

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const cols = [
    {
      field: "id",
      header: t("#"),
    },
    {
      field: "name",
      header: t("city"),
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (locations.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("cities")}</h4>
          </div>
          <DataTableComponent
            data={locations.data}
            cols={cols}
            setDialogDelete={setDialogDelete}
            setShowDialog={setShowEditDialog}
            showDeleteButton={true}
            showEditButton={true}
          />
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_city")}
            size={"md"}
          >
            <EditCity setShowDialog={setShowEditDialog} />
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
                deleteQuery={deleteCity}
                setDialogDelete={setDialogDelete}
              />
            }
          >
            <h4>{t("delete_message")}</h4>
          </DialogComponent>
        </>
      );
    } else {
      toast.error(locations.message);
    }
  }
  return content;
}
