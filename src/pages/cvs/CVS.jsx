import { useTranslation } from "react-i18next";
import { useDeleteEmployeesMutation } from "../../redux/slices/employees/employeesSlice";
import { useGetDepartmentsQuery } from "../../redux/slices/departments/departmentSlice";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie"; // Import Cookies from universal-cookie

import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";

export default function CVS() {
  const { t } = useTranslation();
  const [deleteEmployees] = useDeleteEmployeesMutation();
  const { data: departments, isSuccess, isLoading } = useGetDepartmentsQuery();
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null); // State to store fetched data
  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true); // Set loading state to true while fetching
        const cookies = new Cookies(); // Create a new instance of Cookies
        const token = cookies.get("token"); // Get token from cookies
        console.log(token, "oidfyhqwejkh") ;
        const response = await axios.get(`https://aihr.ahlanuof.com/api/admins/companies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setdata(response.data.data);
        console.log(response.data.data);
        setFetchedData(response.data.data);
        setLoading(false); 
      } catch (error) {
        setLoading(false); // Set loading state to false if an error occurs
      }
    }
    fetchSettings();
  }, []);
console.log(data);

  return (
    <div className="row">
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>{t("interviews")} </title>
      </Helmet> */}

      {Loading ? (
        <div>
          <div className="d-center mt-5">
          <LoadingComponent boxed />
          </div>
        </div>
      ) : (
        data?.map((jobData) => (
          
          // console.log(jobData.status),
          <div className="col-6 mt-3" key={jobData.id}>
            <div className="">
           
              <div className="box-shado border-r">
           <div className="pt-2 mx-2 d-flex justify-content-between">
          <div>
          {/* <Delatejop id={jobData.id}/> */}
          </div>
          {/* <div>
            {jobData.status == 1 ?  <div className="cursor-pointer"><p className="text-danger fw-bold"> <ChangejobStatus id={jobData.id}/></p></div> :
             <div className="cursor-pointer"><p className="text-danger fw-bold"> <ChangejobStatus id={jobData.id}/></p></div> }
          </div> */}
           </div>
                <div className="mx-2">
                  <div className="row">
                    <div className="col-6">
                      {/* <h5 className="pt-3 mx-1 ">{jobData?.user_name}</h5> */}
                      <div className="pt-2 d-flex">
                        <p className="fw-bold mx-2 font-12"> {t("maincatogry")}</p>
                        <p>{jobData.user_name}</p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12">  {t("experience")}</p>
                        <p>{jobData.category_level}</p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12">  {t("startdate")}</p>
                        <p>{jobData.start}</p>
                      </div>
                      <div className=" pb-4 text-center d-center">
                      <div className=" pb-4 text-center d-center">
                        {/* <Link to={`/ViewCV/${jobData.id}`} className="mx-3">
                          <button className="btn-class text-white  bg-color">
                    {t("ViewCVs")}
                          </button>
                        </Link> */}
                   
                      </div>
                        {/* <Link to={`/Showjobdetails/${jobData.id}`}>
                          <button className="btn-class text-white font-12 bg-color">
                         {t("cv")}
                          </button>
                        </Link>  */}
                        
                        
                              {/* <Showjobdetails pro={j  obData.id} className="d-none"/> */}

                      </div>
                    </div>
                    <div className="col-6">
                      {/* <h5 className="pt-3 mx-1 ">{jobData.name}</h5> */}

                      <div className="pt-2 d-flex pt-5">
                        <p className="fw-bold mx-2 font-12"> department</p>
                        <p>{jobData.user_name}</p>
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12"> {t("skills")}</p>
                        {/* <p>
                          {jobData.skills.map((skill) => skill.name).join(", ")}
                        </p> */}
                      </div>
                      <div className="pt-0 d-flex">
                        <p className="fw-bold mx-2 font-12">  {t("enddate")}</p>
                        <p>{jobData.end}</p>
                      </div>
                      <div className=" pb-2 ">
                        <div className="pb-2 text-center d-center pt-2">
                          {/* <Link to={`/VeiduoDetails/${jobData.id}`}>
                            <button className="btn-class text-white font-12 bg-color">
                            {t("Interviewvideos")}
                            </button>
                          </Link> */}
                       
                        </div>
                      </div>
                
                    </div>
                    <Link to={`/Online/${jobData.id}`} className="mx-3 d-center pb-3">
                          <button className="btn-class text-white  btn bg-color d-center ">
                         عرض السيره الذاتيه
                          </button>
                        </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="container"></div>
    </div>
  );
}
