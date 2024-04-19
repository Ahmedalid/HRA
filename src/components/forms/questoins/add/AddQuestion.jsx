import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import Select from "react-select";
import { useParams } from "react-router-dom";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useCreateQuestionMutation } from "../../../../redux/slices/questions/questionSlice";
import { useGetCategoriesQuery } from "../../../../redux/slices/category/categorySlice";
import { useGetSubCategoriesQuery } from "../../../../redux/slices/sub-category/subCategorySlice";
import { useGetDepartmentsQuery } from "../../../../redux/slices/departments/departmentSlice";
import LoadingComponent from "../../../LoadingComponent";
import { useState } from "react";

export default function AddQuestion({ setShowDialog }) {
  const { id } = useParams();
  const [dependOnDepartment, setDependOnDepartment] = useState(false);
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();
  const [category_id, setCategory_id] = useState(null);
  const [subCategory_id, setSubCategory_id] = useState(null);
  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery();
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesQuery(category_id);
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery(subCategory_id);
  const { t } = useTranslation();
  const schema = yup.object({
    question: yup.string().required(),
  });
  const { register, handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    setValue("type", dependOnDepartment ? 1 : 2);
    createQuestion({ id, ...data })
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
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        setCategory_id(selectedOption.id)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("sub-category")}</Form.Label>
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      options={subCategories?.data}
                      isLoading={isSubCategoriesLoading}
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        setSubCategory_id(selectedOption.id)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("departments")}</Form.Label>
                    <Controller
                      name="category_id"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          styles={react_Select_Styles}
                          getOptionValue={(option) => option?.id}
                          getOptionLabel={(option) => option?.name}
                          options={departments?.data}
                          isLoading={isDepartmentsLoading}
                          placeholder={t("choose")}
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
