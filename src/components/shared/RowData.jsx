import { useTranslation } from "react-i18next";

export default function RowData({
  name,
  value,
  linkValue,
  isLink,
  classes,
  dir,
  border = true,
  _blank,
}) {
  const { t } = useTranslation();
  return (
    <div
      className={`d-flex justify-content-between mb-2 ${classes} ${
        border ? "border-bottom" : ""
      } `}
    >
      <span>{t(name)}</span>
      {value ? (
        isLink ? (
          <a href={value} dir={dir} target={_blank}>
            {linkValue}
          </a>
        ) : (
          <span dir={dir}>{value}</span>
        )
      ) : (
        t("not_available")
      )}
    </div>
  );
}
