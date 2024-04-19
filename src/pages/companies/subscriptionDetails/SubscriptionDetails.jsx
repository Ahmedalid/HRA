import { useSelector } from "react-redux";
import { currentShowDetails } from "../../../redux/slices/showDetails/showDetailsSlice";
import RowData from "../../../components/shared/RowData";
import { Card, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PermissionAccessLayout from "../../../layout/PermissionAccessLayout";

export default function SubscriptionDetails() {
  const subscriptionDetails = useSelector(currentShowDetails);
  const { t } = useTranslation();
  console.log(subscriptionDetails);
  return (
    <PermissionAccessLayout pageName={"companies"} permissionAllowed={2}>
      <Container>
        <Card className="mb-3">
          <Card.Title className="text-center bg-blue-green text-white p-2 rounded">
            {t("subscription_details")}
          </Card.Title>
          <Card.Body>
            <RowData
              name={"amount_paid"}
              value={subscriptionDetails.amount_paid}
            />
            <RowData
              name={"subscribe_number"}
              value={subscriptionDetails.subscribe_number}
            />
            <RowData name={"cvs"} value={subscriptionDetails.cvs} />
            <RowData name={"jobs"} value={subscriptionDetails.jobs} />
            <RowData
              dir="ltr"
              name={"start_date"}
              value={subscriptionDetails.start}
            />
            <RowData
              dir="ltr"
              name={"end_date"}
              value={subscriptionDetails.end}
            />
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Title className="text-center bg-blue-green text-white p-2 rounded">
            {t("details")} {t("package")}
          </Card.Title>
          <Card.Body>
            <RowData
              name={"package_name"}
              value={subscriptionDetails.package.name}
            />
            <RowData
              name={`package_price`}
              value={subscriptionDetails.package.price}
            />
            <RowData name={"cv"} value={subscriptionDetails.package.cvs} />
            <RowData name={"jobs"} value={subscriptionDetails.package.jobs} />
            <RowData
              name={"month_number"}
              value={subscriptionDetails.package.month}
            />
          </Card.Body>
        </Card>
      </Container>
    </PermissionAccessLayout>
  );
}
