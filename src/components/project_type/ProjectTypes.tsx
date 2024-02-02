import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {
  deleteProjectType,
  getAllProjectType,
  saveProjectType,
  updateProjectType,
} from "../../services/ProjectTypeService";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConfirmationModal from "../Shared/ConfirmationModal";
import ProjectTypeModal from "./ProjectTypeModal";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { styleButtonRight } from "../../utils/GlobalStyle";
import { Col, Row } from "react-bootstrap";

function ProjectTypes() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-types"],
    queryFn: getAllProjectType,
  });

  const [notificationShown, setNotificationShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalProjectType, setShowModalProjectType] = useState(false);
  const [selectedProjectID, setSelectedProjectID] = useState(0);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [messageModal, setMessageModal] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalProjectType = () => setShowModalProjectType(false);

  const handleShowModalTypeProject = (projectType = null) => {
    setShowModalProjectType(true);
    if (!projectType) {
      setSelectedProjectType(null);
    } else {
      setSelectedProjectType(projectType);
    }
  };

  useEffect(() => {
    !isLoading &&
      !isError &&
      data &&
      !notificationShown &&
      toast.success(data.message, { id: "list-project-types" });
    setNotificationShown(true);
  }, [isLoading, isError, data, notificationShown]);

  if (!data || !data.projectTypes) {
    return <p>No hay datos disponibles.</p>;
  }

  const { projectTypes } = data;

  const handleShowModal = (projectType) => {
    const { pt_name, id } = projectType;
    const message = `¿Está seguro que desea eliminar el tipo de proyecto ${pt_name}?`;
    setMessageModal(message);
    setSelectedProjectID(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteProjectType(selectedProjectID);
      queryClient.invalidateQueries({
        queryKey: ["project-types"],
      });
      toast.success(data.message, { id: "delete-project-type-success" });
      handleCloseModal();
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        id: "delete-project-type-error",
      });
    }
  };

  const handleSaveProjectType = async (projectType) => {
    try {
      let result;
      if (projectType.pt_id == 0) {
        result = await saveProjectType(projectType);
      }

      if (projectType.pt_id > 0) {
        result = await updateProjectType(projectType);
      }

      const { message } = result;
      queryClient.invalidateQueries({
        queryKey: ["project-types"],
      });
      toast.success(message, { id: "update-project-type-success" });
      handleCloseModalProjectType();
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        id: "save-project-type-error",
      });
    }
  };

  return (
    <>
      <Container>
      <Row>
          <Col>
            <h1>Tipos de Proyectos</h1>
          </Col>
          <Col>
            <div style={styleButtonRight}>
              <Button
                variant="primary"
                onClick={() => handleShowModalTypeProject()}
              >
                Crear Estado de Proyecto
              </Button>
            </div>
          </Col>
        </Row>
        <br />
        <Table responsive="lg">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projectTypes.map((projectType) => (
              <tr key={projectType.id}>
                <td>{projectType.pt_name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShowModalTypeProject(projectType)}
                  >
                    <FaPencil />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(projectType)}
                  >
                    <FaRegTrashCan />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ConfirmationModal
          show={showModal}
          handleClose={handleCloseModal}
          handleConfirm={handleDelete}
          message={messageModal}
        />
        <ProjectTypeModal
          show={showModalProjectType}
          handleClose={handleCloseModalProjectType}
          onSave={handleSaveProjectType}
          projectType={selectedProjectType}
        />
      </Container>
    </>
  );
}

export default ProjectTypes;
