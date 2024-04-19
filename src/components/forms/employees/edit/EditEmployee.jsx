import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useUpdateEmployeesMutation } from "../../../../redux/slices/employees/employeesSlice";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import TextareaValidation from "../../inputs/TextareaValidation";
import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useGetCategoriesQuery } from "../../../../redux/slices/category/categorySlice";
import { useGetSubCategoriesQuery } from "../../../../redux/slices/sub-category/subCategorySlice";
import { useGetDepartmentsQuery } from "../../../../redux/slices/departments/departmentSlice";
import {
  useGetCitiesQuery,
  useGetLocationsQuery,
} from "../../../../redux/slices/locations/locationsSlice";
import LoadingComponent from "../../../LoadingComponent";

export default function EditEmployee({ setShowDialog }) {
  const currentEmployee = useSelector(currentEditItem);
  const [updateEmployees, { isLoading }] = useUpdateEmployeesMutation();
  const [country_id, setCountry_id] = useState(currentEmployee.city.parent_id);
  const [prefix, setPrefix] = useState(currentEmployee.city.phone_key);

  const [category_id, setCategory_id] = useState(
    currentEmployee.department_category.parent.parent.id
  );
  const [subCategory_id, setSubCategory_id] = useState(
    currentEmployee.department_category.parent.id
  );
  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    isSuccess: isSubCategoriesSuccess,
  } = useGetSubCategoriesQuery(category_id);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess,
  } = useGetCategoriesQuery();
  const {
    data: departments,
    isLoading: isDepartmentsLoading,
    isSuccess: isDepartmentsSuccess,
  } = useGetDepartmentsQuery(subCategory_id);

  const {
    data: countries,
    isLoading: isCountriesLoading,
    isSuccess: isCountriesSuccess,
  } = useGetLocationsQuery();

  const {
    data: cities,
    isLoading: isCitiesLoading,
    isSuccess: isCitiesSuccess,
  } = useGetCitiesQuery(country_id);
  const { t } = useTranslation();
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    prefix: yup.string().required(),
    education: yup.string().required(),
    major: yup.string().required(),
    job_title: yup.string().required(),
    industry: yup.string().required(),
    salary: yup.string().required(),
    notes: yup.string().required(),
  });
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    values: {
      prefix,
      name: currentEmployee.name,
      email: currentEmployee.email,
      phone: currentEmployee.phone,
      address: currentEmployee.address,
      education: currentEmployee.education,
      major: currentEmployee.major,
      job_title: currentEmployee.job_title,
      industry: currentEmployee.industry,
      salary: currentEmployee.salary,
      notes: currentEmployee.notes,
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    updateEmployees({ id: currentEmployee.id, _method: "put", ...data })
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

  const gender = [
    { id: 1, name: t("male"), label: "male" },
    { id: 2, name: t("female"), label: "female" },
  ];

  const lang = [
    { id: 1, name: "ar", label: t("ar") },
    { id: 2, name: "en", label: t("en") },
  ];
  const marital = [
    { name: "Single", label: t("single") },
    { name: "Married", label: t("married") },
    { name: "Widow", label: t("widow") },
  ];
  const military = [
    { name: "Exempt", label: t("exempt") },
    { name: "Deferred", label: t("deferred") },
    { name: "Conscript", label: t("conscript") },
    { name: "Completed", label: t("completed") },
  ];

  if ((isCategoriesLoading, isCountriesLoading)) {
    return <LoadingComponent boxed />;
  } else if (isCategoriesSuccess && isCountriesSuccess) {
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Row>
            <Col md={4}>
              <InputValidation {...register("name")} label={t("name")} />
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("email")}
                label={t("email")}
                type={"email"}
              />
            </Col>
            <Col md={4}>
              <InputValidation label={t("phone")} {...register("phone")} />
            </Col>
            <Col md={4}>
              <InputValidation
                label={t("birth_date")}
                {...register("birth_date")}
                type="date"
              />
            </Col>
            <Col md={4}>
              <InputValidation {...register("address")} label={t("address")} />
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("category")}</Form.Label>
                <Select
                  styles={react_Select_Styles}
                  getOptionValue={(option) => option?.id}
                  getOptionLabel={(option) => option?.name}
                  options={categories?.data}
                  defaultValue={categories?.data.find(
                    (c) =>
                      c.id ===
                      currentEmployee.department_category.parent.parent.id
                  )}
                  placeholder={t("choose")}
                  onChange={(selectedOption) =>
                    setCategory_id(selectedOption.id)
                  }
                />
              </Form.Group>
            </Col>
            {isSubCategoriesSuccess && (
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("sub-category")}</Form.Label>
                  <Controller
                    name="sub_category_id"
                    control={control}
                    defaultValue={currentEmployee.department_category.parent.id}
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        options={subCategories?.data}
                        isLoading={isSubCategoriesLoading}
                        placeholder={t("choose")}
                        defaultValue={subCategories?.data.find(
                          (c) =>
                            c.id ===
                            currentEmployee.department_category.parent.id
                        )}
                        value={subCategories?.data.find(
                          (c) => c.value === field.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.id);
                          setSubCategory_id(selectedOption.id);
                        }}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
            {isDepartmentsSuccess && (
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("departments")}</Form.Label>
                  <Controller
                    name="department_id"
                    control={control}
                    defaultValue={currentEmployee.department_category.id}
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        options={departments?.data}
                        isLoading={isDepartmentsLoading}
                        defaultValue={departments?.data.find(
                          (c) => c.id === currentEmployee.department_category.id
                        )}
                        placeholder={t("choose")}
                        value={departments?.data.find(
                          (c) => c.value === field.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.id);
                        }}
                      />
                    )}
                  />
                </Form.Group>
              </Col>
            )}
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("country")}</Form.Label>
                <Select
                  styles={react_Select_Styles}
                  getOptionValue={(option) => option?.id}
                  getOptionLabel={(option) => option?.name}
                  options={countries?.data}
                  isLoading={isCountriesLoading}
                  defaultValue={countries?.data.find(
                    (c) => c.id === currentEmployee.city.parent_id
                  )}
                  placeholder={t("choose")}
                  onChange={(selectedOption) => {
                    setCountry_id(selectedOption.id);
                    setPrefix(selectedOption.phone_key);
                  }}
                />
              </Form.Group>
            </Col>
            {isCitiesSuccess && (
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>{t("city")}</Form.Label>
                  <Controller
                    name="location_id"
                    control={control}
                    defaultValue={currentEmployee.city.id}
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        options={cities?.data}
                        isLoading={isCitiesLoading}
                        placeholder={t("choose")}
                        defaultValue={cities?.data.find(
                          (c) => c.id === currentEmployee.city.id
                        )}
                        value={cities?.data.find(
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
            <Col md={4}>
              <InputValidation
                {...register("prefix")}
                label={t("code")}
                readonly
              />
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("gender")}</Form.Label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={
                    gender.find((g) => g.label === currentEmployee.gender).id
                  }
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      value={gender.find((c) => c.value === field.value)}
                      defaultValue={gender.find(
                        (c) => c.label === currentEmployee.gender
                      )}
                      options={gender}
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption.id)
                      }
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("language")}</Form.Label>
                <Controller
                  name="lang"
                  control={control}
                  defaultValue={currentEmployee.lang}
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.name}
                      getOptionLabel={(option) => option?.label}
                      value={lang.find((c) => c.value === field.value)}
                      defaultValue={lang.find(
                        (c) => c.name === currentEmployee.lang
                      )}
                      options={lang}
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption.name)
                      }
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("education")}
                label={t("education")}
              />
            </Col>
            <Col md={4}>
              <InputValidation {...register("major")} label={t("major")} />
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("job_title")}
                label={t("job_title")}
              />
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("industry")}
                label={t("industry")}
              />
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("military")}</Form.Label>
                <Controller
                  name="military"
                  control={control}
                  defaultValue={currentEmployee.military}
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.name}
                      getOptionLabel={(option) => option?.label}
                      value={military.find((c) => c.value === field.value)}
                      defaultValue={military.find(
                        (c) => c.name === currentEmployee.military
                      )}
                      options={military}
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption.name)
                      }
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("marital")}</Form.Label>
                <Controller
                  name="marital"
                  control={control}
                  defaultValue={currentEmployee.marital}
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.name}
                      getOptionLabel={(option) => option?.label}
                      value={marital.find((c) => c.value === field.value)}
                      options={marital}
                      defaultValue={marital.find(
                        (c) => c.name === currentEmployee.marital
                      )}
                      placeholder={t("choose")}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption.name)
                      }
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("salary")}
                label={t("salary")}
                type={"number"}
              />
            </Col>
            <Col sm={12}>
              <TextareaValidation {...register("notes")} label={t("note")} />
            </Col>
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
