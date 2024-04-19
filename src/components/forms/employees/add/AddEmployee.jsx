import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
import { useCreateEmployeesMutation } from "../../../../redux/slices/employees/employeesSlice";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import UploadFile from "../../inputs/UploadFile";
import TextareaValidation from "../../inputs/TextareaValidation";
import { CONVERT } from "../../../../utils/Convert";
import {
  useGetLocationsQuery,
  useGetCitiesQuery,
} from "../../../../redux/slices/locations/locationsSlice";
import { useState } from "react";
import { useGetSubCategoriesQuery } from "../../../../redux/slices/sub-category/subCategorySlice";
import { useGetCategoriesQuery } from "../../../../redux/slices/category/categorySlice";
import { useGetDepartmentsQuery } from "../../../../redux/slices/departments/departmentSlice";

export default function AddEmployee({ setShowDialog }) {
  const [createEmployees, { isLoading }] = useCreateEmployeesMutation();
  const [country_id, setCountry_id] = useState(null);
  const [prefix, setPrefix] = useState(null);

  const [category_id, setCategory_id] = useState(null);
  const [subCategory_id, setSubCategory_id] = useState(null);
  const { data: categories } = useGetCategoriesQuery();
  const { data: subCategories } = useGetSubCategoriesQuery(category_id);
  const { data: departments } = useGetDepartmentsQuery(subCategory_id);

  const { data: countries, isLoading: isCountriesLoading } =
    useGetLocationsQuery();
  const { data: cities, isLoading: isCitiesLoading } =
    useGetCitiesQuery(country_id);
  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string(),
  });
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    values: {
      prefix,
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    const cv = data.cv[0];
    const image = data.image[0];
    createEmployees(CONVERT.ConvertObjectToFormData({ ...data, image, cv }))
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
    { id: 1, name: t("male") },
    { id: 2, name: t("female") },
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

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <Row>
          <Col md={12}>
            <UploadFile
              register={register}
              registerName={"image"}
              labelStyles={{ width: "200px" }}
              label={`${t("upload")} ${t("image")}`}
              preview
              accept={"image/*"}
            />
          </Col>
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
            <InputValidation
              label={t("password")}
              {...register("password")}
              type="password"
            />
          </Col>
          <Col md={4}>
            <InputValidation label={t("phone")} {...register("phone")} />
          </Col>
          <Col md={4}>
            <InputValidation
              label={t("birth_date")}
              {...register("birth-date")}
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
                placeholder={t("choose")}
                onChange={(selectedOption) => setCategory_id(selectedOption.id)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("sub-category")}</Form.Label>
              <Controller
                name="sub_category_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.id}
                    getOptionLabel={(option) => option?.name}
                    options={subCategories?.data}
                    placeholder={t("choose")}
                    value={cities?.data.find((c) => c.value === field.value)}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.id);
                      setSubCategory_id(selectedOption.id);
                    }}
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("departments")}</Form.Label>
              <Controller
                name="department_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.id}
                    getOptionLabel={(option) => option?.name}
                    options={departments?.data}
                    placeholder={t("choose")}
                    value={cities?.data.find((c) => c.value === field.value)}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption.id);
                    }}
                  />
                )}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("country")}</Form.Label>
              <Select
                styles={react_Select_Styles}
                getOptionValue={(option) => option?.id}
                getOptionLabel={(option) => option?.name}
                options={countries?.data}
                isLoading={isCountriesLoading}
                placeholder={t("choose")}
                onChange={(selectedOption) => {
                  setCountry_id(selectedOption.id);
                  setPrefix(selectedOption.phone_key);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("city")}</Form.Label>
              <Controller
                name="location_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.id}
                    getOptionLabel={(option) => option?.name}
                    options={cities?.data}
                    isLoading={isCitiesLoading}
                    placeholder={t("choose")}
                    value={cities?.data.find((c) => c.value === field.value)}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.id)
                    }
                  />
                )}
              />
            </Form.Group>
          </Col>
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
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.id}
                    getOptionLabel={(option) => option?.name}
                    value={gender.find((c) => c.value === field.value)}
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
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.name}
                    getOptionLabel={(option) => option?.label}
                    value={lang.find((c) => c.value === field.value)}
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
            <InputValidation {...register("industry")} label={t("industry")} />
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>{t("military")}</Form.Label>
              <Controller
                name="military"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.name}
                    getOptionLabel={(option) => option?.label}
                    value={military.find((c) => c.value === field.value)}
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
                defaultValue=""
                render={({ field }) => (
                  <Select
                    styles={react_Select_Styles}
                    getOptionValue={(option) => option?.name}
                    getOptionLabel={(option) => option?.label}
                    value={marital.find((c) => c.value === field.value)}
                    options={marital}
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
          <Col md={12}>
            <UploadFile
              register={register}
              registerName={"cv"}
              labelStyles={{ width: "200px" }}
              label={`${t("upload")} ${t("cv")}`}
              isFile
              filename
              accept={
                ".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
              }
            />
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
