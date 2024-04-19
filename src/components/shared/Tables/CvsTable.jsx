import { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  FaEye,
  FaFileExcel,
  FaSearch,
  FaTrashRestoreAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { setItem } from "../../../redux/slices/editItems/editItemsSlice";
import { setDeletedItem } from "../../../redux/slices/deleteItem/deleteItem";
import { rtl } from "../../../redux/slices/theme/themeSlice";
import { setCurrentShowDetails } from "../../../redux/slices/showDetails/showDetailsSlice";
import FilterCvs from "../../forms/cvs/filter/FilterCvs";

export default function CvsTable({
  data,
  cols,
  setShowDialog,
  setDialogDelete,
  pathItemDetails,
  showEditButton,
  showDeleteButton,
  showDetails,
  deleteIcon,
  setShowDetails,
  showDialogDetails,
}) {
  const [cvs, setCvs] = useState(data);
  const dispatch = useDispatch();
  const rtlState = useSelector(rtl);
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const editItem = (item) => {
    dispatch(setItem(item));
    setShowDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex justify-content-center gap-2">
        {showEditButton && (
          <Button
            variant=""
            className="btn-blue-green"
            onClick={() => editItem(rowData)}
          >
            <FaPencil />
          </Button>
        )}
        {showDetails && pathItemDetails && (
          <Button
            as={Link}
            to={`/${pathItemDetails}/${rowData.id}`}
            variant=""
            onClick={() => {
              dispatch(setCurrentShowDetails(rowData));
            }}
            className="btn-blue-green"
          >
            <FaEye />
          </Button>
        )}
        {showDialogDetails && (
          <Button
            className="btn-blue-green"
            variant=""
            onClick={() => {
              dispatch(setCurrentShowDetails(rowData));
              setShowDetails(true);
            }}
          >
            <FaEye />
          </Button>
        )}

        {showDeleteButton && (
          <Button
            variant=""
            className="btn-blue-green"
            onClick={() => {
              dispatch(setDeletedItem(rowData));
              setDialogDelete(true);
            }}
          >
            {deleteIcon ? <FaTrashRestoreAlt /> : <FaTrashCan />}
          </Button>
        )}
      </div>
    );
  };

  // const exportExcel = () => {
  //   import("xlsx").then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(data);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });
  //     saveAsExcelFile(excelBuffer, "data");
  //   });
  // };

  // const saveAsExcelFile = (buffer, fileName) => {
  //   import("file-saver").then((module) => {
  //     if (module && module.default) {
  //       let EXCEL_TYPE =
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //       let EXCEL_EXTENSION = ".xlsx";
  //       const data = new Blob([buffer], {
  //         type: EXCEL_TYPE,
  //       });
  //       module.default.saveAs(
  //         data,
  //         fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //       );
  //     }
  //   });
  // };

  const header = (
    <Container>
      <FilterCvs />
    </Container>
  );
  return (
    <div className="datatable-card">
      <DataTable
        ref={dt}
        scrollable
        scrollHeight="300px"
        value={cvs}
        dataKey="id"
        tableClassName="bg-black"
        paginator
        rows={5}
        selectionMode="single"
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
        globalFilter={globalFilter}
        header={header}
      >
        {cols.map((col) => (
          <Column
            bodyClassName="text-center"
            headerClassName="text-center"
            key={col.header}
            field={col.field}
            header={col.header}
            body={col?.body}
            style={{ minWidth: "50px" }}
            sortable
            exportField
          ></Column>
        ))}
        {showEditButton || showDeleteButton || showDetails ? (
          <Column
            header={t("operations")}
            body={actionBodyTemplate}
            style={{ minWidth: "100px" }}
          ></Column>
        ) : null}
      </DataTable>
    </div>
  );
}
/*
 <Select
            styles={react_Select_Styles}
            className="w-50"
            getOptionValue={(option) => option?.name}
            getOptionLabel={(option) => option?.name}
            options={statusOptions}
            placeholder={t("choose")}
            onChange={(selectedOption) => {
              activeChangeMethod({
                _method: "put",
                id: rowData.id,
                status: selectedOption.id,
              })
                .unwrap()
                .then((data) => {
                  if (data.status) {
                    toast.success(data.message);
                  } else {
                    toastErrorMessage(data.errors);
                  }
                });
            }}
          />
*/
