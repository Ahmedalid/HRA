import { useState } from "react";
import DataTableComponent from "../../components/shared/Tables/DataTable";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";
import { CREATE, DELETE, EDIT } from "../../utils/PermissionActions";
import AddLocation from "../../components/forms/locations/add/addLocation";
import {
  useDeleteCountryMutation,
  useGetLocationsQuery,
} from "../../redux/slices/locations/locationsSlice";
import EditCountry from "../../components/forms/locations/country/edit/EditCountry";

export default function Locations() {
  const { t } = useTranslation();
  const { data: locations, isSuccess, isLoading } = useGetLocationsQuery();
  const [deleteCountry] = useDeleteCountryMutation();

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
      header: t("country"),
    },
    {
      field: "phone_key",
      header: t("phone_key"),
    },
    {
      field: "phone_length",
      header: t("phone_length"),
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
            <h4>{t("locations")}</h4>
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
            data={locations.data}
            cols={cols}
            setDialogDelete={setDialogDelete}
            setShowDialog={setShowEditDialog}
            showDeleteButton={true}
            pathItemDetails={"locations"}
            showDetails
            showEditButton={true}
          />
          {/* Add New */}
          <DialogComponent
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            title={t("add_new")}
            size={"md"}
          >
            <AddLocation setShowDialog={setShowDialog} />
          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_location")}
            size={"md"}
          >
            <EditCountry setShowDialog={setShowEditDialog} />
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
                deleteQuery={deleteCountry}
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
