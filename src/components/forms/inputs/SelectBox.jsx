import { Form } from "react-bootstrap";
import Select from "react-select";
import { react_Select_Styles } from "../../../utils";
export default function SelectBox({
  data,
  getOptionLabel,
  setOptionValue,
  name,
  label,
}) {
  return (
    <Form.Group className="mb-3" controlId="formSelect">
      <Form.Label>{label}</Form.Label>
      <Select
        styles={react_Select_Styles}
        // getOptionLabel={(option)=>opgetOptionLabel}
        setOptionValue={setOptionValue}
        options={data}
        name={name}
        placeholder={label}
      />
    </Form.Group>
  );
}
