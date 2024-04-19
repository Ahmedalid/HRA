import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

// import { useCreateCompanyMutation } from "../../../../redux/slices/employees/employeesSlice";

import InputValidation from "../../../inputs/InputValidation";
import { onErrorMessage, react_Select_Styles } from "../../../../../utils";

import { CONVERT } from "../../../../../utils/Convert";
import toastErrorMessage from "../../../../shared/ToastErrorMessage";

import {
  useGetLocationsQuery,
  useCreateCityMutation,
} from "../../../../../redux/slices/locations/locationsSlice";
import LoadingComponent from "../../../../LoadingComponent";

export default function AddCity({ setShowDialog }) {
  const [createCity, { isLoading }] = useCreateCityMutation();
  const {
    data: locations,
    isSuccess,
    isLoading: isLocationsLoading,
  } = useGetLocationsQuery();

  const { t } = useTranslation();
  const schema = yup.object({
    name_ar: yup.string().required(),
    name_en: yup.string().required(),
    parent_id: yup.string().required(),
  });
  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    if (isLoading) return;
    createCity(CONVERT.ConvertObjectToFormData(data))
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
  if (isLocationsLoading) {
    return <LoadingComponent boxed />;
  } else if (isSuccess) {
    return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container>
          <Row>
            <Col md={12}>
              <InputValidation {...register("name_ar")} label={t("name_ar")} />
            </Col>
            <Col md={12}>
              <InputValidation {...register("name_en")} label={t("name_en")} />
            </Col>
            <Col md={12}>
              <Controller
                name="parent_id"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>{t("country")}</Form.Label>
                    <Select
                      style={react_Select_Styles}
                      getOptionValue={(option) => option.id}
                      getOptionLabel={(option) => option.name}
                      options={locations.data}
                      value={locations.data.find(
                        (c) => c.value === field.value
                      )}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption.id)
                      }
                    />
                  </Form.Group>
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
