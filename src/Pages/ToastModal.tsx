import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './ToastModal.scss';
import { useContext } from 'react';
import { ToastContext } from '../Context/ToastContext';

function CreateToast() {

  const toastContext = useContext(ToastContext);

  useEffect(() => {

  }, [toastContext]);

  return (
    <ToastContainer className="toastContainer" position='top-end'>
      <Row>
        <Toast
          onClose={() => {
            toastContext.setToastState(false);
          }}
          show={toastContext.toastState}
          delay={9000}
          className="toast"
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>{toastContext.message}</Toast.Body>
        </Toast>
      </Row>
    </ToastContainer>
  );
}

export default CreateToast;