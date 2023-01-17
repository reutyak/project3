import Modal from "react-bootstrap/esm/Modal";
import "./modalAuth.css";
import Button from "react-bootstrap/esm/Button";

function ModalAuth(props: any): JSX.Element {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Unauthorized</h4>
        <p>You have to login again</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAuth;