import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import Select from "react-select";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useUpdateQuestionMutation } from "../../../../redux/slices/questions/questionSlice";
import { useGetCategoriesQuery } from "../../../../redux/slices/category/categorySlice";
import { useGetSubCategoriesQuery } from "../../../../redux/slices/sub-category/subCategorySlice";
import { useGetDepartmentsQuery } from "../../../../redux/slices/departments/departmentSlice";
import LoadingComponent from "../../../LoadingComponent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";

export default function EditQuestion({ setShowDialog }) {
  const currentQuestion = useSelector(currentEditItem);
  console.log(currentQuestion.department);
  const [dependOnDepartment, setDependOnDepartment] = useState(
    currentQuestion.department_id !== null ? true : false
  );
  const [updateQuestion, { isLoading }] = useUpdateQuestionMutation();
  const [category_id, setCategory_id] = useState(
    currentQuestion.department?.parent?.parent?.id
  );
  const [subCategory_id, setSubCategory_id] = useState(
    currentQuestion.department?.parent?.id
  );
  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery();
  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    isSuccess: isSubCategoriesSuccess,
  } = useGetSubCategoriesQuery(category_id);
  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    isSuccess: isDepartmentsSuccess,
  } = useGetDepartmentsQuery(subCategory_id);
  const { t } = useTranslation();
  const schema = yup.object({
    question: yup.string().required(),
  });
  const { register, handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
    values: {
      question: currentQuestion.question,
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    setValue("type", dependOnDepartment ? 1 : 2);
    updateQuestion({ id: currentQuestion.id, _method: "put", ...data })
      .unwrap()
      .then((data) => {
        if (data.status) {
          setShowDialog(false);
          toast.success(data.message);
        } else {
          data.message && toast.error(data.message);
          toastErrorMessage(data.errors);
        }
      });
  };
  const onError = (errors) => {
    onErrorMessage(errors);
  };
  if (isCategoriesLoading) {
    return <LoadingComponent boxed />;
  } else if (isCategoriesSuccess) {
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Form.Check
            type="switch"
            onChange={() => setDependOnDepartment(!dependOnDepartment)}
            id="dependOnDepartment"
            label={dependOnDepartment ? t("department-specific") : t("global")}
          />
          <Row>
            <Col md={dependOnDepartment ? 6 : 12}>
              <InputValidation
                {...register("question")}
                label={t("question")}
              />
            </Col>
            {dependOnDepartment && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("category")}</Form.Label>
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      options={categories?.data}
                      isLoading={isCategoriesLoading}
                      defaultValue={categories?.data.find(
                        (c) => c.id === category_id
                      )}
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        setCategory_id(selectedOption.id)
                      }
                    />
                  </Form.Group>
                </Col>
                {isSubCategoriesSuccess && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("sub-category")}</Form.Label>
                      <Select
                        styles={react_Select_Styles}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        options={subCategories?.data}
                        defaultValue={subCategories?.data.find(
                          (c) => c.id === subCategory_id
                        )}
                        isLoading={isSubCategoriesLoading}
                        placeholder={t("choose")}
                        onChange={(selectedOption) =>
                          setSubCategory_id(selectedOption.id)
                        }
                      />
                    </Form.Group>
                  </Col>
                )}
                {isDepartmentsSuccess && (
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("departments")}</Form.Label>
                      <Controller
                        name="category_id"
                        control={control}
                        defaultValue={currentQuestion.department_id}
                        render={({ field }) => (
                          <Select
                            styles={react_Select_Styles}
                            getOptionValue={(option) => option?.id}
                            getOptionLabel={(option) => option?.name}
                            options={departments?.data}
                            isLoading={isDepartmentsLoading}
                            placeholder={t("choose")}
                            defaultValue={departments?.data.find(
                              (c) => c.id === currentQuestion.department_id
                            )}
                            value={departments?.data.find(
                              (c) => c.value === field.value
                            )}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption.id)
                            }
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                )}
              </>
            )}
          </Row>
          <Stack
            direction="horizontal"
            className="justify-content-center mt-4"
            gap="3"
          >
            <Button
              onClick={() => setShowDialog(false)}
              variant=""
              type="button"
              className="btn-blue-green"
            >
              {t("close")}
            </Button>
            <Button
              variant=""
              disabled={isLoading}
              type="submit"
              className="btn-blue-green"
            >
              {isLoading ? t("saving") : t("save")}
            </Button>
          </Stack>
        </Container>
      </Form>
    );
  }
}
