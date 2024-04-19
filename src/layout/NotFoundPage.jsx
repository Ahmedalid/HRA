import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="not-found-page">
      <p>
        <span className="text-danger">
          {location.pathname.replace("/", "")}
        </span>{" "}
        <b>-</b> {t("not-found-page")}
      </p>
      <Button
        variant=""
        className="btn-blue-green"
        onClick={() => navigate(-1)}
      >
        {t("back")}
      </Button>
    </div>
  );
}
