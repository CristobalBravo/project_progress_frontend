import Container from "react-bootstrap/Container";
import {
  getAllProjectState,
  deleteProjectState,
  saveProjectState,
  updateProjectState,
} from "../../services/ProjectStateService";
import {  Button, Col, Row, Table } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { styleButtonRight } from "../../utils/GlobalStyle";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";
import ProjectStateModal from "./ProjectStateModal";
import ConfirmationModal from "../Shared/ConfirmationModal";

function ProjectState() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-states"],
    queryFn: getAllProjectState,
  });

  const [notificationShown, setNotificationShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalProjectState, setShowModalProjectState] = useState(false);
  const [selectedProjectState, setSelectedProjectState] = useState(null);
  const [selectedProjectStateID, setSelectedProjectStateID] = useState(0);
  const [messageModal, setMessageModal] = useState("");

  useEffect(() => {
    !isLoading &&
      !isError &&
      data &&
      !notificationShown &&
      toast.success(data.message, { id: "list-project-states" });
    setNotificationShown(true);
  }, [isLoading, isError, data, notificationShown]);

  if (!data || !data.projectStates) {
    toast.error("No hay datos disponibles.");
    return null;
  }

  const { projectStates } = data;

  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalProjectState = () => setShowModalProjectState(false);

  const handleSaveProjectState = async (projectState) => {
    try {
      let result;
      if (projectState.ps_id == 0) {
        result = await saveProjectState(projectState);
      }

      if (projectState.ps_id > 0) {
        result = await updateProjectState(projectState);
      }
      const { message } = result;

      queryClient.invalidateQueries({
        queryKey: ["project-states"],
      });
      toast.success(message, { id: "update-project-save-success" });
      handleCloseModalProjectState();
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        id: "save-project-save-error",
      });
    }
  };

  const handleShowModalStateProject = (projectState = null) => {
    setShowModalProjectState(true);
    setSelectedProjectState(null);
    if (projectState || projectState != undefined) {
      setSelectedProjectState(projectState);
    }
  };

  const handleShowModal = (projectState) => {
    const { ps_name, id } = projectState;
    const message = `¿Está seguro que desea eliminar el tipo de proyecto ${ps_name}?`;
    setMessageModal(message);
    setSelectedProjectStateID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteProjectState(selectedProjectStateID);
      queryClient.invalidateQueries({
        queryKey: ["project-states"],
      });
      toast.success(data.message, { id: "delete-project-state-success" });
      handleCloseModal();
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        id: "delete-project-state-error",
      });
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Estados de Proyectos</h1>
          </Col>
          <Col>
            <div style={styleButtonRight}>
              <Button
                variant="primary"
                onClick={() => handleShowModalStateProject()}
              >
                Crear Estado de Proyecto
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        <Table striped responsive="lg">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Color</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projectStates.map((projectState) => {
              return (
                <tr key={projectState.id}>
                  <td>{projectState.ps_name}</td>
                  <td>
                    <div
                      style={{
                        width: "80px",
                        height: "20px",
                        borderRadius: "6px",
                        backgroundColor: projectState.ps_color,
                      }}
                    ></div>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShowModalStateProject(projectState)}
                    >
                      <FaPencil />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(projectState)}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <ProjectStateModal
        show={showModalProjectState}
        handleClose={handleCloseModalProjectState}
        onSave={handleSaveProjectState}
        projectState={selectedProjectState}
      />
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleDelete}
        message={messageModal}
      />
    </>
  );
}

export default ProjectState;
