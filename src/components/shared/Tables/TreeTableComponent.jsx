// import { useState } from "react";
// import { TreeTable } from "primereact/treetable";
// import { Column } from "primereact/column";
// import { MultiSelect } from "primereact/multiselect";

// import {
//   FaFileExcel,
//   FaFolderOpen,
//   FaMinus,
//   FaPencilAlt,
//   FaPlusCircle,
//   FaRegFileAlt,
// } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { Button } from "react-bootstrap";
// import { InputText } from "primereact/inputtext";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   currentAccountItem,
//   setAccountItem,
//   setItem,
// } from "../../../redux/slices/editItems/editItemsSlice";
// import { FaFolder, FaPlus, FaTrashCan } from "react-icons/fa6";
// import { setDeletedItem } from "../../../redux/slices/deleteItem/deleteItem";
// import { rtl } from "../../../redux/slices/theme/themeSlice";
// import { useTranslation } from "react-i18next";
// import { useEffect } from "react";
// import toast from "react-hot-toast";

// export default function TreeTableComponent({
//   setDialogDelete,
//   setShowSubDialog,
//   setShowEditDialog,
//   showDeleteButton,
//   showEditButton,
//   showAddSubButton,
//   hideHeader,
//   data,
//   columns,
// }) {
//   const { t } = useTranslation();
//   const rtlState = useSelector(rtl);
//   const [selectedNodeKey, setSelectedNodeKey] = useState(null);
//   const [visibleColumns, setVisibleColumns] = useState(columns || []);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [hideActions, setHideActions] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (showDeleteButton || showEditButton || showAddSubButton) {
//       setHideActions(true);
//     } else {
//       setHideActions(false);
//     }
//   }, [showDeleteButton, showEditButton, showAddSubButton]);
//   const actionTemplate = (node) => {
//     return (
//       <div className="d-flex justify-content-center flex-wrap gap-2">
//         {/* {showAddSubButton && node.data.status === "main" && (
//           <Button
//             type="button"
//             variant=""
//             className="btn-blue-green"
//             onClick={() => {
//               setShowSubDialog(true);
//               dispatch(setAccountItem(node.data));
//             }}
//           >
//             <FaPlusCircle />
//           </Button>
//         )} */}
//         {node.data.status === "main" && (
//           <Button
//             type="button"
//             variant=""
//             className="btn-blue-green"
//             onClick={() => {
//               setShowSubDialog(true);
//               dispatch(setAccountItem(node.data));
//             }}
//           >
//             <FaPlusCircle />
//           </Button>
//         )}
//         {showEditButton && (
//           <Button
//             type="button"
//             variant=""
//             className="btn-blue-green"
//             onClick={() => {
//               setShowEditDialog(true);
//               dispatch(setItem(node.data));
//             }}
//           >
//             <FaPencilAlt />
//           </Button>
//         )}
//         {showDeleteButton && node.data.status === "main" && (
//           <Button
//             type="button"
//             variant=""
//             className="btn-blue-green"
//             onClick={() => {
//               setDialogDelete(true);
//               dispatch(setDeletedItem(node.data));
//             }}
//           >
//             <FaTrashCan />
//           </Button>
//         )}
//       </div>
//     );
//   };

//   const togglerTemplate = (node, options) => {
//     if (!node) {
//       return;
//     }
//     const expanded = options.expanded;
//     return (
//       <>
//         <Button
//           type="button"
//           variant=""
//           className="btn-blue-green"
//           style={options.buttonStyle}
//           tabIndex={-1}
//           onClick={options.onClick}
//         >
//           {!expanded ? <FaPlus /> : <FaMinus />}
//         </Button>
//         <span type="button" className="btn-transparent ms-3">
//           {node.data.status === "main" ? (
//             expanded ? (
//               <FaFolderOpen
//                 size={22}
//                 style={{ color: "#ffac31", marginRight: "1rem" }}
//               />
//             ) : (
//               <FaFolder
//                 size={20}
//                 style={{ color: "#ffac31", marginRight: "1rem" }}
//               />
//             )
//           ) : (
//             <FaRegFileAlt size={20} style={{ color: "#0094d8" }} />
//           )}
//         </span>
//       </>
//     );
//   };

//   const onColumnToggle = (event) => {
//     let selectedColumns = event.value;
//     let orderedSelectedColumns = columns.filter((col) =>
//       selectedColumns.some((sCol) => sCol.field === col.field)
//     );
//     setVisibleColumns(orderedSelectedColumns);
//   };

//   useEffect(() => {
//     rtlState ? setVisibleColumns(columns) : setVisibleColumns(columns);
//   }, [rtlState]);

//   let allData = [];
//   useEffect(() => {
//     data.map((item) => {
//       allData.push(item.data);
//       item.children && item.children.map((child) => allData.push(child.data));
//     });
//   }, [data, allData]);

//   const exportExcel = () => {
//     import("xlsx").then((xlsx) => {
//       const worksheet = xlsx.utils.json_to_sheet(allData);
//       const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
//       const excelBuffer = xlsx.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });
//       saveAsExcelFile(excelBuffer, "data");
//     });
//   };

//   const saveAsExcelFile = (buffer, fileName) => {
//     import("file-saver").then((module) => {
//       if (module && module.default) {
//         let EXCEL_TYPE =
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//         let EXCEL_EXTENSION = ".xlsx";
//         const data = new Blob([buffer], {
//           type: EXCEL_TYPE,
//         });
//         module.default.saveAs(
//           data,
//           fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
//         );
//       }
//     });
//   };
//   const getHeader = () => {
//     return (
//       <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
//         <Button
//           className="btn-blue-green"
//           variant=""
//           type="button"
//           onClick={exportExcel}
//         >
//           <FaFileExcel />
//         </Button>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <div className="p-input-icon-left">
//             <CiSearch size={20} />
//             <InputText
//               type="search"
//               onInput={(e) => setGlobalFilter(e.target.value)}
//               placeholder={t("search_input")}
//             />
//           </div>
//         </form>
//         {columns && (
//           <div
//             className={`${
//               rtlState ? "p-input-icon-left" : "p-input-icon-right"
//             }`}
//           >
//             <div className="d-flex justify-content-between">
//               <MultiSelect
//                 itemClassName="p-multiselect-label-container"
//                 value={visibleColumns}
//                 onChange={onColumnToggle}
//                 options={columns}
//                 optionLabel={"header"}
//                 selectedItemsLabel={t("multiSelect.title")}
//                 maxSelectedLabels={0}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };
//   let header = getHeader();

//   return (
//     <div className="card">
//       <TreeTable
//         value={data}
//         togglerTemplate={togglerTemplate}
//         globalFilter={globalFilter}
//         selectionKeys={selectedNodeKey}
//         onSelectionChange={(e) => setSelectedNodeKey(e.value)}
//         metaKeySelection={false}
//         selectionMode="single"
//         onSelect={(e) => {
//           if (e.node.data.status !== "main") {
//             toast.success(`${e.node.data.name} Selected`);
//             dispatch(setAccountItem(e.node.data));
//           }
//         }}
//         onUnselect={(e) => {
//           if (e.node.data.status !== "main") {
//             dispatch(setAccountItem({}));
//             toast.error(`UnSelect ${e.node.data.name}`);
//           }
//         }}
//         header={!hideHeader && header}
//         tableStyle={{ minWidth: "50rem" }}
//         paginator
//         rows={10}
//         rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
//         paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
//         currentPageReportTemplate="{first} to {last} of {totalRecords}"
//       >
//         <Column
//           field="name"
//           header={t("name")}
//           className={rtlState ? "text-end" : "text-start"}
//           style={{ width: "500px" }}
//           expander
//           exportField
//         ></Column>
//         {visibleColumns?.map((col) => (
//           <Column
//             style={{ width: "180px" }}
//             key={col.field}
//             field={col.field}
//             header={col.header}
//             exportField
//             className={rtlState ? "text-end" : "text-start"}
//           />
//         ))}
//         {hideActions && (
//           <Column
//             header={t("operations")}
//             body={actionTemplate}
//             headerClassName="text-center"
//             style={{ width: "250px" }}
//           />
//         )}
//       </TreeTable>
//     </div>
//   );
// }
import { useState } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";

import {
  FaFileExcel,
  FaFolderOpen,
  FaMinus,
  FaPencilAlt,
  FaPlusCircle,
  FaRegFileAlt,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Button } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import {
  currentEditItem,
  setAccountItem,
  setItem,
} from "../../../redux/slices/editItems/editItemsSlice";
import { FaFolder, FaPlus, FaTrashCan } from "react-icons/fa6";
import { setDeletedItem } from "../../../redux/slices/deleteItem/deleteItem";
import { rtl, setSwitchTab } from "../../../redux/slices/theme/themeSlice";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function TreeTableComponent({
  setDialogDelete,
  setShowSubDialog,
  setShowEditDialog,
  showDeleteButton,
  showEditButton,
  showAddSubButton,
  hideHeader,
  data,
  columns,
  searchOnly,
  selectOption,
}) {
  const currentTreasuryAccount = useSelector(currentEditItem);

  const { t } = useTranslation();
  const rtlState = useSelector(rtl);
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(columns || []);
  const [globalFilter, setGlobalFilter] = useState("");
  const [hideActions, setHideActions] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showDeleteButton || showEditButton || showAddSubButton) {
      setHideActions(true);
    } else {
      setHideActions(false);
    }
  }, [showDeleteButton, showEditButton, showAddSubButton]);
  const actionTemplate = (node) => {
    return (
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {node.data.status === "main" && (
          <Button
            type="button"
            variant=""
            className="btn-blue-green"
            onClick={() => {
              setShowSubDialog(true);
              dispatch(setAccountItem(node.data));
            }}
          >
            <FaPlusCircle />
          </Button>
        )}
        {showEditButton && (
          <Button
            type="button"
            variant=""
            className="btn-blue-green"
            onClick={() => {
              setShowEditDialog(true);
              dispatch(setItem(node.data));
            }}
          >
            <FaPencilAlt />
          </Button>
        )}
        {showDeleteButton && node.data.status === "main" && (
          <Button
            type="button"
            variant=""
            className="btn-blue-green"
            onClick={() => {
              setDialogDelete(true);
              dispatch(setDeletedItem(node.data));
            }}
          >
            <FaTrashCan />
          </Button>
        )}
      </div>
    );
  };

  const togglerTemplate = (node, options) => {
    if (!node) {
      return;
    }
    const expanded = options.expanded;
    return (
      <>
        <Button
          type="button"
          variant=""
          className="btn-blue-green"
          style={options.buttonStyle}
          tabIndex={-1}
          onClick={options.onClick}
        >
          {!expanded ? <FaPlus /> : <FaMinus />}
        </Button>
        <span type="button" className="btn-transparent ms-3">
          {node.data.status === "main" ? (
            expanded ? (
              <FaFolderOpen
                size={22}
                style={{ color: "#ffac31", marginRight: "1rem" }}
              />
            ) : (
              <FaFolder
                size={20}
                style={{ color: "#ffac31", marginRight: "1rem" }}
              />
            )
          ) : (
            <FaRegFileAlt size={20} style={{ color: "#0094d8" }} />
          )}
        </span>
      </>
    );
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setVisibleColumns(orderedSelectedColumns);
  };

  useEffect(() => {
    rtlState ? setVisibleColumns(columns) : setVisibleColumns(columns);
  }, [rtlState]);

  let allData = [];
  useEffect(() => {
    data.map((item) => {
      allData.push(item.data);
      item.children && item.children.map((child) => allData.push(child.data));
    });
  }, [data, allData]);

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(allData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "data");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });
        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  const getHeader = () => {
    return (
      <div
        dir={rtlState}
        className="d-flex flex-wrap gap-2 align-items-center justify-content-between"
      >
        {!searchOnly && (
          <Button
            className="btn-blue-green"
            variant=""
            type="button"
            onClick={exportExcel}
          >
            <FaFileExcel />
          </Button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className={`${
              rtlState ? "p-input-icon-left" : "p-input-icon-right"
            }`}
          >
            {!globalFilter && <CiSearch size={20} />}
            <InputText
              type="search"
              className="p-2"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder={t("search_input")}
            />
          </div>
        </form>
        {!searchOnly && columns && (
          <div
            className={`${
              rtlState ? "p-input-icon-left" : "p-input-icon-right"
            }`}
          >
            <div className="d-flex justify-content-between">
              <MultiSelect
                itemClassName="p-multiselect-label-container"
                value={visibleColumns}
                onChange={onColumnToggle}
                options={columns}
                optionLabel={"header"}
                selectedItemsLabel={t("multiSelect.title")}
                maxSelectedLabels={0}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  let header = getHeader();
  const selectionChange = (e) => {
    setSelectedNodeKey(e.value);
  };

  return (
    <div className="card">
      <TreeTable
        value={data}
        togglerTemplate={togglerTemplate}
        globalFilter={globalFilter}
        selectionKeys={selectOption && selectedNodeKey}
        onSelectionChange={selectionChange}
        metaKeySelection={false}
        selectionMode="single"
        onSelect={(e) => {
          if (e.node.data.status !== "main") {
            toast.success(`${e.node.data.name} Selected`);
            dispatch(setAccountItem(e.node.data));
            dispatch(setSwitchTab(true));
          }
        }}
        onUnselect={(e) => {
          if (e.node.data.status !== "main") {
            dispatch(setAccountItem({}));
            toast.error(`UnSelect ${e.node.data.name}`);
          }
        }}
        header={!hideHeader && header}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="name"
          header={t("name")}
          className={rtlState ? "text-end" : "text-start"}
          style={{ width: "500px" }}
          expander
          exportField
        ></Column>
        {visibleColumns?.map((col) => (
          <Column
            style={{ width: "180px" }}
            key={col.field}
            field={col.field}
            header={col.header}
            exportField
            className={rtlState ? "text-end" : "text-start"}
          />
        ))}
        {hideActions && (
          <Column
            header={t("operations")}
            body={actionTemplate}
            headerClassName="text-center"
            style={{ width: "250px" }}
          />
        )}
      </TreeTable>
    </div>
  );
}
