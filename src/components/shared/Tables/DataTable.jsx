import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react"; // استيراد useState وuseRef وuseEffect
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEye, FaFileExcel, FaMinus, FaSearch, FaTrashRestoreAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../../redux/slices/editItems/editItemsSlice";
import { setDeletedItem } from "../../../redux/slices/deleteItem/deleteItem";
import { rtl } from "../../../redux/slices/theme/themeSlice";
import { setCurrentShowDetails } from "../../../redux/slices/showDetails/showDetailsSlice";
import { getCookies } from "../../../utils/Cookies"; 
import toast from "react-hot-toast";

export default function DataTableComponent({
  data,
  cols,
  setShowDialog,
  setDialogDelete,
  setShowActiveDialog,
  pathItemDetails,
  showEditButton,
  showDeleteButton,
  showDetails,
  deleteIcon,
  activeBtn,
  setShowDetails,
  showDialogDetails,
  isHeader,
  showTaked,
  showTakedd
}) {
  const dispatch = useDispatch();
  const rtlState = useSelector(rtl);
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const [dataa, setdata] = useState([])
  const [currentRowId, setCurrentRowId] = useState(null);
    const [activw, setactivw] = useState([])
    const [isConfirmed, setIsConfirmed] = useState(false);


  const [token, setToken] = useState(""); // استخدام useState لتخزين الـ token
  const [statuse, setstatuse] = useState([])

  useEffect(() => {
    // استدعاء دالة getCookies للحصول على قيمة الـ token وتعيينها باستخدام setToken
    const storedToken = getCookies("token");
    setToken(storedToken);
  }, []);
  // console.log("token" , token);
  const editItem = (item) => {
    dispatch(setItem(item));
    setShowDialog(true);
  };

// console.log(data , "ed000000000000000000000000it");
async function changeSubscriptionStatus(subscriptionId, rowData) {
  try {
    const response = await fetch(`https://aihr.ahlanuof.com/api/admins/companies/${subscriptionId}/change-activation`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.status === true) {
      toast.success(data?.message);
      // تحديث قيمة dataa بناءً على الصف الحالي
      setdata(rowData.active);
    }

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}





async function getsuc(id) {
  try {
    const response = await fetch(`https://aihr.ahlanuof.com/api/admins/subscriptions/${id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    // console.log(data.data.active);
    // setCurrentRowId(data.data.active);
    setdata(data.data.active)
    console.log(dataa);

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


async function changeSubscription(id, rowData) {
  try {
    const response = await fetch(`https://aihr.ahlanuof.com/api/admins/subscriptions/change-status/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    setstatuse(data.data.status);

    if (data.status === true) {
      toast.success(data?.message);
    }

    setCurrentRowId(rowData.id); // تعيين معرف الصف الحالي عند تغيير القيمة
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}




  const actionBodyTemplate = (rowData) => {

    // rowData?.map((item) =>{
    //   console.log(item);
    // })
    // console.log(data , "ed000000000000000000000000it");
console.log(statuse , "statuse");
    return (
      <div className="d-flex justify-content-center gap-2">

{showTaked && (
  <button 
    className="btn-blue-green btn" 
    onClick={() => { changeSubscriptionStatus(rowData.id, rowData); }}
  >
    {(rowData.active === 1 ? 'تم تاكيد' : 'تأكيد')}
  </button>
)}

{showTakedd && (
        <button className="btn-blue-green btn" onClick={() => changeSubscription(rowData.id, rowData)}>
          {rowData.id === currentRowId ? (statuse ? 'تم التأكيد' : 'تأكيد') : 'تأكيد'}
        </button>
      )}


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
        {activeBtn && (
          <Button
            variant=""
            className="btn-blue-green"
            onClick={() => {
              dispatch(setDeletedItem(rowData));
              setShowActiveDialog(true);
            }}
          >
            {<FaMinus />}
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

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
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
          // console.log(EXCEL_TYPE , "application");
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

  const header = (
    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
      <Button
        className="btn-blue-green"
        variant=""
        type="button"
        onClick={exportExcel}
      >
        <FaFileExcel />
      </Button>
      <div
        className={`${rtlState ? "p-input-icon-left" : "p-input-icon-right"}`}
      >
        {!globalFilter && <FaSearch />}
        <Form.Control
          type="search"
          id="globalFilter"
          name="globalFilter"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder={t("search_input")}
        />
      </div>
    </div>
  );



  // const fetchDataWithToken = (token) => {
  //   fetch("https://aihr.ahlanuof.com/api/admins/subscriptions", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`, // إضافة التوكن هنا
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       // console.log(data , "Response");

  //       return response.json();
  //     })
  //     .then((data) => {
  //       // يتم معالجة البيانات هنا بمجرد استلامها

  //       setdata(data)

  //     })
  //     .catch((error) => {
  //     });
  // };
  
console.log();
  return (
    <div className="datatable-card">
      
      <DataTable
        ref={dt}
        scrollable
        scrollHeight="300px"
        value={data}
        dataKey="id"
        tableClassName="bg-black"
        paginator
        rows={5}
        selectionMode="single"
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
        globalFilter={globalFilter}
        header={!isHeader && header}
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
        {showEditButton ||
        showDeleteButton ||
        showDetails ||
        showDialogDetails ? (
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
