import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const projectTypeModal = ({
  show,
  handleClose,
  onSave,
  projectType,
}: {
  show: boolean;
  handleClose: () => void;
  onSave: (projectType: any) => void;
  projectType: any;
}) => {
  const [name, setName] = useState("");
  const [id, setID] = useState(0);

  useEffect(() => {
    if (projectType) {
      const { pt_name, id } = projectType;
      setID(id);
      setName(pt_name);
    } else {
      setName("");
      setID(0);
    }
  }, [projectType, show]);

  const handleSave = () => {
    const projectType = {
      pt_id: id,
      pt_name: name,
    };
    onSave(projectType);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {projectType ? "Editar" : "Crear"} Tipo de Proyecto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default projectTypeModal;
