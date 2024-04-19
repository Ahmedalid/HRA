import { forwardRef } from "react";
import { Form } from "react-bootstrap";

function InputValidation(
  {
    defaultValue,
    label,
    type,
    noLabel,
    noMargin,
    inputClass,
    disabled,
    readonly,
    placeholder,
    onChange,
    ...props
  },
  ref
) {
  function today() {
    let today = new Date();
    // Format the date to be in YYYY-MM-DD format
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    let dd = String(today.getDate()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd;
  }
  return (
    <Form.Group className={`${noMargin ? "" : "mb-3"}`}>
      {noLabel ? null : <Form.Label htmlFor={label}>{label}</Form.Label>}
      <Form.Control
        {...props}
        ref={ref}
        id={label}
        defaultValue={type == "date" ? today() : defaultValue}
        className={`${inputClass ? inputClass : ""} `}
        disabled={disabled}
        readOnly={readonly}
        type={type || "text"}
        min={type == "number" ? 0 : null}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Group>
  );
}
export default forwardRef(InputValidation);
