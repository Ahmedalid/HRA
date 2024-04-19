// import { useState } from "react";
// import { Col, Form } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
// import Select from "react-select";
// import { Controller } from "react-hook-form";
// import {
//   useAreaQuery,
//   useCityQuery,
//   useCountryQuery,
// } from "../../../redux/slices/locations/locationsSlice";
// import { useEffect } from "react";

// export default function LocationsSelect({ control, mdCol }) {
//   const { t } = useTranslation();
//   const [countryId, setCountryId] = useState(null);
//   const [cityId, setCityId] = useState(null);
//   const [citiesState, setCitiesState] = useState([]);
//   const { data: countries, isSuccess: isGetCountriesSuccess } =
//     useCountryQuery();
//   const {
//     data: cities,
//     isSuccess: isGetCitySuccess,
//     isLoading: isGetCityLoading,
//   } = useCityQuery(countryId);
//   const {
//     data: areas,
//     isSuccess: isGetAreaSuccess,
//     isLoading: isGetAreaLoading,
//   } = useAreaQuery(cityId);

//   return (
//     <>
//       {isGetCountriesSuccess && (
//         <Col md={mdCol || 4}>
//           <Form.Group className="mb-3">
//             <Form.Label>{t("country")}</Form.Label>
//             <Controller
//               control={control}
//               name="country_id"
//               defaultValue=""
//               render={({ field }) => (
//                 <Select
//                   getOptionLabel={(option) => option.name}
//                   getOptionValue={(option) => option.id}
//                   options={countries?.data}
//                   placeholder={t("choose")}
//                   value={countries?.data.find((c) => c.value === field.value)}
//                   onChange={(selectedOption) => {
//                     setCountryId(selectedOption.id);
//                     return field.onChange(selectedOption.id);
//                   }}
//                 />
//               )}
//             />
//           </Form.Group>
//         </Col>
//       )}
//       {isGetCountriesSuccess && (
//         <Col md={mdCol || 4}>
//           <Form.Group className="mb-3">
//             <Form.Label>{t("city")}</Form.Label>
//             <Controller
//               control={control}
//               name="city_id"
//               defaultValue=""
//               render={({ field }) => (
//                 <Select
//                   getOptionLabel={(option) => option.name}
//                   getOptionValue={(option) => option.id}
//                   isDisabled={cities?.data.length === 0}
//                   options={cities?.data}
//                   placeholder={t("choose")}
//                   value={cities?.data.find(
//                     (city) => city.value === field.value
//                   )}
//                   onChange={(selectedOption) => {
//                     setCityId(selectedOption.id);
//                     return field.onChange(selectedOption.id);
//                   }}
//                 />
//               )}
//             />
//           </Form.Group>
//         </Col>
//       )}
//       {isGetCitySuccess && isGetAreaSuccess && (
//         <Col md={mdCol || 4}>
//           <Form.Group className="mb-3">
//             <Form.Label>{t("area")}</Form.Label>
//             <Controller
//               control={control}
//               name="area_id"
//               defaultValue=""
//               render={({ field }) => (
//                 <Select
//                   getOptionValue={(option) => option.id}
//                   getOptionLabel={(option) => option.name}
//                   isDisabled={areas?.data.length === 0}
//                   options={areas?.data}
//                   placeholder={t("choose")}
//                   value={areas?.data.find((area) => area.value === field.value)}
//                   onChange={(selectedOption) =>
//                     field.onChange(selectedOption.id)
//                   }
//                 />
//               )}
//             />
//           </Form.Group>
//         </Col>
//       )}
//     </>
//   );
// }
