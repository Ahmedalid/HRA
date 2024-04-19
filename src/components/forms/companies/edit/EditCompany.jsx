import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import toastErrorMessage from "../../../shared/ToastErrorMessage";

import { onErrorMessage, react_Select_Styles } from "../../../../utils";
import InputValidation from "../../inputs/InputValidation";
import UploadFile from "../../inputs/UploadFile";
import { CONVERT } from "../../../../utils/Convert";
import {
  useCreateCompanyMutation,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../../redux/slices/company/companySlice";
import { useGetCitiesQuery } from "../../../../redux/slices/locations/locationsSlice";
import { useGetSubCategoriesQuery } from "../../../../redux/slices/sub-category/subCategorySlice";
import LoadingComponent from "../../../LoadingComponent";
import { useGetLocationsQuery } from "../../../../redux/slices/locations/locationsSlice";
import { useGetCategoriesQuery } from "../../../../redux/slices/category/categorySlice";
import { useSelector } from "react-redux";
import { currentEditItem } from "../../../../redux/slices/editItems/editItemsSlice";
import { useState } from "react";

export default function EditCompany({ setShowDialog }) {
  const schema = yup.object({
    user_name: yup.string().required(),
    email: yup.string().required(),
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
  const currentCompany = useSelector(currentEditItem);

  const [main_category_id, setMain_category_id] = useState(
    currentCompany.main_category_id
  );
  const [prefix, setPrefix] = useState(currentCompany.city.phone_key);
  const [country_id, setCountry_id] = useState(currentCompany?.city?.parent_id);

  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    values: {
      user_name: currentCompany.user_name,
      email: currentCompany.email,
      password: currentCompany.password,
      phone: currentCompany.phone,
      company_name: currentCompany.company_name,
      web_site: currentCompany.web_site,
      available_job_location: currentCompany.available_job_location,
      main_company_location: currentCompany.main_company_location,
      prefix,
      main_category_id: currentCompany.main_category_id,
      sub_category_id: currentCompany.sub_category_id,
      location_id: currentCompany.city_id,
      lang: currentCompany.lang,
    },
    mode: "all",
  });
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const {
    data: categories,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery();
  const {
    data: subCategories,
    isSuccess: isSubCategoriesSuccess,
    isLoading: isSubCategoriesLoading,
  } = useGetSubCategoriesQuery(main_category_id);
  const {
    data: countries,
    isSuccess: isCountriesSuccess,
    isLoading: isCountriesLoading,
  } = useGetLocationsQuery();
  const { t } = useTranslation();

  const {
    data: cities,
    isSuccess: isCitiesSuccess,
    isLoading: isCitiesLoading,
  } = useGetCitiesQuery(country_id);

  const onSubmit = async (data) => {
    if (isLoading) return;
    updateCompany({ id: currentCompany.id, _method: "put", ...data })
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
                  defaultValue={currentCompany.main_category_id}
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      value={categories?.data.find((c) => c.id === field.id)}
                      defaultValue={categories?.data.find(
                        (c) => c.id === currentCompany.main_category_id
                      )}
                      options={categories?.data}
                      placeholder={t("choose")}
                      onChange={(selectedOption) => {
                        setMain_category_id(selectedOption.id);
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
                    defaultValue={currentCompany.sub_category_id}
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        defaultValue={subCategories.data.find(
                          (c) => c.id === currentCompany.sub_category_id
                        )}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        value={subCategories?.data.find(
                          (c) => c.value === field.value
                        )}
                        options={!isSubCategoriesLoading && subCategories?.data}
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
                  defaultValue={currentCompany.city.parent_id}
                  render={({ field }) => (
                    <Select
                      styles={react_Select_Styles}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.name}
                      value={countries?.data.find((c) => c.id === field.id)}
                      options={countries?.data}
                      defaultValue={countries.data.find(
                        (c) => c.id === currentCompany.city.parent_id
                      )}
                      placeholder={t("choose")}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption.id);
                        setCountry_id(selectedOption.id);
                        setPrefix(selectedOption.phone_key);
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
                    defaultValue={currentCompany.location_id}
                    render={({ field }) => (
                      <Select
                        styles={react_Select_Styles}
                        getOptionValue={(option) => option?.id}
                        getOptionLabel={(option) => option?.name}
                        value={cities?.data.find((c) => c.id === field.id)}
                        options={!isCitiesLoading && cities?.data}
                        defaultValue={cities?.data.find(
                          (c) => c.id === currentCompany.city_id
                        )}
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
                readonly
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
                    defaultValue={langOptions.find(
                      (c) => c.name === currentCompany.lang
                    )}
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
