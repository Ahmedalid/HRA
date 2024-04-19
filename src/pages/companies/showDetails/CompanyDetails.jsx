import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { URL_API } from "../../../utils";
import { useTranslation } from "react-i18next";
import RowData from "../../../components/shared/RowData";
import { useGetSingleCompanyQuery } from "../../../redux/slices/company/companySlice";
import LoadingComponent from "../../../components/LoadingComponent";
import { useParams } from "react-router-dom";
import DataTableComponent from "../../../components/shared/Tables/DataTable";
import { useState } from "react";
import { useEffect } from "react";
import DialogComponent from "../../../components/shared/Dialog";
import SubscriptionDetails from "../subscriptionDetails/SubscriptionDetails";
import PermissionAccessLayout from "../../../layout/PermissionAccessLayout";

export default function CompanyDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const startDateTemplate = (rowData) => <span dir="ltr">{rowData.start}</span>;
  const endDateTemplate = (rowData) => <span dir="ltr">{rowData.end}</span>;

  const {
    data: companyDetails,
    isSuccess,
    isLoading,
  } = useGetSingleCompanyQuery(id);
  const cols = [
    { field: "name", header: t("name") },
    { field: "description", header: t("description") },
  ];

  const subscribesCols = [
    { field: "id", header: "#" },
    {
      field: "amount_paid",
      header: t("amount_paid"),
    },
    {
      field: "cvs",
      header: t("cv"),
    },
    {
      field: "start",
      header: t("start_date"),
      body: startDateTemplate,
    },
    {
      field: "end",
      header: t("end_date"),
      body: endDateTemplate,
    },
  ];

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    return (
      <PermissionAccessLayout pageName={"companies"} permissionAllowed={2}>
        <Container fluid>
          <Card className="my-3 px-2 pt-2">
            <Row>
              <Col sm={12} md={3}>
                <Image
                  src={URL_API.replace("/api", "") + companyDetails.data.logo}
                  thumbnail
                />
              </Col>
              <Col sm={12} md={9}>
                <Row>
                  <Col sm={12}>
                    <Card className="mb-2">
                      <Card.Header className="bg-blue-green text-white">
                        {t("details")}
                      </Card.Header>
                      <Card.Body>
                        <RowData
                          name={"name"}
                          value={companyDetails.data.company_name}
                        />
                        <RowData
                          name={"user_name"}
                          value={companyDetails.data.user_name}
                        />
                        <RowData
                          name={"language"}
                          value={t(companyDetails.data.lang)}
                        />
                        <RowData
                          name={"phone"}
                          value={companyDetails.data.phone}
                        />
                        <RowData
                          name={"email"}
                          value={companyDetails.data.email}
                          isLink
                        />
                        <RowData
                          name={"website"}
                          value={companyDetails.data.web_site}
                          isLink
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={12}>
                    <Card className="mb-2">
                      <Card.Header className="bg-blue-green text-white">
                        {t("location")}
                      </Card.Header>
                      <Card.Body>
                        <RowData
                          name={"city"}
                          value={t(companyDetails.data.city.name)}
                        />
                        <RowData
                          name={"main_company_location"}
                          value={companyDetails.data.main_company_location}
                        />
                        <RowData
                          name={"available_job_location"}
                          value={t(companyDetails.data.available_job_location)}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <Card className="mb-3">
            <Card.Title className="text-center py-2">{t("jobs")}</Card.Title>
            <DataTableComponent
              data={companyDetails.data.jobs}
              cols={cols}
              pathItemDetails={"companies/jobs"}
              isHeader
              showDetails
            />
          </Card>
          <Card className="mb-3">
            <Card.Title className="text-center py-2">
              {t("subscriptions")}
            </Card.Title>
            <DataTableComponent
              data={companyDetails.data.subscribes}
              cols={subscribesCols}
              setShowDetails={setShowDetails}
              showDialogDetails
            />
          </Card>
          <DialogComponent
            setShowDialog={setShowDetails}
            showDialog={showDetails}
            title={t("subscription_details")}
            size={"md"}
          >
            <SubscriptionDetails />
          </DialogComponent>
        </Container>
      </PermissionAccessLayout>
    );
  }
}
