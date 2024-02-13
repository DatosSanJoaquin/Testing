import React from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Container,
  Form,
  Tab,
  Tabs,
  OverlayTrigger,
} from "react-bootstrap";

function ModalHitos(props) {
  return (
    <Modal
      show={props.MostrarModal}
      size="lg"
      //dialogClassName="anchoModal"
      //onHide={handleClose}
      backdrop="static"
      keyboard={false}
      onHide={() => {
        props.CerrarModal();
      }}
    >
      <Modal.Header
        className="encabezadoModal"
        closeButton
        closeVariant="white"
      >
        <Modal.Title
          style={{ color: "#fff", fontSize: "1.1rem", fontWeight: "600" }}
        >
          {props.Area}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.InformacionModal.Nombre}</h5>
        {
          <ul>
            {props.InformacionModal.Hitos.map((item, index) => (
              <li key={index}>{item.Nombre}</li>
            ))}
          </ul>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ModalHitos;
