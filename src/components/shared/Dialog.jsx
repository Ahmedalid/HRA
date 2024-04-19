import Modal from "react-bootstrap/Modal";

export default function DialogComponent({
  showDialog,
  setShowDialog,
  title,
  children,
  size,
  center,
  dialogFooter,
  fullscreen,
}) {
  return (
    <Modal
      size={size || "lg"}
      show={showDialog}
      fullscreen={fullscreen}
      onHide={() => setShowDialog(false)}
      aria-labelledby="example-modal-sizes-title-lg"
      centered={center}
    >
      {/* change style close button index.scss */}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {dialogFooter && <Modal.Footer>{dialogFooter}</Modal.Footer>}
    </Modal>
  );
}
