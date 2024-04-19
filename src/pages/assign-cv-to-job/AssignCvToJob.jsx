import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DataTableComponent from "../../components/shared/Tables/DataTable";
import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import { URL_API } from "../../utils";
import PermissionAccessLayout from "../../layout/PermissionAccessLayout";
import { useGetEmployeesByDepartmentQuery } from "../../redux/slices/assign-cv-to-job/assignCvToJobSlice";
import AssignCv from "../../components/forms/companies/assign-cv/AssignCv";

export default function AssignCvToJob({ departmentId, job_id }) {
  const { t } = useTranslation();
  const {
    data: employeesByDepartment,
    isSuccess,
    isLoading,
  } = useGetEmployeesByDepartmentQuery(departmentId);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        width={50}
        src={URL_API.replace("/api", "") + rowData.image}
        alt={rowData.name}
      />
    );
  };
  const cvBodyTemplate = (rowData) => {
    return <span>{rowData.cv.split("cvs/")[1]}</span>;
  };

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
      field: "image",
      header: t("image"),
      body: imageBodyTemplate,
    },
    {
      field: "cv",
      header: t("cv"),
      body: cvBodyTemplate,
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (employeesByDepartment.status) {
      content = (
        <PermissionAccessLayout
          pageName={"employeesByDepartment"}
          permissionAllowed={2}
        >
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("employees_by_department")}</h4>
          </div>
          <DataTableComponent
            data={employeesByDepartment.data}
            cols={cols}
            setShowDialog={setShowEditDialog}
            showEditButton
          />

          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("assign_cv_to_job")}
            size={"lg"}
          >
            <AssignCv job_id={job_id} setShowDialog={setShowEditDialog} />
          </DialogComponent>
        </PermissionAccessLayout>
      );
    } else {
      toast.error(employeesByDepartment.message);
    }
  }
  return content;
}
