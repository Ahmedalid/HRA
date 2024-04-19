import { useState } from "react";
import DataTableComponent from "../../components/shared/Tables/DataTable";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";

import { useGetSettingsQuery } from "../../redux/slices/settings/settingSlice";
import EditSetting from "../../components/forms/settings/edit/EditSetting";
export default function Settings() {
  const { t } = useTranslation();

  const { data: settings, isLoading, isSuccess } = useGetSettingsQuery();

  const [showEditDialog, setShowEditDialog] = useState(false);

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
      field: "value",
      header: t("value"),
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (settings.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-center">
            <h4>{t("settings")}</h4>
          </div>
          <DataTableComponent
            data={settings.data}
            cols={cols}
            setShowDialog={setShowEditDialog}
            showEditButton
          />
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_setting")}
            size={"md"}
          >
            <EditSetting setShowDialog={setShowEditDialog} />
          </DialogComponent>
        </>
      );
    } else {
      toast.error(settings.message);
    }
  }
  return content;
}
