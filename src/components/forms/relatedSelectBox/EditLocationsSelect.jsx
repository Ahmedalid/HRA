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
// export default function EditLocationsSelect({ control, address, mdCol }) {
//   const [countryId, setCountryId] = useState(address?.country?.id);
//   const [cityId, setCityId] = useState(address?.city?.id);
//   const { data: countries, isSuccess: isGetCountriesSuccess } =
//     useCountryQuery();
//   const { data: cities, isSuccess: isGetCitySuccess } = useCityQuery(countryId);
//   const { data: areas, isSuccess: isGetAreaSuccess } = useAreaQuery(cityId);

//   const { t } = useTranslation();

//   return (
//     <>
//       {isGetCountriesSuccess && (
//         <>
//           <Col md={mdCol || 4}>
//             <Form.Group className="mb-3">
//               <Form.Label>{t("country")}</Form.Label>
//               <Controller
//                 control={control}
//                 name="country_id"
//                 defaultValue={address?.country?.id}
//                 render={({ field }) => (
//                   <Select
//                     getOptionLabel={(option) => option.name}
//                     getOptionValue={(option) => option.id}
//                     options={countries?.data}
//                     placeholder={t("choose")}
//                     defaultValue={address?.country}
//                     value={countries?.data.find((c) => c.value === field.value)}
//                     onChange={(selectedOption) => {
//                       setCountryId(selectedOption.id);
//                       return field.onChange(selectedOption.id);
//                     }}
//                   />
//                 )}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={mdCol || 4}>
//             <Form.Group className="mb-3">
//               <Form.Label>{t("city")}</Form.Label>
//               <Controller
//                 control={control}
//                 name="city_id"
//                 defaultValue={address?.city?.id}
//                 render={({ field }) => (
//                   <Select
//                     getOptionLabel={(option) => option.name}
//                     getOptionValue={(option) => option.id}
//                     options={cities?.data}
//                     placeholder={t("choose")}
//                     defaultValue={address?.city}
//                     value={cities?.data.find(
//                       (city) => city.value === field.value
//                     )}
//                     onChange={(selectedOption) => {
//                       setCityId(selectedOption.id);
//                       return field.onChange(selectedOption.id);
//                     }}
//                   />
//                 )}
//               />
//             </Form.Group>
//           </Col>
//         </>
//       )}
//       {isGetCitySuccess && isGetAreaSuccess && (
//         <Col md={mdCol || 4}>
//           <Form.Group className="mb-3">
//             <Form.Label>{t("area")}</Form.Label>
//             <Controller
//               control={control}
//               name="area_id"
//               defaultValue={address?.area?.id}
//               render={({ field }) => (
//                 <Select
//                   getOptionLabel={(option) => option.name}
//                   getOptionValue={(option) => option.id}
//                   options={areas?.data}
//                   placeholder={t("choose")}
//                   defaultValue={address?.area}
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
