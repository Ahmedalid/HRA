import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import LoadingComponent from "../../../components/LoadingComponent";
import { useGetJobsQuery } from "../../../redux/slices/company/jobs/jobsSlice";
import RowData from "../../../components/shared/RowData";
import { Link } from "react-router-dom";
import PermissionAccessLayout from "../../../layout/PermissionAccessLayout";
import DialogComponent from "../../../components/shared/Dialog";
import { useEffect, useState } from "react";
import AssignCvToJob from "../../assign-cv-to-job/AssignCvToJob";
import RatingForm from "./Start";
// import { Button } from "react-bootstrap";
export default function JobDetails() {
  const [showAssignCv, setShowAssignCv] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShoww = () => setShow(true);

  const { id } = useParams();
  const { t } = useTranslation();
  const { data: jobs, isSuccess, isLoading } = useGetJobsQuery(id);
  let content;
  let departmentId = jobs?.data?.department.id;
  // console.log(jobs?.data.cvs[0].company_comment, "departmentIddepartmentId");
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  if (isLoading) {
    return <LoadingComponent />;
  } else if (isSuccess) {
    if (jobs.status) {
      content = (
        <PermissionAccessLayout pageName={"companies"} permissionAllowed={2}>
          <Container className="mt-3">
            <div className="d-flex justify-content-between mt-2 mb-3">
              <h4>{`${t("details")} ${t("job")} `}</h4>
              <div className="d-flex gap-3">
                <Button
                  variant=""
                  as={Link}
                  to={`/questions/${id}`}
                  className="btn-blue-green"
                >
                  {t("add_question")}
                </Button>
                <Button
                  variant=""
                  as={Link}
                  to={`/ai-questions/${id}`}
                  className="btn-blue-green"
                >
                  {t("add_ai_question")}
                </Button>
                <Button
                  variant=""
                  className="btn-blue-green"
                  onClick={() => setShowAssignCv(true)}
                >
                  {t("assign_cv_to_job")}
                </Button>
              </div>
            </div>
            <Row>
              <Col md={6}>
                <Card className="px-2 pt-2 mb-3">
                  <Card.Header className="bg-blue-green text-white">
                    {t("details")}
                  </Card.Header>
                  <Card.Body>
                    <RowData name="name" value={jobs.data.name} />
                    <RowData name="description" value={jobs.data.description} />
                    <RowData
                      name="start_date"
                      value={jobs.data.start}
                      dir="ltr"
                    />
                    <RowData name="end_date" value={jobs.data.end} dir="ltr" />
                  </Card.Body>
                </Card>
              </Col>
              {jobs?.data?.cvs.length !== 0 && (
                <Col md={6}>
                  <Card className="px-2 pt-2 mb-3">
                    <Card.Header className="bg-blue-green text-white">
                      {t("cvs")}
                    </Card.Header>
                    <Card.Body>
                      {jobs?.data?.cvs.map((cv, index) => {
                        return (
                          <RowData
                            key={index}
                            name="name"
                            dir="ltr"
                            value={import.meta.env.VITE_URL + cv.cv}
                            linkValue={cv.cv.split("cvs/")[1]}
                            isLink
                          />
                        );
                      })}
                    </Card.Body>
                  </Card>
                </Col>
              )}
              {jobs?.data?.questions.length !== 0 && (
                <Col md={6}>
                  <Card className="px-2 pt-2 mb-3">
                    <Card.Header className="bg-blue-green text-white">
                      {t("questions")}
                    </Card.Header>
                    <Card.Body>
                      {jobs?.data?.questions.map((question, index) => {
                        return (
                          <RowData
                            key={index}
                            name="question"
                            dir="ltr"
                            value={question.question}
                          />
                        );
                      })}
                    </Card.Body>
                  </Card>
                </Col>
              )}
              {jobs?.data?.skills.length !== 0 && (
                <Col md={6}>
                  <Card className="px-2 pt-2 mb-3">
                    <Card.Header className="bg-blue-green text-white">
                      {t("skills")}
                    </Card.Header>
                    <Card.Body>
                      {jobs?.data?.skills.map((skill, index) => {
                        return (
                          <RowData
                            key={index}
                            name="skill"
                            dir="ltr"
                            value={skill.name}
                          />
                        );
                      })}
                    </Card.Body>
                  </Card>
                </Col>
              )}
              <Col md={6}>
                <Card.Header className="bg-blue-green text-white border-top mt">
                  <p className="pt-2 mx-3 pb-2">تقيم cv</p>
                </Card.Header>
                <div>
                  <RatingForm />
                </div>
              </Col>
              <Col md={6}>
                <Card.Header className="bg-blue-green text-white border-top mt">
                  
                  <div>
                    
                  </div>
                  <p className="pt-2 mx-3 pb-2">فيديو المقابلة</p>
                  
              
                  
                </Card.Header>
                {jobs?.data.cvs[0]?.video_path ? (
                  <div>
                    <video controls className="h-100">
                      <source
                        src={`${jobs?.data.cvs[0]?.video_path}`}
                        type="video/mp4"
                      />
                      <source
                        src={`${jobs?.data.cvs[0]?.video_path}`}
                        type="video/ogg"
                      />
                    </video>
                  </div>
                ) : (
                  <h2 className="text-color d-center mt-5">لا يوجد فيديو</h2>
                )}
              <Button variant="" onClick={handleShoww}  className="btn mt-3 mt-5">
                <div className="btn btn-cv mt-1 font-12 mx-2 btn-blue-green btn">  عرض التعليق  </div>
              </Button>
             
             
              </Col>

              <Modal show={show} onHide={handleClose}>
  <div className="d-flex justify-content-between mt-3 mx-3">
    <Modal.Title> <h2 className="fw-bold">HR AI</h2> </Modal.Title>
    <Modal.Header closeButton />
  </div>
  {/* [0].company_comment */}
  {jobs?.data.cvs.map((data, index) => (
  <div key={index}>
    {data.company_comment ? (
      <h1>{data.company_comment}</h1>
    ) : (
      <h3 className="d-center">لا توجد تعليقات</h3>
    )}
  </div>
))}


  <Modal.Footer />
</Modal>
            </Row>
            <Row className="mt-2"></Row>
          </Container>
          <DialogComponent
            setShowDialog={setShowAssignCv}
            showDialog={showAssignCv}
            title={t("assign_cv_to_job")}
            size={"xl"}
            // fullscreen
          >
            <AssignCvToJob
              setShowDialog={setShowAssignCv}
              departmentId={jobs.data.department.id}
              job_id={jobs.data.id}
            />
          </DialogComponent>
        </PermissionAccessLayout>
      );
    } else {
      toast.error(jobs.message);
    }
  }
  return content;
}
