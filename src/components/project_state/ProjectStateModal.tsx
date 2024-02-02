import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const projectStateModal = ({
    show,
    handleClose,
    onSave,
    projectState,
}: {
    show: boolean;
    handleClose: () => void;
    onSave: (projectState: any) => void;
    projectState: any;
}) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [id, setID] = useState(0);

    useEffect(() => {
        if (projectState) {
            const { ps_name, ps_color, id } = projectState;
            setID(id);
            setName(ps_name);
            setColor(ps_color);
        } else {
            setName("");
            setColor("");
            setID(0);
        }
    }, [projectState, show]);

    const handleSave = () => {
        const projectState = {
            ps_id: id,
            ps_name: name,
            ps_color: color,
        };
        onSave(projectState);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {projectState ? "Editar" : "Crear"} estado de proyecto
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
                    <Form.Group controlId="formColor">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
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

export default projectStateModal;