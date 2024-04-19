import React from "react";
import { Form } from "react-bootstrap";

export default function TextInput({
  defaultValues,
  name,
  label,
  type,
  as,
  disabled,
  mb,
  isValid,
  rows,
  ...props
}) {
  return (
    <Form.Group
      className={`${mb === 0 ? "mb-0" : "mb-3"} ${
        mb === "y" ? "my-3" : "mb-3"
      } `}
      controlId="formBasicEmail"
    >
      <Form.Label>{label}</Form.Label>
      {defaultValues ? (
        <Form.Control
          as={as}
          isValid={isValid}
          rows={rows || 4}
          {...props}
          defaultValue={defaultValues}
          type={type || "text"}
          name={name}
          disabled={disabled}
        />
      ) : (
        <Form.Control
          {...props}
          disabled={disabled}
          as={as}
          isValid={isValid}
          rows={rows || 4}
          type={type || "text"}
          name={name}
        />
      )}
    </Form.Group>
  );
}
