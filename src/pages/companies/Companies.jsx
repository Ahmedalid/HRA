import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast';

import DataTableComponent from "../../components/shared/Tables/DataTable";
import DialogComponent from "../../components/shared/Dialog";
import LoadingComponent from "../../components/LoadingComponent";
import DeleteItems from "../../components/shared/DeleteItems/DeleteItems";

import AddCompany from "../../components/forms/companies/add/AddCompany";
import EditCompany from "../../components/forms/companies/edit/EditCompany";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
} from "../../redux/slices/company/companySlice";
import { URL_API } from "../../utils";
import CompanyDetails from "./showDetails/CompanyDetails";
import CompaniesPushNotifications from "../../components/forms/companies/push-notifications/PushNotifications";

import PermissionAccessLayout from "../../layout/PermissionAccessLayout";

export default function Companies() {
  const { t } = useTranslation();
  const { data: companies, isSuccess, isLoading } = useGetCompaniesQuery();
  const [deleteCompany] = useDeleteCompanyMutation();

  const [dialogDelete, setDialogDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);

  

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        width={50}
        src={URL_API.replace("/api", "") + rowData.logo}
        alt={rowData.user_name}
      />
    );
  };
  const canCreate = true;

  const cols = [
    {
      field: "user_name",
      header: t("user_name"),
    },
    {
      field: "email",
      header: t("email"),
    },
    {
      field: "logo",
      header: t("image"),
      body: imageBodyTemplate,
    },
    {
      field: "phone",
      header: t("phone"),
    },
    {
      field: "company_name",
      header: t("company_name"),
    },
  ];
  let content;
  if (isLoading) {
    return <LoadingComponent />;
    
  } else if (isSuccess) {
    if (companies.status) {
      content = (
        <PermissionAccessLayout pageName={"companies"} permissionAllowed={2}>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("companies")}</h4>
            
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
            data={companies.data}
            cols={cols}
            setDialogDelete={setDialogDelete}
            setShowDialog={setShowEditDialog}
            setShowDetails={setShowDetails}
            pathItemDetails={"companies"}
            showDetails
            showDeleteButton={true}
            showEditButton={true}
            showTaked={true}
          />
          
          {/* Push Notifications */}
          
          <DialogComponent
            setShowDialog={setShowNotificationDialog}
            showDialog={showNotificationDialog}
            title={t("send_notification")}
            size={"md"}
          >
            
            <CompaniesPushNotifications
              setShowDialog={setShowNotificationDialog}
            />
          </DialogComponent>
          
          {/* Add New */}
          <DialogComponent
            setShowDialog={setShowDialog}
            showDialog={showDialog}
            title={t("add_new")}
            size={"lg"}
          >
            <AddCompany setShowDialog={setShowDialog} />

          </DialogComponent>
          {/* Edit Item */}
          <DialogComponent
            setShowDialog={setShowEditDialog}
            showDialog={showEditDialog}
            title={t("edit_company")}
            size={"lg"}
          >
            <EditCompany setShowDialog={setShowEditDialog} />
            
          </DialogComponent>
          <DialogComponent
            setShowDialog={setShowDetails}
            showDialog={showDetails}
            title={t("details")}
            fullscreen
            size={"lg"}
          >
            
            <CompanyDetails />
            
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
                deleteQuery={deleteCompany}
                setDialogDelete={setDialogDelete}
              />
            }
          >
            <h4>{t("delete_message")}</h4>
            
          </DialogComponent>
        </PermissionAccessLayout>
        
      );
    } else {
      toast.error(companies.message);
    }
  }
  return content;
}
