import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PermissionNotAllowed({ pageName }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="not-allowed-page">
      <p className="message">
        <span> {t("not_allowed")}</span>
        <span className="text-danger"> &quot;{pageName}&quot;.</span>
      </p>
      <Button
        variant=""
        onClick={() => navigate(-1)}
        className="btn-blue-green"
      >
        {t("back")}
      </Button>
    </div>
  );
}
