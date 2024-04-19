import { forwardRef } from "react";
import { Form } from "react-bootstrap";

function TextareaValidation({ label, type, rows, disabled, ...props }, ref) {
  return (
    <Form.Group className={`mb-3`} controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...props}
        ref={ref}
        as={"textarea"}
        type={type || "text"}
        rows={rows}
        disabled={disabled}
      />
    </Form.Group>
  );
}
export default forwardRef(TextareaValidation);
