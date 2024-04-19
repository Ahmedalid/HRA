import React from "react";
import { Form } from "react-bootstrap";

export default function SelectInput({
  name,
  label,
  type,
  options,
  valueId,
  defaultValues,
  disabled,
}) {
  return defaultValues ? (
    <Form.Group className="mb-3" controlId="formSelect">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        disabled={disabled}
        type={type}
        name={name}
        defaultValue={defaultValues}
      >
        {options?.map((item) => (
          <option key={item.id} value={valueId ? item.id : item.value}>
            {item.value || item.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  ) : (
    <Form.Group disabled={disabled} className="mb-3" controlId="formSelect">
      <Form.Label>{label}</Form.Label>
      <Form.Select type={type} name={name}>
        {options?.map((item) => (
          <option key={item.id} value={valueId ? item.id : item.value}>
            {item.value || item.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
