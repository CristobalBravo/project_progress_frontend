import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  message,
}: {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  message: string;
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar acción</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
