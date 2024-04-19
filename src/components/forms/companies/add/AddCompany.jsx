import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import toastErrorMessage from "../../../shared/ToastErrorMessage";
// import { useCreateCompanyMutation } from "../../../../redux/slices/employees/employeesSlice";
import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import UploadFile from "../../inputs/UploadFile";
import { CONVERT } from "../../../../utils/Convert";
import { useCreateCompanyMutation } from "../../../../redux/slices/company/companySlice";

import { useGetSubCategoriesQuery } from "../../../../redux/slices/sub-category/subCategorySlice";
import LoadingComponent from "../../../LoadingComponent";
import {
  useGetCitiesQuery,
  useGetLocationsQuery,
} from "../../../../redux/slices/locations/locationsSlice";
import { useGetCategoriesQuery } from "../../../../redux/slices/category/categorySlice";
import { useState } from "react";

export default function AddCompany({ setShowDialog }) {
  const schema = yup.object({
    user_name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    company_name: yup.string().required(),
    web_site: yup.string().required(),
    available_job_location: yup.string().required(),
    main_company_location: yup.string().required(),
    prefix: yup.string().required(),
    main_category_id: yup
      .number()
      .typeError("main category is a required field")
      .required(),
    sub_category_id: yup
      .number()
      .typeError("sub category is a required field")
      .required(),
    location_id: yup.number().typeError("city is a required field").required(),
  });
  const [prefix, setPrefix] = useState(null);
  const { register, handleSubmit, control, watch } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    values: {
      prefix,
    },
  });
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery();
  const {
    data: subCategories,
    isSuccess: isSubCategoriesSuccess,
    isLoading: isSubCategoriesLoading,
  } = useGetSubCategoriesQuery(watch("main_category_id"));
  const {
    data: cities,
    isSuccess: isCitiesSuccess,
    isLoading: isCitiesLoading,
  } = useGetCitiesQuery(watch("country_id"));

  const {
    data: countries,
    isSuccess: isCountriesSuccess,
    isLoading: isCountriesLoading,
  } = useGetLocationsQuery();
  const { t } = useTranslation();

  const onSubmit = async (data) => {
    if (isLoading) return;
    const logo = data.logo[0];
    createCompany(CONVERT.ConvertObjectToFormData({ ...data, logo }))
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
  const langOptions = [
    { name: "ar", label: t("ar") },
    { name: "en", label: t("en") },
  ];

  if (isCountriesLoading || isCategoriesLoading) {
    return <LoadingComponent boxed />;
  } else if (isCountriesSuccess && isCategoriesSuccess) {
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Row>
            <Col md={12}>
              <UploadFile
                register={register}
                registerName={"logo"}
                labelStyles={{ width: 250 }}
                label={`${t("upload")} ${t("image")}`}
                preview
              />
            </Col>
            <Col md={4}>
              <InputValidation
                label={t("user_name")}
                {...register("user_name")}
              />
            </Col>
            <Col md={4}>
              <InputValidation
                label={t("email")}
                {...register("email")}
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
                label={t("company_name")}
                {...register("company_name")}
              />
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>{t("main-category")}</Form.Label>
                <Controller
                  name="main_category_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.name}
                      getOptionLabel={(option) => option?.name}
                      value={categories.data.find(
                        (c) => c.value === field.value
                      )}
                      options={categories.data}
                      placeholder={t("choose")}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.id);
                      }}
                    />
                  )}
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
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        isDisabled={isSubCategoriesLoading}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        value={subCategories.data.find(
                          (c) => c.value === field.value
                        )}
                        options={!isSubCategoriesLoading && subCategories.data}
                        placeholder={t("choose")}
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
              <Form.Group className="mb-3">
                <Form.Label>{t("country")}</Form.Label>
                
                <Controller
                  name="country_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      value={countries.data.find((c) => c.id === field.id)}
                      options={countries.data}
                      placeholder={t("choose")}
                      onChange={(selectedOption) => {
                        setPrefix(selectedOption.phone_key);
                        field.onChange(selectedOption.id);
                      }}
                    />
                  )}
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
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        isDisabled={isCitiesLoading}
                        value={cities?.data.find((c) => c.id === field.id)}
                        options={!isCitiesLoading && cities?.data}
                        placeholder={t("choose")}
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
              <InputValidation {...register("web_site")} label={t("website")} />
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("available_job_location")}
                label={t("available_job_location")}
              />
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("main_company_location")}
                label={t("main_company_location")}
              />
            </Col>
            <Col md={4}>
              <InputValidation
                {...register("prefix")}
                label={t("code")}
                placeholder="exp: +20"
              />
            </Col>
            <Col md={4}>
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
                    value={langOptions.find((c) => c.value === field.value)}
                    options={langOptions}
                    placeholder={t("choose")}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.name)
                    }
                  />
                )}
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
}
