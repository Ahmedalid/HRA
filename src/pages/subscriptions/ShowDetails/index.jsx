import { useParams } from "react-router-dom";
import { useGetSingleSubscriptionsQuery } from "../../../redux/slices/subscriptions/subscriptionSlice";
import LoadingComponent from "../../../components/LoadingComponent";
import { Button, Container } from "react-bootstrap";
import RowData from "../../../components/shared/RowData";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ShowSubscriptionDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: singleSubscription,
    isSuccess,
    isLoading,
  } = useGetSingleSubscriptionsQuery(id);
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    return (
      <Container className="mt-4">
        <RowData
          name={"subscribe_name"}
          value={singleSubscription.data.company.user_name}
        />
        <RowData name={"email"} value={singleSubscription.data.company.email} />
        <RowData name={"phone"} value={singleSubscription.data.company.phone} />
        <RowData
          name={"package_name"}
          value={singleSubscription.data.package.name}
        />
        <RowData
          name={`package_price`}
          value={singleSubscription.data.package.price}
        />
        <RowData
          name={"amount_paid"}
          value={singleSubscription.data.amount_paid}
        />
        <RowData
          name={"subscribe_number"}
          value={singleSubscription.data.subscribe_number}
        />
        <RowData name={"cv"} value={singleSubscription.data.cvs} />
        <RowData name={"jobs"} value={singleSubscription.data.jobs} />
        <RowData
          dir="ltr"
          name={"start_date"}
          value={singleSubscription.data.start}
        />
        <RowData
          dir="ltr"
          name={"end_date"}
          value={singleSubscription.data.end}
        />
        <div className="d-flex justify-content-center">
          <Button
            variant=""
            className="btn-blue-green"
            onClick={() => navigate(-1)}
          >
            {t("back")}
          </Button>
        </div>
      </Container>
    );
  }
}
