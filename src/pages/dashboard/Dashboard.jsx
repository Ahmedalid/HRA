import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BarChart from "../../components/charts/BarChart";
import { useGetStatusQuery } from "../../redux/slices/status/statusSlice";
import LoadingComponent from "../../components/LoadingComponent";

export default function Dashboard() {
  const { data: status, isSuccess, isLoading } = useGetStatusQuery();
  const { t } = useTranslation();
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    const data = {
      labels: status?.data?.jobs_status?.map((row) => t(row.status)),
      datasets: [
        {
          label: t("jobs_status"),
          data: status?.data?.jobs_status?.map((row) => row.count),
          backgroundColor: status?.data?.jobs_status?.map((row) => row.bg),
        },
      ],
    };

    return (
      <Container>
        <Row>
          {status?.data?.statistics?.map((item) => (
            <Col key={item.name} className="d-flex justify-content-center">
              <div className="status-card">
                <p>{item.count}</p>
                <p>{t(item.name)}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-center fs-5">{t("jobs_status")}</p>
            <BarChart data={data} />
          </Col>
          <Col md={6}></Col>
        </Row>
      </Container>
    );
  }
}
