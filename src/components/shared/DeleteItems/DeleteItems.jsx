import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { currentItem } from "../../../redux/slices/deleteItem/deleteItem";
import { useTranslation } from "react-i18next";

export default function DeleteItems({
  setDialogDelete,
  deleteQuery,
  deleteId,
}) {
  const deletedItem = useSelector(currentItem);
  const { t } = useTranslation();
  const handelDeleteItem = async (e) => {
    setDialogDelete(false);
    if (e.target) {
      await deleteQuery(deletedItem.id || deleteId)
        .unwrap()
        .then((data) => {
          toast.success(data.message);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  return (
    <>
      <Button variant="" className="btn-blue-green" onClick={handelDeleteItem}>
        {t("yes")}
      </Button>
      <Button
        variant=""
        className="btn-blue-green"
        onClick={() => setDialogDelete(false)}
      >
        {t("no")}
      </Button>
    </>
  );
}
