import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DataTableComponent from "../../components/shared/Tables/DataTable";
import LoadingComponent from "../../components/LoadingComponent";
import { useGetSubscriptionsQuery } from "../../redux/slices/subscriptions/subscriptionSlice";

export default function Subscriptions() {
  const { t } = useTranslation();
  const startDateTemplate = (rowData) => <span dir="ltr">{rowData.start}</span>;
  const endDateTemplate = (rowData) => <span dir="ltr">{rowData.end}</span>;
  const {
    data: subscriptions,
    isSuccess,
    isLoading,
  } = useGetSubscriptionsQuery();
  const cols = [
    {
      field: "company.user_name",
      header: t("subscribe_name"),
    },
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
  let content;
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (subscriptions.status) {
      content = (
        <>
          <div className="d-flex my-3 justify-content-between">
            <h4>{t("subscriptions")}</h4>
          </div>
          <DataTableComponent
            data={subscriptions.data}
            cols={cols}
            pathItemDetails={"subscriptions"}
            showDetails
            showTakedd={true}
            
          />
        </>
      );
    } else {
      toast.error(subscriptions.message);
    }
  }
  return content;
}
